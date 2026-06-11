import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValue,
  useMotionValueEvent,
  useInView,
  useReducedMotion,
} from 'framer-motion';
import Lenis from 'lenis';
import {
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  ArrowUp,
  ArrowUpRight,
  Smartphone,
  Globe,
  Server,
  FileText,
  Brain,
  BarChart,
  MessageSquare,
  ShoppingCart,
  Database,
  Terminal as TerminalIcon,
  Monitor,
} from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1];
const RESUME_URL = 'https://drive.google.com/file/d/1r0V_o4rNwFtaP_rZ7vdgI2uDxcu6_BdM/view?usp=sharing';
const EMAIL = 'andre.novais.emiliano@gmail.com';
const GITHUB_URL = 'https://github.com/andremiliano';
const LINKEDIN_URL = 'https://www.linkedin.com/in/andremiliano/';

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { name: 'About', to: 'about' },
  { name: 'Skills', to: 'skills' },
  { name: 'Projects', to: 'projects' },
  { name: 'Contact', to: 'contact' },
];

const MARQUEE_ITEMS = [
  'Swift', 'SwiftUI', 'UIKit', 'React Native', 'Expo', 'Vue', 'Nuxt',
  'TypeScript', 'Tailwind', 'PostgreSQL', 'Drizzle', 'Firebase', 'Supabase', 'CI/CD',
];

const SKILLS = [
  { icon: <Smartphone className="h-7 w-7" />, title: 'Mobile Dev', text: 'Swift, SwiftUI, UIKit, React Native, Expo' },
  { icon: <Monitor className="h-7 w-7" />, title: 'Full Stack Web', text: 'Vue, Nuxt, Typescript, Tailwind, HTML/CSS' },
  { icon: <Database className="h-7 w-7" />, title: 'Backend & DB', text: 'PostgreSQL, Firebase, Supabase, SQL' },
  { icon: <TerminalIcon className="h-7 w-7" />, title: 'DevOps', text: 'CI/CD, Fastlane, Bitrise, Jenkins' },
];

const PROJECTS = [
  {
    title: 'Enterprise Solutions for Rolls-Royce',
    desc: 'Architected full-stack dashboard and management solutions using modern web technologies, delivering robust internal tools for complex data analysis and visualization.',
    tech: ['Vue', 'Nuxt', 'PostgreSQL', 'Typescript', 'Tailwind'],
    link: null,
    icon: <Globe size={28} strokeWidth={1.5} />,
  },
  {
    title: 'Cross-Platform Client Apps',
    desc: 'Building performant, scalable mobile applications for various clients on both iOS and Android using the React Native and Expo.',
    tech: ['React Native', 'Expo', 'NativeWind'],
    link: null,
    icon: <Smartphone size={28} strokeWidth={1.5} />,
  },
  {
    title: 'Met Office Weather',
    desc: 'Contributed to a government weather app used by 3+ million people, building complex SwiftUI views with WCAG-compliant accessibility.',
    tech: ['SwiftUI', 'Bitrise', 'Accessibility'],
    link: 'https://apps.apple.com/gb/app/met-office-weather-forecast/id1068146838',
    icon: <Smartphone size={28} strokeWidth={1.5} />,
  },
  {
    title: 'River Island App',
    desc: 'Contributed to the success of major retail iOS apps using UIKit and implementing MVC and MVVM architectures.',
    tech: ['UIKit', 'MVVM', 'Jenkins'],
    link: 'https://apps.apple.com/gb/app/river-island/id385441876',
    icon: <Smartphone size={28} strokeWidth={1.5} />,
  },
  {
    title: 'Iceland Bonus Card',
    desc: 'Worked on features and bugs related to Scan and Go functionality, enhancing the in-store shopping experience for users.',
    tech: ['UIKit', 'MVVM', 'CMS'],
    link: 'https://apps.apple.com/gb/app/iceland-bonus-card/id1545925055',
    icon: <Smartphone size={28} strokeWidth={1.5} />,
  },
  {
    title: 'American Golf',
    desc: 'Implemented custom fittings booking system for golf clubs and enhanced the account menu and Product Detail Pages (PDP).',
    tech: ['UIKit', 'MVVM', 'CMS'],
    link: 'https://apps.apple.com/gb/app/american-golf/id1471355600',
    icon: <Smartphone size={28} strokeWidth={1.5} />,
  },
  {
    title: 'Secure Online System',
    desc: 'Flask API for an aircraft service company, developed and tested around security with various Web security aspects.',
    tech: ['Flask', 'SQLAlchemy', 'Security'],
    link: 'https://abcair.pythonanywhere.com/',
    icon: <Globe size={28} strokeWidth={1.5} />,
  },
  {
    title: 'Payment System API',
    desc: 'API for a payment system using Flask developed using TDD and Gang of Four design patterns.',
    tech: ['Flask', 'TDD', 'Patterns'],
    link: 'https://github.coventry.ac.uk/novaisea/Smart-Insurance.git',
    icon: <Server size={28} strokeWidth={1.5} />,
  },
  {
    title: 'Payroll System',
    desc: 'Payroll System for iOS developed in Swift where employers enter shifts and process payments.',
    tech: ['Swift', 'Firebase', 'UI Testing'],
    link: 'https://github.coventry.ac.uk/novaisea/PayrollSystem.git',
    icon: <Smartphone size={28} strokeWidth={1.5} />,
  },
  {
    title: 'Cross-platform Research',
    desc: 'Comparative research analyzing performance, code features, and costs between React Native, Swift, and Kotlin.',
    tech: ['React Native', 'Kotlin', 'Swift'],
    link: 'https://github.coventry.ac.uk/novaisea/SwiftApp-6001CEM',
    icon: <FileText size={28} strokeWidth={1.5} />,
  },
  {
    title: 'iOS Health App',
    desc: 'Health App with recipe suggestions, step tracking, goal setting, and BMI/Macro calculator using local storage and multiple APIs.',
    tech: ['Swift', 'MapKit', 'OpenWeather'],
    link: 'https://github.coventry.ac.uk/6002CEM-2021JANMAY/6002CEM-Andre_Emiliano_8916875',
    icon: <Smartphone size={28} strokeWidth={1.5} />,
  },
  {
    title: 'Insurance Cost ML',
    desc: 'Machine Learning algorithms to predict medical insurance costs using pre-processing, feature selection and extraction on datasets.',
    tech: ['Python', 'Pandas', 'ML'],
    link: 'https://drive.google.com/drive/folders/1RvWW7_XG_x__yy2a7gg6eO5Cc25lq5RW?usp=sharing',
    icon: <Brain size={28} strokeWidth={1.5} />,
  },
  {
    title: 'Ozone Visualization',
    desc: 'Big Data system that reads CBE data files to overlay ozone measurements on a Europe map, designed for color-blind accessibility.',
    tech: ['MATLAB', 'Big Data', 'Visualization'],
    link: 'https://drive.google.com/drive/folders/1DUxRFKFvd_LgwXduYDJh1YSf0_6XYPIK?usp=sharing',
    icon: <BarChart size={28} strokeWidth={1.5} />,
  },
  {
    title: 'Computer Reseller',
    desc: 'E-commerce website with user/admin accounts, inventory management, and promotional code functionality.',
    tech: ['HTML/CSS', 'JS', 'MySQL'],
    link: 'https://drive.google.com/drive/folders/1RS83YI6sqTHE7q0oKeiJ0oCQOsiNntwv?usp=sharing',
    icon: <ShoppingCart size={28} strokeWidth={1.5} />,
  },
  {
    title: 'Python ChatBot',
    desc: 'Interactive chatbot with features covering health, games, language, marketing, football and shopping.',
    tech: ['Python', 'NLP'],
    link: 'https://drive.google.com/open?id=1KsmuVk4ny9Fo19xYcYKptMyRte8XsN2u',
    icon: <MessageSquare size={28} strokeWidth={1.5} />,
  },
];

const STATS = [
  { value: 3, suffix: 'M+', label: 'users on apps I helped ship' },
  { value: 15, suffix: '', label: 'projects featured here' },
  { value: 6, suffix: '', label: 'major brands delivered for' },
];

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */

// Masked line reveal. `play` controls it imperatively (hero); omit for scroll-triggered.
// Viewport detection lives on the un-translated outer wrapper: the inner span starts
// fully outside the overflow-hidden clip, so observing it directly never intersects.
const Reveal = ({ children, delay = 0, play, className = '', innerClassName = '' }) => {
  const child = {
    hidden: { y: '115%' },
    visible: { y: '0%', transition: { duration: 0.9, ease: EASE, delay } },
  };
  const mode =
    play === undefined
      ? { initial: 'hidden', whileInView: 'visible', viewport: { once: true, margin: '-60px' } }
      : { initial: 'hidden', animate: play ? 'visible' : 'hidden' };
  return (
    <motion.span className={`block overflow-hidden ${className}`} {...mode}>
      <motion.span className={`block ${innerClassName}`} variants={child}>
        {children}
      </motion.span>
    </motion.span>
  );
};

const FadeIn = ({ children, delay = 0, y = 24, className = '', play }) => {
  const variants = {
    hidden: { opacity: 0, y },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay } },
  };
  const mode =
    play === undefined
      ? { initial: 'hidden', whileInView: 'visible', viewport: { once: true, margin: '-60px' } }
      : { initial: 'hidden', animate: play ? 'visible' : 'hidden' };
  return (
    <motion.div className={className} variants={variants} {...mode}>
      {children}
    </motion.div>
  );
};

// Pulls its child toward the cursor.
const Magnetic = ({ children, strength = 0.32, className = '' }) => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ x: sx, y: sy }} className={className}>
      {children}
    </motion.div>
  );
};

// Spotlight hover + optional 3D tilt, CSS-var driven (no re-renders).
const SpotlightCard = ({ children, className = '', tilt = false }) => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 20 });
  const sry = useSpring(ry, { stiffness: 160, damping: 20 });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
    if (tilt && !reduce) {
      ry.set(((e.clientX - r.left) / r.width - 0.5) * 5);
      rx.set(-((e.clientY - r.top) / r.height - 0.5) * 5);
    }
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={tilt ? { rotateX: srx, rotateY: sry, transformPerspective: 900 } : undefined}
      className={`spotlight ${className}`}
    >
      {children}
    </motion.div>
  );
};

const Counter = ({ to, suffix = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(to);
      return;
    }
    const duration = 1400;
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, reduce]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
};

const Tooltip = ({ children, text }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="pointer-events-none absolute -top-9 z-50 whitespace-nowrap border border-line bg-raise px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-bone"
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Custom cursor: lime dot + trailing ring. Fine pointers only.
const CustomCursor = () => {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 280, damping: 26, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 280, damping: 26, mass: 0.6 });

  useEffect(() => {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);
    document.documentElement.classList.add('has-cursor');

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e) => setHovering(Boolean(e.target.closest('a, button, [data-hover]')));
    const out = () => setVisible(false);

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseover', over, { passive: true });
    document.documentElement.addEventListener('mouseleave', out);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.documentElement.removeEventListener('mouseleave', out);
      document.documentElement.classList.remove('has-cursor');
    };
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ x, y }}
        animate={{ opacity: visible ? 1 : 0, scale: hovering ? 0.4 : 1 }}
        transition={{ duration: 0.15 }}
        className="pointer-events-none fixed left-0 top-0 z-[110] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
      />
      <motion.div
        aria-hidden="true"
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: visible ? 1 : 0, scale: hovering ? 1.7 : 1 }}
        transition={{ duration: 0.25, ease: EASE }}
        className="pointer-events-none fixed left-0 top-0 z-[109] h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-bone/60 mix-blend-difference"
      />
    </>
  );
};

/* ------------------------------------------------------------------ */
/* Terminal (typing animation)                                         */
/* ------------------------------------------------------------------ */

const TOKEN_CLASS = {
  k: 'text-accent',
  n: 'text-bone font-semibold',
  p: 'text-faint',
  s: 'text-muted',
};

const CODE_LINES = [
  [['const ', 'k'], ['developer', 'n'], [' = {', 'p']],
  [['  mobile: ', 'p'], ['["Swift", "React Native"]', 's'], [',', 'p']],
  [['  web: ', 'p'], ['["Vue", "Nuxt", "Tailwind"]', 's'], [',', 'p']],
  [['  backend: ', 'p'], ['["PostgreSQL", "Drizzle"]', 's'], [',', 'p']],
  [['  focus: ', 'p'], ['"User Experience"', 's']],
  [['};', 'p']],
];

const Terminal = ({ start }) => {
  const reduce = useReducedMotion();
  const { total, lineStarts } = useMemo(() => {
    const starts = [];
    let acc = 0;
    CODE_LINES.forEach((line) => {
      starts.push(acc);
      acc += line.reduce((s, [t]) => s + t.length, 0);
    });
    return { total: acc, lineStarts: starts };
  }, []);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (reduce) {
      setN(total);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setN(Math.min(i, total));
      if (i >= total) clearInterval(id);
    }, 26);
    return () => clearInterval(id);
  }, [start, reduce, total]);

  return (
    <div className="relative">
      <motion.div
        animate={reduce ? undefined : { y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        className="panel-card ticks relative z-10 p-6 font-mono text-[13px] leading-relaxed shadow-2xl shadow-black/50"
      >
        <div className="mb-5 flex items-center justify-between">
          <div className="flex gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-bone/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-bone/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest2 text-faint">developer.ts</span>
        </div>
        {CODE_LINES.map((line, li) => {
          const lineLen = line.reduce((s, [t]) => s + t.length, 0);
          const visibleInLine = Math.max(0, Math.min(lineLen, n - lineStarts[li]));
          const isCaretLine =
            n >= total ? li === CODE_LINES.length - 1 : n >= lineStarts[li] && n < lineStarts[li] + lineLen;
          let used = 0;
          return (
            <p key={li} className="min-h-[1.65em] whitespace-pre">
              {line.map(([t, c], ti) => {
                const take = Math.max(0, Math.min(t.length, visibleInLine - used));
                used += t.length;
                return (
                  <span key={ti} className={TOKEN_CLASS[c]}>
                    {t.slice(0, take)}
                  </span>
                );
              })}
              {isCaretLine && <span className="ml-px inline-block h-[1.05em] w-[7px] animate-blink bg-accent align-text-bottom" />}
            </p>
          );
        })}
      </motion.div>
      {/* offset blueprint frame */}
      <div aria-hidden="true" className="absolute -right-4 -top-4 z-0 h-full w-full border border-accent/40" />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Preloader                                                           */
/* ------------------------------------------------------------------ */

const Preloader = () => (
  <motion.div
    exit={{ y: '-100%' }}
    transition={{ duration: 0.7, ease: EASE }}
    className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
    aria-hidden="true"
  >
    <div className="px-6 text-center">
      <Reveal play className="mb-4">
        <span className="font-display text-4xl font-semibold uppercase tracking-tight text-bone md:text-6xl">
          André Emiliano<span className="text-accent">.</span>
        </span>
      </Reveal>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, ease: 'easeInOut', delay: 0.1 }}
        className="h-px origin-left bg-accent"
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="mt-4 font-mono text-[10px] uppercase tracking-widest2 text-muted"
      >
        Software Engineer — Portfolio
      </motion.p>
    </div>
  </motion.div>
);

/* ------------------------------------------------------------------ */
/* Section heading                                                     */
/* ------------------------------------------------------------------ */

const SectionHeading = ({ index, title, id }) => (
  <div className="mb-14 flex items-end gap-6 md:mb-20">
    <h2 id={id} className="font-display text-4xl font-semibold uppercase tracking-tight text-bone md:text-6xl">
      <Reveal>
        <span>
          <span className="mr-3 align-super font-mono text-sm text-accent md:text-lg">{index}</span>
          {title}
        </span>
      </Reveal>
    </h2>
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
      className="mb-3 h-px flex-1 origin-left bg-bone/10"
      aria-hidden="true"
    />
  </div>
);

/* ------------------------------------------------------------------ */
/* App                                                                 */
/* ------------------------------------------------------------------ */

function App() {
  const reduce = useReducedMotion();
  const [introDone, setIntroDone] = useState(
    () => typeof window !== 'undefined' && (sessionStorage.getItem('ae-intro') === '1' || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [visibleProjects, setVisibleProjects] = useState(6);
  const lenisRef = useRef(null);
  const lastY = useRef(0);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  // Intro curtain — once per session
  useEffect(() => {
    if (introDone) return;
    const t = setTimeout(() => {
      setIntroDone(true);
      sessionStorage.setItem('ae-intro', '1');
    }, 1500);
    return () => clearTimeout(t);
  }, [introDone]);

  // Smooth scrolling
  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenisRef.current = lenis;
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduce]);

  // Scroll state: nav style, hide-on-scroll-down, scroll-top button
  useEffect(() => {
    const handleScroll = () => {
      const yPos = window.scrollY;
      setIsScrolled(yPos > 40);
      setShowScrollUp(yPos > 600);
      setNavHidden(yPos > 140 && yPos > lastY.current);
      lastY.current = yPos;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveSection(e.target.id)),
      { rootMargin: '-35% 0px -55% 0px' }
    );
    NAV_LINKS.forEach(({ to }) => {
      const el = document.getElementById(to);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock page scroll behind mobile menu
  useEffect(() => {
    if (isMenuOpen) {
      lenisRef.current?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenisRef.current?.start();
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const scrollToId = useCallback((id) => {
    if (id === 'home') {
      if (lenisRef.current) lenisRef.current.scrollTo(0, { duration: 1.2 });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (lenisRef.current) lenisRef.current.scrollTo(`#${id}`, { offset: -88, duration: 1.2 });
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const toggleProjects = () => {
    if (visibleProjects === 6) {
      setVisibleProjects(PROJECTS.length);
    } else {
      setVisibleProjects(6);
      scrollToId('projects');
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink font-sans text-bone">
      {/* Atmosphere */}
      <div aria-hidden="true" className="grid-bg fixed inset-0 z-0" />
      <div aria-hidden="true" className="fixed -top-48 right-[-12%] z-0 h-[34rem] w-[34rem] rounded-full bg-accent/[0.06] blur-[140px]" />
      <div aria-hidden="true" className="fixed bottom-[-20%] left-[-10%] z-0 h-[30rem] w-[30rem] rounded-full bg-bone/[0.03] blur-[120px]" />
      <div aria-hidden="true" className="noise pointer-events-none fixed inset-0 z-[90]" />

      <CustomCursor />

      <AnimatePresence>{!introDone && <Preloader />}</AnimatePresence>

      {/* Skip link */}
      <a
        href="#main"
        className="sr-only z-[120] bg-accent px-4 py-2 font-mono text-xs text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      {/* Scroll progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 right-0 top-0 z-[70] h-[2px] origin-left bg-accent"
        aria-hidden="true"
      />

      {/* Navbar */}
      <motion.nav
        animate={{ y: navHidden && !isMenuOpen ? '-110%' : '0%' }}
        transition={{ duration: 0.45, ease: EASE }}
        className={`fixed top-0 z-50 w-full transition-[background-color,border-color,padding] duration-300 ${
          isScrolled ? 'border-b border-line bg-ink/85 py-4 backdrop-blur-xl' : 'border-b border-transparent py-6'
        }`}
        aria-label="Primary"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <motion.button
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            onClick={() => scrollToId('home')}
            className="group flex items-baseline gap-2 font-display text-xl font-semibold tracking-tight text-bone"
            aria-label="Back to top"
          >
            <span className="font-mono text-accent">AE/</span>
            <span className="hidden sm:inline">André Emiliano</span>
            <span className="hidden h-2 w-2 rounded-full bg-accent opacity-0 transition-opacity group-hover:opacity-100 sm:inline-block" />
          </motion.button>

          {/* Desktop menu */}
          <div className="hidden items-center gap-8 md:flex">
            <ul className="flex gap-7">
              {NAV_LINKS.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.08, duration: 0.5, ease: EASE }}
                >
                  <button
                    onClick={() => scrollToId(link.to)}
                    className={`group relative font-mono text-xs uppercase tracking-widest transition-colors ${
                      activeSection === link.to ? 'text-accent' : 'text-muted hover:text-bone'
                    }`}
                  >
                    <span className="mr-1.5 text-accent">0{index + 1}</span>
                    {link.name}
                    <span
                      className={`absolute -bottom-1.5 left-0 h-px bg-accent transition-all duration-300 ${
                        activeSection === link.to ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </button>
                </motion.li>
              ))}
            </ul>
            <Magnetic strength={0.25}>
              <motion.a
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5, ease: EASE }}
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 bg-accent px-4 py-2 font-mono text-xs font-medium uppercase tracking-widest text-ink transition-colors hover:bg-bone"
              >
                Resume
                <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </motion.a>
            </Magnetic>
          </div>

          {/* Mobile menu button */}
          <button
            className="text-bone md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile menu overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.4, ease: EASE }}
              className="fixed inset-0 z-40 flex h-screen flex-col items-center justify-center gap-2 bg-ink/95 backdrop-blur-xl md:hidden"
            >
              {NAV_LINKS.map((link, index) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + index * 0.07, duration: 0.5, ease: EASE }}
                  onClick={() => {
                    setIsMenuOpen(false);
                    setTimeout(() => scrollToId(link.to), 80);
                  }}
                  className="py-3 font-display text-4xl font-semibold uppercase tracking-tight text-bone transition-colors hover:text-accent"
                >
                  <span className="mr-3 font-mono text-base text-accent">0{index + 1}</span>
                  {link.name}
                </motion.button>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: EASE }}
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 bg-accent px-8 py-3 font-mono text-sm font-medium uppercase tracking-widest text-ink"
              >
                Resume <ArrowUpRight size={16} />
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <main id="main" className="relative z-10 mx-auto max-w-6xl px-6 md:px-12">
        {/* ---------------- Hero ---------------- */}
        <section id="home" className="flex min-h-screen flex-col justify-center pb-16 pt-32" aria-label="Introduction">
          <FadeIn play={introDone} delay={0.05}>
            <p className="mb-6 inline-flex items-center gap-2 border border-line bg-panel px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest2 text-muted">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
              Available for new opportunities — UK
            </p>
          </FadeIn>

          <h1 className="font-display font-semibold uppercase leading-[0.95] tracking-tight">
            <Reveal play={introDone} delay={0.12}>
              <span className="block text-5xl text-bone sm:text-7xl lg:text-8xl xl:text-[7.5rem]">
                André Emiliano<span className="text-accent">.</span>
              </span>
            </Reveal>
          </h1>
          <h2 className="mt-4 font-display font-semibold uppercase leading-[1.02] tracking-tight">
            <Reveal play={introDone} delay={0.24}>
              <span className="block text-3xl text-muted sm:text-5xl lg:text-6xl">
                I build <span className="text-stroke">digital experiences</span>
              </span>
            </Reveal>
          </h2>

          <div className="mt-12 grid items-start gap-12 md:grid-cols-2">
            <div>
              <FadeIn play={introDone} delay={0.38}>
                <p className="max-w-lg text-lg leading-relaxed text-muted">
                  I'm a software engineer specializing in native iOS, cross-platform mobile (React Native), and
                  full-stack web solutions. Currently delivering high-impact solutions for clients like{' '}
                  <span className="text-bone">Rolls-Royce</span> with <span className="text-bone">Calvium</span>.
                </p>
              </FadeIn>
              <FadeIn play={introDone} delay={0.5} className="mt-10 flex flex-wrap items-center gap-6">
                <Magnetic>
                  <button
                    onClick={() => scrollToId('projects')}
                    className="group inline-flex items-center gap-2 bg-accent px-7 py-4 font-mono text-sm font-medium uppercase tracking-widest text-ink transition-colors hover:bg-bone"
                  >
                    Check out my work
                    <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </button>
                </Magnetic>
                <div className="flex items-center gap-5">
                  <Tooltip text="GitHub">
                    <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted transition-all hover:-translate-y-0.5 hover:text-accent">
                      <Github size={22} />
                    </a>
                  </Tooltip>
                  <Tooltip text="LinkedIn">
                    <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted transition-all hover:-translate-y-0.5 hover:text-accent">
                      <Linkedin size={22} />
                    </a>
                  </Tooltip>
                  <Tooltip text="Email">
                    <a href={`mailto:${EMAIL}`} aria-label="Email" className="text-muted transition-all hover:-translate-y-0.5 hover:text-accent">
                      <Mail size={22} />
                    </a>
                  </Tooltip>
                  <Tooltip text="CV">
                    <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" aria-label="CV" className="text-muted transition-all hover:-translate-y-0.5 hover:text-accent">
                      <FileText size={22} />
                    </a>
                  </Tooltip>
                </div>
              </FadeIn>
            </div>

            <FadeIn play={introDone} delay={0.55} className="hidden md:block">
              <Terminal start={introDone} />
            </FadeIn>
          </div>

          <FadeIn play={introDone} delay={0.8} className="mt-20 hidden items-center gap-3 md:flex">
            <span className="font-mono text-[10px] uppercase tracking-widest2 text-faint">Scroll</span>
            <motion.span
              aria-hidden="true"
              animate={reduce ? undefined : { scaleX: [0, 1, 1], opacity: [0, 1, 0], originX: [0, 0, 1] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
              className="block h-px w-24 bg-accent"
            />
          </FadeIn>
        </section>

        {/* ---------------- Tech marquee ---------------- */}
        <section aria-label="Technologies" className="marquee-mask -mx-6 overflow-hidden border-y border-line py-5 md:-mx-12">
          <div className="marquee-track flex w-max animate-marquee gap-0">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex items-center" aria-hidden={dup === 1}>
                {MARQUEE_ITEMS.map((item) => (
                  <span key={`${dup}-${item}`} className="flex items-center font-display text-2xl font-medium uppercase tracking-tight text-bone/80 md:text-3xl">
                    <span className="px-6">{item}</span>
                    <span className="text-sm text-accent">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- About ---------------- */}
        <section id="about" className="py-28 md:py-36" aria-labelledby="about-title">
          <SectionHeading index="01" title="About Me" id="about-title" />

          <div className="grid gap-14 md:grid-cols-3">
            <div className="space-y-5 text-lg leading-relaxed text-muted md:col-span-2">
              <FadeIn>
                <p>
                  Hello! My name is Andre and I'm a software engineer based in the UK. My journey in tech began with a
                  curiosity for how things work behind the screen, which quickly evolved into a passion for mobile
                  development and software architecture.
                </p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p>
                  Recently, I've expanded my expertise beyond native iOS. As a key member of the team at{' '}
                  <span className="text-accent">Calvium</span>, I've spent the past year architecting full-stack web
                  solutions for major clients like <span className="text-accent">Rolls-Royce</span> using{' '}
                  <strong className="font-medium text-bone">Nuxt, Vue, and Postgres</strong>. I also help clients bring
                  ideas to life on both iOS and Android using{' '}
                  <strong className="font-medium text-bone">React Native, Expo, and NativeWind</strong>.
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p>Here are a few technologies I've been working with recently:</p>
                <ul className="mt-5 grid grid-cols-2 gap-3 font-mono text-sm">
                  {['React Native / Expo', 'Vue / Nuxt', 'PostgreSQL', 'Tailwind / NativeWind', 'Drizzle ORM'].map((t) => (
                    <li key={t} className="flex items-center gap-2 text-muted">
                      <span className="text-accent">▹</span> {t}
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>

            <FadeIn delay={0.2} className="group relative max-w-xs md:max-w-none">
              <div className="relative z-10 overflow-hidden border border-line transition-colors duration-300 group-hover:border-accent/60">
                <img
                  src="/images/profile-1.jpeg"
                  alt="André Emiliano — software engineer"
                  loading="lazy"
                  width="640"
                  height="640"
                  className="h-auto w-full object-cover grayscale transition-all duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-accent/15 transition-all duration-500 group-hover:bg-transparent" />
              </div>
              <div
                aria-hidden="true"
                className="absolute left-4 top-4 -z-0 h-full w-full border border-accent/50 transition-all duration-300 group-hover:left-2 group-hover:top-2"
              />
            </FadeIn>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3">
            {STATS.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1} className="bg-panel p-8">
                <p className="font-display text-5xl font-semibold text-accent md:text-6xl">
                  <Counter to={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted">{stat.label}</p>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ---------------- Skills ---------------- */}
        <section id="skills" className="py-28 md:py-36" aria-labelledby="skills-title">
          <SectionHeading index="02" title="My Skills" id="skills-title" />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {SKILLS.map((skill, i) => (
              <FadeIn key={skill.title} delay={i * 0.08}>
                <SpotlightCard className="panel-card ticks h-full p-7 transition-colors duration-300 hover:border-accent/40">
                  <div className="relative z-10">
                    <span className="font-mono text-[10px] uppercase tracking-widest2 text-faint">0{i + 1}</span>
                    <div className="mb-5 mt-6 inline-flex border border-line bg-raise p-3 text-accent">{skill.icon}</div>
                    <h3 className="mb-2 font-display text-xl font-semibold uppercase tracking-tight text-bone">{skill.title}</h3>
                    <p className="text-sm leading-relaxed text-muted">{skill.text}</p>
                  </div>
                </SpotlightCard>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ---------------- Projects ---------------- */}
        <section id="projects" className="py-28 md:py-36" aria-labelledby="projects-title">
          <SectionHeading index="03" title="Featured Projects" id="projects-title" />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.slice(0, visibleProjects).map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease: EASE, delay: (i % 3) * 0.08 }}
              >
                <SpotlightCard tilt className="panel-card ticks group flex h-full flex-col p-7 transition-colors duration-300 hover:border-accent/40">
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="mb-6 flex items-start justify-between">
                      <div className="inline-flex border border-line bg-raise p-3 text-accent transition-colors duration-300 group-hover:border-accent/50">
                        {project.icon}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] uppercase tracking-widest2 text-faint">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open ${project.title}`}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-all hover:border-accent hover:bg-accent hover:text-ink"
                          >
                            <ArrowUpRight size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                    <h3 className="mb-3 font-display text-xl font-semibold tracking-tight text-bone transition-colors group-hover:text-accent">
                      {project.title}
                    </h3>
                    <p className="mb-6 flex-grow text-sm leading-relaxed text-muted">{project.desc}</p>
                    <ul className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <li key={t} className="border border-line bg-raise px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Magnetic className="inline-block">
              <button
                onClick={toggleProjects}
                className="border border-accent/60 px-8 py-4 font-mono text-sm uppercase tracking-widest text-accent transition-colors hover:bg-accent hover:text-ink"
              >
                {visibleProjects === 6 ? `Show all ${PROJECTS.length} projects` : 'Show less'}
              </button>
            </Magnetic>
          </div>
        </section>

        {/* ---------------- Contact ---------------- */}
        <section id="contact" className="py-28 text-center md:py-40" aria-labelledby="contact-title">
          <FadeIn>
            <p className="mb-6 font-mono text-xs uppercase tracking-widest2 text-accent">04 — What's Next?</p>
          </FadeIn>
          <h2 id="contact-title" className="font-display font-semibold uppercase leading-[0.95] tracking-tight">
            <Reveal>
              <span className="block text-5xl text-bone sm:text-7xl lg:text-8xl">Get in</span>
            </Reveal>
            <Reveal delay={0.1}>
              <span className="text-stroke block text-5xl sm:text-7xl lg:text-8xl">touch</span>
            </Reveal>
          </h2>
          <FadeIn delay={0.25}>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-muted">
              Always open for new opportunities. Whether you have a question or just want to say hi, my inbox is always
              open!
            </p>
          </FadeIn>
          <FadeIn delay={0.35} className="mt-12">
            <Magnetic className="inline-block">
              <a
                href={`mailto:${EMAIL}`}
                className="group inline-flex items-center gap-3 bg-accent px-10 py-5 font-mono text-sm font-medium uppercase tracking-widest text-ink transition-colors hover:bg-bone"
              >
                Say Hello
                <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </a>
            </Magnetic>
            <p className="mt-8">
              <a href={`mailto:${EMAIL}`} className="font-mono text-xs tracking-widest text-faint transition-colors hover:text-accent">
                {EMAIL}
              </a>
            </p>
          </FadeIn>
        </section>

        {/* ---------------- Footer ---------------- */}
        <footer className="border-t border-line py-10">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <p className="font-mono text-xs text-faint">
              Designed & Built by <span className="text-muted">André Emiliano</span> — © {new Date().getFullYear()}
            </p>
            <div className="flex items-center gap-5">
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-faint transition-colors hover:text-accent">
                <Github size={18} />
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-faint transition-colors hover:text-accent">
                <Linkedin size={18} />
              </a>
              <a href={`mailto:${EMAIL}`} aria-label="Email" className="text-faint transition-colors hover:text-accent">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </footer>
      </main>

      {/* Scroll to top */}
      <AnimatePresence>
        {showScrollUp && (
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3, ease: EASE }}
            onClick={() => scrollToId('home')}
            aria-label="Scroll to top"
            className="fixed bottom-8 right-8 z-40 border border-line bg-panel p-3 text-muted backdrop-blur transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
