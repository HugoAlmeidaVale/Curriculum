import React, { useState, useEffect } from 'react';
import { 
  Gamepad2, 
  Scroll, 
  Sword, 
  Shield, 
  Trophy, 
  Terminal,
  Code2,
  Cpu,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Copy,
  Check,
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';

// --- Injeção de Estilos Retrô ---
const RetroStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap');
    
    .font-pixel { font-family: 'Press Start 2P', monospace; }
    .font-terminal { font-family: 'VT323', monospace; }
    
    /* Efeito de TV de Tubo (CRT) */
    .crt-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), 
                  linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
      background-size: 100% 4px, 6px 100%;
      z-index: 9999;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }

    /* Animação de Blink para o "Press Start" */
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    .animate-blink { animation: blink 1s step-end infinite; }

    /* Scrollbar Pixelada */
    ::-webkit-scrollbar { width: 12px; }
    ::-webkit-scrollbar-track { background: #000; border-left: 2px solid #333; }
    ::-webkit-scrollbar-thumb { background: #fff; border: 2px solid #000; }
  `}} />
);

// --- Dados Refinados (Baseado no PDF) ---
const personalInfo = {
  name: "Hugo de Almeida P. do Vale",
  title: "Estudante ADS | .NET | Java | React",
  email: "hugoalmeidavale@gmail.com",
  phone: "+55 (21) 98197-5652",
  location: "Duque de Caxias - RJ",
  github: "https://github.com/HugoAlmeidaVale",
  linkedin: "https://www.linkedin.com/in/hugoalmeidavale",
  level: 24,
};

const skills = {
  languages: [
    { name: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg" },
    { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
    { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
    { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
  ],
  frameworks: [
    { name: ".Net Core", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg" },
    { name: "Spring Boot", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg" },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
    { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
    { name: "Entity Framework", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dot-net/dot-net-plain-wordmark.svg" },
    { name: "Ant Design", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/antdesign/antdesign-original.svg" },
  ],
  db: [
    { name: "SQL Server", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg" },
    { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  ],
  tools: [
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
    { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
    { name: "Maven", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/maven/maven-original.svg" },
    { name: "Swagger", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swagger/swagger-original.svg" },
  ],
  softSkills: [
    "Scrum (SFC™ - ScrumStudy)",
    "Troubleshooting & Depuração",
    "Visão Sistêmica",
    "Lean Startup",
    "Inglês (Intermediário - YES!)"
  ]
};

const experiences = [
  {
    id: 1,
    role: "Desenvolvedor Estagiário",
    company: "GospelSystens",
    period: "Abril 2024 - Dez 2024",
    type: "dev",
    description: "Desenvolvimento Full Stack em Linux/WSL. APIs RESTful com C#, .NET Core e Entity Framework. Interfaces responsivas com React, TypeScript e Ant Design. Deploy de aplicações otimizado com Docker."
  },
  {
    id: 2,
    role: "Sistema de Gestão de Clientes",
    company: "Serratec & iLab (Projeto Residência)",
    period: "2022",
    type: "dev",
    description: "Desenvolvimento de solução web para gestão de carteira de clientes em ambiente simulado corporativo. Implementação de interfaces reativas no Front-end com React e integração com APIs RESTful."
  },
  {
    id: 3,
    role: "Analista de Suporte Jr.",
    company: "Kordeiro Tecnologia",
    period: "Abril 2025 - Jan 2026",
    type: "suporte",
    description: "Suporte e monitoramento. Criação de infraestruturas de Redes com sistemas Unifi. Gerenciamento via Google WorkSpace, Active Directory (AD) e Microsoft 365."
  },
  {
    id: 4,
    role: "Analista de Suporte a Computadores N1",
    company: "TIVIT",
    period: "Ago 2023 - Jan 2025",
    type: "suporte",
    description: "Suporte aos colaboradores da Petrobras via E-mail, Chat e Ura (Genesys Cloud). Registro e atendimento de chamados via ServiceNow."
  },
  {
    id: 5,
    role: "Técnico de Operações N1",
    company: "Central IT",
    period: "Mai 2022 - Ago 2023",
    type: "suporte",
    description: "Help desk remoto e delegação presencial. Controle de chamados via CitSmart (SLA). Administração de Active Directory."
  }
];

const education = [
  {
    id: 1,
    course: "ADS (Tecnólogo)",
    institution: "Universidade Unigranrio",
    period: "Previsão: 2026",
    type: "MAIN QUEST"
  },
  {
    id: 2,
    course: "Residência TIC Software (Full Stack)",
    institution: "Serratec / SENAI (720h)",
    period: "2022",
    type: "SPECIALIZATION",
    details: "Formação intensiva em desenvolvimento de software."
  },
  {
    id: 3,
    course: "Técnico em Informática",
    institution: "SENAC-RJ (1200h)",
    period: "2019",
    type: "TUTORIAL"
  }
];

export default function App() {
  const [activeSection, setActiveSection] = useState('start');
  const [filter, setFilter] = useState('todos');
  const [isDark, setIsDark] = useState(true);

  // --- Gerenciador de Tema Dinâmico ---
  const t = {
    bg: isDark ? 'bg-[#050505]' : 'bg-[#e2e8f0]',
    text: isDark ? 'text-white' : 'text-slate-900',
    textMuted: isDark ? 'text-gray-400' : 'text-slate-600',
    navBg: isDark ? 'bg-black/90 border-white' : 'bg-white/90 border-black',
    footerBg: isDark ? 'bg-black border-white' : 'bg-white border-black',
    crtOpacity: isDark ? 'opacity-60' : 'opacity-15',
    
    // Cores de Destaque
    cyanText: isDark ? 'text-cyan-400' : 'text-sky-700',
    cyanBorder: isDark ? 'border-cyan-400' : 'border-sky-700',
    cyanBg: isDark ? 'bg-cyan-400 text-black' : 'bg-sky-700 text-white',
    
    pinkText: isDark ? 'text-pink-500' : 'text-rose-700',
    pinkBorder: isDark ? 'border-pink-500' : 'border-rose-700',
    
    yellowText: isDark ? 'text-yellow-400' : 'text-amber-700',
    yellowBorder: isDark ? 'border-yellow-400' : 'border-amber-700',
    yellowBg: isDark ? 'bg-yellow-400 text-black' : 'bg-amber-700 text-white',
    
    greenText: isDark ? 'text-green-400' : 'text-emerald-700',
    greenBorder: isDark ? 'border-green-400' : 'border-emerald-700',
    
    // Caixas Retrô
    retroBox: `border-4 transition-all duration-100 ease-in-out hover:translate-x-[2px] hover:translate-y-[2px] ${
      isDark 
        ? 'bg-[#111] border-white shadow-[6px_6px_0px_0px_#fff] hover:shadow-[4px_4px_0px_0px_#fff]' 
        : 'bg-white border-black shadow-[6px_6px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000]'
    }`,
    
    skillBg: isDark ? 'bg-neutral-900 border-gray-700' : 'bg-slate-100 border-slate-300',
    skillHover: isDark ? 'hover:bg-neutral-800' : 'hover:bg-slate-200',
    
    questDevBg: isDark ? 'bg-[#0a1a1f]' : 'bg-sky-50',
    questSupBg: isDark ? 'bg-[#111]' : 'bg-slate-50',
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['start', 'lore', 'skill_tree', 'quest_log', 'training'];
      const scrollPosition = window.scrollY + 250;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
  };

  // --- Componentes Internos para acesso ao Tema ---
  
  const Header = () => (
    <nav className={`fixed top-0 w-full z-50 border-b-4 ${t.navBg} transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className={`flex-shrink-0 font-pixel text-lg md:text-xl cursor-pointer hover:${t.yellowText} transition-colors ${t.text}`} onClick={() => scrollTo('start')}>
            P1: HUGO_V
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-baseline space-x-6 font-pixel text-xs">
              {['LORE', 'SKILL_TREE', 'QUEST_LOG', 'TRAINING'].map((item) => {
                const id = item.toLowerCase();
                return (
                  <button
                    key={item}
                    onClick={() => scrollTo(id)}
                    className={`px-3 py-2 transition-colors ${
                      activeSection === id ? `${t.cyanText} animate-pulse` : `${t.textMuted} hover:${t.text}`
                    }`}
                  >
                    [{item}]
                  </button>
                );
              })}
            </div>
            
            {/* Toggle de Tema */}
            <button 
              onClick={() => setIsDark(!isDark)} 
              className={`p-2 border-2 ${isDark ? 'border-white text-yellow-400 hover:bg-white/10' : 'border-black text-slate-900 hover:bg-black/10'} transition-colors ml-4 flex items-center`}
              title="Alternar Tema"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
          <div className={`md:hidden flex items-center space-x-4 ${t.text}`}>
            <button onClick={() => setIsDark(!isDark)} className="p-2 border-2 border-current">
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Gamepad2 size={24} />
          </div>
        </div>
      </div>
    </nav>
  );

  const Hero = () => {
    const [copied, setCopied] = useState('');
    const handleCopy = (text, type) => {
      navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(''), 2000);
    };

    return (
      <section id="start" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto min-h-screen flex flex-col justify-center">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-8 w-full">
            <div className={`inline-block border-2 ${t.greenBorder} ${t.greenText} font-pixel text-[10px] md:text-xs px-4 py-2 uppercase animate-pulse ${isDark ? 'bg-green-900/50' : 'bg-emerald-100'}`}>
              ► Player 1 Ready
            </div>
            
            <div>
              <h1 className={`font-pixel text-3xl md:text-5xl ${t.text} leading-tight uppercase`}>
                Hugo<br/>
                <span className={t.cyanText}>Do Vale</span>
              </h1>
              <p className={`font-terminal text-2xl md:text-3xl ${t.textMuted} mt-4 uppercase`}>
                CLASS: Full Stack Dev
              </p>
              <p className={`font-terminal text-xl ${t.yellowText} mt-2 uppercase`}>
                LVL: {personalInfo.level} | EXP: 8400/10000
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-4 font-pixel text-xs">
               <button 
                  onClick={() => scrollTo('lore')}
                  className={`${t.retroBox} px-6 py-4 ${t.yellowBg} font-bold uppercase`}
               >
                 PRESS START
               </button>
               <a href={personalInfo.github} target="_blank" rel="noreferrer" className={`${t.retroBox} p-3 ${t.text}`}>
                 <Github size={24} />
               </a>
               <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className={`${t.retroBox} p-3 ${t.text}`}>
                 <Linkedin size={24} />
               </a>
            </div>
          </div>

          <div className={`flex-1 w-full max-w-md ${t.retroBox} border-[4px] ${t.cyanBorder} p-6`}>
            <h3 className={`font-pixel ${t.cyanText} text-sm mb-6 uppercase text-center border-b-2 ${t.cyanBorder} pb-2`}>
              Inventory / Contact
            </h3>
            <ul className={`space-y-6 font-terminal text-xl md:text-2xl ${t.text}`}>
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <Mail className={`w-6 h-6 mr-4 ${t.pinkText}`} />
                  <span className="truncate max-w-[200px] md:max-w-xs text-sm md:text-xl">{personalInfo.email}</span>
                </div>
                <button onClick={() => handleCopy(personalInfo.email, 'email')} className={`${t.textMuted} hover:${t.pinkText} px-2`}>
                  {copied === 'email' ? <Check size={20} className={t.greenText} /> : <Copy size={20} />}
                </button>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <Phone className={`w-6 h-6 mr-4 ${t.pinkText}`} />
                  <span className="text-sm md:text-xl">{personalInfo.phone}</span>
                </div>
                <button onClick={() => handleCopy(personalInfo.phone, 'phone')} className={`${t.textMuted} hover:${t.pinkText} px-2`}>
                  {copied === 'phone' ? <Check size={20} className={t.greenText} /> : <Copy size={20} />}
                </button>
              </li>
              <li className="flex items-center text-sm md:text-xl">
                <MapPin className={`w-6 h-6 mr-4 ${t.pinkText}`} />
                <span>{personalInfo.location}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    );
  };

  const Lore = () => (
    <section id="lore" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-20">
      <div className="flex items-center space-x-4 mb-12">
        <Scroll className={`w-8 h-8 md:w-12 md:h-12 ${t.pinkText}`} />
        <h2 className={`font-pixel text-xl md:text-3xl ${t.pinkText} uppercase tracking-wider`}>Lore (Resumo)</h2>
      </div>
      
      <div className={`${t.retroBox} border-[4px] ${t.pinkBorder} p-6 md:p-10 relative mt-4`}>
        <div className={`absolute -top-4 left-6 px-4 font-pixel ${t.pinkText} text-xs ${t.bg}`}>
          System.out.println()
        </div>
        <div className={`font-terminal text-2xl md:text-3xl ${t.text} leading-relaxed space-y-6`}>
          <p>
            <ChevronRight className={`inline ${t.pinkText} mr-2`} size={24} />
            Desenvolvedor com experiência prática em <span className={t.cyanText}>Java, C#, .NET Core e React</span>. Graduando em Análise e Desenvolvimento de Sistemas e formado pela Residência de Software Serratec.
          </p>
          <p>
            <ChevronRight className={`inline ${t.pinkText} mr-2`} size={24} />
            Possuo background sólido em <span className={t.pinkText}>troubleshooting e resolução de problemas críticos</span>, adquirido em experiências prévias com infraestrutura e suporte, o que me confere uma visão sistêmica diferenciada para depuração e estabilidade de código.
          </p>
          <p>
            <ChevronRight className={`inline ${t.pinkText} mr-2`} size={24} />
            Busco oportunidades como Desenvolvedor Júnior ou Estagiário para aplicar conhecimentos em <span className={t.yellowText}>arquitetura de microsserviços, Docker e metodologias ágeis</span>.
          </p>
        </div>
      </div>
    </section>
  );

  const Skills = () => {
    const renderSkillBadge = (skill) => (
      <div key={skill.name} className={`flex flex-col items-center justify-center p-3 border-2 ${t.skillBg} ${t.skillHover} transition-colors w-24 h-24 text-center group`}>
        <img src={skill.icon} alt={skill.name} className="w-10 h-10 mb-2 group-hover:scale-110 transition-transform filter drop-shadow-md" />
        <span className={`font-terminal text-sm ${t.text} group-hover:${t.yellowText} leading-none`}>{skill.name}</span>
      </div>
    );

    return (
      <section id="skill_tree" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-20">
        <div className="flex items-center space-x-4 mb-12">
          <Cpu className={`w-8 h-8 md:w-12 md:h-12 ${t.yellowText}`} />
          <h2 className={`font-pixel text-xl md:text-3xl ${t.yellowText} uppercase tracking-wider`}>Skill Tree</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className={`${t.retroBox} border-[4px] ${t.yellowBorder} p-6`}>
            <h3 className={`font-pixel ${t.yellowText} text-xs md:text-sm mb-6 uppercase border-b-2 ${t.yellowBorder} pb-2 flex items-center`}>
              <Code2 size={16} className="mr-2" /> Back-end & Front-end
            </h3>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {skills.languages.map(renderSkillBadge)}
              {skills.frameworks.map(renderSkillBadge)}
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <div className={`${t.retroBox} border-[4px] ${t.yellowBorder} p-6`}>
              <h3 className={`font-pixel ${t.yellowText} text-xs md:text-sm mb-6 uppercase border-b-2 ${t.yellowBorder} pb-2 flex items-center`}>
                <Gamepad2 size={16} className="mr-2" /> Database & DevOps
              </h3>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {skills.db.map(renderSkillBadge)}
                {skills.tools.map(renderSkillBadge)}
              </div>
            </div>

            <div className={`${t.retroBox} border-[4px] ${t.yellowBorder} p-6 ${isDark ? 'bg-[#1a1a1a]' : 'bg-slate-100'}`}>
              <h3 className={`font-pixel ${t.yellowText} text-xs md:text-sm mb-6 uppercase border-b-2 ${t.yellowBorder} pb-2`}>
                 Passivas / Metodologias
              </h3>
              <ul className={`font-terminal text-xl md:text-2xl ${t.textMuted} space-y-3`}>
                {skills.softSkills.map((skill, index) => (
                  <li key={index} className="flex items-center">
                     <div className={`w-2 h-2 mr-3 ${t.yellowBg}`}></div>
                     {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const Experience = () => {
    const filteredExperiences = filter === 'todos' ? experiences : experiences.filter(exp => exp.type === filter);

    return (
      <section id="quest_log" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto scroll-mt-20">
        <div className="flex items-center space-x-4 mb-12">
          <Sword className={`w-8 h-8 md:w-12 md:h-12 ${t.cyanText}`} />
          <h2 className={`font-pixel text-xl md:text-3xl ${t.cyanText} uppercase tracking-wider`}>Quest Log (Xp)</h2>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-12 font-pixel text-[10px] md:text-xs">
          {['todos', 'dev', 'suporte'].map((f) => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`${t.retroBox} px-4 py-3 uppercase ${
                filter === f ? `${t.cyanBg} font-bold` : `${t.bg} ${t.textMuted}`
              }`}
            >
              {f === 'todos' ? 'Todas Quests' : f === 'dev' ? 'Dev Quests' : 'Suporte Quests'}
            </button>
          ))}
        </div>

        <div className="space-y-8">
          {filteredExperiences.map((exp) => (
            <div key={exp.id} className={`${t.retroBox} p-6 md:p-8 flex flex-col md:flex-row gap-6 ${exp.type === 'dev' ? `border-[4px] ${t.cyanBorder} ${t.questDevBg}` : `border-[4px] border-gray-500 ${t.questSupBg}`}`}>
              
              <div className="hidden md:flex flex-col items-center pt-2">
                <div className={`w-12 h-12 flex items-center justify-center border-4 ${exp.type === 'dev' ? `${t.cyanBorder} bg-black ${t.cyanText}` : `border-gray-400 bg-gray-800 text-gray-300`}`}>
                  {exp.type === 'dev' ? <Code2 size={24} /> : <Shield size={24} />}
                </div>
                <div className={`w-1 h-full mt-4 ${exp.type === 'dev' ? 'bg-cyan-400/30' : 'bg-gray-400/30'}`}></div>
              </div>

              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                  <div>
                    <h3 className={`font-pixel text-xs md:text-sm uppercase ${exp.type === 'dev' ? t.cyanText : t.text}`}>
                      {exp.role}
                    </h3>
                    <div className={`font-terminal text-xl ${t.yellowText} mt-2`}>
                      @ {exp.company}
                    </div>
                  </div>
                  <div className={`font-pixel text-[10px] px-3 py-2 mt-4 lg:mt-0 self-start border-2 ${isDark ? 'text-gray-400 bg-gray-900 border-gray-700' : 'text-slate-600 bg-slate-200 border-slate-300'}`}>
                    TIME: {exp.period}
                  </div>
                </div>
                <p className={`font-terminal text-xl md:text-2xl ${t.textMuted} leading-tight`}>
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const Education = () => (
    <section id="training" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-20">
      <div className="flex items-center space-x-4 mb-12">
        <Trophy className={`w-8 h-8 md:w-12 md:h-12 ${t.greenText}`} />
        <h2 className={`font-pixel text-xl md:text-3xl ${t.greenText} uppercase tracking-wider`}>Training Grounds</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {education.map(edu => (
          <div key={edu.id} className={`${t.retroBox} p-6 border-[4px] hover:${t.greenBorder} flex flex-col justify-between group`}>
            <div>
              <span className={`font-pixel text-[10px] ${t.greenText} mb-4 inline-block px-2 py-1 border ${t.greenBorder} ${isDark ? 'bg-green-900/30' : 'bg-emerald-100'}`}>
                {edu.type}
              </span>
              <h3 className={`font-pixel text-[10px] md:text-xs ${t.text} mb-4 leading-relaxed group-hover:${t.greenText} transition-colors`}>
                {edu.course}
              </h3>
              <p className={`font-terminal text-2xl ${t.textMuted}`}>
                {edu.institution}
              </p>
              {edu.details && (
                <p className={`font-terminal text-xl ${t.yellowText} mt-2 p-2 border-l-4 ${t.yellowBorder} ${isDark ? 'bg-yellow-900/20' : 'bg-amber-100'}`}>
                  ! {edu.details}
                </p>
              )}
            </div>
            <div className={`mt-8 pt-4 border-t-4 ${isDark ? 'border-gray-800 text-gray-500' : 'border-slate-300 text-slate-500'} font-pixel text-[10px]`}>
              COMPLETED: {edu.period}
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className={`min-h-screen ${t.bg} ${t.text} font-sans transition-colors duration-300 overflow-x-hidden relative selection:bg-pink-500 selection:text-white`}>
      <RetroStyles />
      <div className={`crt-overlay ${t.crtOpacity}`}></div>
      
      <Header />
      
      <main className="relative z-10">
        <Hero />
        <Lore />
        <Skills />
        <Experience />
        <Education />
      </main>
      
      <footer className={`py-12 mt-20 border-t-4 ${t.footerBg} text-center relative overflow-hidden transition-colors duration-300`}>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto px-4 flex flex-col items-center relative z-10">
          <h2 className="font-pixel text-red-500 text-2xl mb-8 animate-blink">
            GAME OVER?
          </h2>
          <p className={`font-pixel text-sm ${t.text} mb-8`}>
            INSERT COIN TO CONTINUE OR HIRE ME!
          </p>
          <div className="flex space-x-6 mb-8 font-pixel text-xs">
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className={`${t.retroBox} px-4 py-3 flex items-center`}>
              <Github size={16} className="mr-2" /> GITHUB
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className={`${t.retroBox} px-4 py-3 flex items-center`}>
              <Linkedin size={16} className="mr-2" /> LINKEDIN
            </a>
          </div>
          <p className={`font-terminal text-xl ${t.textMuted}`}>
            © {new Date().getFullYear()} Hugo_V. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}