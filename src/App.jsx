import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  ArrowUp,
  ArrowUpRight,
  ChevronRight,
  Sun,
  Moon,
  Smartphone,
  Globe,
  FileText,
  Database,
  Terminal as TerminalIcon,
  Monitor,
  Sparkles,
  FlaskConical,
  GraduationCap,
} from 'lucide-react';

/* Critically damped by default - graceful, never distracting. Bounce is
   reserved for motion the user's own gesture set off. */
const SPRING = { type: 'spring', bounce: 0, duration: 0.5 };
const SPRING_QUICK = { type: 'spring', bounce: 0, duration: 0.35 };

// Self-hosted so the CV is always current, crawlable, and on his own domain.
const RESUME_URL = '/cv.html';
const EMAIL = 'andre.novais.emiliano@gmail.com';
const GITHUB_URL = 'https://github.com/andremiliano';
const LINKEDIN_URL = 'https://www.linkedin.com/in/andremiliano/';

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { name: 'About', to: 'about' },
  { name: 'Experience', to: 'experience' },
  { name: 'Skills', to: 'skills' },
  { name: 'Projects', to: 'projects' },
  { name: 'Contact', to: 'contact' },
];

// Named clients carry more weight than a count of them.
const BRANDS = ['Met Office', 'Rolls-Royce', 'River Island', 'Iceland', 'American Golf'];

const EXPERIENCE = [
  {
    role: 'Senior Developer',
    company: 'Calvium',
    period: 'Jan 2024 - Present · Remote',
    points: [
      'Health sector: architecting and developing React Native applications for iOS and Android, ensuring high-performance UI and data handling for regulated healthcare environments.',
      'Rolls-Royce: building bespoke internal tools in Nuxt, PrimeVue and TypeScript to streamline aerospace engineering workflows.',
      'Met Office Weather Forecast: contributing to the national weather app using SwiftUI, ensuring high-concurrency data reliability and WCAG accessibility for millions of users.',
      'Partnered closely with the Android engineering team on feature parity and UI/UX consistency, and optimised automated build and deployment pipelines using Bitrise.',
    ],
  },
  {
    role: 'Founder & Lead Developer',
    company: 'FryAI - AI-Powered Air Fryer Assistant',
    period: 'Sep 2025 - Present',
    link: 'https://www.fryai.app',
    points: [
      'Engineered a cross-platform React Native application for iOS and Android, delivering a native-feeling experience on both.',
      'Evaluated and selected specific LLMs for recipe generation and cooking logic, balancing latency, cost and creative output.',
      'Leveraged AI tools across the full lifecycle, from initial UI/UX wireframes through to automated App Store metadata optimisation.',
      'Experimenting with agentic workflows to automate marketing tasks.',
    ],
  },
  {
    role: 'iOS Developer',
    company: 'VML Enterprise Solutions (formerly NN4M)',
    period: 'Apr 2022 - Jan 2024',
    points: [
      'Shipped features across major retail iOS apps including River Island, American Golf and the Iceland Bonus Card.',
      'Implemented Firebase Analytics for GA4 tracking and used the insights to redesign key e-commerce elements, directly improving UX and increasing client revenue.',
      'Collaborated in an agile team of Android and iOS developers, aligning strict design specifications to keep experiences unified across platforms.',
      'Executed continuous development cycles through two-week sprints, delivering regular, stable App Store releases.',
    ],
  },
];

const EDUCATION = [
  {
    degree: 'MSc Software Development',
    school: 'Coventry University',
    period: '2021 - 2022',
    note: 'Graduated with Distinction (1st). Dissertation: comparing UIKit and SwiftUI for commercial and individual use.',
  },
  {
    degree: 'BSc Computer Science',
    school: 'Coventry University',
    period: '2018 - 2021',
    note: 'Graduated with First-Class Honours (1st). Dissertation: comparing native and cross-platform mobile development.',
  },
];

const STACK = [
  'Swift', 'SwiftUI', 'UIKit', 'React Native', 'Expo', 'Vue', 'Nuxt', 'PrimeVue',
  'TypeScript', 'Tailwind', 'PostgreSQL', 'Drizzle', 'Firebase', 'Supabase',
  'Playwright', 'Bun', 'CI/CD',
];

const SKILLS = [
  { icon: Smartphone, title: 'Mobile Dev', text: 'Swift, SwiftUI, UIKit, React Native, Expo' },
  { icon: Monitor, title: 'Full Stack Web', text: 'TypeScript, Vue, Nuxt, PrimeVue, Tailwind, Bun' },
  { icon: Database, title: 'Backend & DB', text: 'PostgreSQL, Firebase, Supabase, SQL' },
  { icon: Sparkles, title: 'AI & LLMs', text: 'LLM integration, prompt engineering, AI-assisted development' },
  { icon: FlaskConical, title: 'Testing', text: 'Playwright for end-to-end, Bun test for unit, previously Cypress' },
  { icon: TerminalIcon, title: 'Practices', text: 'CI/CD (Bitrise, Fastlane, Jenkins), Agile, WCAG accessibility, App Store deployment' },
];

// Seven shipped, professional projects. The university coursework was cut: it
// diluted the work that matters, and none of those links actually opened for a
// recruiter - the Coventry repos serve a login page and the Flask demo is a 404.
const PROJECTS = [
  {
    featured: true,
    title: 'FryAI - AI Air Fryer Assistant',
    desc: 'Founded and shipped an AI-powered cooking assistant end to end. Selected and integrated LLMs for recipe generation and cooking logic, balancing latency, cost and creative output, from UI/UX wireframes through App Store deployment.',
    tech: ['React Native', 'Expo', 'LLMs', 'Prompt Engineering'],
    link: 'https://www.fryai.app',
    icon: Sparkles,
  },
  {
    title: 'Met Office Weather',
    desc: 'Contributed to the national weather app used by 3+ million people, building complex SwiftUI views with high-concurrency data reliability and WCAG-compliant accessibility.',
    tech: ['SwiftUI', 'Bitrise', 'WCAG'],
    link: 'https://apps.apple.com/gb/app/met-office-weather-forecast/id1068146838',
    icon: Smartphone,
  },
  {
    title: 'Enterprise Solutions for Rolls-Royce',
    desc: 'Architected full-stack dashboard and management solutions in Nuxt and PrimeVue, delivering robust internal tools for complex data analysis and visualization.',
    tech: ['Nuxt', 'PrimeVue', 'TypeScript', 'PostgreSQL'],
    link: null,
    icon: Globe,
  },
  {
    title: 'Cross-Platform Client Apps',
    desc: 'Building performant, scalable mobile applications for a range of clients across iOS and Android with React Native and Expo.',
    tech: ['React Native', 'Expo', 'NativeWind'],
    link: null,
    icon: Smartphone,
  },
  {
    title: 'River Island App',
    desc: 'Shipped features for the River Island retail iOS app in UIKit, working within MVC and MVVM architectures.',
    tech: ['UIKit', 'MVVM', 'Jenkins'],
    link: 'https://apps.apple.com/gb/app/river-island/id385441876',
    icon: Smartphone,
  },
  {
    title: 'Iceland Bonus Card',
    desc: 'Worked on features and bugs related to Scan and Go functionality, enhancing the in-store shopping experience for users.',
    tech: ['UIKit', 'MVVM', 'CMS'],
    link: 'https://apps.apple.com/gb/app/iceland-bonus-card/id1545925055',
    icon: Smartphone,
  },
  {
    title: 'American Golf',
    desc: 'Implemented custom fittings booking system for golf clubs and enhanced the account menu and Product Detail Pages (PDP).',
    tech: ['UIKit', 'MVVM', 'CMS'],
    link: 'https://apps.apple.com/gb/app/american-golf/id1471355600',
    icon: Smartphone,
  },
];

const STATS = [
  { value: '3M+', label: 'People using apps I’ve helped ship' },
  { value: '4+', label: 'Years shipping production apps' },
  { value: '5', label: 'App Store apps I’ve worked on' },
];

const CODE_LINES = [
  [['const ', 'kw'], ['developer', 'name'], [' = {', 'punc']],
  [['  mobile: ', 'punc'], ['["Swift", "React Native"]', 'str'], [',', 'punc']],
  [['  web: ', 'punc'], ['["Vue", "Nuxt", "Tailwind"]', 'str'], [',', 'punc']],
  [['  backend: ', 'punc'], ['["PostgreSQL", "Drizzle"]', 'str'], [',', 'punc']],
  [['  focus: ', 'punc'], ['"User Experience"', 'str']],
  [['};', 'punc']],
];

const TOKEN_CLASS = {
  kw: 'text-accent',
  name: 'text-primary font-medium',
  punc: 'text-tertiary',
  str: 'text-secondary',
};

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */

// Fade and rise. MotionConfig strips the transform under reduced motion,
// leaving a plain cross-fade.
const Reveal = ({ children, delay = 0, className = '' }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ ...SPRING, delay }}
  >
    {children}
  </motion.div>
);

const SectionTitle = ({ children, id }) => (
  <Reveal>
    <h2 id={id} className="type-title mb-10 md:mb-14">
      {children}
    </h2>
  </Reveal>
);

/* Filled pill - the primary action. */
const PrimaryButton = ({ as = 'button', className = '', children, ...props }) => {
  const Tag = motion[as] || motion.button;
  return (
    <Tag
      whileTap={{ scale: 0.97 }}
      transition={SPRING_QUICK}
      className={`inline-flex items-center justify-center gap-1.5 rounded-full bg-accent px-6 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-90 ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
};

/* ------------------------------------------------------------------ */
/* Theme                                                               */
/* ------------------------------------------------------------------ */

const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'system';
    return localStorage.getItem('ae-theme') || 'system';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'system') {
      root.removeAttribute('data-theme');
      localStorage.removeItem('ae-theme');
    } else {
      root.setAttribute('data-theme', theme);
      localStorage.setItem('ae-theme', theme);
    }
  }, [theme]);

  const toggle = useCallback(() => {
    const isDark =
      document.documentElement.getAttribute('data-theme') === 'dark' ||
      (!document.documentElement.getAttribute('data-theme') &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    setTheme(isDark ? 'light' : 'dark');
  }, []);

  return { theme, toggle };
};

const ThemeToggle = ({ onToggle }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const read = () =>
      setIsDark(
        document.documentElement.getAttribute('data-theme') === 'dark' ||
          (!document.documentElement.getAttribute('data-theme') &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', read);
    return () => {
      observer.disconnect();
      mq.removeEventListener('change', read);
    };
  }, []);

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      transition={SPRING_QUICK}
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light appearance' : 'Switch to dark appearance'}
      className="flex h-8 w-8 items-center justify-center rounded-full text-secondary transition-colors hover:bg-primary/5 hover:text-primary"
    >
      {isDark ? <Sun size={17} strokeWidth={1.8} /> : <Moon size={17} strokeWidth={1.8} />}
    </motion.button>
  );
};

/* ------------------------------------------------------------------ */
/* App                                                                 */
/* ------------------------------------------------------------------ */

function App() {
  const { toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      setShowTop(window.scrollY > 900);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveSection(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    );
    NAV_LINKS.forEach(({ to }) => {
      const el = document.getElementById(to);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const scrollToId = useCallback((id) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 68;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-canvas text-primary">
        <a
          href="#main"
          className="sr-only rounded-full bg-accent px-4 py-2 text-sm text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
        >
          Skip to content
        </a>

        {/* ---------------- Navigation ---------------- */}
        {/* Translucent layer; content scrolls underneath. The separator
            appears only once there is content behind the bar. */}
        <header
          className={`material fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
            scrolled ? 'border-separator/80' : 'border-transparent'
          }`}
        >
          <nav className="mx-auto flex h-[52px] max-w-5xl items-center justify-between px-5 sm:px-8" aria-label="Primary">
            <button
              onClick={() => scrollToId('home')}
              className="text-[15px] font-semibold tracking-[-0.01em] transition-opacity hover:opacity-70"
            >
              André Emiliano
            </button>

            <div className="hidden items-center gap-1 md:flex">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToId(link.to)}
                  className={`rounded-full px-3.5 py-1.5 text-[13px] transition-colors ${
                    activeSection === link.to
                      ? 'text-primary'
                      : 'text-secondary hover:text-primary'
                  }`}
                >
                  {link.name}
                </button>
              ))}
              <div className="mx-2 h-4 w-px bg-separator" />
              <ThemeToggle onToggle={toggle} />
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="pressable ml-2 rounded-full bg-accent px-4 py-1.5 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
              >
                Resume
              </a>
            </div>

            <div className="flex items-center gap-1 md:hidden">
              <ThemeToggle onToggle={toggle} />
              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                className="flex h-8 w-8 items-center justify-center rounded-full text-primary"
              >
                {menuOpen ? <X size={20} strokeWidth={1.8} /> : <Menu size={20} strokeWidth={1.8} />}
              </button>
            </div>
          </nav>
        </header>

        {/* Mobile sheet - a sibling of the header, not a child: a surface
            nested inside another backdrop-filtered element has no backdrop
            of its own to blur, and the page shows straight through it.
            The scrim dims the content behind and dismisses on tap. */}
        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.div
                key="scrim"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={SPRING_QUICK}
                onClick={() => setMenuOpen(false)}
                aria-hidden="true"
                className="fixed inset-0 z-30 bg-black/25 md:hidden"
              />
              <motion.div
                key="sheet"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={SPRING_QUICK}
                className="material-thick fixed inset-x-0 top-[52px] z-40 border-b border-separator/80 px-5 pb-6 pt-2 md:hidden"
              >
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => {
                      setMenuOpen(false);
                      requestAnimationFrame(() => scrollToId(link.to));
                    }}
                    className="flex w-full items-center justify-between border-b border-separator/60 py-4 text-left text-[19px] tracking-[-0.01em]"
                  >
                    {link.name}
                    <ChevronRight size={18} className="text-tertiary" strokeWidth={1.8} />
                  </button>
                ))}
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-between py-4 text-[19px] tracking-[-0.01em] text-accent"
                >
                  Resume
                  <ArrowUpRight size={18} strokeWidth={1.8} />
                </a>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <main id="main" className="mx-auto max-w-5xl px-5 sm:px-8">
          {/* ---------------- Hero ---------------- */}
          <section id="home" className="pb-20 pt-32 sm:pt-40" aria-label="Introduction">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={SPRING}
            >
              <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 type-caption text-secondary">
                <span className="h-1.5 w-1.5 rounded-full bg-[#30D158]" />
                Available for remote opportunities - UK based
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING, delay: 0.05 }}
              className="type-display max-w-3xl"
            >
              André Emiliano
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING, delay: 0.1 }}
              className="type-display mt-1 max-w-3xl text-secondary"
            >
              I build digital experiences.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING, delay: 0.15 }}
              className="type-subhead mt-8 max-w-2xl text-secondary"
            >
              I build software that serves millions - from national weather systems and aerospace
              engineering tools to healthcare mobile apps and AI-powered consumer products, always
              looking for the best UX. Currently at{' '}
              <span className="text-primary">Calvium</span>, delivering for clients like{' '}
              <span className="text-primary">Rolls-Royce</span> and the{' '}
              <span className="text-primary">Met Office</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING, delay: 0.2 }}
              className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4"
            >
              <PrimaryButton onClick={() => scrollToId('projects')}>View my work</PrimaryButton>
              <a
                href={`mailto:${EMAIL}`}
                className="link-arrow inline-flex items-center gap-1 text-[15px] text-accent transition-opacity hover:opacity-80"
              >
                Get in touch
                <ChevronRight size={16} strokeWidth={2} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING, delay: 0.25 }}
              className="mt-10 flex items-center gap-5"
            >
              {[
                { href: GITHUB_URL, label: 'GitHub', Icon: Github },
                { href: LINKEDIN_URL, label: 'LinkedIn', Icon: Linkedin },
                { href: `mailto:${EMAIL}`, label: 'Email', Icon: Mail },
                { href: RESUME_URL, label: 'CV', Icon: FileText },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="text-tertiary transition-colors hover:text-primary"
                >
                  <Icon size={20} strokeWidth={1.7} />
                </a>
              ))}
            </motion.div>

            {/* Stack card - a quiet macOS window, no theatrics. */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING, delay: 0.3 }}
              className="card mt-16 overflow-hidden shadow-card"
            >
              <div className="flex items-center gap-2 border-b border-separator/70 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                <span className="h-3 w-3 rounded-full bg-[#28C840]" />
                <span className="ml-2 type-caption text-tertiary">developer.ts</span>
              </div>
              <div className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed sm:p-6">
                {CODE_LINES.map((line, li) => (
                  <motion.p
                    key={li}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 + li * 0.06 }}
                    className="whitespace-pre"
                  >
                    {line.map(([text, kind], ti) => (
                      <span key={ti} className={TOKEN_CLASS[kind]}>
                        {text}
                      </span>
                    ))}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          </section>

          {/* ---------------- Brands ---------------- */}
          <section className="border-t border-separator py-12" aria-label="Clients and products worked on">
            <Reveal>
              <p className="type-caption mb-6 text-tertiary">Work shipped for</p>
              <ul className="flex flex-wrap items-center gap-x-10 gap-y-4">
                {BRANDS.map((brand) => (
                  <li key={brand} className="type-subhead font-medium text-secondary">
                    {brand}
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>

          {/* ---------------- Stats ---------------- */}
          <section className="border-t border-separator py-16" aria-label="At a glance">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
              {STATS.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 0.06}>
                  <p className="type-title text-accent">{stat.value}</p>
                  <p className="type-body mt-1 text-secondary">{stat.label}</p>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ---------------- About ---------------- */}
          <section id="about" className="border-t border-separator py-20 md:py-28" aria-labelledby="about-title">
            <SectionTitle id="about-title">About</SectionTitle>

            <div className="grid gap-12 md:grid-cols-[1.6fr_1fr] md:gap-14">
              <div className="type-body space-y-5 text-secondary">
                <Reveal>
                  <p>
                    Hello! My name is Andre and I'm a software engineer based in the UK. My journey in
                    tech began with a curiosity for how things work behind the screen, which quickly
                    evolved into a passion for mobile development and software architecture.
                  </p>
                </Reveal>
                <Reveal delay={0.06}>
                  <p>
                    Recently, I've expanded my expertise beyond native iOS. As a key member of the team
                    at <span className="text-primary">Calvium</span>, I architect full-stack web
                    solutions for major clients like{' '}
                    <span className="text-primary">Rolls-Royce</span> using{' '}
                    <strong className="font-medium text-primary">Nuxt, PrimeVue, and Postgres</strong>. I
                    also help clients bring ideas to life on both iOS and Android using{' '}
                    <strong className="font-medium text-primary">React Native, Expo, and NativeWind</strong>.
                  </p>
                </Reveal>
                <Reveal delay={0.1}>
                  <p>
                    I'm also an advocate for AI-augmented development. I stay on top of the
                    latest models and tooling, and I'm deliberate about which ones actually hold up
                    in production, so I can deliver higher-quality code at an accelerated pace. I don't just use AI - I
                    architect systems that leverage it, most recently as founder of{' '}
                    <span className="text-primary">FryAI</span>, an AI-powered cooking assistant I
                    took from design to the App Store.
                  </p>
                </Reveal>
                <Reveal delay={0.14}>
                  <p>Here are a few technologies I've been working with recently:</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {STACK.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full bg-surface px-3 py-1.5 type-caption text-secondary"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>

              <Reveal delay={0.12}>
                <img
                  src="/images/profile.jpg"
                  alt="André Emiliano, Senior Developer, in a suit outdoors"
                  loading="lazy"
                  width="883"
                  height="900"
                  className="w-full max-w-xs rounded-2xl object-cover shadow-card md:max-w-none"
                />
              </Reveal>
            </div>
          </section>

          {/* ---------------- Experience ---------------- */}
          <section
            id="experience"
            className="border-t border-separator py-20 md:py-28"
            aria-labelledby="experience-title"
          >
            <SectionTitle id="experience-title">Experience</SectionTitle>

            <ol className="space-y-px">
              {EXPERIENCE.map((job, i) => (
                <Reveal key={job.company} delay={i * 0.06}>
                  <li className="border-t border-separator py-8 first:border-t-0 first:pt-0">
                    <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                      <div>
                        <h3 className="type-headline">{job.role}</h3>
                        {job.link ? (
                          <a
                            href={job.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-arrow type-body inline-flex items-center gap-1 text-accent transition-opacity hover:opacity-80"
                          >
                            {job.company}
                            <ArrowUpRight size={15} strokeWidth={2} />
                          </a>
                        ) : (
                          <p className="type-body text-accent">{job.company}</p>
                        )}
                      </div>
                      <p className="type-caption shrink-0 text-tertiary">{job.period}</p>
                    </div>
                    <ul className="space-y-2.5">
                      {job.points.map((point) => (
                        <li key={point} className="type-caption flex gap-3 text-secondary">
                          <span aria-hidden="true" className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-tertiary" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                </Reveal>
              ))}
            </ol>

            {/* Education */}
            <div className="mt-14">
              <Reveal>
                <h3 className="type-headline mb-6 flex items-center gap-2.5">
                  <GraduationCap size={20} strokeWidth={1.8} className="text-accent" />
                  Education
                </h3>
              </Reveal>
              <div className="grid gap-4 sm:grid-cols-2">
                {EDUCATION.map((item, i) => (
                  <Reveal key={item.degree} delay={i * 0.06}>
                    <div className="card h-full p-6">
                      <div className="mb-1 flex items-baseline justify-between gap-4">
                        <h4 className="type-headline">{item.degree}</h4>
                        <span className="type-caption shrink-0 text-tertiary">{item.period}</span>
                      </div>
                      <p className="type-body mb-2 text-accent">{item.school}</p>
                      <p className="type-caption text-secondary">{item.note}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ---------------- Skills ---------------- */}
          <section id="skills" className="border-t border-separator py-20 md:py-28" aria-labelledby="skills-title">
            <SectionTitle id="skills-title">Skills</SectionTitle>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SKILLS.map((skill, i) => (
                <Reveal key={skill.title} delay={i * 0.05}>
                  <div className="card h-full p-6">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <skill.icon size={20} strokeWidth={1.8} />
                    </div>
                    <h3 className="type-headline mb-1.5">{skill.title}</h3>
                    <p className="type-caption text-secondary">{skill.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ---------------- Projects ---------------- */}
          <section id="projects" className="border-t border-separator py-20 md:py-28" aria-labelledby="projects-title">
            <SectionTitle id="projects-title">Projects</SectionTitle>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PROJECTS.map((project, i) => {
                const Wrapper = project.link ? motion.a : motion.div;
                return (
                  <Wrapper
                    key={project.title}
                    {...(project.link
                      ? { href: project.link, target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ ...SPRING, delay: (i % 3) * 0.05 }}
                    whileHover={project.link ? { y: -4 } : undefined}
                    whileTap={project.link ? { scale: 0.985 } : undefined}
                    className={`card group flex h-full flex-col p-6 ${
                      project.featured ? 'sm:col-span-2 lg:col-span-2' : ''
                    } ${project.link ? 'cursor-pointer hover:shadow-lift' : ''}`}
                  >
                    <div className="mb-5 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                          <project.icon size={20} strokeWidth={1.8} />
                        </div>
                        {project.featured && (
                          <span className="rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-medium tracking-wide text-accent">
                            Featured
                          </span>
                        )}
                      </div>
                      {project.link && (
                        <ArrowUpRight
                          size={18}
                          strokeWidth={1.8}
                          className="text-tertiary transition-colors group-hover:text-accent"
                        />
                      )}
                    </div>
                    <h3 className="type-headline mb-2">{project.title}</h3>
                    <p className="type-caption mb-5 flex-grow text-secondary">{project.desc}</p>
                    <ul className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <li
                          key={t}
                          className="rounded-full bg-surface px-2.5 py-1 text-[11px] tracking-[0.01em] text-secondary"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </Wrapper>
                );
              })}
            </div>
          </section>

          {/* ---------------- Contact ---------------- */}
          <section
            id="contact"
            className="border-t border-separator py-24 text-center md:py-32"
            aria-labelledby="contact-title"
          >
            <Reveal>
              <h2 id="contact-title" className="type-display">
                Get in touch
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="type-subhead mx-auto mt-6 max-w-xl text-secondary">
                Always open for new opportunities. Whether you have a question or just want to say hi,
                my inbox is always open.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-10 flex flex-col items-center gap-5">
                <PrimaryButton as="a" href={`mailto:${EMAIL}`} className="px-8 py-3.5">
                  Say hello
                </PrimaryButton>
                <a
                  href={`mailto:${EMAIL}`}
                  className="type-caption text-tertiary transition-colors hover:text-accent"
                >
                  {EMAIL}
                </a>
              </div>
            </Reveal>
          </section>

          {/* ---------------- Footer ---------------- */}
          <footer className="border-t border-separator py-10">
            <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
              <p className="type-caption text-tertiary">
                Designed &amp; Built by André Emiliano - © {new Date().getFullYear()}
              </p>
              <div className="flex items-center gap-5">
                {[
                  { href: GITHUB_URL, label: 'GitHub', Icon: Github },
                  { href: LINKEDIN_URL, label: 'LinkedIn', Icon: Linkedin },
                  { href: `mailto:${EMAIL}`, label: 'Email', Icon: Mail },
                ].map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="text-tertiary transition-colors hover:text-primary"
                  >
                    <Icon size={18} strokeWidth={1.7} />
                  </a>
                ))}
              </div>
            </div>
          </footer>
        </main>

        {/* Scroll to top */}
        <AnimatePresence>
          {showTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileTap={{ scale: 0.92 }}
              transition={SPRING_QUICK}
              onClick={() => scrollToId('home')}
              aria-label="Scroll to top"
              className="material fixed bottom-7 right-7 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-separator/80 text-secondary shadow-float transition-colors hover:text-primary"
            >
              <ArrowUp size={18} strokeWidth={1.8} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}

export default App;
