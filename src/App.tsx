import { Nav } from './components/layout/Nav'
import { Footer } from './components/layout/Footer'
import { Reveal } from './components/ui/Reveal'
import { Hero } from './components/sections/Hero'
import { WorkPreview } from './components/sections/WorkPreview'
import { Work } from './components/sections/Work'
import { Research } from './components/sections/Research'
import { Experience } from './components/sections/Experience'
import { Education } from './components/sections/Education'
import { Skills } from './components/sections/Skills'
import { Community } from './components/sections/Community'
import { About } from './components/sections/About'
import { Beyond } from './components/sections/Beyond'
import { Contact } from './components/sections/Contact'
import { BeyondPage } from './components/pages/BeyondPage'

export function App() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/'
  const isBeyondPage = path === '/beyond' || path === '/kitchen'

  return (
    <>
      <Nav />
      {isBeyondPage ? (
        <BeyondPage />
      ) : (
        <main>
          <Hero />
          <Reveal delay={0.08}><WorkPreview /></Reveal>
          <Reveal delay={0.12}><Work /></Reveal>
          <Reveal delay={0.16}><Research /></Reveal>
          <Reveal delay={0.2}><Experience /></Reveal>
          <Reveal delay={0.24}><Education /></Reveal>
          <Reveal delay={0.28}><Skills /></Reveal>
          <Reveal delay={0.32}><Community /></Reveal>
          <Reveal delay={0.36}><About /></Reveal>
          <Reveal delay={0.4}><Beyond /></Reveal>
          <Reveal delay={0.44}><Contact /></Reveal>
        </main>
      )}
      <Footer />
    </>
  )
}
