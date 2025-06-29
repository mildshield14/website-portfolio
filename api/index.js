// api/index.js
import serverless from 'serverless-http';
import express from 'express';
import * as dav from 'dav';
import ical from 'node-ical';
import { createEvent } from 'ics';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const {
    APPLE_ID,
    APPLE_APP_PASSWORD,
    CALDAV_URL,
    CALENDAR_PATH,
    PORT = 3000,
} = process.env;

if (!APPLE_ID || !APPLE_APP_PASSWORD || !CALDAV_URL) {
    console.error('🚫 Missing CALDAV credentials in env');
    process.exit(1);
}

let calendars = [];
let keepaliveInterval;

async function initCalDAV() {
    calendars = [{
        displayName: 'Work',
        url:         `${CALDAV_URL.replace(/\/$/, '')}${CALENDAR_PATH}`,
        description: '',
        color:       ''
    }];

    console.log('✅ CalDAV calendar configured:', calendars[0].url);

    keepaliveInterval = setInterval(() => {
        console.log('🔄 CalDAV keep-alive ping');
    }, 60 * 1000);
}

const app = express();
app.use(express.json());

// — GET /api/calendars
app.get('/api/calendars', (req, res) => {
    res.json(calendars);
});

// — GET /api/busy?start=...&end=...
app.get('/api/busy', async (req, res) => {
    try {
        const { start, end } = req.query;
        if (!start || !end) return res.status(400).send('Missing start or end');

        const startISO = new Date(start).toISOString().replace(/[-:]/g,'').split('.')[0] + 'Z';
        const endISO   = new Date(end).toISOString().replace(/[-:]/g,'').split('.')[0] + 'Z';

        const reportBody = `<?xml version="1.0" encoding="UTF-8"?>
<C:calendar-query xmlns:C="urn:ietf:params:xml:ns:caldav" xmlns:D="DAV:">
  <D:prop><D:getetag/><C:calendar-data/></D:prop>
  <C:filter>
    <C:comp-filter name="VCALENDAR">
      <C:comp-filter name="VEVENT">
        <C:time-range start="${startISO}" end="${endISO}"/>
      </C:comp-filter>
    </C:comp-filter>
  </C:filter>
</C:calendar-query>`;

        const resp = await fetch(calendars[0].url, {
            method: 'REPORT',
            headers: {
                Authorization: 'Basic ' + Buffer.from(`${APPLE_ID}:${APPLE_APP_PASSWORD}`).toString('base64'),
                'Content-Type':'text/xml; charset=utf-8',
                Depth:        '1'
            },
            body: reportBody
        });

        const text = await resp.text();
        const periods = [];
        const rx = /<calendar-data[^>]*>([\s\S]*?)<\/calendar-data>/gi;
        let m;
        while ((m = rx.exec(text)) !== null) {
            const parsed = ical.parseICS(m[1]);
            for (let k in parsed) {
                const ev = parsed[k];
                if (ev.type === 'VEVENT') {
                    periods.push({
                        start: ev.start.toISOString(),
                        end:   ev.end.toISOString(),
                        title: ev.summary || ''
                    });
                }
            }
        }

        res.json(periods);
    } catch (err) {
        console.error('/api/busy error', err);
        res.status(500).send(err.message);
    }
});

// — POST /api/book { start, end, title, attendee }
app.post('/api/book', async (req, res) => {
    try {
        const { start, end, title, attendee } = req.body;
        if (!start || !end || !title) {
            return res.status(400).json({ error: 'start, end & title are required' });
        }

        // build ICS text
        let icsValue;
        createEvent({
            start:     new Date(start).toISOString().split(/[-:T]/).map(n=>+n).slice(0,6),
            end:       new Date(end).toISOString().split(/[-:T]/).map(n=>+n).slice(0,6),
            title,
            attendees: attendee ? [{ email: attendee }] : []
        }, (err, value) => {
            if (err) throw err;
            icsValue = value;
        });

        // PUT to CalDAV
        const uid = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        const eventUrl = `${calendars[0].url}${uid}.ics`;

        const resp = await fetch(eventUrl, {
            method: 'PUT',
            headers: {
                Authorization: 'Basic ' + Buffer.from(`${APPLE_ID}:${APPLE_APP_PASSWORD}`).toString('base64'),
                'Content-Type':'text/calendar; charset=utf-8'
            },
            body: icsValue
        });

        if (resp.status === 201 || resp.status === 204) {
            res.status(201).json({ uid });
        } else {
            const body = await resp.text();
            console.error('PUT failed', resp.status, body);
            res.status(500).send(body);
        }
    } catch (err) {
        console.error('/api/book error', err);
        res.status(500).send(err.message);
    }
});

// ── bootstrap ──
async function bootstrap() {
    await initCalDAV();

    // when run locally, start a real HTTP server
    if (!process.env.VERCEL) {
        app.listen(PORT, () => {
            console.log(`🚀 Local API listening at http://localhost:${PORT}`);
        });
    }
}

bootstrap().catch(err => {
    console.error('Fatal init error:', err);
    process.exit(1);
});


export const handler = serverless(app);
