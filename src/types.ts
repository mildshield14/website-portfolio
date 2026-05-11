export type Lang = 'en' | 'fr'
export type Theme = 'light' | 'dark'

export interface UILabels {
  current: string
  featured: string
  active: string
  completed: string
  viewAllWork: string
  email: string
  githubLabel: string
  linkedinLabel: string
  resumeLabel: string
  readMore: string
  collapse: string
}

export interface WorkItem {
  id: string
  type: string
  year: string
  featured: boolean
  title: string
  sub: string
  role?: string
  codeSnippet?: string
  pipelineCaption?: string
  challenge: string
  approach: string
  outcome: string
  tags: string[]
}

export interface ExperienceItem {
  company: string
  role: string
  period: string
  loc: string
  summary: string
  tags: string[]
  current?: boolean
}

export interface EducationItem {
  degree: string
  institution: string
  period: string
  detail: string
}

export interface SkillCluster {
  label: string
  skills: string[]
}

export interface NavContent {
  work: string
  research: string
  experience: string
  education: string
  skills: string
  about: string
  contact: string
  cv: string
}

export interface HeroContent {
  eyebrow: string
  name: string
  positioning: string
  bio: string
  currently_label: string
  currently_prose: string
  artifact: string
  cta_work: string
  cta_research: string
  cta_cv: string
  cta_contact: string
}

export interface WorkContent {
  eyebrow: string
  heading: string
  sub: string
  challenge: string
  approach: string
  outcome: string
  expand: string
  collapse: string
  items: WorkItem[]
}

export interface ResearchContent {
  eyebrow: string
  heading: string
  context: string
  abstract_label: string
  abstract: string
  questions_label: string
  questions: string[]
  methods_label: string
  methods: string
  keywords: string[]
}

export interface ExperienceContent {
  eyebrow: string
  heading: string
  items: ExperienceItem[]
}

export interface EducationContent {
  eyebrow: string
  heading: string
  items: EducationItem[]
}

export interface SkillsContent {
  eyebrow: string
  heading: string
  clusters: SkillCluster[]
}

export interface AboutContent {
  eyebrow: string
  heading: string
  p1: string
  p2: string
  quote: string
}

export interface ContactContent {
  eyebrow: string
  heading: string
  sub: string
  email: string
  github: string
  linkedin: string
  resumeLabel: string
  resumeFile: string
}

export interface FooterContent {
  copy: string
  made: string
}

export interface MetaContent {
  name: string
  role: string
  uni: string
}

export interface CommunityItem {
  org: string
  role: string
  desc: string
}

export interface CommunityContent {
  eyebrow: string
  heading: string
  items: CommunityItem[]
}

export interface BeyondItem {
  label: string
  text: string
}

export interface OriginContent {
  text: string
  caption: string
}

export interface GalleryItemContent {
  id: string
  title: string
  category: string
  description: string
  alt: string
}

export interface BeyondContent {
  eyebrow: string
  heading: string
  intro: string
  seeMore: string
  origin: OriginContent
  items: BeyondItem[]
  previewGallery: GalleryItemContent[]
  gallery: GalleryItemContent[]
  page: {
    eyebrow: string
    heading: string
    intro: string
    kitchenAccent: string
    enduranceTitle: string
    enduranceText: string
    communityTitle: string
    communityText: string
  }
}

export interface Content {
  meta: MetaContent
  nav: NavContent
  ui: UILabels
  hero: HeroContent
  work: WorkContent
  research: ResearchContent
  experience: ExperienceContent
  education: EducationContent
  skills: SkillsContent
  community: CommunityContent
  about: AboutContent
  beyond: BeyondContent
  contact: ContactContent
  footer: FooterContent
}
