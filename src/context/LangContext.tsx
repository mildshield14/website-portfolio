import { createContext, useContext, useState, useEffect } from 'react'
import type { Lang, Content } from '../types'
import { content } from '../content'

interface LangContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: Content
}

const LangContext = createContext<LangContextValue>({
  lang: 'en',
  setLang: () => {},
  t: content.en,
})

function getInitialLang(): Lang {
  const stored = localStorage.getItem('lang')
  return stored === 'fr' ? 'fr' : 'en'
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang)
  const t = content[lang]

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  function setLang(l: Lang) {
    setLangState(l)
    localStorage.setItem('lang', l)
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
