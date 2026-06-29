"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { 
  Compass, ArrowRight, ChevronLeft, ChevronRight 
} from "lucide-react";
import { MagneticButton } from "../ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export function GlobalNetwork() {
  const globeContainerRef = useRef<HTMLDivElement>(null);
  const globeMapRef = useRef<HTMLDivElement>(null);
  const globeIntroRef = useRef<HTMLDivElement>(null);

  const [activeLayerIndex, setActiveLayerIndex] = useState(0);
  const [, setGlobeProgress] = useState(0);

  const [globeCountCountries, setGlobeCountCountries] = useState(0);
  const [globeCountFlights, setGlobeCountFlights] = useState(0);
  const [globeCountHotels, setGlobeCountHotels] = useState(0);

  useGSAP(() => {
    const globeTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: globeContainerRef.current,
        start: "top top",
        end: "+=380%",
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          setGlobeProgress(progress);
          const lyrIdx = Math.min(5, Math.floor(progress * 6));
          setActiveLayerIndex(lyrIdx);

          setGlobeCountCountries(Math.min(45, Math.floor(progress * 50)));
          setGlobeCountFlights(Math.min(12400, Math.floor(progress * 13500)));
          setGlobeCountHotels(Math.min(850, Math.floor(progress * 920)));
        }
      }
    });

    globeTimeline.to(".globe-map-wide", {
      xPercent: -42,
      ease: "none",
      duration: 5.5
    }, 0.2);

    if (globeIntroRef.current) {
      globeTimeline.to(globeIntroRef.current, {
        opacity: 0,
        y: -60,
        filter: "blur(8px)",
        duration: 0.8
      }, 0.3);
    }

    globeTimeline.fromTo(".globe-path-packages", 
      { strokeDashoffset: 600, opacity: 0 }, 
      { strokeDashoffset: 0, opacity: 1, duration: 1.0 }, 
      0.4
    );
    globeTimeline.fromTo(".globe-path-hotels", 
      { strokeDashoffset: 600, opacity: 0 }, 
      { strokeDashoffset: 0, opacity: 1, duration: 1.0 }, 
      1.4
    );
    globeTimeline.fromTo(".globe-path-corporate", 
      { strokeDashoffset: 600, opacity: 0 }, 
      { strokeDashoffset: 0, opacity: 1, duration: 1.0 }, 
      2.4
    );
    globeTimeline.fromTo(".globe-path-visa", 
      { strokeDashoffset: 600, opacity: 0 }, 
      { strokeDashoffset: 0, opacity: 1, duration: 1.0 }, 
      3.4
    );
    globeTimeline.fromTo(".globe-path-groups", 
      { strokeDashoffset: 600, opacity: 0 }, 
      { strokeDashoffset: 0, opacity: 1, duration: 1.0 }, 
      4.4
    );
    globeTimeline.fromTo(".globe-path-rentals", 
      { strokeDashoffset: 600, opacity: 0 }, 
      { strokeDashoffset: 0, opacity: 1, duration: 1.0 }, 
      5.2
    );

    globeTimeline.to(".globe-sphere-wrapper", {
      scale: 5.2,
      x: "18vw",
      y: "-12vh",
      opacity: 0.12,
      filter: "blur(6px)",
      duration: 1.2,
      ease: "power2.inOut"
    }, 5.5);

    globeTimeline.to([".globe-panel-left", ".globe-panel-right", ".globe-stats-bar"], {
      scale: 0.82,
      opacity: 0,
      filter: "blur(8px)",
      duration: 0.8
    }, 5.5);

    globeTimeline.fromTo(".globe-cta-membership", 
      { scale: 0.72, opacity: 0, y: 100 }, 
      { scale: 1, opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }, 
      6.0
    );

  }, { scope: globeContainerRef });

  return (
    <section ref={globeContainerRef} className="relative w-full h-screen overflow-hidden bg-black z-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-zinc-950 to-black z-0" />
      <div className="absolute inset-0 bg-stars-blink opacity-45 pointer-events-none z-1 animate-stars-blink" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      <div 
        className="absolute w-[450px] h-[450px] rounded-full blur-[120px] pointer-events-none opacity-20 z-1 animate-aurora-drift"
        style={{
          left: "calc(50% - 225px)",
          top: "calc(50% - 225px)",
          background: activeLayerIndex === 0 ? "radial-gradient(circle, rgba(20,184,166,0.3) 0%, transparent 70%)"
                    : activeLayerIndex === 1 ? "radial-gradient(circle, rgba(245,158,11,0.25) 0%, transparent 70%)"
                    : activeLayerIndex === 2 ? "radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)"
                    : activeLayerIndex === 3 ? "radial-gradient(circle, rgba(168,85,247,0.25) 0%, transparent 70%)"
                    : activeLayerIndex === 4 ? "radial-gradient(circle, rgba(244,63,94,0.25) 0%, transparent 70%)"
                    : "radial-gradient(circle, rgba(16,185,129,0.25) 0%, transparent 70%)"
        }}
      />

      <div className="hidden md:block w-full h-full relative z-10 select-none">
        <div className="absolute top-10 left-12 z-30 flex items-center gap-8">
          <span className="text-[10px] tracking-[0.25em] font-semibold text-amber-400 uppercase font-sans flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin [animation-duration:10s]" /> Global Reach
          </span>
          <div className="flex gap-4 items-center">
            {["Packages", "Hotels", "Corporate", "Visas", "Group Tours", "Rentals"].map((lyr, idx) => (
              <span 
                key={`globe-lyr-${idx}`}
                className={`text-[9px] uppercase tracking-widest transition-all duration-500 font-sans ${
                  idx === activeLayerIndex 
                    ? "text-white font-bold opacity-100 border-b border-amber-400/50 pb-0.5" 
                    : "text-zinc-500 font-normal opacity-50"
                }`}
              >
                {lyr}
              </span>
            ))}
          </div>
        </div>

        <div ref={globeIntroRef} className="absolute inset-0 flex flex-col items-center justify-center text-center z-[25] px-6 pointer-events-none">
          <div className="max-w-3xl flex flex-col items-center">
            <span className="inline-block text-[9px] font-bold uppercase tracking-[0.3em] text-amber-400 bg-amber-400/5 border border-amber-400/20 px-3 py-1 rounded-full mb-6">
              ✦ World Network
            </span>
            <h2 className="text-5xl md:text-7xl font-sans tracking-tight text-white leading-none mb-6 flex flex-col">
              <span className="block opacity-95 font-light">The World Is</span>
              <span className="block font-serif italic text-amber-400 font-normal mt-2">Waiting For</span>
              <span className="block font-semibold mt-2">You.</span>
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-[550px] font-light">
              Discover seamless logistics that expand the map. Watch routes connect and services integrate dynamically as we coordinate your global footprint.
            </p>
          </div>
        </div>

        <div className="absolute left-12 top-1/4 z-20 w-[240px] flex flex-col gap-4 text-left globe-panel-left">
          <div className="glass-card rounded-2xl p-4 flex flex-col gap-3">
            <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-500">Live Insights</span>
            <div className="border-b border-white/5 pb-2 flex justify-between items-center text-[10px]">
              <span className="text-zinc-400">Zurich Temp</span>
              <span className="text-white font-bold">14°C Rain</span>
            </div>
            <div className="border-b border-white/5 pb-2 flex justify-between items-center text-[10px]">
              <span className="text-zinc-400">Local Time (Kyoto)</span>
              <span className="text-white font-semibold">23:45 JST</span>
            </div>
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-zinc-400">EUR Rate</span>
              <span className="text-emerald-400 font-bold">1.08 USD</span>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-4 flex flex-col gap-2">
            <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-500">Curated Tip</span>
            <p className="text-[9.5px] text-zinc-400 leading-normal font-light">
              "Pack light for Alpine transfers. Always maintain digital copies of your visa waivers before departure."
            </p>
          </div>
        </div>

        <div className="absolute right-12 top-1/4 z-20 w-[240px] flex flex-col gap-4 text-left globe-panel-right">
          <div className="glass-card rounded-2xl p-4 flex flex-col gap-3">
            <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-500">Flight Telemetry</span>
            <div className="border-b border-white/5 pb-2 flex flex-col gap-0.5">
              <div className="flex justify-between text-[10px] text-white font-semibold">
                <span>Mumbai ➔ Paris</span>
                <span className="text-amber-400">8h 40m</span>
              </div>
              <span className="text-[8px] text-zinc-500 uppercase tracking-widest">Direct Route</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex justify-between text-[10px] text-white font-semibold">
                <span>London ➔ Dubai</span>
                <span className="text-amber-400">6h 50m</span>
              </div>
              <span className="text-[8px] text-zinc-500 uppercase tracking-widest">Direct Route</span>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-4 flex flex-col gap-2">
            <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-500">Best Season</span>
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-zinc-400">Maldives Escapes</span>
              <span className="text-white font-semibold">Dec ➔ Apr</span>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="relative w-[440px] h-[440px] globe-sphere-wrapper scale-100 flex items-center justify-center">
            <div className="relative w-[380px] h-[380px] rounded-full overflow-hidden border border-white/10 bg-zinc-950 shadow-[0_0_80px_rgba(251,191,36,0.15)] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-white/8 z-20 pointer-events-none" />
              <div className="absolute inset-0 shadow-[inset_-25px_-25px_60px_rgba(0,0,0,0.85),_inset_25px_25px_60px_rgba(255,255,255,0.06)] z-20 pointer-events-none" />
              
              <div ref={globeMapRef} className="absolute inset-y-0 left-0 w-[240%] h-full flex flex-row globe-map-wide z-10 pointer-events-none" style={{ willChange: "transform" }}>
                {[0, 1].map((tile) => (
                  <div key={tile} className="w-[120%] h-full relative flex-shrink-0 opacity-45">
                    <div className="absolute inset-0 scale-95 opacity-80" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.08) 1.2px, transparent 1.2px)", backgroundSize: "16px 16px" }} />
                    <svg viewBox="0 0 1000 500" className="absolute inset-0 w-full h-full fill-white/[0.04] stroke-white/5 stroke-[0.5]">
                      <path d="M 100 100 Q 150 180 200 240 T 260 480 Q 220 480 180 380 T 120 200 T 80 120 Z" />
                      <path d="M 450 120 Q 550 80 750 100 T 900 150 Q 850 350 780 480 Q 620 420 540 380 T 450 120 Z" />
                      <path d="M 480 200 Q 580 250 620 380 Q 480 480 420 350 Z" />
                      <path d="M 820 380 Q 880 380 900 440 T 840 460 Z" />
                    </svg>

                    <div className="absolute left-[54%] top-[24%] flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-amber-400 relative z-10" />
                      <span className="absolute w-6 h-6 rounded-full bg-amber-400/30 animate-marker-pulse" />
                      <span className="absolute -top-5 text-[7px] text-white font-bold tracking-widest uppercase bg-black/85 px-1 py-0.5 rounded border border-white/5">Paris</span>
                    </div>

                    <div className="absolute left-[62%] top-[34%] flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-sky-400 relative z-10" />
                      <span className="absolute w-6 h-6 rounded-full bg-sky-400/30 animate-marker-pulse" />
                      <span className="absolute -top-5 text-[7px] text-white font-bold tracking-widest uppercase bg-black/85 px-1 py-0.5 rounded border border-white/5">Dubai</span>
                    </div>

                    <div className="absolute left-[74%] top-[44%] flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 relative z-10" />
                      <span className="absolute w-6 h-6 rounded-full bg-emerald-400/30 animate-marker-pulse" />
                      <span className="absolute -top-5 text-[7px] text-white font-bold tracking-widest uppercase bg-black/85 px-1 py-0.5 rounded border border-white/5">Singapore</span>
                    </div>
                  </div>
                ))}

                <svg className="absolute inset-0 w-full h-full z-[15] overflow-visible fill-none stroke-[1.5]">
                  <path d="M 540 120 Q 620 170 740 220" stroke="rgba(20, 184, 166, 0.7)" className="globe-path-packages" style={{ strokeDasharray: "400", strokeDashoffset: "400" }} />
                  <path d="M 620 170 Q 580 150 540 120" stroke="rgba(245, 158, 11, 0.7)" className="globe-path-hotels" style={{ strokeDasharray: "400", strokeDashoffset: "400" }} />
                  <path d="M 540 120 Q 740 180 820 380" stroke="rgba(99, 102, 241, 0.7)" className="globe-path-corporate" style={{ strokeDasharray: "400", strokeDashoffset: "400" }} />
                  <path d="M 740 220 Q 800 240 820 380" stroke="rgba(168, 85, 247, 0.7)" className="globe-path-visa" style={{ strokeDasharray: "400", strokeDashoffset: "400" }} />
                  <path d="M 620 170 Q 700 320 820 380" stroke="rgba(244, 63, 94, 0.7)" className="globe-path-groups" style={{ strokeDasharray: "400", strokeDashoffset: "400" }} />
                  <path d="M 540 120 Q 640 320 740 220" stroke="rgba(16, 185, 129, 0.7)" className="globe-path-rentals" style={{ strokeDasharray: "400", strokeDashoffset: "400" }} />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-12 bottom-12 z-20 glass-card rounded-[2rem] p-6 text-left flex justify-between items-center globe-stats-bar">
          <div>
            <span className="text-[8px] text-zinc-500 uppercase tracking-widest block mb-0.5">Scale Matrix</span>
            <div className="text-[11px] font-bold text-white uppercase tracking-wider">AVN Telemetry Hub</div>
          </div>
          <div className="flex gap-16 select-none text-center">
            <div>
              <div className="text-xl font-sans font-bold text-white leading-none">{globeCountCountries}</div>
              <span className="text-[8px] text-zinc-500 uppercase tracking-widest mt-1.5 block">Countries</span>
            </div>
            <div>
              <div className="text-xl font-sans font-bold text-amber-400 leading-none">{globeCountFlights}+</div>
              <span className="text-[8px] text-zinc-500 uppercase tracking-widest mt-1.5 block">Flights</span>
            </div>
            <div>
              <div className="text-xl font-sans font-bold text-white leading-none">{globeCountHotels}+</div>
              <span className="text-[8px] text-zinc-500 uppercase tracking-widest mt-1.5 block">Hotels</span>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none select-none globe-cta-membership opacity-0 scale-75">
          <div className="max-w-md w-full glass-card rounded-[2.5rem] p-8 border border-amber-400/20 shadow-[0_0_80px_rgba(251,191,36,0.1)] text-center flex flex-col items-center pointer-events-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/[0.03] via-transparent to-amber-400/[0.08] pointer-events-none" />
            <span className="inline-block text-[9px] font-bold uppercase tracking-[0.25em] text-amber-400 bg-amber-400/5 border border-amber-400/20 px-3 py-1 rounded-full mb-6">
              ✦ AVN Super Saver Club
            </span>
            <h2 className="text-3xl md:text-5xl font-sans text-white leading-tight mb-4">
              Where Will Your <br />
              <span className="font-serif italic text-amber-400 font-normal">Story Begin?</span>
            </h2>
            <p className="text-zinc-400 text-xs leading-relaxed max-w-[340px] mb-8 font-light select-text">
              Dwell in exclusive upgrades, airport fast track priority, and elite hotel concierge reservations from a single golden membership profile.
            </p>
            <div className="flex flex-row items-center gap-3 w-full justify-center">
              <MagneticButton className="group bg-white hover:bg-transparent text-black hover:text-white px-6 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white flex items-center gap-2 transition-colors duration-300 cursor-pointer shadow-xl">
                <span>Explore Network</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </MagneticButton>
              <MagneticButton className="group bg-white/[0.03] backdrop-blur-[20px] hover:bg-white/10 px-6 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 transition-all duration-300 border border-white/10 hover:border-white/20 cursor-pointer">
                <span>Plan My Journey</span>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden w-full h-full flex flex-col items-center justify-center px-6 py-20 relative z-10 select-none">
        <div className="absolute top-10 flex flex-col items-center">
          <span className="text-[9px] tracking-[0.25em] font-bold text-amber-400 uppercase font-sans mb-1 block">
            ✦ Global Reach
          </span>
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-sans block">
            Layer 0{activeLayerIndex + 1} of 06
          </span>
        </div>

        <div className="relative w-full h-[400px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {activeLayerIndex === 0 && (
              <motion.div
                key="mob-lyr-0"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full rounded-[2rem] glass-card p-6 flex flex-col justify-between text-left"
              >
                <div>
                  <span className="text-[9px] uppercase font-bold text-amber-400">✦ Layer One</span>
                  <h3 className="text-2xl font-sans text-white mt-2 leading-tight">Holiday Packages</h3>
                  <p className="text-zinc-400 text-xs mt-4 leading-relaxed font-light">
                    Connecting raw inspiration to curated itineraries. Travel through Maldives or Bali on routes designed for fine hospitality.
                  </p>
                </div>
                <div className="flex justify-between items-end border-t border-white/5 pt-4">
                  <span className="text-[8.5px] uppercase font-bold text-white">120+ Destinations</span>
                  <span className="text-[7.5px] uppercase text-zinc-500 tracking-wider">1/6 Layers</span>
                </div>
              </motion.div>
            )}

            {activeLayerIndex === 1 && (
              <motion.div
                key="mob-lyr-1"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full rounded-[2rem] glass-card p-6 flex flex-col justify-between text-left"
              >
                <div>
                  <span className="text-[9px] uppercase font-bold text-amber-400">✦ Layer Two</span>
                  <h3 className="text-2xl font-sans text-white mt-2 leading-tight">Luxury Hotels</h3>
                  <p className="text-zinc-400 text-xs mt-4 leading-relaxed font-light">
                    Overwater cabanas, heritage palaces, and modern sand retreats linked through a unified concierge check-in pipeline.
                  </p>
                </div>
                <div className="flex justify-between items-end border-t border-white/5 pt-4">
                  <span className="text-[8.5px] uppercase font-bold text-white">850+ Partners</span>
                  <span className="text-[7.5px] uppercase text-zinc-500 tracking-wider">2/6 Layers</span>
                </div>
              </motion.div>
            )}

            {activeLayerIndex === 2 && (
              <motion.div
                key="mob-lyr-2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full rounded-[2rem] glass-card p-6 flex flex-col justify-between text-left"
              >
                <div>
                  <span className="text-[9px] uppercase font-bold text-amber-400">✦ Layer Three</span>
                  <h3 className="text-2xl font-sans text-white mt-2 leading-tight">Corporate Travel</h3>
                  <p className="text-zinc-400 text-xs mt-4 leading-relaxed font-light">
                    Executive logistics, visa waivers, and fast-track priority flights matching corporate schedules globally.
                  </p>
                </div>
                <div className="flex justify-between items-end border-t border-white/5 pt-4">
                  <span className="text-[8.5px] uppercase font-bold text-white">24×7 Assistance</span>
                  <span className="text-[7.5px] uppercase text-zinc-500 tracking-wider">3/6 Layers</span>
                </div>
              </motion.div>
            )}

            {activeLayerIndex === 3 && (
              <motion.div
                key="mob-lyr-3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full rounded-[2rem] glass-card p-6 flex flex-col justify-between text-left"
              >
                <div>
                  <span className="text-[9px] uppercase font-bold text-amber-400">✦ Layer Four</span>
                  <h3 className="text-2xl font-sans text-white mt-2 leading-tight">Visa Assistance</h3>
                  <p className="text-zinc-400 text-xs mt-4 leading-relaxed font-light">
                    Bypass scheduling friction. Enjoy streamlined international visa applications with direct concierge tracking.
                  </p>
                </div>
                <div className="flex justify-between items-end border-t border-white/5 pt-4">
                  <span className="text-[8.5px] uppercase font-bold text-white">99% Approval rate</span>
                  <span className="text-[7.5px] uppercase text-zinc-500 tracking-wider">4/6 Layers</span>
                </div>
              </motion.div>
            )}

            {activeLayerIndex === 4 && (
              <motion.div
                key="mob-lyr-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full rounded-[2rem] glass-card p-6 flex flex-col justify-between text-left"
              >
                <div>
                  <span className="text-[9px] uppercase font-bold text-amber-400">✦ Layer Five</span>
                  <h3 className="text-2xl font-sans text-white mt-2 leading-tight">Group Tours</h3>
                  <p className="text-zinc-400 text-xs mt-4 leading-relaxed font-light">
                    Immersive local expeditions led by experts. Designed for groups seeking deeper cultural integration.
                  </p>
                </div>
                <div className="flex justify-between items-end border-t border-white/5 pt-4">
                  <span className="text-[8.5px] uppercase font-bold text-white">5000+ Happy Guests</span>
                  <span className="text-[7.5px] uppercase text-zinc-500 tracking-wider">5/6 Layers</span>
                </div>
              </motion.div>
            )}

            {activeLayerIndex === 5 && (
              <motion.div
                key="mob-lyr-5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full rounded-[2rem] glass-card p-6 flex flex-col justify-between text-left pointer-events-auto"
              >
                <div className="text-center flex flex-col items-center">
                  <span className="text-[9px] uppercase font-bold text-amber-400">✦ Gold Member</span>
                  <h3 className="text-xl font-sans text-white mt-2 leading-tight">Super Saver Club</h3>
                  <p className="text-zinc-400 text-[10px] mt-2 leading-relaxed font-light">
                    Bespoke loyalty matrices. Unlock priority airport lounge gates and flight upgrades instantly.
                  </p>
                  
                  <button className="w-full bg-white text-black font-semibold text-[10px] uppercase tracking-wider py-3.5 rounded-full mt-6 flex items-center justify-center gap-1.5 shadow-xl">
                    <span>Explore Network</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex justify-between items-end border-t border-white/5 pt-3">
                  <span className="text-[7.5px] uppercase text-zinc-500 tracking-wider">6/6 Layers</span>
                  <span className="text-[7.5px] font-bold text-amber-400 uppercase tracking-widest">AVN CLUB</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-6 mt-8">
          <button onClick={() => setActiveLayerIndex(prev => Math.max(0, prev - 1))} className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <button key={`dot-lyr-${i}`} onClick={() => setActiveLayerIndex(i)} className={`h-2 rounded-full transition-all duration-300 ${i === activeLayerIndex ? "w-6 bg-amber-400" : "w-2 bg-white/20"}`} />
            ))}
          </div>
          <button onClick={() => setActiveLayerIndex(prev => Math.min(5, prev + 1))} className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
