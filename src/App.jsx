import { useEffect, useRef, useState } from 'react'

const skillsByLanguage = {
  es: [
    ['c#'],
    ['.net 10'],
    ['react', 'nodejs'],
    ['sql server'],
    ['python'],
    ['ui design/figma'],
    ['modelado y diseño de procesos', 'tecnologías ia'],
  ],
  en: [
    ['c#'],
    ['.net 10'],
    ['react', 'nodejs'],
    ['sql server'],
    ['python'],
    ['ui design/figma'],
    ['process design and modeling', 'ai technologies'],
  ],
}

const projects = [
  {
    name: 'personal web',
    url: 'https://wilsonreategui.com',
    // Si el archivo no existe todavía, el bloque cae al color sólido de --media.
    image: '/assets/personal-web.png',
    summary: {
      es: 'construido a mano. sin frameworks, sin build. routing, caché y persistencia hechos desde cero.',
      en: 'personal site with no framework or build. hand-rolled router with fetch and caching, persistent theme, terminal effects.',
    },
    // El "> " del prompt no va en el dato: desalinea la columna. Lo pone el css.
    tags: ['html', 'css', 'javascript', 'es modules', 'fetch api', 'svg', 'localstorage', 'github pages'],
    layout: 'project-card--solo',
  },
]

const socialNetworks = [
  { name: 'mail', asset: 'email', label: 'wreategui17@gmail.com', copy: 'wreategui17@gmail.com', width: 25 },
  { name: 'linkedin', asset: 'linkedin', label: '@wilsonreategui', url: 'https://www.linkedin.com/in/wilsonreategui', width: 20 },
  { name: 'github', asset: 'github', label: '@wilsonreategui', url: 'https://github.com/wilsonreategui', width: 21 },
  { name: 'instagram', label: '@wilsonreategui', url: 'https://www.instagram.com/wilsonreategui', width: 20 },
]

const copy = {
  es: {
    locale: 'es',
    themeLight: 'activar modo claro',
    themeDark: 'activar modo oscuro',
    languageLabel: 'seleccionar idioma',
    artLink: 'arte',
    artLinkLabel: 'visitar Wilson Reátegui arte',
    avatarAlt: 'ilustración de perfil',
    greeting: '> hola!',
    introduction: '> mi nombre es',
    introBefore: '# ',
    introHighlight: 'programador senior',
    introAfter: ' que vive en Lima, Perú.',
    workBefore: '# actualmente trabajo como analista de sistemas en ',
    workHighlight: 'Total Servicios Financieros',
    workAfter: ', una empresa dedicada a la banca de productos como leasing y factoring.',
    specialtyBefore: '# me especializo en el ',
    specialtyHighlight: 'diseño, desarrollo y gestión de software',
    specialtyAfter: ', utilizando tecnologías modernas y minimalistas, siguiendo buenas prácticas de desarrollo para crear proyectos eficientes y escalables.',
    tabs: { skills: 'skills', projects: 'proyectos', contact: 'contacto' },
    contactBefore: ' Si te gusta  mi trabajo,  ',
    contactHighlight: 'escríbeme.',
    // El salto va en el dato, no en el JSX, para que cada idioma decida si lo usa.
    contactAfter: '\nPodemos colaborar en un proyecto.',
    name: 'nombre:',
    email: 'email:',
    message: 'mensaje:',
    send: 'enviar',
    status: '¡gracias! tu mensaje está listo para ser enviado.',
    socialText: 'también puedes encontrarme por estos medios:',
    farewell: 'nos vemos pronto!',
    socialLabel: 'redes sociales',
    copyEmail: 'copiar correo',
    copied: 'copiado!',
  },
  en: {
    locale: 'en',
    themeLight: 'enable light mode',
    themeDark: 'enable dark mode',
    languageLabel: 'select language',
    artLink: 'arte',
    artLinkLabel: 'visit Wilson Reátegui art',
    avatarAlt: 'profile illustration',
    greeting: '> hi!',
    introduction: '> my name is',
    introBefore: '# a ',
    introHighlight: 'senior developer',
    introAfter: ' based in Lima, Peru.',
    workBefore: '# i currently work as a systems analyst at ',
    workHighlight: 'Total Servicios Financieros',
    workAfter: ', a company focused on financial products such as leasing and factoring.',
    specialtyBefore: '# i specialize in ',
    specialtyHighlight: 'software design, development, and management',
    specialtyAfter: ', using modern, minimal technologies and development best practices to create efficient, scalable projects.',
    tabs: { skills: 'skills', projects: 'projects', contact: 'contact' },
    contactBefore: 'if you like my work and would like to get in touch, feel free to ',
    contactHighlight: 'send me a message',
    contactAfter: ' to collaborate on a project.',
    name: 'name:',
    email: 'email:',
    message: 'message:',
    send: 'send',
    status: 'thank you! your message is ready to be sent.',
    socialText: 'you can also find me here:',
    farewell: 'see you soon!',
    socialLabel: 'social networks',
    copyEmail: 'copy email',
    copied: 'copied!',
  },
}

const tabOrder = ['skills', 'projects', 'contact']

const languageOptions = [
  { code: 'es', label: 'es' },
  { code: 'en', label: 'en' },
]

function assetPath(name, theme) {
  return `/assets/${name}-${theme}.svg`
}

// Banderas simplificadas e inline: los emoji de bandera no se renderizan en Windows,
// y un <option> nativo no admite imágenes, de ahí el desplegable propio.
function LanguageFlag({ code }) {
  if (code === 'es') {
    return (
      <svg className="lang-flag" viewBox="0 0 21 14" aria-hidden="true">
        <rect width="21" height="14" fill="#ffffff" />
        <rect width="7" height="14" fill="#d91023" />
        <rect x="14" width="7" height="14" fill="#d91023" />
      </svg>
    )
  }
  return (
    <svg className="lang-flag" viewBox="0 0 21 14" aria-hidden="true">
      <rect width="21" height="14" fill="#012169" />
      <path d="M0 0 21 14M21 0 0 14" stroke="#ffffff" strokeWidth="2.8" />
      <path d="M0 0 21 14M21 0 0 14" stroke="#c8102e" strokeWidth="1.6" />
      <path d="M10.5 0v14M0 7h21" stroke="#ffffff" strokeWidth="4.6" />
      <path d="M10.5 0v14M0 7h21" stroke="#c8102e" strokeWidth="2.8" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg className="social-links__instagram" viewBox="0 0 20 20" aria-hidden="true">
      <rect x="1.25" y="1.25" width="17.5" height="17.5" rx="5" />
      <circle cx="10" cy="10" r="4" />
      <circle className="social-links__instagram-dot" cx="15.25" cy="4.75" r="1.1" />
    </svg>
  )
}

function TabIcon({ tab }) {
  if (tab === 'skills') {
    return (
      <svg className="tab-button__icon" viewBox="0 0 18 18" aria-hidden="true">
        <path d="m6.5 5-4 4 4 4M11.5 5l4 4-4 4M10 3 8 15" />
      </svg>
    )
  }

  if (tab === 'projects') {
    return (
      <svg className="tab-button__icon" viewBox="0 0 18 18" aria-hidden="true">
        <path d="M2 4.5h5l1.4 1.7H16v8.3H2zM2 7h14" />
      </svg>
    )
  }

  return (
    <svg className="tab-button__icon" viewBox="0 0 18 18" aria-hidden="true">
      <rect x="2" y="4" width="14" height="10" rx="1" />
      <path d="m3 5 6 5 6-5" />
    </svg>
  )
}

function SocialLinks({ theme, labels }) {
  const [copied, setCopied] = useState(false)
  const copyTimer = useRef(null)

  useEffect(() => () => clearTimeout(copyTimer.current), [])

  async function copyToClipboard(value) {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      // Sin portapapeles disponible no marcamos "copiado": el correo queda a la
      // vista y se puede seleccionar a mano.
      return
    }
    setCopied(true)
    clearTimeout(copyTimer.current)
    copyTimer.current = setTimeout(() => setCopied(false), 1800)
  }

  return (
    <nav className="social-links" aria-label={labels.socialLabel}>
      {socialNetworks.map((network) => {
        const icon = network.asset ? (
          <img src={assetPath(network.asset, theme)} alt="" width={network.width} height="20" />
        ) : (
          <InstagramIcon />
        )

        if (network.copy) {
          return (
            <button
              key={network.name}
              className="social-links__item"
              type="button"
              onClick={() => copyToClipboard(network.copy)}
              aria-label={`${labels.copyEmail}: ${network.label}`}
            >
              {icon}
              <span>{copied ? labels.copied : network.label}</span>
            </button>
          )
        }

        return (
          <a
            key={network.name}
            className="social-links__item"
            href={network.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`${network.name}: ${network.label}`}
          >
            {icon}
            <span>{network.label}</span>
          </a>
        )
      })}
    </nav>
  )
}

function Skill({ name, theme, motion }) {
  function randomizeMotion(event) {
    const element = event.currentTarget
    const angle = Math.random() * Math.PI * 2
    const distance = 5 + (Math.random() * 6)
    const x = Math.cos(angle) * distance
    const y = Math.sin(angle) * distance
    const rotate = -4 + (Math.random() * 8)
    const arcRotate = -5 + (Math.random() * 10)
    const arcScale = 0.96 + (Math.random() * 0.1)

    element.style.setProperty('--skill-x', `${x.toFixed(2)}px`)
    element.style.setProperty('--skill-y', `${y.toFixed(2)}px`)
    element.style.setProperty('--skill-rotate', `${rotate.toFixed(2)}deg`)
    element.style.setProperty('--skill-scale', (0.99 + (Math.random() * 0.05)).toFixed(3))
    element.style.setProperty('--arc-x', `${(-x * 0.55).toFixed(2)}px`)
    element.style.setProperty('--arc-y', `${(-y * 0.35).toFixed(2)}px`)
    element.style.setProperty('--arc-rotate', `${arcRotate.toFixed(2)}deg`)
    element.style.setProperty('--arc-scale', arcScale.toFixed(3))
    element.style.setProperty('--arc-skew', `${(-3 + (Math.random() * 6)).toFixed(2)}deg`)
  }

  return (
    <div
      className={`skill-item skill-item--motion-${motion}${name.length > 20 ? ' skill-item--long' : ''}`}
      onPointerEnter={randomizeMotion}
    >
      <svg className="skill-arc" viewBox="0 0 100 50" aria-hidden="true">
        <path d="M2 50C2 23.49 23.49 2 50 2s48 21.49 48 48" />
      </svg>
      <span>{name}</span>
    </div>
  )
}

function ProjectCard({ project, language }) {
  const host = project.url ? new URL(project.url).hostname : null
  return (
    <article className={`project-card ${project.layout}`}>
      <div className="project-card__media" aria-hidden="true">
        {project.image && <img src={project.image} alt="" loading="lazy" />}
      </div>
      <div className="project-card__content">
        <h3>
          <span className="project-card__prompt" aria-hidden="true">&gt;</span>
          {project.url ? (
            <a href={project.url} target="_blank" rel="noreferrer">
              <span className="project-card__name">{project.name}</span>
              <span className="project-card__host">({host})</span>
            </a>
          ) : (
            <span className="project-card__name">{project.name}</span>
          )}
        </h3>
        {project.summary && <p className="project-card__summary">{project.summary[language]}</p>}
        <ul>
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = window.localStorage.getItem('portfolio-theme')
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  const [language, setLanguage] = useState(() => window.localStorage.getItem('portfolio-language') || 'es')
  const [activeTab, setActiveTab] = useState('skills')
  const [formStatus, setFormStatus] = useState('')
  const [languageOpen, setLanguageOpen] = useState(false)
  const tabPanelRef = useRef(null)
  const languageRef = useRef(null)
  const labels = copy[language]
  const skillRows = skillsByLanguage[language]

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = labels.locale
    window.localStorage.setItem('portfolio-language', language)
    setFormStatus('')
  }, [language, labels.locale])

  useEffect(() => {
    if (tabPanelRef.current) tabPanelRef.current.scrollTop = 0
  }, [activeTab])

  useEffect(() => {
    if (!languageOpen) return undefined
    function handlePointerDown(event) {
      if (!languageRef.current?.contains(event.target)) setLanguageOpen(false)
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setLanguageOpen(false)
        languageRef.current?.querySelector('.language-select__trigger')?.focus()
      }
    }
    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [languageOpen])

  function selectTab(tab, preserveViewport = true) {
    const scrollPosition = window.scrollY
    setActiveTab(tab)
    setFormStatus('')
    if (preserveViewport) {
      window.requestAnimationFrame(() => window.scrollTo({ top: scrollPosition, behavior: 'instant' }))
    }
  }

  function handleTabKeyDown(event) {
    const currentIndex = tabOrder.indexOf(activeTab)
    let nextIndex = currentIndex
    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabOrder.length
    if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + tabOrder.length) % tabOrder.length
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = tabOrder.length - 1
    if (nextIndex !== currentIndex) {
      event.preventDefault()
      const nextTab = tabOrder[nextIndex]
      selectTab(nextTab)
      document.getElementById(`tab-${nextTab}`)?.focus()
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    setFormStatus(labels.status)
  }

  return (
    <div className="site" data-theme={theme}>
      <header className="page-shell site-header">
        <div className="profile-controls">
          <button
            className="theme-toggle"
            type="button"
            onClick={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}
            aria-label={theme === 'light' ? labels.themeDark : labels.themeLight}
            aria-pressed={theme === 'dark'}
          >
            <img className="theme-toggle__ring" src={assetPath('theme-ring', theme)} alt="" />
            <img className="theme-toggle__icon" src={assetPath('theme-icon', theme)} alt="" />
          </button>
          <a
            className="art-link"
            href="https://wilsonreategui.com"
            target="_blank"
            rel="noreferrer"
            aria-label={labels.artLinkLabel}
            title={labels.artLinkLabel}
          >
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <circle cx="8.5" cy="11.5" r="6" />
              <path d="M2.5 11.5h12" />
              <path d="M8.5 5.5c2.1 1.9 3.2 3.9 3.2 6s-1.1 4.1-3.2 6c-2.1-1.9-3.2-3.9-3.2-6s1.1-4.1 3.2-6Z" />
              <path className="art-link__arrow" d="M14.5 5.5 18.2 1.8M14.1 1.8h4.1v4.1" />
            </svg>
          </a>
          <div className="language-select" ref={languageRef}>
            <button
              className="language-select__trigger"
              type="button"
              aria-label={labels.languageLabel}
              aria-haspopup="listbox"
              aria-expanded={languageOpen}
              onClick={() => setLanguageOpen((open) => !open)}
            >
              <LanguageFlag code={language} />
              <span>{language}</span>
              <svg className="language-select__chevron" viewBox="0 0 10 10" aria-hidden="true">
                <path d="M1.5 4 5 7.5 8.5 4" />
              </svg>
            </button>
            {languageOpen && (
              <ul className="language-select__list" role="listbox" aria-label={labels.languageLabel}>
                {languageOptions.map((option) => (
                  <li key={option.code} role="none">
                    <button
                      className="language-select__option"
                      type="button"
                      role="option"
                      aria-selected={language === option.code}
                      onClick={() => {
                        setLanguage(option.code)
                        setLanguageOpen(false)
                        languageRef.current?.querySelector('.language-select__trigger')?.focus()
                      }}
                    >
                      <LanguageFlag code={option.code} />
                      <span>{option.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="hero">
          <aside className="hero__profile">
            <img className="hero__avatar" src={assetPath('avatar', theme)} alt={labels.avatarAlt} />
          </aside>

          <div className="hero__content">
            <h1 className="hero-title">
              <span className="hero-title__greeting">{labels.greeting}</span>
              <span className="hero-title__identity">
                <span className="hero-title__introduction">{labels.introduction}</span>{' '}
                <span className="hero-title__name">Wilson Reátegui</span>
              </span>
            </h1>
            <p>{labels.introBefore}<strong>{labels.introHighlight}</strong>{labels.introAfter}</p>
            <p>{labels.specialtyBefore}<strong>{labels.specialtyHighlight}</strong>{labels.specialtyAfter}</p>
            <p>{labels.workBefore}<strong>{labels.workHighlight}</strong>{labels.workAfter}</p>
          </div>
        </div>
      </header>

      <main className="page-shell content-column tab-workspace" id="tabs">
        <div className="tabs-card" data-active-tab={activeTab}>
          <div className="tabs" role="tablist" aria-label={language === 'es' ? 'secciones del portafolio' : 'portfolio sections'} onKeyDown={handleTabKeyDown}>
            {tabOrder.map((tab) => (
              <button
                className="tab-button"
                id={`tab-${tab}`}
                key={tab}
                type="button"
                role="tab"
                aria-selected={activeTab === tab}
                aria-controls={`panel-${tab}`}
                tabIndex={activeTab === tab ? 0 : -1}
                onClick={() => selectTab(tab)}
              >
                <span>{labels.tabs[tab]}</span>
                <TabIcon tab={tab} />
              </button>
            ))}
          </div>

          <section ref={tabPanelRef} className="tab-panel" id={`panel-${activeTab}`} role="tabpanel" aria-labelledby={`tab-${activeTab}`} tabIndex="0">
            {activeTab === 'skills' && (
              <div className="skills" role="list">
                {skillRows.map((row, rowIndex) => (
                  <div className={`skills__row skills__row--${row.length === 1 ? 'single' : 'pair'}`} key={rowIndex} role="presentation">
                    {row.map((skill, skillIndex) => (
                      <div role="listitem" key={skill}>
                        <Skill
                          name={skill}
                          theme={theme}
                          motion={skillRows.slice(0, rowIndex).flat().length + skillIndex + 1}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="projects">
                {projects.map((project) => (
                  <ProjectCard key={project.name} project={project} language={language} />
                ))}
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="contact-panel">
                <p className="contact-intro">
                  {labels.contactBefore}<strong>{labels.contactHighlight}</strong>{labels.contactAfter}
                </p>
                <form className="contact-form" onSubmit={handleSubmit}>
                  <label>{labels.name}<input name="name" type="text" autoComplete="name" required /></label>
                  <label>{labels.email}<input name="email" type="email" autoComplete="email" required /></label>
                  <label className="contact-form__message">{labels.message}<textarea name="message" rows="5" required /></label>
                  <button type="submit">{labels.send}</button>
                  <p className="form-status" aria-live="polite">{formStatus}</p>
                </form>
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="page-shell footer content-column">
        <p className="farewell">{labels.farewell}</p>
        <SocialLinks theme={theme} labels={labels} />
      </footer>
    </div>
  )
}

export default App
