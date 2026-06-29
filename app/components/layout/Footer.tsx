"use client";

import { useRef, useState, useEffect } from "react";
import { 
  Compass, ArrowUpRight, Globe, Clock, CloudSun, Users, Bookmark, Map, PhoneCall, Plane 
} from "lucide-react";

export function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  
  const [, setFooterMouseX] = useState(0);
  const [, setFooterMouseY] = useState(0);
  const [shootingStarActive, setShootingStarActive] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const starInterval = setInterval(() => {
      if (Math.random() > 0.6) {
        setShootingStarActive(true);
        setTimeout(() => setShootingStarActive(false), 2500);
      }
    }, 12000);
    return () => clearInterval(starInterval);
  }, []);

  return (
    <>
      {/* ====================================================
          RESPONSIVE MOBILE STICKY FLOATING NAV / ACTIONS
          ==================================================== */}
      <div className="fixed bottom-6 inset-x-4 z-[48] md:hidden pointer-events-none flex flex-col items-center">
        <div className="w-full max-w-md rounded-full bg-black/75 border border-white/8 backdrop-blur-xl p-2.5 shadow-2xl flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-3 pl-3">
            <Compass className="w-5 h-5 text-amber-400 animate-spin [animation-duration:8s]" />
            <div className="text-left">
              <div className="text-[11px] font-bold text-white tracking-wide uppercase leading-none">AVN Holidays</div>
              <span className="text-[9px] text-zinc-400">Design your escape</span>
            </div>
          </div>
          <button className="bg-amber-400 hover:bg-amber-500 text-black text-xs font-bold uppercase tracking-wider py-2.5 px-5 rounded-full flex items-center gap-1.5 transition-colors">
            <span>Inquire</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <footer
        ref={footerRef}
        onMouseMove={(e) => {
          const r = footerRef.current?.getBoundingClientRect();
          if (r) {
            setFooterMouseX((e.clientX - r.left) / r.width);
            setFooterMouseY((e.clientY - r.top)  / r.height);
          }
        }}
        className="relative w-full min-h-[120vh] overflow-hidden bg-[#060810] z-20 select-none"
      >
        <div className="absolute inset-0 pointer-events-none z-0">
          {Array.from({ length: 110 }).map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute rounded-full bg-white animate-star-twinkle-footer"
              style={{
                left: `${Math.random() * 100}%`,
                top:  `${Math.random() * 100}%`,
                width: `${Math.random() < 0.12 ? 2 : 1}px`,
                height: `${Math.random() < 0.12 ? 2 : 1}px`,
                animationDelay: `${(i * 0.19).toFixed(2)}s`,
                animationDuration: `${(2.8 + Math.random() * 4).toFixed(1)}s`,
                opacity: Math.random() * 0.5 + 0.1
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 pointer-events-none z-1">
          <div className="absolute w-[700px] h-[300px] rounded-full blur-[120px] opacity-10 animate-aurora-footer" style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.6) 0%, transparent 70%)", left: "10%", top: "15%" }} />
          <div className="absolute w-[500px] h-[250px] rounded-full blur-[100px] opacity-8 animate-aurora-footer" style={{ background: "radial-gradient(ellipse, rgba(20,184,166,0.5) 0%, transparent 70%)", right: "8%", top: "25%", animationDelay: "6s" }} />
          <div className="absolute w-[400px] h-[200px] rounded-full blur-[80px] opacity-12 animate-aurora-footer" style={{ background: "radial-gradient(ellipse, rgba(251,191,36,0.35) 0%, transparent 70%)", left: "40%", bottom: "30%", animationDelay: "12s" }} />
        </div>

        <div className="absolute inset-0 pointer-events-none z-1">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`fp-${i}`}
              className="absolute w-0.5 h-0.5 rounded-full bg-amber-400/60 animate-particle-drift"
              style={{
                left: `${5 + (i * 4.7) % 90}%`,
                bottom: `${10 + (i * 3.1) % 60}%`,
                "--dx": `${(Math.random() - 0.5) * 60}px`,
                "--dy": `-${60 + Math.random() * 60}px`,
                "--dur": `${6 + Math.random() * 8}s`,
                animationDelay: `${Math.random() * 8}s`
              } as React.CSSProperties}
            />
          ))}
        </div>

        {shootingStarActive && (
          <div className="absolute z-10 pointer-events-none" style={{ left: `${10 + Math.random() * 40}%`, top: `${5 + Math.random() * 25}%` }}>
            <div className="h-[1.5px] bg-gradient-to-r from-transparent via-white to-white/10 animate-shooting-star rounded-full" />
          </div>
        )}

        <div className="hidden md:block relative z-10 px-14 pt-24 pb-16">
          <div className="flex items-start justify-between gap-16 mb-20">
            <div className="flex-1 max-w-[520px]">
              <span className="text-[8.5px] font-bold uppercase tracking-[0.3em] text-amber-400 flex items-center gap-2 mb-7">
                <Globe className="w-3 h-3" /> AVN Holidays
              </span>
              <h2 className="text-5xl xl:text-6xl font-sans text-white leading-none tracking-tight mb-7">
                <span className="block font-light opacity-90">The World</span>
                <span className="block font-serif italic text-amber-400 font-normal mt-1">Will Always</span>
                <span className="block font-semibold mt-1">Be Waiting.</span>
              </h2>
              <p className="text-zinc-500 text-xs leading-relaxed font-light max-w-[400px]">
                Thank you for letting AVN Holidays become part of your future memories. Wherever your next chapter takes you, we'll be there — quietly ensuring every moment is extraordinary.
              </p>

              <div className="mt-10">
                <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 mb-4">
                  Receive Travel Inspiration
                </p>
                <div className="flex gap-3 max-w-sm">
                  <div className="flex-1 relative">
                    <input type="email" placeholder="your@email.com" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} className="w-full bg-white/[0.04] border border-white/10 focus:border-amber-400/50 rounded-full px-4 py-3 text-[11px] text-white placeholder:text-zinc-600 outline-none transition-colors backdrop-blur-sm" />
                  </div>
                  <button className="bg-amber-400 hover:bg-amber-300 text-black text-[10px] font-bold uppercase tracking-wider px-5 py-3 rounded-full transition-colors whitespace-nowrap">Subscribe</button>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 flex flex-col items-center gap-5">
              <div className="relative w-[260px] h-[260px] rounded-full overflow-hidden border border-white/8 shadow-[0_0_60px_rgba(99,102,241,0.15),0_0_120px_rgba(251,191,36,0.06)]" style={{ background: "radial-gradient(circle at 35% 35%, rgba(99,102,241,0.2) 0%, rgba(6,8,16,0.95) 70%)" }}>
                <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-transparent to-white/5 z-20 pointer-events-none" />
                <div className="absolute inset-0 shadow-[inset_-20px_-20px_50px_rgba(0,0,0,0.9),inset_15px_15px_40px_rgba(255,255,255,0.04)] z-20 pointer-events-none" />

                <div className="absolute inset-y-0 left-0 w-[200%] h-full flex animate-globe-rotate z-10" style={{ willChange: "transform" }}>
                  {[0,1].map(t => (
                    <div key={t} className="w-1/2 h-full relative flex-shrink-0">
                      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)", backgroundSize: "14px 14px" }} />
                      <svg viewBox="0 0 500 260" className="absolute inset-0 w-full h-full fill-indigo-400/10 stroke-indigo-300/10 stroke-[0.5]">
                        <path d="M50 60 Q90 90 110 140 T130 250 Q100 250 80 180 T50 80 Z" />
                        <path d="M200 50 Q280 30 400 60 T490 90 Q460 200 400 240 Q300 200 240 180 T200 50 Z" />
                        <path d="M230 100 Q280 130 310 200 Q230 240 200 190 Z" />
                        <path d="M420 200 Q450 205 460 230 T430 240 Z" />
                      </svg>
                      {[
                        { x: "50%", y: "28%", color: "#FBBF24" },
                        { x: "62%", y: "38%", color: "#38BDF8" },
                        { x: "72%", y: "46%", color: "#34D399" },
                        { x: "30%", y: "32%", color: "#F472B6" },
                      ].map((m, mi) => (
                        <div key={mi} className="absolute" style={{ left: m.x, top: m.y }}>
                          <span className="w-1.5 h-1.5 rounded-full block relative z-10" style={{ background: m.color }} />
                          <span className="absolute -inset-1 rounded-full opacity-50 animate-marker-pulse" style={{ background: m.color + "40" }} />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="absolute inset-y-0 left-0 w-[200%] h-full flex animate-globe-cloud-rotate z-15 opacity-20 pointer-events-none" style={{ willChange: "transform" }}>
                  {[0,1].map(t => (
                    <div key={t} className="w-1/2 h-full relative flex-shrink-0">
                      <div className="absolute inset-0 opacity-60" style={{ backgroundImage: "radial-gradient(ellipse 60px 20px, rgba(255,255,255,0.15) 0%, transparent 70%)", backgroundSize: "120px 80px", backgroundPosition: "0 20%, 40px 60%" }} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative w-14 h-14 flex items-center justify-center">
                <div className="animate-orbit-dot absolute">
                  <Plane className="w-2.5 h-2.5 text-amber-400/70 -rotate-45" />
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400/30" />
              </div>
            </div>

            <div className="flex-1 max-w-[280px] flex flex-col gap-3 pt-4">
              <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-zinc-500 mb-1">Live Telemetry</p>
              {[
                { label: "Local Time", value: localTime || "—", icon: Clock },
                { label: "Weather", value: "28°C · Partly Cloudy", icon: CloudSun },
                { label: "Travelers Today", value: "1,248 Active", icon: Users },
                { label: "Countries Connected", value: "45 Nations", icon: Globe },
                { label: "Hotel Partners", value: "850+ Worldwide", icon: Bookmark },
              ].map(({ label, value, icon: Icon }, wi) => (
                <div key={label} className="animate-float-island glass-card rounded-2xl px-4 py-3 flex items-center gap-3" style={{ animationDelay: `${wi * 0.9}s`, animationDuration: `${5 + wi * 0.7}s` }}>
                  <Icon className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <div>
                    <div className="text-[8px] text-zinc-600 uppercase tracking-widest leading-none">{label}</div>
                    <div className="text-[11px] text-white font-semibold mt-0.5">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mb-20">
            <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-zinc-600 mb-8">Explore</p>
            <div className="relative w-full h-32">
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 128">
                {[
                  [120, 64, 240, 38], [240, 38, 360, 76], [360, 76, 480, 30],
                  [480, 30, 600, 64], [600, 64, 720, 28], [720, 28, 840, 72],
                  [840, 72, 960, 36], [960, 36, 1080, 68], [1080, 68, 1190, 44],
                  [240, 38, 480, 30], [480, 30, 720, 28], [720, 28, 960, 36],
                ].map(([x1,y1,x2,y2], li) => (
                  <line key={li} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(251,191,36,0.15)" strokeWidth="0.8" className="animate-constellation-pulse" style={{ animationDelay: `${li * 0.3}s` }} />
                ))}
              </svg>

              {[
                { label: "Home", x: 120, y: 64 }, { label: "Destinations", x: 240, y: 38 },
                { label: "Hotels", x: 360, y: 76 }, { label: "Packages", x: 480, y: 30 },
                { label: "Corporate", x: 600, y: 64 }, { label: "Saver Club", x: 720, y: 28 },
                { label: "About", x: 840, y: 72 }, { label: "Blog", x: 960, y: 36 },
                { label: "Gallery", x: 1080, y: 68 }, { label: "Contact", x: 1190, y: 44 },
              ].map(({ label, x, y }, si) => (
                <div key={label} className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group" style={{ left: `${(x / 1200) * 100}%`, top: `${(y / 128) * 100}%` }} onMouseEnter={() => setHoveredStar(si)} onMouseLeave={() => setHoveredStar(null)}>
                  <div className={`rounded-full bg-amber-400 transition-all duration-300 ${hoveredStar === si ? "w-3.5 h-3.5 shadow-[0_0_14px_rgba(251,191,36,0.8)]" : "w-2 h-2 opacity-60 group-hover:opacity-100 animate-star-twinkle-footer"}`} style={{ animationDelay: `${si * 0.35}s`, animationDuration: `${3 + si * 0.2}s` }} />
                  <span className={`mt-2 text-[7.5px] uppercase tracking-widest transition-all duration-300 ${hoveredStar === si ? "text-amber-400 opacity-100" : "text-zinc-600 opacity-0 group-hover:opacity-100"}`}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-end mb-16 gap-8">
            <div className="flex gap-4 flex-wrap">
              {[
                { icon: PhoneCall, label: "Phone", val: "+91 98765 43210" },
                { icon: Globe, label: "Email", val: "hello@avnholidays.com" },
                { icon: Map, label: "Office", val: "Mumbai, India" },
                { icon: Clock, label: "Hours", val: "Mon–Sat · 9am–7pm" },
              ].map(({ icon: Icon, label, val }) => (
                <div key={label} className="animate-float-island glass-card rounded-2xl px-5 py-4 flex flex-col gap-1.5 min-w-[150px] cursor-pointer hover:border-white/15 transition-colors" style={{ animationDuration: `${6 + Math.random() * 3}s`, animationDelay: `${Math.random() * 3}s` }}>
                  <Icon className="w-3.5 h-3.5 text-amber-400 mb-0.5" />
                  <span className="text-[7.5px] text-zinc-600 uppercase tracking-widest">{label}</span>
                  <span className="text-[10px] text-white font-semibold">{val}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              {[
                { name: "Instagram", color: "#E1306C", char: "IG" },
                { name: "Facebook",  color: "#1877F2", char: "FB" },
                { name: "YouTube",   color: "#FF0000", char: "YT" },
                { name: "LinkedIn",  color: "#0A66C2", char: "LI" },
                { name: "X",         color: "#FFFFFF", char: "X"  },
              ].map(({ name, color, char }, si) => (
                <div key={name} title={name} className="animate-social-float relative w-11 h-11 rounded-full cursor-pointer group" style={{ animationDelay: `${si * 0.6}s` }}>
                  <div className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-lg group-hover:border-white/20 group-hover:bg-white/8 transition-all duration-300 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent group-hover:from-white/18 transition-all duration-300" />
                    <span className="text-[8px] font-bold z-10 transition-colors duration-300 group-hover:scale-110 transform" style={{ color }}>{char}</span>
                  </div>
                  <div className="absolute inset-0 rounded-full group-hover:block hidden">
                    <div className="animate-orbit-dot absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-1 h-1 rounded-full bg-white/50" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/8 to-transparent mb-12" />

          <div className="flex justify-between items-end">
            <div>
              <p className="text-[9px] text-zinc-600 leading-relaxed font-light">© {new Date().getFullYear()} AVN Holidays. All rights reserved.</p>
              <p className="text-[8.5px] text-zinc-700 font-light mt-0.5 italic">Crafting unforgettable journeys around the world.</p>
            </div>
            <div className="text-right">
              <p className="text-[8px] text-zinc-700 uppercase tracking-widest mb-1">Terms · Privacy · Cookies</p>
              <p className="text-[8.5px] text-zinc-600 font-light italic">Designed with love for wanderers everywhere.</p>
            </div>
          </div>

          <div className="mt-20 text-center pb-4">
            <div className="inline-flex flex-col items-center gap-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
              <p className="text-[9px] uppercase tracking-[0.4em] text-zinc-600 font-light">The Journey Never Ends.</p>
              <p className="text-[8.5px] uppercase tracking-[0.3em] text-zinc-700 font-light italic">See You Again.</p>
              <Compass className="w-4 h-4 text-amber-400/30 animate-spin [animation-duration:20s] mt-1" />
            </div>
          </div>
        </div>

        <div className="md:hidden relative z-10 px-6 pt-16 pb-24 flex flex-col gap-10">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="relative w-44 h-44 rounded-full overflow-hidden border border-white/8 shadow-[0_0_40px_rgba(99,102,241,0.12)]" style={{ background: "radial-gradient(circle at 35% 35%, rgba(99,102,241,0.2) 0%, rgba(6,8,16,0.95) 70%)" }}>
              <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-transparent to-white/5 z-20 pointer-events-none" />
              <div className="absolute inset-y-0 left-0 w-[200%] h-full flex animate-globe-rotate z-10" style={{ willChange: "transform" }}>
                {[0,1].map(t => (
                  <div key={t} className="w-1/2 h-full relative flex-shrink-0">
                    <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "12px 12px" }} />
                    <svg viewBox="0 0 500 260" className="absolute inset-0 w-full h-full fill-indigo-400/8 stroke-indigo-300/8 stroke-[0.5]">
                      <path d="M50 60 Q90 90 110 140 T130 250 Q100 250 80 180 T50 80 Z" />
                      <path d="M200 50 Q280 30 400 60 T490 90 Q460 200 400 240 Q300 200 240 180 T200 50 Z" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-sans text-white leading-tight">
                <span className="font-light block">The World</span>
                <span className="font-serif italic text-amber-400 font-normal block">Will Always</span>
                <span className="font-semibold block">Be Waiting.</span>
              </h2>
              <p className="text-zinc-500 text-[10px] leading-relaxed font-light mt-4 max-w-[280px] mx-auto">
                Thank you for letting AVN Holidays become part of your future memories.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-[8.5px] uppercase tracking-widest text-zinc-500 text-center font-bold">Receive Travel Inspiration</p>
            <input type="email" placeholder="your@email.com" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} className="w-full bg-white/[0.04] border border-white/10 rounded-full px-4 py-3.5 text-xs text-white placeholder:text-zinc-600 outline-none focus:border-amber-400/40" />
            <button className="w-full bg-amber-400 text-black font-bold text-[10px] uppercase tracking-wider py-3.5 rounded-full">Subscribe</button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: PhoneCall, label: "Phone", val: "+91 98765 43210" },
              { icon: Globe,     label: "Email", val: "hello@avnholidays.com" },
              { icon: Map,       label: "Office", val: "Mumbai, India" },
              { icon: Clock,     label: "Hours", val: "Mon–Sat · 9am–7pm" },
            ].map(({ icon: Icon, label, val }) => (
              <div key={label} className="glass-card rounded-2xl p-4 flex flex-col gap-1">
                <Icon className="w-3 h-3 text-amber-400" />
                <span className="text-[7px] text-zinc-600 uppercase tracking-widest">{label}</span>
                <span className="text-[9.5px] text-white font-semibold">{val}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3 justify-center">
            {[
              { char: "IG", color: "#E1306C" }, { char: "FB", color: "#1877F2" },
              { char: "YT", color: "#FF0000" }, { char: "LI", color: "#0A66C2" },
              { char: "X",  color: "#FFFFFF" },
            ].map(({ char, color }) => (
              <div key={char} className="w-10 h-10 rounded-full glass-card border border-white/10 flex items-center justify-center cursor-pointer">
                <span className="text-[9px] font-bold" style={{ color }}>{char}</span>
              </div>
            ))}
          </div>

          <div className="glass-card rounded-2xl px-5 py-4 flex items-center gap-3">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <div>
              <div className="text-[7.5px] text-zinc-600 uppercase tracking-widest">Local Time</div>
              <div className="text-[11px] text-white font-semibold font-mono">{localTime}</div>
            </div>
          </div>

          <div className="text-center border-t border-white/5 pt-8 flex flex-col items-center gap-3">
            <Compass className="w-4 h-4 text-amber-400/30 animate-spin [animation-duration:20s]" />
            <p className="text-[8px] text-zinc-700 font-light">© {new Date().getFullYear()} AVN Holidays</p>
            <p className="text-[7.5px] text-zinc-700 italic font-light">Crafting unforgettable journeys around the world.</p>
            <div className="mt-4 flex flex-col items-center gap-1">
              <p className="text-[8px] uppercase tracking-[0.35em] text-zinc-700">The Journey Never Ends.</p>
              <p className="text-[7.5px] uppercase tracking-[0.3em] text-zinc-800 italic">See You Again.</p>
            </div>
          </div>
        </div>

        <div className="fixed bottom-24 right-6 z-[60] md:bottom-8 md:right-8 flex flex-col items-end gap-2 group">
          <div className="hidden md:flex items-center gap-2 bg-zinc-900 border border-white/10 rounded-full px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mb-1 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[8.5px] text-white/80 font-medium whitespace-nowrap">Travel Expert Online</span>
          </div>
          <div className="relative cursor-pointer">
            <div className="absolute inset-0 rounded-full bg-green-400/25 animate-whatsapp-ripple" />
            <div className="absolute inset-0 rounded-full bg-green-400/15 animate-whatsapp-ripple" style={{ animationDelay: "0.7s" }} />
            <div className="relative w-14 h-14 rounded-full flex items-center justify-center border border-white/15 shadow-[0_8px_32px_rgba(37,211,102,0.25)] hover:shadow-[0_12px_40px_rgba(37,211,102,0.4)] transition-shadow duration-300" style={{ background: "linear-gradient(135deg, rgba(37,211,102,0.85), rgba(18,140,66,0.9))" }}>
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 via-transparent to-transparent pointer-events-none" />
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white relative z-10">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
