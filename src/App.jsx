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
    name: 'sonivium',
    audio: {
      src: '/assets/complex.wav',
      // Picos reales del wav, medidos una vez y guardados acá. Dibujar la onda en vivo
      // obligaría a bajar el archivo entero al cargar la página; así el audio recién se
      // descarga cuando alguien le da play y la onda ya está dibujada desde el inicio.
      peaks: [
        0.68, 0.75, 0.61, 0.64, 0.73, 0.6, 0.69, 0.66, 0.65, 0.5,
        0.51, 0.5, 0.47, 0.4, 0.38, 0.37, 0.29, 0.28, 0.37, 0.2,
        0.27, 0.24, 0.29, 0.3, 0.46, 0.45, 0.61, 0.47, 0.55, 0.65,
        0.65, 0.59, 0.65, 0.88, 0.69, 0.84, 0.85, 0.72, 1, 0.68,
      ],
    },
    summary: {
      es: 'sonificación con datos solares: información en formato FITS, convertidas en sonido con python.',
      en: 'solar data sonification: jsoc series in fits format, from the hmi instrument, turned into sound with python.',
    },
    tags: ['python', 'jsoc', 'fits', 'hmi', 'audio', 'wav'],
    layout: 'project-card--solo',
  },
  {
    name: 'personal web',
    url: 'https://wilsonreategui.com',
    // Si el archivo no existe todavía, el bloque cae al color sólido de --media.
    image: '/assets/personal-web.png',
    summary: {
      es: 'construido a mano. sin frameworks, sin build. routing, caché y persistencia hechos desde cero. Estilo Retro Terminal.',
      en: 'personal site with no framework or build. hand-rolled router with fetch and caching, persistent theme, terminal effects.',
    },
    // El "> " del prompt no va en el dato: desalinea la columna. Lo pone el css.
    tags: ['html', 'css', 'javascript', 'svg', 'localstorage', 'github pages'],
    layout: 'project-card--solo',
  },
]

// Recortada y reescalada a 360px desde la foto original: a 94px de pantalla es
// resolución de sobra incluso en retina, y evita mandar los 4.7MB del jpg de cámara.
const profilePhoto = '/assets/perfil-2.jpg'

// Cada hover elige uno de estos al azar y lo escribe en el marco de la foto; el css
// tiene una regla por nombre. Son todos de una sola propiedad para que no se peleen.
const avatarHoverEffects = ['zoom', 'tilt', 'sway', 'pop', 'tone']

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
    avatarAlt: 'foto de perfil de Wilson Reátegui',
    greeting: '> hola!',
    introduction: '> mi nombre es',
    introBefore: '# ',
    introHighlight: 'programador senior',
    introAfter: ' que vive en Lima, Perú',
    workBefore: '# llevo trabajando 4 años como analista de sistemas en ',
    workHighlight: 'Total Servicios Financieros',
    workAfter: ', una empresa dedicada a la banca de productos como leasing y factoring',
    specialtyBefore: '# me especializo en el ',
    specialtyHighlight: 'diseño, desarrollo y gestión de software',
    specialtyAfter: ', utilizando tecnologías modernas y minimalistas, siguiendo buenas prácticas de desarrollo para crear proyectos eficientes y escalables',
    tabs: { skills: 'skills', projects: 'proyectos', contact: 'contacto' },
    contactBefore: 'Si te gusta mi trabajo, ',
    contactHighlight: 'escríbeme.',
    contactAfter: 'Podemos colaborar en un proyecto.',
    name: 'nombre:',
    email: 'email:',
    message: 'mensaje:',
    send: 'enviar',
    status: '¡gracias! tu mensaje está listo para ser enviado.',
    socialText: 'también puedes encontrarme por estos medios:',
    // Acá el "#" va en el texto: el css solo lo inyecta en la fila de links.
    farewell: '# nos vemos pronto!',
    socialLabel: 'redes sociales',
    copyEmail: 'copiar correo',
    copied: 'copiado!',
    playAudio: 'reproducir el audio del proyecto',
    pauseAudio: 'pausar el audio del proyecto',
    goProject: 'ir',
  },
  en: {
    locale: 'en',
    themeLight: 'enable light mode',
    themeDark: 'enable dark mode',
    languageLabel: 'select language',
    artLink: 'arte',
    artLinkLabel: 'visit Wilson Reátegui art',
    avatarAlt: 'profile photo of Wilson Reátegui',
    greeting: '> hi!',
    introduction: '> my name is',
    introBefore: '# a ',
    introHighlight: 'senior developer',
    introAfter: ' based in Lima, Perú',
    workBefore: '# i currently work as a systems analyst at ',
    workHighlight: 'Total Servicios Financieros',
    workAfter: ', a company focused on financial products such as leasing and factoring',
    specialtyBefore: '# i specialize in ',
    specialtyHighlight: 'software design, development, and management',
    specialtyAfter: ', using modern, minimal technologies and development best practices to create efficient, scalable projects',
    tabs: { skills: 'skills', projects: 'projects', contact: 'contact' },
    contactBefore: 'if you like my work, ',
    contactHighlight: 'send me a message.',
    contactAfter: 'We can collaborate on a project.',
    name: 'name:',
    email: 'email:',
    message: 'message:',
    send: 'send',
    status: 'thank you! your message is ready to be sent.',
    socialText: 'you can also find me here:',
    farewell: '# see you soon!',
    socialLabel: 'social networks',
    copyEmail: 'copy email',
    copied: 'copied!',
    playAudio: 'play the project audio',
    pauseAudio: 'pause the project audio',
    goProject: 'go',
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
      {/* En flujo y no como ::before: así se alinea por línea base con los chips
          sin depender de un top calculado a mano. */}
      <span className="social-links__prompt" aria-hidden="true">#</span>
      {socialNetworks.map((network) => {
        // Como máscara y no como <img>: el asset aporta la silueta y el color sale de
        // currentColor, así el icono se tiñe en el hover igual que el texto.
        const icon = network.asset ? (
          <span
            className="social-links__icon"
            style={{
              '--icon-mask': `url("${assetPath(network.asset, theme)}")`,
              width: `${((network.width * 11) / 20).toFixed(2)}px`,
            }}
            aria-hidden="true"
          />
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

// Reproductor propio y no <audio controls>: el nativo mide 200px de ancho como mínimo y
// no entra en el tercio del card, aparte de que cada navegador lo dibuja a su manera.
function AudioPreview({ audio, labels }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  function toggle() {
    const element = audioRef.current
    if (!element) return
    // El estado no se toca acá: lo mueven onPlay y onPause, así queda igual de fiel si
    // el audio se detiene solo al terminar o si el navegador rechaza el play.
    if (element.paused) element.play().catch(() => { })
    else element.pause()
  }

  return (
    <div className="audio-preview">
      <button
        className="audio-preview__toggle"
        type="button"
        onClick={toggle}
        aria-label={playing ? labels.pauseAudio : labels.playAudio}
      >
        {playing ? (
          <svg viewBox="0 0 18 18" aria-hidden="true">
            <rect x="4.5" y="3.5" width="3.5" height="11" rx="0.5" />
            <rect x="10" y="3.5" width="3.5" height="11" rx="0.5" />
          </svg>
        ) : (
          <svg viewBox="0 0 18 18" aria-hidden="true">
            <path d="M5.5 3.4 14.6 9l-9.1 5.6z" />
          </svg>
        )}
      </button>

      {/* Decorativa: el progreso audible ya lo lleva el propio audio y el botón anuncia
          su estado, así que para un lector de pantalla esto es ruido. */}
      <div className="audio-preview__wave" aria-hidden="true">
        {audio.peaks.map((peak, index) => (
          <span
            key={index}
            className="audio-preview__bar"
            data-played={index / audio.peaks.length < progress}
            // Piso de 12%: los tramos callados igual dejan su marca y la onda no se corta.
            style={{ height: `${Math.max(12, Math.round(peak * 100))}%` }}
          />
        ))}
      </div>

      <audio
        ref={audioRef}
        src={audio.src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false)
          setProgress(0)
        }}
        onTimeUpdate={(event) => {
          const { currentTime, duration } = event.currentTarget
          setProgress(duration ? currentTime / duration : 0)
        }}
      />
    </div>
  )
}

function ProjectCard({ project, language, labels }) {
  const host = project.url ? new URL(project.url).hostname : null

  // Sin nada de js para las animaciones, a propósito. Por acá pasaron un restartDrift que
  // rebobinaba la fase de los bucles, un data-settling que sostenía el montaje hasta el
  // final y un data-held que soltaba la tarjeta en el primer cuadro; los tres producían
  // saltos, porque cualquier cosa que mueva una pieza fuera de la interpolación puede
  // caer en un momento en que se vea. Ahora el gesto entero es css interpolando entre dos
  // estados, que por definición arranca del valor actual y no puede dar un salto.
  return (
    <article className={`project-card ${project.layout}`}>
      {/* Sin aria-hidden cuando lleva audio: adentro hay un botón, y esconderlo del
          árbol de accesibilidad dejaría un control enfocable que no se anuncia. */}
      <div className="project-card__media" aria-hidden={project.audio ? undefined : true}>
        {project.audio ? (
          <AudioPreview audio={project.audio} labels={labels} />
        ) : (
          project.image && <img src={project.image} alt="" loading="lazy" />
        )}
        {/* Atajo visual sobre la foto. Fuera del tab y dentro de una caja aria-hidden a
            propósito: lleva a la misma url que el título, así que por teclado y por
            lector de pantalla el camino sigue siendo el enlace del título en vez de
            toparse dos veces con el mismo destino. */}
        {project.url && project.image && (
          <a
            className="project-card__go"
            href={project.url}
            target="_blank"
            rel="noreferrer"
            tabIndex={-1}
            aria-label={labels.goProject}
          >
            <span className="project-card__go-label">
              <svg className="project-card__go-icon" viewBox="0 0 18 18" aria-hidden="true">
                <path d="M11 3.6h3.4V7" />
                <path d="M14.4 3.6 9 9" />
                <path d="M12.6 10.4v3.9H3.7V5.4h3.9" />
              </svg>
            </span>
          </a>
        )}
      </div>
      {/* Cada pieza va envuelta en su propia capa: la de fuera flota en bucle y la de
          dentro guarda el desencaje que el hover deshace. Con las dos cosas en el mismo
          transform la animación le ganaría a la propiedad y no habría montaje. */}
      <div className="project-card__content">
        <div className="project-card__shard project-card__shard--title">
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
        </div>
        {project.summary && (
          <div className="project-card__shard project-card__shard--summary">
            <p className="project-card__summary">{project.summary[language]}</p>
          </div>
        )}
        <div className="project-card__shard project-card__shard--tags">
          <ul>
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
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
  const [avatarEffect, setAvatarEffect] = useState(null)
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
            {/* El efecto se sortea al entrar el puntero y se borra al salir: limpiarlo es
                lo que deja que la animación vuelva a correr en el siguiente hover, y el
                filter descarta el actual para que dos pasadas seguidas no repitan. */}
            <div
              className="hero__avatar"
              data-hover-effect={avatarEffect ?? undefined}
              onPointerEnter={() =>
                setAvatarEffect((current) => {
                  const options = avatarHoverEffects.filter((effect) => effect !== current)
                  return options[Math.floor(Math.random() * options.length)]
                })
              }
              onPointerLeave={() => setAvatarEffect(null)}
            >
              <img className="hero__photo" src={profilePhoto} alt={labels.avatarAlt} />
            </div>
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
                    {row.map((skill, skillIndex) => {
                      // Posición dentro de la rejilla, no dentro de la fila: con ella el css
                      // le da a cada ficha su propio motivo de hover y su propia deriva, así
                      // que ninguna repite el movimiento de otra.
                      const position = skillRows.slice(0, rowIndex).flat().length + skillIndex + 1
                      return (
                        <div className={`skill-slot skill-slot--${position}`} role="listitem" key={skill}>
                          <Skill name={skill} theme={theme} motion={position} />
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="projects">
                {projects.map((project) => (
                  <ProjectCard key={project.name} project={project} language={language} labels={labels} />
                ))}
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="contact-panel">
                <div className="contact-intro">
                  {/* Dos capas por globo: la de fuera flota en bucle y la de dentro
                      reacciona al hover. Con una sola, la animación se queda con el
                      transform y el hover no se vería. */}
                  <p className="contact-intro__line">
                    <span className="contact-bubble">
                      <span className="contact-bubble__body">
                        {labels.contactBefore}<strong>{labels.contactHighlight}</strong>
                      </span>
                    </span>
                  </p>
                  <p className="contact-intro__line">
                    <span className="contact-bubble">
                      <span className="contact-bubble__body">{labels.contactAfter}</span>
                    </span>
                  </p>
                </div>
                <form className="contact-form" onSubmit={handleSubmit}>
                  <label>{labels.name}<input name="name" type="text" autoComplete="name" required /></label>
                  <label>{labels.email}<input name="email" type="email" autoComplete="email" required /></label>
                  <label className="contact-form__message">{labels.message}<textarea name="message" rows="5" required /></label>
                  <button type="submit">
                    <span>{labels.send}</span>
                    <svg className="contact-form__send-icon" viewBox="0 0 18 18" aria-hidden="true">
                      <path d="M2.2 9 15.8 3.2 10.6 15.4 8.1 10.6 2.2 9Z" />
                      <path d="M8.1 10.6 15.8 3.2" />
                    </svg>
                  </button>
                  <p className="form-status" aria-live="polite">{formStatus}</p>
                </form>
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="page-shell footer content-column">
        <SocialLinks theme={theme} labels={labels} />
        <p className="farewell">{labels.farewell}</p>
        <p className="footer-exit">
          {/* Como string de JS: un ">" suelto en el texto de JSX dispara
              react/no-unescaped-entities. */}
          {'# exit'}
          <span className="terminal-caret" aria-hidden="true" />
        </p>
      </footer>
    </div>
  )
}

export default App
