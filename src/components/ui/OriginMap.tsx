import mauritiusUrl from '../../assets/mu.svg'
import montrealUrl from '../../assets/montreal.svg'

interface OriginMapProps {
  caption: string
}

export function OriginMap({ caption }: OriginMapProps) {
  return (
    <figure className="origin-map-card" aria-label={caption}>
      {/*
        Parent viewBox: 320 × 152
        Montréal dot:   (62, 36) — SVG image centred on that point
        Mauritius dot: (262, 112) — SVG image centred on that point
        montreal.svg viewBox: 1015.7 × 675.78  → display 80 × 53
        mu.svg       viewBox: 1000  × 1000     → display 52 × 52
      */}
      <svg viewBox="0 0 320 152" role="img" aria-hidden="true" className="origin-map">
        <defs>
          <linearGradient
            id="origin-path-gradient"
            x1="62" y1="36" x2="262" y2="112"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="var(--c-warm)" />
            <stop offset="1" stopColor="var(--c-accent2)" />
          </linearGradient>
        </defs>

        {/* Montréal / Québec — centred on (62, 36) */}
        <image
          href={montrealUrl}
          x="22" y="10" width="80" height="53"
          className="origin-montreal-image"
          preserveAspectRatio="xMidYMid meet"
        />

        {/* Mauritius island — centred on (262, 112) */}
        <image
          href={mauritiusUrl}
          x="236" y="86" width="52" height="52"
          className="origin-mauritius-image"
          preserveAspectRatio="xMidYMid meet"
        />

        {/* Animated dashed route */}
        <path
          className="origin-path-shadow"
          d="M 62 36 C 132 66 190 88 262 112"
          fill="none" strokeWidth="10" strokeLinecap="round"
        />
        <path
          className="origin-path"
          d="M 62 36 C 132 66 190 88 262 112"
          fill="none"
          stroke="url(#origin-path-gradient)"
          strokeWidth="1.8" strokeLinecap="round"
        />

        {/* Montréal pin */}
        <line x1="62" y1="29" x2="62" y2="43" className="montreal-crosshair" />
        <line x1="55" y1="36" x2="69" y2="36" className="montreal-crosshair" />
        <circle cx="62" cy="36" r="2.4" className="origin-dot is-end" />

        {/* Mauritius dot + animated traveller */}
        <circle cx="262" cy="112" r="3.2" className="origin-dot" />
        <circle cx="262" cy="112" r="3.2" className="origin-moving-dot" />

        {/* Labels */}
        <text x="34" y="22" className="origin-map-label">Montréal</text>
        <text x="236" y="80" className="origin-map-label">Mauritius</text>
      </svg>
      <figcaption>{caption}</figcaption>
    </figure>
  )
}
