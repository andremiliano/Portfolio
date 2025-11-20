import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Menu, 
  X, 
  ChevronUp, 
  Code2, 
  Database, 
  Smartphone, 
  Terminal,
  Server,
  Globe,
  FileText,
  Brain,
  BarChart,
  MessageSquare,
  ShoppingCart,
  Layers,
  Monitor
} from 'lucide-react';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState(6);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollUp(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleProjects = () => {
    if (visibleProjects === 6) {
      setVisibleProjects(projectsData.length);
    } else {
      setVisibleProjects(6);
      document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: "About", to: "about" },
    { name: "Skills", to: "skills" },
    { name: "Projects", to: "projects" },
    { name: "Contact", to: "contact" },
  ];

  const projectsData = [
    {
      title: "Enterprise Solutions for Rolls-Royce",
      desc: "Architected full-stack dashboard and management solutions using modern web technologies, delivering robust internal tools for complex data analysis and visualization.",
      tech: ["Vue.js", "Nuxt", "PostgreSQL", "Tailwind"],
      link: null,
      icon: <Globe size={40} strokeWidth={1.5} />
    },
    {
      title: "Cross-Platform Client Apps",
      desc: "Building performant, scalable mobile applications for various clients on both iOS and Android using the React Native and Expo.",
      tech: ["React Native", "Expo", "NativeWind"],
      link: null,
      icon: <Smartphone size={40} strokeWidth={1.5} />
    },
    {
      title: "Met Office Weather",
      desc: "Contributed to a government weather app used by 3+ million people, building complex SwiftUI views with WCAG-compliant accessibility.",
      tech: ["SwiftUI", "Bitrise", "Accessibility"],
      link: "https://apps.apple.com/gb/app/met-office-weather-forecast/id1068146838",
      icon: <Smartphone size={40} strokeWidth={1.5} />
    },
    {
      title: "River Island App",
      desc: "Contributed to the success of major retail iOS apps using UIKit and implementing MVC and MVVM architectures.",
      tech: ["UIKit", "MVVM", "Jenkins"],
      link: "https://apps.apple.com/gb/app/river-island/id385441876",
      icon: <Smartphone size={40} strokeWidth={1.5} />
    },
    {
      title: "Iceland Bonus Card",
      desc: "Worked on features and bugs related to Scan and Go functionality, enhancing the in-store shopping experience for users.",
      tech: ["UIKit", "MVVM", "CMS"],
      link: "https://apps.apple.com/gb/app/iceland-bonus-card/id1545925055",
      icon: <Smartphone size={40} strokeWidth={1.5} />
    },
    {
      title: "American Golf",
      desc: "Implemented custom fittings booking system for golf clubs and enhanced the account menu and Product Detail Pages (PDP).",
      tech: ["UIKit", "MVVM", "CMS"],
      link: "https://apps.apple.com/gb/app/american-golf/id1471355600",
      icon: <Smartphone size={40} strokeWidth={1.5} />
    },
    {
      title: "Secure Online System",
      desc: "Flask API for an aircraft service company, developed and tested around security with various Web security aspects.",
      tech: ["Flask", "SQLAlchemy", "Security"],
      link: "https://abcair.pythonanywhere.com/",
      icon: <Globe size={40} strokeWidth={1.5} />
    },
    {
      title: "Payment System API",
      desc: "API for a payment system using Flask developed using TDD and Gang of Four design patterns.",
      tech: ["Flask", "TDD", "Patterns"],
      link: "https://github.coventry.ac.uk/novaisea/Smart-Insurance.git",
      icon: <Server size={40} strokeWidth={1.5} />
    },
    {
      title: "Payroll System",
      desc: "Payroll System for iOS developed in Swift where employers enter shifts and process payments.",
      tech: ["Swift", "Firebase", "UI Testing"],
      link: "https://github.coventry.ac.uk/novaisea/PayrollSystem.git",
      icon: <Smartphone size={40} strokeWidth={1.5} />
    },
    {
      title: "Cross-platform Research",
      desc: "Comparative research analyzing performance, code features, and costs between React Native, Swift, and Kotlin.",
      tech: ["React Native", "Kotlin", "Swift"],
      link: "https://github.coventry.ac.uk/novaisea/SwiftApp-6001CEM",
      icon: <FileText size={40} strokeWidth={1.5} />
    },
    {
      title: "iOS Health App",
      desc: "Health App with recipe suggestions, step tracking, goal setting, and BMI/Macro calculator using local storage and multiple APIs.",
      tech: ["Swift", "MapKit", "OpenWeather"],
      link: "https://github.coventry.ac.uk/6002CEM-2021JANMAY/6002CEM-Andre_Emiliano_8916875",
      icon: <Smartphone size={40} strokeWidth={1.5} />
    },
    {
      title: "Insurance Cost ML",
      desc: "Machine Learning algorithms to predict medical insurance costs using pre-processing, feature selection and extraction on datasets.",
      tech: ["Python", "Pandas", "ML"],
      link: "https://drive.google.com/drive/folders/1RvWW7_XG_x__yy2a7gg6eO5Cc25lq5RW?usp=sharing",
      icon: <Brain size={40} strokeWidth={1.5} />
    },
    {
      title: "Ozone Visualization",
      desc: "Big Data system that reads CBE data files to overlay ozone measurements on a Europe map, designed for color-blind accessibility.",
      tech: ["MATLAB", "Big Data", "Visualization"],
      link: "https://drive.google.com/drive/folders/1DUxRFKFvd_LgwXduYDJh1YSf0_6XYPIK?usp=sharing",
      icon: <BarChart size={40} strokeWidth={1.5} />
    },
    {
      title: "Computer Reseller",
      desc: "E-commerce website with user/admin accounts, inventory management, and promotional code functionality.",
      tech: ["HTML/CSS", "JS", "MySQL"],
      link: "https://drive.google.com/drive/folders/1RS83YI6sqTHE7q0oKeiJ0oCQOsiNntwv?usp=sharing",
      icon: <ShoppingCart size={40} strokeWidth={1.5} />
    },
    {
      title: "Python ChatBot",
      desc: "Interactive chatbot with features covering health, games, language, marketing, football and shopping.",
      tech: ["Python", "NLP"],
      link: "https://drive.google.com/open?id=1KsmuVk4ny9Fo19xYcYKptMyRte8XsN2u",
      icon: <MessageSquare size={40} strokeWidth={1.5} />
    }
  ];

  return (
    <div className="min-h-screen bg-dark overflow-x-hidden font-sans relative">
      
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-secondary/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000"></div>
      </div>

      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-dark/90 backdrop-blur-lg py-4 shadow-lg' : 'bg-transparent py-6'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold font-mono text-slate-100 cursor-pointer"
            onClick={scrollToTop}
          >
            André Emiliano<span className="text-primary">Portfolio</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ScrollLink 
                    to={link.to} 
                    smooth={true} 
                    duration={500} 
                    offset={-100}
                    className="text-slate-300 hover:text-primary cursor-pointer text-sm font-mono transition-colors"
                  >
                    <span className="text-primary mr-1">0{index + 1}.</span>{link.name}
                  </ScrollLink>
                </motion.div>
              ))}
            </div>
            <motion.a 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              href="https://drive.google.com/file/d/1Sl-6r-nIzObdi1ZcjgsTxKGC5tVPHlJl/view?usp=sharing" 
              target="_blank"
              className="border border-primary text-primary px-4 py-2 rounded text-sm font-mono hover:bg-primary/10 transition-colors"
            >
              Resume
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden text-slate-100 cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween' }}
              className="fixed inset-0 bg-dark/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center md:hidden"
            >
              {navLinks.map((link, index) => (
                <ScrollLink 
                  key={link.name}
                  to={link.to} 
                  smooth={true} 
                  duration={500} 
                  offset={-80}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl text-slate-300 hover:text-primary py-4 font-mono cursor-pointer"
                >
                  <span className="text-primary mr-2">0{index + 1}.</span>{link.name}
                </ScrollLink>
              ))}
              <a 
                href="https://drive.google.com/file/d/1Sl-6r-nIzObdi1ZcjgsTxKGC5tVPHlJl/view?usp=sharing" 
                target="_blank"
                className="mt-8 border border-primary text-primary px-8 py-3 rounded text-lg font-mono hover:bg-primary/10 transition-colors"
              >
                Resume
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center pt-20">
          <div className="grid md:grid-cols-2 gap-12 items-center w-full">
            <motion.div 
              initial="hidden" 
              animate="visible" 
              variants={staggerContainer}
              className="max-w-3xl"
            >
              <motion.p variants={fadeInUp} className="font-mono text-primary mb-4">Hello, my name is</motion.p>
              <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold text-slate-100 mb-4">
                André
              </motion.h1>
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold text-slate-400 mb-6">
                I build <span className="gradient-text">digital experiences.</span>
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-slate-400 max-w-lg mb-10 leading-relaxed">
                I'm a software engineer specializing in native iOS, cross-platform mobile (React Native), and full-stack web solutions. Currently delivering high-impact solutions for clients like Rolls-Royce and Calvium.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex gap-4">
                <ScrollLink to="projects" smooth={true} offset={-100} className="border-2 border-primary text-primary px-6 py-3 rounded font-mono hover:bg-primary/10 transition-colors cursor-pointer">
                  Check out my work
                </ScrollLink>
                <div className="flex gap-4 items-center ml-4">
                   <a href="https://github.coventry.ac.uk/novaisea" target="_blank" className="text-slate-400 hover:text-primary transition-colors"><Github /></a>
                   <a href="https://www.linkedin.com/in/andremiliano/" target="_blank" className="text-slate-400 hover:text-primary transition-colors"><Linkedin /></a>
                   <a href="mailto:andre.novais.emiliano@gmail.com" className="text-slate-400 hover:text-primary transition-colors"><Mail /></a>
                </div>
              </motion.div>
            </motion.div>

            {/* Animated Code Snippet Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="hidden md:block relative"
            >
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="bg-[#1e293b] p-6 rounded-lg border border-slate-700 shadow-2xl font-mono text-sm relative z-10"
              >
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-slate-300">
                  <p><span className="text-purple-400">struct</span> <span className="text-yellow-300">Developer</span>: <span className="text-purple-400">View</span> {`{`}</p>
                  <p className="pl-4"><span className="text-purple-400">var</span> body: <span className="text-purple-400">some</span> View {`{`}</p>
                  <p className="pl-8"><span className="text-blue-400">VStack</span> {`{`}</p>
                  <p className="pl-12"><span className="text-blue-400">Text</span>(<span className="text-green-300">"Hello, World!"</span>)</p>
                  <p className="pl-12"><span className="text-blue-400">Code</span>(<span className="text-green-300">"SwiftUI"</span>)</p>
                  <p className="pl-12"><span className="text-blue-400">Design</span>(<span className="text-green-300">"Accessible"</span>)</p>
                  <p className="pl-8">{`}`}</p>
                  <p className="pl-4">{`}`}</p>
                  <p>{`}`}</p>
                </div>
              </motion.div>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-primary rounded-lg -z-0 opacity-50"></div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="flex items-center text-3xl font-bold text-slate-100 mb-12">
              <span className="text-primary font-mono text-xl mr-2">01.</span> About Me
              <span className="h-[1px] bg-slate-700 flex-grow ml-4 max-w-[300px]"></span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-2 text-slate-400 leading-relaxed text-lg space-y-4">
                <p>
                  Hello! My name is Andre and I'm a software engineer based in the UK. My journey in tech began with a curiosity for how things work behind the screen, which quickly evolved into a passion for mobile development and software architecture.
                </p>
                <p>
                  Recently, I've expanded my expertise beyond native iOS. While I continue to build robust apps at <span className="text-primary">Calvium</span>, I've spent the past year architecting full-stack web solutions for <span className="text-primary">Rolls-Royce</span> using <strong>Nuxt, Vue, and Postgres</strong>. I also help clients bring ideas to life on both iOS and Android using <strong>React Native, Expo, and NativeWind</strong>.
                </p>
                <p>
                  Here are a few technologies I've been working with recently:
                </p>
                <ul className="grid grid-cols-2 gap-2 font-mono text-sm mt-4">
                   <li className="flex items-center gap-2"><span className="text-primary">▹</span> Swift (UIKit/SwiftUI)</li>
                   <li className="flex items-center gap-2"><span className="text-primary">▹</span> React Native / Expo</li>
                   <li className="flex items-center gap-2"><span className="text-primary">▹</span> Vue.js / Nuxt</li>
                   <li className="flex items-center gap-2"><span className="text-primary">▹</span> PostgreSQL</li>
                   <li className="flex items-center gap-2"><span className="text-primary">▹</span> Tailwind / NativeWind</li>
                   <li className="flex items-center gap-2"><span className="text-primary">▹</span> Python (ML)</li>
                </ul>
              </div>
              <div className="relative group">
                <div className="relative z-10 rounded overflow-hidden border-2 border-primary/50 group-hover:border-primary transition-colors">
                   <img src="/images/profile-1.jpeg" alt="Profile" className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                   <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-all duration-300"></div>
                </div>
                <div className="absolute top-4 left-4 w-full h-full border-2 border-primary rounded -z-0 transition-all group-hover:top-2 group-hover:left-2"></div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24">
           <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
             <h2 className="flex items-center text-3xl font-bold text-slate-100 mb-12">
              <span className="text-primary font-mono text-xl mr-2">02.</span> My Skills
              <span className="h-[1px] bg-slate-700 flex-grow ml-4 max-w-[300px]"></span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <Smartphone className="w-8 h-8" />, title: "Mobile Dev", text: "Swift, SwiftUI, React Native, Expo" },
                { icon: <Monitor className="w-8 h-8" />, title: "Full Stack Web", text: "Vue.js, Nuxt, Tailwind, HTML/CSS" },
                { icon: <Database className="w-8 h-8" />, title: "Backend & DB", text: "PostgreSQL, Firebase, Supabase, SQL" },
                { icon: <Terminal className="w-8 h-8" />, title: "DevOps", text: "CI/CD, Fastlane, Bitrise, Jenkins" }
              ].map((skill, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="glass-card p-6 rounded-lg hover:border-primary/50 transition-colors"
                >
                  <div className="text-primary mb-4">{skill.icon}</div>
                  <h3 className="text-xl font-bold text-slate-100 mb-2">{skill.title}</h3>
                  <p className="text-slate-400 text-sm">{skill.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
             <h2 className="flex items-center text-3xl font-bold text-slate-100 mb-12">
              <span className="text-primary font-mono text-xl mr-2">03.</span> Featured Projects
              <span className="h-[1px] bg-slate-700 flex-grow ml-4 max-w-[300px]"></span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectsData.slice(0, visibleProjects).map((project, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="glass-card p-8 rounded-lg flex flex-col h-full group"
                >
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-primary group-hover:text-slate-100 transition-colors duration-300">
                      {project.icon}
                    </div>
                    <div className="flex gap-4">
                      {project.link && (
                        <a href={project.link} target="_blank" className="text-slate-400 hover:text-primary transition-colors">
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-slate-400 text-sm mb-6 flex-grow">
                    {project.desc}
                  </p>
                  <ul className="flex flex-wrap gap-3 text-xs font-mono text-slate-500">
                    {project.tech.map(t => <li key={t}>{t}</li>)}
                  </ul>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <button 
                onClick={toggleProjects}
                className="border border-primary text-primary px-8 py-4 rounded font-mono hover:bg-primary/10 transition-colors"
              >
                {visibleProjects === 6 ? 'Show More' : 'Show Less'}
              </button>
            </div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 text-center max-w-2xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="text-primary font-mono mb-4">04. What's Next?</p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6">Get In Touch</h2>
            <p className="text-slate-400 text-lg mb-12">
              I'm currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is always open!
            </p>
            <a href="mailto:andre.novais.emiliano@gmail.com" className="inline-block border border-primary text-primary px-8 py-4 rounded font-mono hover:bg-primary/10 transition-colors">
              Say Hello
            </a>
          </motion.div>
        </section>

        <footer className="py-8 text-center text-slate-500 text-sm font-mono">
          <div className="flex justify-center gap-6 mb-4 md:hidden">
             <a href="https://github.coventry.ac.uk/novaisea" target="_blank" className="hover:text-primary"><Github /></a>
             <a href="https://www.linkedin.com/in/andremiliano/" target="_blank" className="hover:text-primary"><Linkedin /></a>
          </div>
          <p>Designed & Built by Andre Emiliano</p>
        </footer>

      </main>

      {/* Scroll To Top Button */}
      <AnimatePresence>
        {showScrollUp && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-primary/10 text-primary border border-primary rounded hover:bg-primary/20 transition-colors z-40"
          >
            <ChevronUp />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
