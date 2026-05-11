import { useEffect, useMemo, useState } from 'react'
import { X } from 'lucide-react'
import berryCake from '../../assets/optimized/berry-cake.jpg'
import cinnamonRolls from '../../assets/optimized/cinnamon-rolls.jpg'
import creamPuffs from '../../assets/optimized/cream-puffs.jpg'
import crepeCake from '../../assets/optimized/crepe-cake.jpg'
import crepeCakeSlice from '../../assets/optimized/crepe-cake-slice.jpg'
import croissant from '../../assets/optimized/croissant.jpg'
import custardBakes from '../../assets/optimized/custard-bakes.jpg'
import entremet from '../../assets/optimized/entremet.jpg'
import floralCupcakes from '../../assets/optimized/floral-cupcakes.jpg'
import fraisier from '../../assets/optimized/fraisier.jpg'
import milkBreadRolls from '../../assets/optimized/milk-bread-rolls.jpg'
import patternedCookies from '../../assets/optimized/patterned-cookies.jpg'
import sesameBuns from '../../assets/optimized/sesame-buns.jpg'
import trianon from '../../assets/optimized/trianon.jpg'
import type { GalleryItemContent } from '../../types'
import { useLang } from '../../context/LangContext'

const galleryImages: Record<string, string> = {
  croissants: croissant,
  entremet,
  fraisier,
  'floral-cupcakes': floralCupcakes,
  'berry-cake': berryCake,
  'crepe-cake': crepeCake,
  'crepe-cake-slice': crepeCakeSlice,
  'patterned-cookies': patternedCookies,
  'cream-puffs': creamPuffs,
  'cinnamon-rolls': cinnamonRolls,
  'milk-bread-rolls': milkBreadRolls,
  'sesame-buns': sesameBuns,
  'custard-bakes': custardBakes,
  trianon,
}

export function BeyondPage() {
  const { lang, t } = useLang()
  const b = t.beyond
  const [activeItem, setActiveItem] = useState<GalleryItemContent | null>(null)
  const activeImage = activeItem ? galleryImages[activeItem.id] : null
  const galleryItems = useMemo(() => b.gallery.filter(item => galleryImages[item.id]), [b.gallery])
  const closeLabel = lang === 'fr' ? 'Fermer' : 'Close'
  const backLabel = lang === 'fr' ? 'Retour à Au-delà du code' : 'Back to Beyond the screen'

  useEffect(() => {
    if (!activeItem) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveItem(null)
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [activeItem])

  return (
    <main className="beyond-page">
      <section className="beyond-page-hero">
        <div className="container beyond-kitchen-hero">
          <a href="/#beyond" className="kitchen-back-link">
            {backLabel}
          </a>
          <div>
            <p className="section-eyebrow">{b.page.eyebrow}</p>
            <h1>{b.page.heading}</h1>
            <p className="beyond-page-intro">{b.page.intro}</p>
          </div>
        </div>
      </section>

      <section className="beyond-page-section">
        <div className="container">
          <div className="beyond-section-head">
            <p className="kitchen-accent">{b.page.kitchenAccent}</p>
            <h2>{b.items[1]?.label}</h2>
          </div>

          <div className="beyond-gallery">
            {galleryItems.map(item => (
              <button
                key={item.id}
                type="button"
                className="beyond-gallery-card"
                onClick={() => setActiveItem(item)}
              >
                <img src={galleryImages[item.id]} alt={item.alt} loading="lazy" decoding="async" />
                <span className="beyond-gallery-meta">{item.category}</span>
                <span className="beyond-gallery-title">{item.title}</span>
                <span className="beyond-gallery-desc">{item.description}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="kitchen-return-section">
        <div className="container">
          <a href="/#beyond" className="btn-outline">
            {backLabel}
          </a>
        </div>
      </section>

      {activeItem && activeImage && (
        <div
          className="beyond-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          onClick={() => setActiveItem(null)}
        >
          <button
            type="button"
            className="beyond-lightbox-close"
            onClick={() => setActiveItem(null)}
            aria-label={closeLabel}
          >
            <X size={18} strokeWidth={1.8} aria-hidden="true" />
          </button>
          <figure className="beyond-lightbox-panel" onClick={event => event.stopPropagation()}>
            <img src={activeImage} alt={activeItem.alt} />
            <figcaption>
              <span>{activeItem.category}</span>
              <strong>{activeItem.title}</strong>
              <p>{activeItem.description}</p>
            </figcaption>
          </figure>
        </div>
      )}
    </main>
  )
}
