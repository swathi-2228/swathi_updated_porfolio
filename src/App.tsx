import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, Terminal, Folder, FileText, Briefcase, Globe, Mail, MessageSquare, Github, Linkedin, 
  Search, X, Minus, Square, Play, Battery, Wifi, Volume2, Calendar, Clock, ArrowUpRight
} from 'lucide-react';
import { AppId, WindowState } from './types';
import { RESUME_DATA } from './constants';

const LoadingScreen = ({ onFinish }: { onFinish: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('Booting Swathi\'s Portfolio...');

  useEffect(() => {
    const messages = [
      'Booting Swathi\'s Portfolio...',
      'Loading profile data...',
      'Preparing skills and projects...',
      'Setting up creative workspace...',
      'Welcome module ready...'
    ];
    
    const messageInterval = setInterval(() => {
      setMessage(prev => {
        const index = messages.indexOf(prev);
        if (index < messages.length - 1) return messages[index + 1];
        return prev;
      });
    }, 800);

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          clearInterval(messageInterval);
          setTimeout(onFinish, 800);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 200);

    return () => {
      clearInterval(timer);
      clearInterval(messageInterval);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[1000] font-sans text-cyan-400">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 flex flex-col items-center"
      >
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white text-4xl font-black mb-6 shadow-[0_0_40px_rgba(6,182,212,0.3)]">S</div>
        <h1 className="text-xl font-bold tracking-[0.3em] uppercase text-white/90">Swathi S</h1>
      </motion.div>

      <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-4">
        <motion.div 
          className="h-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      <motion.div 
        key={message}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400/60"
      >
        {message}
      </motion.div>
    </div>
  );
};

interface WindowProps {
  key?: React.Key;
  window: WindowState; 
  onClose: () => void; 
  onMinimize: () => void; 
  onMaximize: () => void; 
  onFocus: () => void;
  children: React.ReactNode;
  title: string;
  icon: any;
}

const Window = ({ 
  window, 
  onClose, 
  onMinimize, 
  onMaximize, 
  onFocus, 
  children,
  title,
  icon: Icon
}: WindowProps) => {
  if (!window.isOpen || window.isMinimized) return null;

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 20 }}
      drag={!window.isMaximized}
      dragMomentum={false}
      onMouseDown={onFocus}
      className={`fixed ${window.isMaximized ? 'inset-0 m-0 rounded-none z-[800]' : 'top-12 md:top-12 left-2 sm:left-4 md:left-12 w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] md:w-[800px] h-[calc(100%-140px)] md:h-[550px] border border-white/20 rounded-3xl md:rounded-2xl shadow-2xl overflow-hidden z-[500]'} bg-slate-900/40 backdrop-blur-3xl flex flex-col`}
      style={{ zIndex: window.zIndex }}
    >
      {/* Window Header */}
      <div className="h-12 bg-white/5 flex items-center justify-between px-5 cursor-move border-b border-white/10 select-none group">
        <div className="flex items-center gap-3">
          <Icon size={18} className="text-cyan-400 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-semibold text-white/90 tracking-tight">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={(e) => { e.stopPropagation(); onMinimize(); }} className="hover:bg-white/10 p-2 rounded-lg transition-all active:scale-90">
            <Minus size={16} className="text-white/60" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onMaximize(); }} className="hover:bg-white/10 p-2 rounded-lg transition-all active:scale-90">
            <Square size={14} className="text-white/60" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="hover:bg-red-500/90 p-2 rounded-lg transition-all active:scale-90 flex items-center justify-center">
            <X size={16} className="text-white" />
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-auto p-6 md:p-8 md:pb-32 pb-40 scroll-smooth scrollbar-thin scrollbar-thumb-white/10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="pb-20"
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
};

// --- App Contents ---

const AboutApp = () => (
  <div className="max-w-3xl mx-auto space-y-12">
    <div className="flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left">
      <motion.div 
        initial={{ rotate: -10, scale: 0.8 }}
        animate={{ rotate: 0, scale: 1 }}
        className="w-56 h-76 md:w-72 md:h-96 rounded-[2.5rem] bg-slate-800/80 flex items-center justify-center relative border-4 border-white/20 shadow-2xl group overflow-hidden flex-shrink-0"
      >
         <div className="absolute top-0 inset-x-0 bottom-[46px] p-4 flex items-center justify-center overflow-hidden">
           <img 
             src="/images/about-profile.png" 
             alt="Swathi profile illustration" 
             className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-700" 
             referrerPolicy="no-referrer"
           />
         </div>
         <div className="absolute inset-x-0 bottom-0 py-3.5 bg-black/60 backdrop-blur-xl text-[10px] text-center font-black text-cyan-200 uppercase tracking-[0.3em] border-t border-white/10 select-none">
           Active Profile
         </div>
      </motion.div>
      <div className="flex-1 space-y-6">
        <div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2 uppercase">{RESUME_DATA.name}</h2>
          <p className="text-cyan-400 font-mono font-bold text-xl md:text-2xl tracking-widest uppercase">{RESUME_DATA.role}</p>
        </div>
        <div className="space-y-6">
          <p className="text-white/80 leading-relaxed text-sm sm:text-base md:text-xl italic bg-white/5 p-4 sm:p-6 rounded-[2rem] border border-white/10 shadow-inner">
            "{RESUME_DATA.summary}"
          </p>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
             {['Innovative Developer', 'Problem Solver', 'Tech Enthusiast', 'Software Engineer'].map(tag => (
               <span key={tag} className="px-3 sm:px-5 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[9px] sm:text-[11px] text-cyan-400 font-black uppercase tracking-widest whitespace-nowrap">{tag}</span>
             ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const EducationApp = () => (
  <div className="max-w-3xl mx-auto space-y-8 py-4">
    <div className="grid grid-cols-1 gap-8">
      {[
        { data: RESUME_DATA.education.college, icon: <Globe className="text-blue-400" /> },
        { data: RESUME_DATA.education.higherSecondary, icon: <FileText className="text-cyan-400" /> },
        { data: RESUME_DATA.education.secondary, icon: <Folder className="text-indigo-400" /> }
      ].map((edu, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-white/5 p-8 rounded-[2rem] border border-white/10 hover:border-cyan-500/30 transition-all group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full" />
          <div className="flex gap-6 items-start relative z-10">
            <div className="p-4 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform">
              {React.cloneElement(edu.icon as React.ReactElement, { size: 28 })}
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <h3 className="text-xl font-bold text-white tracking-tight">{edu.data.degree}</h3>
                <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full uppercase tracking-widest font-black h-fit w-fit">{edu.data.period}</span>
              </div>
              <p className="text-white/60 text-sm font-medium leading-relaxed">{edu.data.institution}</p>
              <div className="pt-2">
                <span className="text-sm font-black text-cyan-400/90">{edu.data.score}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const ExperienceApp = () => (
  <div className="max-w-3xl mx-auto space-y-12 py-8 relative">
    <div className="absolute left-[31px] md:left-[41px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-cyan-500/50 via-blue-500/20 to-transparent" />
    {RESUME_DATA.experience.map((exp: any, idx: number) => (
      <motion.div 
        key={idx}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex gap-8 md:gap-12 group last:mb-10"
      >
        <div className="relative z-10">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-900 border-2 border-cyan-500/30 rounded-3xl flex items-center justify-center group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all">
             <Briefcase size={28} className="text-cyan-400" />
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <div className="space-y-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <h3 className="text-2xl font-black text-white tracking-tight">{exp.role}</h3>
              <span className="text-[10px] font-mono font-black text-cyan-400/60 uppercase tracking-widest">{exp.period}</span>
            </div>
            <p className="text-cyan-400 text-sm font-bold uppercase tracking-widest">{exp.company}</p>
          </div>
          <ul className="space-y-3">
            {exp.points.map((point: string, i: number) => (
              <li key={i} className="flex gap-4 text-white/70 text-sm leading-relaxed group/item">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan-500/50 group-hover/item:bg-cyan-400 transition-colors flex-shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    ))}
  </div>
);

const SkillsApp = () => {
  const categories = [
    { title: "Front-End Development", skills: RESUME_DATA.skills.frontend, color: "from-blue-500 to-cyan-400", glow: "shadow-blue-500/20" },
    { title: "Backend Development", skills: RESUME_DATA.skills.backend, color: "from-purple-500 to-pink-500", glow: "shadow-purple-500/20" },
    { title: "Database Systems", skills: RESUME_DATA.skills.database, color: "from-green-500 to-emerald-400", glow: "shadow-green-500/20" },
    { title: "Frameworks", skills: RESUME_DATA.skills.frameworks, color: "from-orange-500 to-yellow-400", glow: "shadow-orange-500/20" },
    { title: "Tools & Environment", skills: RESUME_DATA.skills.tools, color: "from-slate-500 to-slate-300", glow: "shadow-white/10" }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
      {categories.map((cat, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          className={`bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:bg-white/[0.08] transition-all group relative overflow-hidden shadow-2xl ${cat.glow}`}
        >
          <div className="relative z-10">
            <h4 className="text-[11px] uppercase font-black tracking-[0.4em] text-white/40 mb-8 flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full bg-gradient-to-r ${cat.color} group-hover:scale-125 transition-transform`} />
              {cat.title}
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {cat.skills.map((skill: string) => (
                <motion.span 
                  key={skill}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`px-4 py-2.5 bg-gradient-to-r ${cat.color} bg-opacity-10 rounded-2xl text-white font-black text-[10px] uppercase tracking-widest ring-1 ring-white/10 shadow-xl`}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
          <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${cat.color} opacity-5 blur-3xl rounded-full group-hover:opacity-10 transition-opacity`} />
        </motion.div>
      ))}
    </div>
  );
};

const ProjectsExplorer = ({ onOpenProject }: { onOpenProject: (p: any) => void }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 p-4 h-full">
    {RESUME_DATA.projects.map((project, idx) => (
      <motion.div
        key={idx}
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onOpenProject(project)}
        className="flex flex-col items-center gap-4 group cursor-pointer"
      >
        <div className="relative p-6 bg-white/5 rounded-3xl border border-white/5 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/40 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-300">
           <Folder size={64} className="text-yellow-400 fill-yellow-400/20 group-hover:fill-cyan-400/20 transition-colors" />
           <motion.div 
              className="absolute -top-1 -right-1 w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              initial={false}
           >
              <ArrowUpRight size={10} className="text-white" />
           </motion.div>
        </div>
        <div className="text-center space-y-1">
          <p className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors truncate w-32">{project.title.split('–')[0]}</p>
          <p className="text-[10px] text-white/30 uppercase tracking-tighter">{project.tech}</p>
        </div>
      </motion.div>
    ))}
  </div>
);

const ProjectDetail = ({ project, onBack }: { project: any; onBack: () => void }) => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300 h-full overflow-auto">
    <button onClick={onBack} className="text-cyan-400 text-xs font-bold flex items-center gap-2 hover:translate-x-[-4px] transition-transform">
       ← Back to Explorer
    </button>
    <div className="flex flex-col md:flex-row gap-10">
      <div className="w-full md:w-1/3 aspect-video bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden group">
         {project.image ? (
           <img
             src={project.image}
             alt={`${project.title} illustration`}
             referrerPolicy="no-referrer"
             className="w-full h-full object-contain object-center group-hover:scale-110 transition-transform duration-700"
           />
         ) : (
           <Folder size={64} className="text-white/10 group-hover:scale-110 transition-transform duration-700" />
         )}
      </div>
      <div className="flex-1 space-y-4">
        <h2 className="text-3xl font-extrabold tracking-tight text-white">{project.title}</h2>
        <div className="flex flex-wrap gap-2">
           {project.tech.split(',').map((t: string) => (
             <span key={t} className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] text-cyan-400 font-bold uppercase">{t.trim()}</span>
           ))}
        </div>
        <div className="space-y-4 py-4">
          <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest">Key Features</h4>
          <ul className="space-y-2">
            {project.features.map((f: string, i: number) => (
              <li key={i} className="flex gap-3 text-sm text-white/70">
                <span className="text-cyan-500 mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-4 pt-4 border-t border-white/5">
           <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 text-sm">
             Source Code <Github size={18} />
           </button>
        </div>
      </div>
    </div>
  </div>
);

const WelcomePopup = ({ onAccept, onCancel }: { onAccept: () => void; onCancel: () => void }) => (
  <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 md:p-12 max-w-lg w-full shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] space-y-8"
    >
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-gradient-to-tr from-cyan-600 to-indigo-600 rounded-3xl mx-auto flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-cyan-900/20">S</div>
        <h2 className="text-3xl font-black text-white tracking-tight">Welcome to Swathi's Portfolio</h2>
        <p className="text-white/60 text-base leading-relaxed">
          Click the icons to know more about me, my skills, projects, experience, and services.
        </p>
        <p className="text-cyan-400 font-bold tracking-widest text-sm uppercase">Are you ready to explore?</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={onAccept}
          className="flex-1 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-black rounded-2xl transition-all shadow-[0_15px_30px_rgba(6,182,212,0.3)] hover:-translate-y-1 active:translate-y-0"
        >
          LET'S GO!
        </button>
        <button 
          onClick={onCancel}
          className="flex-1 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black rounded-2xl transition-all hover:text-red-400"
        >
          CANCEL
        </button>
      </div>
    </motion.div>
  </div>
);

const ShutdownScreen = ({ onRestart, onHire }: { onRestart: () => void; onHire: () => void }) => (
  <div className="fixed inset-0 z-[3000] bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-10 max-w-md"
    >
      <div className="space-y-4">
        <div className="w-16 h-16 bg-red-500/10 rounded-full mx-auto flex items-center justify-center text-red-500 mb-6">
           <Battery size={32} className="rotate-90 opacity-40" />
        </div>
        <h2 className="text-4xl font-black text-white tracking-tighter">Portfolio Shutdown</h2>
        <p className="text-white/50 text-lg">
          Thank you for visiting Swathi's portfolio.<br/>You can come back anytime.
        </p>
      </div>
      
      <div className="flex flex-col gap-4">
        <button 
          onClick={onRestart}
          className="w-full py-5 bg-white/10 hover:bg-white/20 text-white font-black rounded-2xl transition-all border border-white/5 flex items-center justify-center gap-3"
        >
          <Play size={20} className="fill-white" /> RESTART PORTFOLIO
        </button>
        <button 
          onClick={onHire}
          className="w-full py-5 bg-cyan-600 hover:bg-cyan-500 text-white font-black rounded-2xl transition-all shadow-[0_15px_30px_rgba(6,182,212,0.3)]"
        >
          HIRE ME
        </button>
      </div>
      
      <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-white/20 mt-12">
        You may now safely close this tab
      </p>
    </motion.div>
  </div>
);

const HireMePopup = ({ onClose }: { onClose: () => void }) => {
  const hireOptions = [
    {
      label: "Contact on WhatsApp",
      icon: <MessageSquare size={24} />,
      color: "bg-[#25D366]",
      href: "https://wa.me/919025467385?text=Hi Swathi, I visited your portfolio and I would like to discuss a job or project opportunity."
    },
    {
      label: "Send an Email",
      icon: <Mail size={24} />,
      color: "bg-[#EA4335]",
      href: "mailto:swathysuresh114@gmail.com",
      isMail: true
    }
  ];

  return (
    <div className="fixed inset-0 z-[2500] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 md:p-10 max-w-md w-full shadow-2xl relative"
      >
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full text-white/40 hover:text-white">
          <X size={20} />
        </button>
        <div className="text-center mb-10">
          <h3 className="text-3xl font-black text-white tracking-tight uppercase">Hire Me</h3>
          <p className="text-white/40 text-sm mt-2">Let's build something amazing together</p>
        </div>
        <div className="space-y-4">
          {hireOptions.map((opt: any, i) => (
            <a 
              key={i} 
              href={opt.href} 
              target={opt.isMail ? undefined : "_blank"} 
              rel={opt.isMail ? undefined : "noreferrer"}
              className={`flex items-center gap-5 p-5 ${opt.color} rounded-2xl text-white font-bold transition-all hover:scale-[1.02] shadow-lg`}
            >
              {opt.icon}
              {opt.label}
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const ResumeViewer = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 bg-slate-900/50 rounded-3xl border border-white/5 relative min-h-[400px]">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="group flex flex-col items-center justify-center p-8 bg-white/5 hover:bg-white/10 border-2 border-dashed border-white/10 hover:border-cyan-500/50 rounded-[2rem] w-full max-w-sm aspect-[1.1/1] transition-all relative select-none shadow-2xl"
      >
        <div className="w-20 h-20 bg-red-500/10 rounded-2xl flex items-center justify-center mb-4 ring-1 ring-red-500/20 group-hover:scale-110 transition-transform">
          <FileText size={40} className="text-red-500" />
        </div>
        <div className="text-center space-y-1 mb-6">
          <p className="text-base font-bold text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors">Swathi_S_Resume.pdf</p>
          <span className="text-xs text-white/40 font-semibold uppercase tracking-widest block bg-white/5 py-1 px-3 rounded-full mt-2">
            Original Resume PDF
          </span>
        </div>

        {/* Download Action only */}
        <div className="w-full max-w-[200px]">
          <a
            href="/Swathi_S_Resume.pdf"
            download="Swathi_S_Resume.pdf"
            className="flex items-center justify-center gap-2 p-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-95 text-xs uppercase shadow-lg shadow-cyan-950/20"
          >
            <FileText size={14} /> Download
          </a>
        </div>
      </motion.div>
    </div>
  );
};

const ServicesApp = ({ onSelectService }: { onSelectService: (s: string) => void }) => (
  <div className="space-y-10">
    <div className="text-center md:text-left">
       <h2 className="text-4xl font-black text-white tracking-tighter">What service do you want?</h2>
       <p className="text-white/40 text-sm font-bold uppercase tracking-widest mt-2">{RESUME_DATA.name} Professional Services</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
      {RESUME_DATA.services.map((service, idx) => (
        <motion.div
          key={idx}
          whileHover={{ scale: 1.05, y: -5 }}
          className="p-6 md:p-8 bg-white/5 border border-white/5 rounded-[2rem] md:rounded-[2.5rem] hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all group flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
             {service.icon}
          </div>
          <div className="space-y-2 mb-6">
            <h3 className="text-white font-black text-lg group-hover:text-cyan-400 transition-colors uppercase tracking-tight">{service.title}</h3>
            <p className="text-white/40 text-xs leading-relaxed min-h-[40px]">{service.description}</p>
          </div>
          <button 
            onClick={() => onSelectService(service.title)}
            className="w-full py-3 bg-white/5 hover:bg-cyan-600 border border-white/10 hover:border-transparent rounded-2xl text-[10px] font-black text-white uppercase tracking-[0.2em] transition-all"
          >
            Enquire Now
          </button>
        </motion.div>
      ))}
    </div>
  </div>
);

const ContactFormApp = ({ prefilledMessage }: { prefilledMessage?: string }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: prefilledMessage || ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (prefilledMessage) setFormData(prev => ({ ...prev, message: prefilledMessage }));
  }, [prefilledMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.name || !formData.phone || !formData.email || !formData.message) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    const text = `Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nMessage: ${formData.message}`;
    const encoded = encodeURIComponent(text);
    const whatsappNumber = "919025467385";

    setTimeout(() => {
      window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, '_blank');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto py-4">
      <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Contact Form</h2>
          <p className="text-cyan-400/60 text-xs font-black uppercase tracking-[0.3em]">Initialize Secure Transmission</p>
        </div>
        
        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs font-bold text-center">
             {error}
          </motion.div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black text-white/30 tracking-[0.2em] ml-4">Full Name *</label>
            <input 
              placeholder="Your Name"
              className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] px-6 py-4 text-white text-sm outline-none focus:border-cyan-500 transition-all font-medium"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black text-white/30 tracking-[0.2em] ml-4">Email Address *</label>
              <input 
                placeholder="email@example.com"
                type="email"
                className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] px-6 py-4 text-white text-sm outline-none focus:border-cyan-500 transition-all font-medium"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black text-white/30 tracking-[0.2em] ml-4">Phone Number *</label>
              <input 
                placeholder="+91..."
                className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] px-6 py-4 text-white text-sm outline-none focus:border-cyan-500 transition-all font-medium"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black text-white/30 tracking-[0.2em] ml-4">Your Message *</label>
            <textarea 
              placeholder="What are we building today?"
              rows={5}
              className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] px-6 py-4 text-white text-sm outline-none focus:border-cyan-500 transition-all resize-none font-medium"
              value={formData.message}
              onChange={e => setFormData({...formData, message: e.target.value})}
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-black py-5 rounded-[1.5rem] transition-all flex items-center justify-center gap-3 shadow-[0_15px_40px_rgba(6,182,212,0.3)] hover:-translate-y-1 active:translate-y-0"
            disabled={loading}
          >
            {loading ? <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" /> : <>TRANSMIT TO WHATSAPP <MessageSquare size={18} /></>}
          </button>
        </form>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [booting, setBooting] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [isShutdown, setIsShutdown] = useState(false);
  const [showHireMe, setShowHireMe] = useState(false);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [contactPrefill, setContactPrefill] = useState('');
  const maxZIndex = useRef(100);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const openApp = (id: AppId, prefill?: string) => {
    setStartMenuOpen(false);
    
    // Direct link apps
    if (id === 'gmail') {
        window.open('mailto:swathysuresh114@gmail.com', '_blank');
      return;
    }
    if (id === 'whatsapp') {
      window.open('https://wa.me/919025467385?text=Hi Swathi, I saw your portfolio and I would like to discuss a job or project opportunity.', '_blank');
      return;
    }
    if (id === 'github') {
      window.open('https://github.com/swathi-2228', '_blank');
      return;
    }
    if (id === 'linkedin') {
      window.open('https://www.linkedin.com/in/swathi-suresh-a53a10257/', '_blank');
      return;
    }

    // Windowed apps
    if (prefill) setContactPrefill(prefill);
    
    const existing = windows.find(w => w.id === id);
    if (existing) {
      setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: true, isMinimized: false, zIndex: ++maxZIndex.current } : w));
    } else {
      setWindows(prev => [...prev, { id, isOpen: true, isMinimized: false, isMaximized: false, zIndex: ++maxZIndex.current }]);
    }
  };

  const closeWindow = (id: AppId) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: false } : w));
    if(id === 'projects') setSelectedProject(null);
  };

  const toggleMinimize = (id: AppId) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: !w.isMinimized, zIndex: !w.isMinimized ? w.zIndex : ++maxZIndex.current } : w));
  };

  const toggleMaximize = (id: AppId) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
  };

  const focusWindow = (id: AppId) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: ++maxZIndex.current } : w));
  };

  const appIcons: { id: AppId; label: string; icon: any; color: string }[] = [
    { id: 'about', label: 'About', icon: User, color: 'bg-blue-600' },
    { id: 'education', label: 'Education', icon: Globe, color: 'bg-indigo-600' },
    { id: 'experience', label: 'Experience', icon: Briefcase, color: 'bg-emerald-600' },
    { id: 'skills', label: 'Skills', icon: Terminal, color: 'bg-slate-700' },
    { id: 'projects', label: 'Projects', icon: Folder, color: 'bg-yellow-500' },
    { id: 'resume', label: 'Resume', icon: FileText, color: 'bg-red-600' },
    { id: 'services', label: 'Services', icon: Briefcase, color: 'bg-violet-600' },
    { id: 'contact', label: 'Contact', icon: Mail, color: 'bg-cyan-600' },
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare, color: 'bg-[#25D366]' },
    { id: 'gmail', label: 'Gmail', icon: Mail, color: 'bg-[#EA4335]' },
    { id: 'github', label: 'GitHub', icon: Github, color: 'bg-black' },
    { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, color: 'bg-[#0077B5]' },
  ];

  const filteredApps = appIcons.filter(app => app.label.toLowerCase().includes(searchQuery.toLowerCase()));

  if (booting) return <LoadingScreen onFinish={() => { setBooting(false); setShowWelcome(true); }} />;
  if (isShutdown) return <ShutdownScreen onRestart={() => setIsShutdown(false)} onHire={() => setShowHireMe(true)} />;

  return (
    <main className="h-screen w-full overflow-hidden relative select-none font-sans text-white bg-slate-950">
      {showWelcome && <WelcomePopup onAccept={() => setShowWelcome(false)} onCancel={() => setIsShutdown(true)} />}
      {showHireMe && <HireMePopup onClose={() => setShowHireMe(false)} />}
      
      {/* Background with Grid & Particles Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950 via-slate-950 to-cyan-950" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:100px_100px]" />
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] opacity-30 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-500/20 blur-[150px] rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/20 blur-[180px] rounded-full animate-pulse [animation-delay:2s]" />
        </div>
      </div>

      {/* Desktop Icons */}
      <div className="absolute inset-0 p-4 md:p-8 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-none md:flex md:flex-col md:flex-wrap gap-4 md:gap-x-12 md:gap-y-12 content-start h-[calc(100%-4.5rem)] md:h-[calc(100%-5rem)] z-10 overflow-auto md:overflow-hidden scrollbar-none">
        {appIcons.map((app) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: appIcons.indexOf(app) * 0.05 + 0.5 }}
            className="w-full md:w-24"
          >
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.05)' }}
              whileTap={{ scale: 0.95 }}
              onDoubleClick={(e) => { e.preventDefault(); openApp(app.id); }}
              onClick={() => { if(window.innerWidth < 768) openApp(app.id) }}
              className="flex flex-col items-center gap-2 group w-full p-2 md:p-3 rounded-2xl transition-all cursor-default relative"
            >
              <div className={`w-14 h-14 md:w-16 md:h-16 ${app.color} rounded-2xl flex items-center justify-center shadow-xl relative overflow-hidden ring-1 ring-white/20 transition-transform group-hover:scale-105`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <app.icon size={28} className="text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-cyan-400 opacity-0 blur-xl group-hover:opacity-30 transition-all duration-500 scale-150" />
              </div>
              <span className="text-[10px] md:text-[11px] font-bold text-white shadow-black drop-shadow-md text-center bg-black/20 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/5 truncate w-full">{app.label}</span>
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Active Windows */}
      <AnimatePresence>
        {windows.map(w => {
          const config = appIcons.find(icon => icon.id === w.id);
          if (!config) return null;
          
          let content = null;
          switch(w.id) {
            case 'about': content = <AboutApp />; break;
            case 'education': content = <EducationApp />; break;
            case 'experience': content = <ExperienceApp />; break;
            case 'skills': content = <SkillsApp />; break;
            case 'projects': 
              content = selectedProject ? 
                <ProjectDetail project={selectedProject} onBack={() => setSelectedProject(null)} /> : 
                <ProjectsExplorer onOpenProject={setSelectedProject} />; 
              break;
            case 'resume': content = <ResumeViewer />; break;
            case 'services': content = <ServicesApp onSelectService={(s) => openApp('contact', `I need help with ${s.toLowerCase()} development.`)} />; break;
            case 'contact': content = <ContactFormApp prefilledMessage={contactPrefill} />; break;
            default: content = null;
          }

          return (
            <Window 
              key={w.id}
              window={w}
              title={config.label}
              icon={config.icon}
              onClose={() => closeWindow(w.id)}
              onMinimize={() => toggleMinimize(w.id)}
              onMaximize={() => toggleMaximize(w.id)}
              onFocus={() => focusWindow(w.id)}
            >
              {content}
            </Window>
          );
        })}
      </AnimatePresence>

      {/* Taskbar */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "backOut", delay: 1 }}
        className="absolute bottom-0 left-0 right-0 h-16 md:h-18 bg-black/40 backdrop-blur-3xl border-t border-white/10 flex items-center justify-between px-3 md:px-8 z-[1000]"
      >
        <div className="flex items-center gap-1.5 md:gap-5 h-full">
          {/* Start Button */}
          <button 
            onClick={() => setStartMenuOpen(!startMenuOpen)}
            className={`h-11 w-11 md:h-12 md:w-12 rounded-xl md:rounded-2xl flex items-center justify-center transition-all group ${startMenuOpen ? 'bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.5)]' : 'bg-white/5 hover:bg-white/10'}`}
          >
             <div className={`grid grid-cols-2 gap-0.5 md:gap-1 group-hover:scale-110 transition-transform ${startMenuOpen ? 'text-white' : 'text-cyan-400'}`}>
                <div className="w-1.5 h-1.5 bg-current rounded-full" />
                <div className="w-1.5 h-1.5 bg-current rounded-full opacity-50" />
                <div className="w-1.5 h-1.5 bg-current rounded-full opacity-50" />
                <div className="w-1.5 h-1.5 bg-current rounded-full" />
             </div>
          </button>

          {/* Taskbar Apps */}
          <div className="h-full flex items-center gap-1 md:gap-2">
            {windows.filter(w => w.isOpen).map(w => {
              const config = appIcons.find(icon => icon.id === w.id);
              if (!config) return null;
              return (
                <motion.button
                  key={w.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={() => toggleMinimize(w.id)}
                  className={`h-11 w-11 md:w-14 rounded-xl flex flex-col items-center justify-center transition-all ${w.isMinimized ? 'bg-white/5 opacity-50' : 'bg-white/10 ring-1 ring-white/10'}`}
                >
                  <config.icon size={18} className="text-white" />
                  <div className="w-1.5 h-0.5 bg-cyan-400 rounded-full mt-1 md:mt-1.5 shadow-[0_0_5px_rgba(6,182,212,1)]" />
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* System Monitoring Stats (System Tray) */}
        <div className="flex items-center gap-2 md:gap-8 text-white/90">
          <button 
            onClick={() => setShowHireMe(true)}
            className="hidden sm:flex px-4 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 rounded-full text-[10px] font-black text-cyan-400 group transition-all"
          >
            HIRE ME
            <div className="ml-2 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse blur-[1px]" />
          </button>
          <div className="hidden lg:flex items-center gap-6 font-mono text-[10px] tracking-widest text-cyan-400/60 font-bold">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 border-2 border-green-500 rounded-full animate-ping" />
                SYNCED
             </div>
             <div className="flex items-center gap-2">
                <Wifi size={14} className="text-white/40" />
                900MB/S
             </div>
             <div className="flex items-center gap-2">
                <Battery size={14} className="rotate-90 text-white/40" />
                CORE ACTIVE
             </div>
          </div>
          <div className="flex flex-col items-end border-l border-white/10 pl-3 md:pl-8">
             <span className="text-xs sm:text-sm md:text-base font-black tracking-tight">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
             <span className="text-[8px] md:text-[10px] uppercase font-bold opacity-40 leading-none mt-1 tracking-widest">{currentTime.toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short' })}</span>
          </div>
        </div>
      </motion.div>

      {/* Start Menu */}
      <AnimatePresence>
        {startMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setStartMenuOpen(false)}
              className="fixed inset-0 z-[998] bg-black/20" 
            />
            <motion.div
              initial={{ y: 200, scale: 0.9, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 200, scale: 0.9, opacity: 0 }}
              className="absolute bottom-20 md:bottom-24 left-4 md:left-8 w-[calc(100%-2rem)] md:w-[480px] h-[450px] md:h-[600px] bg-slate-900/40 backdrop-blur-[60px] border border-white/10 rounded-[32px] shadow-[0_50px_100px_-12px_rgba(0,0,0,0.8)] z-[999] p-8 flex flex-col overflow-hidden"
            >
              {/* Decorative Blur Background inside menu */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-600/10 blur-3xl rounded-full" />
              
              <div className="relative z-10 flex flex-col h-full">
                {/* Header Profile */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center relative border border-white/20 shadow-lg shadow-cyan-900/20 overflow-hidden">
                       <img 
                         src="/profile.svg" 
                         alt="S" 
                         className="w-full h-full object-cover object-[center_top]"
                         onError={(e) => {
                           (e.target as HTMLImageElement).style.display = 'none';
                           (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                         }}
                       />
                       <div className="hidden absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-cyan-600 to-indigo-600 font-black text-xl text-white">S</div>
                    </div>
                    <div>
                      <div className="text-lg font-black tracking-tight text-white">{RESUME_DATA.name}</div>
                      <div className="text-[10px] text-cyan-400/60 uppercase tracking-[0.2em] font-bold">Authenticated User</div>
                    </div>
                  </div>
                  <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all">
                    <Play size={18} className="text-white opacity-40 rotate-90" />
                  </button>
                </div>

                {/* Search Engine */}
                <div className="relative mb-8 group">
                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyan-400 transition-colors" size={18} />
                   <input 
                    autoFocus
                    placeholder="Search Swathi's system..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm outline-none focus:border-cyan-500/40 focus:bg-white/10 transition-all font-medium placeholder:text-white/20"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                   />
                </div>

                {/* Apps Grid */}
                <div className="flex-1 overflow-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 space-y-8">
                  <div className="space-y-4">
                    <h4 className="text-[10px] uppercase font-black text-white/20 tracking-[0.3em] ml-2">Core Applications</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {filteredApps.map(app => (
                        <motion.button
                          key={app.id}
                          whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.05)' }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => openApp(app.id)}
                          className="flex flex-col items-center justify-center gap-3 p-4 rounded-2xl transition-all group"
                        >
                          <div className={`w-11 h-11 ${app.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]`}>
                            <app.icon size={22} className="text-white" />
                          </div>
                          <span className="text-[11px] font-bold opacity-50 group-hover:opacity-100 transition-opacity tracking-tight">{app.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  
                </div>

                {/* Bottom Profile Bar */}
                <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => { setStartMenuOpen(false); setShowHireMe(true); }}
                      className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-black rounded-xl transition-all shadow-[0_5px_15px_rgba(6,182,212,0.3)]"
                    >
                      HIRE ME
                    </button>
                    <button 
                      onClick={() => { setStartMenuOpen(false); setIsShutdown(true); }}
                      className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 text-xs font-black rounded-xl transition-all border border-red-500/20"
                    >
                      SHUTDOWN
                    </button>
                  </div>
                  <div className="flex gap-4">
                     <button className="text-white/40 hover:text-white transition-colors" title="Settings"><Search size={18} /></button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
