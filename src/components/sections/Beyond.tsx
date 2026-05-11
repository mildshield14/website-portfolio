import croissant from '../../assets/optimized/croissant.jpg'
import entremet from '../../assets/optimized/entremet.jpg'
import floralCupcakes from '../../assets/optimized/floral-cupcakes.jpg'
import fraisier from '../../assets/optimized/fraisier.jpg'
import rfiumLogo from '../../assets/optimized/rfium.jpg'
import runningMedal from '../../assets/optimized/running-medal.jpg'
import { useLang } from '../../context/LangContext'
import { triggerHaptic } from '../../utils/haptics'
import { OriginMap } from '../ui/OriginMap'
import { SectionHeader } from '../ui/SectionHeader'

const previewImages: Record<string, string> = {
  croissants: croissant,
  entremet,
  fraisier,
  'floral-cupcakes': floralCupcakes,
}

export function Beyond() {
  const { t } = useLang()
  const b = t.beyond

  return (
    <section id="beyond" className="section beyond-preview-section">
      <div className="container">
        <SectionHeader eyebrow={b.eyebrow} heading={b.heading} />

        <div className="beyond-preview-layout">
          <div className="beyond-preview-copy">
            <p className="beyond-preview-intro">{b.intro}</p>

            <div className="origin-note">
              <OriginMap caption={b.origin.caption} />
              <p>{b.origin.text}</p>
            </div>

            <div className="home-life-grid">
              <article className="beyond-life-card">
                <div>
                  <p className="meta-label">{b.page.enduranceTitle}</p>
                  <h3>{b.page.enduranceTitle}</h3>
                  <p>{b.page.enduranceText}</p>
                </div>
                <img
                  src={runningMedal}
                  alt="Half-marathon medal after a race."
                  loading="lazy"
                  decoding="async"
                  className="beyond-life-image"
                />
              </article>

              <article className="beyond-life-card beyond-community-card">
                <div>
                  <p className="meta-label">RFIUM</p>
                  <h3>{b.page.communityTitle}</h3>
                  <p>{b.page.communityText}</p>
                </div>
                <img src={rfiumLogo} alt="RFIUM logo." loading="lazy" decoding="async" className="rfium-mark" />
              </article>
            </div>
          </div>

          <div className="baking-preview-card" aria-label={b.page.kitchenAccent}>
            <div className="baking-preview-head">
              <p className="meta-label">{b.previewGallery[0]?.category}</p>
              <h3>{b.page.kitchenAccent}</h3>
            </div>

            <div className="baking-preview-grid">
              {b.previewGallery.map(item => (
                <figure key={item.id} className="baking-preview-image">
                  <img src={previewImages[item.id]} alt={item.alt} loading="lazy" decoding="async" />
                  <figcaption>{item.title}</figcaption>
                </figure>
              ))}
            </div>

            <a href="/kitchen" className="btn-outline beyond-preview-link" onClick={triggerHaptic}>
              {b.seeMore}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
