"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { 
  Sparkles, Star, MapPin, ArrowRight, ChevronLeft, ChevronRight 
} from "lucide-react";
import { MagneticButton } from "../ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export function Hotels() {
  const hotelsContainerRef = useRef<HTMLDivElement>(null);
  const hotelsContentRef = useRef<HTMLDivElement>(null);
  const hotelsIntroRef = useRef<HTMLDivElement>(null);

  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [activeHotelTypeIndex, setActiveHotelTypeIndex] = useState(0);
  const [, setHotelsProgress] = useState(0);

  useGSAP(() => {
    const hotelsTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: hotelsContainerRef.current,
        start: "top top",
        end: "+=380%",
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          setHotelsProgress(progress);
          const scIdx = Math.min(4, Math.floor(progress * 5));
          setActiveSceneIndex(scIdx);

          const catIdx = Math.min(5, Math.floor(progress * 6));
          setActiveHotelTypeIndex(catIdx);
        }
      }
    });

    gsap.set(".hotel-scene-0", { opacity: 1, scale: 1, filter: "blur(0px)" });
    gsap.set([".hotel-scene-1", ".hotel-scene-2", ".hotel-scene-3", ".hotel-scene-4"], {
      opacity: 0,
      scale: 1.08,
      filter: "blur(15px)"
    });

    hotelsTimeline.to(".hotel-bg-backplate", {
      background: "radial-gradient(circle at 50% 50%, rgba(251,191,36,0.14) 0%, rgba(120,53,4,0.1) 40%, rgba(9,9,11,1) 100%)",
      duration: 1.0
    }, 0);
    hotelsTimeline.to(".hotel-bg-backplate", {
      background: "radial-gradient(circle at 50% 50%, rgba(20,184,166,0.12) 0%, rgba(13,148,136,0.08) 45%, rgba(9,9,11,1) 100%)",
      duration: 1.0
    }, 1.2);
    hotelsTimeline.to(".hotel-bg-backplate", {
      background: "radial-gradient(circle at 50% 50%, rgba(56,189,248,0.14) 0%, rgba(3,105,161,0.08) 50%, rgba(9,9,11,1) 100%)",
      duration: 1.0
    }, 2.4);
    hotelsTimeline.to(".hotel-bg-backplate", {
      background: "radial-gradient(circle at 50% 50%, rgba(244,63,94,0.16) 0%, rgba(217,70,239,0.12) 50%, rgba(9,9,11,1) 100%)",
      duration: 1.0
    }, 3.6);
    hotelsTimeline.to(".hotel-bg-backplate", {
      background: "radial-gradient(circle at 50% 50%, rgba(234,179,8,0.16) 0%, rgba(168,85,247,0.12) 50%, rgba(9,9,11,1) 100%)",
      duration: 1.0
    }, 4.8);

    if (hotelsIntroRef.current) {
      hotelsTimeline.to(hotelsIntroRef.current, {
        opacity: 0,
        y: -60,
        filter: "blur(8px)",
        duration: 0.8
      }, 0.3);
    }

    hotelsTimeline.to(".hotel-scene-0", {
      opacity: 0,
      scale: 1.15,
      filter: "blur(12px)",
      duration: 1.0
    }, 0.8);
    hotelsTimeline.to(".hotel-scene-1", {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 1.0
    }, 1.2);

    hotelsTimeline.to(".hotel-scene-1", {
      opacity: 0,
      scale: 1.15,
      filter: "blur(12px)",
      duration: 1.0
    }, 2.0);
    hotelsTimeline.to(".hotel-scene-2", {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 1.0
    }, 2.4);

    hotelsTimeline.to(".hotel-scene-2", {
      opacity: 0,
      scale: 1.15,
      filter: "blur(12px)",
      duration: 1.0
    }, 3.2);
    hotelsTimeline.to(".hotel-scene-3", {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 1.0
    }, 3.6);

    hotelsTimeline.to(".hotel-scene-3", {
      opacity: 0,
      scale: 1.15,
      filter: "blur(12px)",
      duration: 1.0
    }, 4.4);
    hotelsTimeline.to(".hotel-scene-4", {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 1.0
    }, 4.8);

    hotelsTimeline.fromTo(".hotel-booking-console",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      5.0
    );

    hotelsTimeline.to(".hotel-clouds-outro", {
      opacity: 1,
      scale: 1.15,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power2.inOut"
    }, 5.8);

  }, { scope: hotelsContainerRef });

  return (
    <section ref={hotelsContainerRef} className="relative w-full h-screen overflow-hidden bg-black z-20">
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-1000 hotel-bg-backplate"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(251,191,36,0.14) 0%, rgba(120,53,4,0.1) 40%, rgba(9,9,11,1) 100%)"
        }}
      />

      <div className="hidden md:block w-full h-full relative z-10">
        <div className="absolute top-10 left-12 z-30 flex items-center gap-8 select-none">
          <span className="text-[10px] tracking-[0.25em] font-semibold text-amber-400 uppercase font-sans flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Premium Stays
          </span>
          <div className="flex gap-4 items-center">
            {["Luxury Resorts", "Beach Villas", "Mountain Retreats", "City Hotels", "Heritage Stays", "Private Islands"].map((cat, idx) => (
              <span 
                key={`hotel-cat-${idx}`}
                className={`text-[9px] uppercase tracking-widest transition-all duration-500 font-sans ${
                  idx === activeHotelTypeIndex 
                    ? "text-white font-bold opacity-100 border-b border-amber-400/50 pb-0.5" 
                    : "text-zinc-500 font-normal opacity-50"
                }`}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        <div ref={hotelsIntroRef} className="absolute inset-0 flex flex-col items-center justify-center text-center z-[25] px-6 pointer-events-none">
          <div className="max-w-3xl flex flex-col items-center">
            <span className="inline-block text-[9px] font-bold uppercase tracking-[0.3em] text-amber-400 bg-amber-400/5 border border-amber-400/20 px-3 py-1 rounded-full mb-6">
              ✦ Sanctuary Spaces
            </span>
            <h2 className="text-5xl md:text-7xl font-sans tracking-tight text-white leading-none mb-6 flex flex-col">
              <span className="block opacity-95 font-light">Stay Somewhere</span>
              <span className="block font-serif italic text-amber-400 font-normal mt-2">You'll Never</span>
              <span className="block font-semibold mt-2">Forget.</span>
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-[550px] font-light">
              Relax in spaces structured specifically to capture the landscape. Discover private overwater villas, mountain lodges, and heritage escapes that define global luxury.
            </p>
          </div>
        </div>

        <div ref={hotelsContentRef} className="w-full h-full relative">
          <div className="absolute inset-0 w-full h-full hotel-scene-0 transition-transform duration-75 z-[10] flex items-center justify-center">
            <div className="absolute inset-0">
              <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80" className="w-full h-full object-cover" alt="Arrival" />
              <div className="absolute inset-0 bg-black/35 z-10 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/20 to-transparent opacity-40 z-15 pointer-events-none animate-water-ripple">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full fill-none stroke-amber-400/10 stroke-[0.3]">
                  <path d="M 0 50 Q 25 45 50 50 T 100 50" />
                  <path d="M 0 60 Q 25 55 50 60 T 100 60" />
                  <path d="M 0 70 Q 25 65 50 70 T 100 70" />
                </svg>
              </div>
            </div>
            <div className="absolute right-16 bottom-16 z-20 w-[300px] glass-card rounded-[2rem] p-6 text-left shadow-2xl">
              <div className="flex justify-between items-start border-b border-white/5 pb-3">
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-white">Amanpuri Resort</h4>
                  <span className="text-[8px] text-zinc-500 uppercase tracking-widest mt-1 block">Phuket, Thailand</span>
                </div>
                <div className="flex gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-current" />)}
                </div>
              </div>
              <div className="py-4 flex flex-col gap-2.5">
                <div className="flex justify-between text-[9px]">
                  <span className="text-zinc-500 uppercase">Nightly Rate</span>
                  <span className="text-white font-bold">$1,450++</span>
                </div>
                <div className="flex justify-between text-[9px]">
                  <span className="text-zinc-500 uppercase">Guest Score</span>
                  <span className="text-amber-400 font-bold">4.97 / 5.0</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 border-t border-white/5 pt-3">
                {["Private Beach", "Spa", "Airport Transfer"].map((am, i) => (
                  <span key={i} className="text-[7.5px] uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded text-zinc-300">
                    {am}
                  </span>
                ))}
              </div>
            </div>
            <div className="absolute left-1/4 top-1/3 z-20 bg-zinc-950/80 border border-white/10 rounded-full px-4 py-2 flex items-center gap-2 backdrop-blur-xl animate-float-slow">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[8.5px] uppercase font-bold text-white tracking-widest">8.0066° N, 98.2794° E</span>
            </div>
          </div>

          <div className="absolute inset-0 w-full h-full hotel-scene-1 transition-transform duration-75 z-[11] flex items-center justify-center pointer-events-none">
            <div className="absolute inset-0">
              <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80" className="w-full h-full object-cover" alt="Lobby" />
              <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 via-transparent to-black/60 z-15 pointer-events-none" />
            </div>
            <div className="absolute left-16 bottom-16 z-20 w-[300px] glass-card rounded-[2rem] p-6 text-left shadow-2xl pointer-events-auto">
              <div className="flex justify-between items-start border-b border-white/5 pb-3">
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-white">Amangiri Canyon</h4>
                  <span className="text-[8px] text-zinc-500 uppercase tracking-widest mt-1 block">Utah, USA</span>
                </div>
                <div className="flex gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-current" />)}
                </div>
              </div>
              <div className="py-4 flex flex-col gap-2.5">
                <div className="flex justify-between text-[9px]">
                  <span className="text-zinc-500 uppercase">Nightly Rate</span>
                  <span className="text-white font-bold">$2,100++</span>
                </div>
                <div className="flex justify-between text-[9px]">
                  <span className="text-zinc-500 uppercase">Guest Score</span>
                  <span className="text-amber-400 font-bold">4.95 / 5.0</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 border-t border-white/5 pt-3">
                {["Desert Lounge", "Spa", "Private Excursions"].map((am, i) => (
                  <span key={i} className="text-[7.5px] uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded text-zinc-300">
                    {am}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute inset-0 w-full h-full hotel-scene-2 transition-transform duration-75 z-[12] flex items-center justify-center pointer-events-none">
            <div className="absolute inset-0">
              <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1920&q=80" className="w-full h-full object-cover" alt="Luxury Suite" />
              <div className="absolute inset-0 bg-black/35 z-10 pointer-events-none" />
            </div>
            <div className="absolute right-0 top-0 h-full w-1/4 bg-white/5 backdrop-blur-[1px] border-l border-white/10 z-15 animate-curtain-sway overflow-hidden">
              <div className="w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            </div>
            <div className="absolute right-16 top-24 z-20 w-[300px] glass-card rounded-[2rem] p-6 text-left shadow-2xl pointer-events-auto">
              <div className="flex justify-between items-start border-b border-white/5 pb-3">
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-white">Amanzoe Sanctuary</h4>
                  <span className="text-[8px] text-zinc-500 uppercase tracking-widest mt-1 block">Porto Heli, Greece</span>
                </div>
                <div className="flex gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-current" />)}
                </div>
              </div>
              <div className="py-4 flex flex-col gap-2.5">
                <div className="flex justify-between text-[9px]">
                  <span className="text-zinc-500 uppercase">Nightly Rate</span>
                  <span className="text-white font-bold">$1,850++</span>
                </div>
                <div className="flex justify-between text-[9px]">
                  <span className="text-zinc-500 uppercase">Guest Score</span>
                  <span className="text-amber-400 font-bold">4.98 / 5.0</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 border-t border-white/5 pt-3">
                {["Infinity Pool", "Ocean View", "Private Butler"].map((am, i) => (
                  <span key={i} className="text-[7.5px] uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded text-zinc-300">
                    {am}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute inset-0 w-full h-full hotel-scene-3 transition-transform duration-75 z-[13] flex items-center justify-center pointer-events-none">
            <div className="absolute inset-0">
              <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1920&q=80" className="w-full h-full object-cover" alt="Infinity Pool" />
              <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-500/10 via-transparent to-purple-900/15 z-15 pointer-events-none" />
            </div>
            <div className="absolute left-16 bottom-20 z-20 w-[300px] glass-card rounded-[2rem] p-6 text-left shadow-2xl pointer-events-auto">
              <div className="flex justify-between items-start border-b border-white/5 pb-3">
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-white">Amanwella Resort</h4>
                  <span className="text-[8px] text-zinc-500 uppercase tracking-widest mt-1 block">Tangalle, Sri Lanka</span>
                </div>
                <div className="flex gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-current" />)}
                </div>
              </div>
              <div className="py-4 flex flex-col gap-2.5">
                <div className="flex justify-between text-[9px]">
                  <span className="text-zinc-500 uppercase">Nightly Rate</span>
                  <span className="text-white font-bold">$1,150++</span>
                </div>
                <div className="flex justify-between text-[9px]">
                  <span className="text-zinc-500 uppercase">Guest Score</span>
                  <span className="text-amber-400 font-bold">4.93 / 5.0</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 border-t border-white/5 pt-3">
                {["Beachfront", "Spa", "Water Excursions"].map((am, i) => (
                  <span key={i} className="text-[7.5px] uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded text-zinc-300">
                    {am}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute inset-0 w-full h-full hotel-scene-4 transition-transform duration-75 z-[14] flex items-center justify-center pointer-events-none">
            <div className="absolute inset-0">
              <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1920&q=80" className="w-full h-full object-cover" alt="Night Experience" />
              <div className="absolute inset-0 bg-black/45 z-10 pointer-events-none" />
            </div>
            <div className="absolute inset-x-6 bottom-16 flex justify-center z-[25] pointer-events-auto hotel-booking-console opacity-0">
              <div className="w-full max-w-4xl glass-card rounded-[2.5rem] p-8 shadow-2xl border border-white/10 text-left flex flex-col gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 pb-4">
                  <div>
                    <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-amber-400">✦ Curation Terminal</span>
                    <h3 className="text-xl font-sans font-semibold text-white mt-1">Reserve Your Luxury Space</h3>
                  </div>
                  <span className="text-[9px] text-zinc-500 uppercase tracking-widest mt-2 md:mt-0">Direct Concierge Handoff</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[7.5px] uppercase tracking-widest text-zinc-500 font-bold">Destination</span>
                    <div className="bg-zinc-950 border border-white/5 p-3 rounded-xl text-[10px] text-white font-semibold">
                      Amanpuri, Phuket
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[7.5px] uppercase tracking-widest text-zinc-500 font-bold">Check-In</span>
                    <div className="bg-zinc-950 border border-white/5 p-3 rounded-xl text-[10px] text-white font-semibold">
                      Oct 12, 2026
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[7.5px] uppercase tracking-widest text-zinc-500 font-bold">Check-Out</span>
                    <div className="bg-zinc-950 border border-white/5 p-3 rounded-xl text-[10px] text-white font-semibold">
                      Oct 19, 2026
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[7.5px] uppercase tracking-widest text-zinc-500 font-bold">Guests</span>
                    <div className="bg-zinc-950 border border-white/5 p-3 rounded-xl text-[10px] text-white font-semibold">
                      02 Guests
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 col-span-2 md:col-span-1">
                    <span className="text-[7.5px] uppercase tracking-widest text-zinc-500 font-bold">Suite Type</span>
                    <div className="bg-zinc-950 border border-white/5 p-3 rounded-xl text-[10px] text-white font-semibold">
                      Ocean Pavilion
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                  <span className="text-[8px] text-zinc-500 uppercase tracking-widest">Rate guarantee: verified live rates</span>
                  <MagneticButton className="group bg-white hover:bg-transparent text-black hover:text-white px-8 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white flex items-center gap-2 transition-colors duration-300 cursor-pointer shadow-xl">
                    <span>Reserve Now</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 z-[45] pointer-events-none overflow-hidden flex items-center justify-center hotel-clouds-outro opacity-0">
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?auto=format&fit=crop&w=1920&q=80')" }}
            />
            <div className="absolute inset-0 bg-black/45 z-10" />
            <div className="relative z-20 text-center px-6">
              <span className="text-[10px] tracking-[0.3em] font-semibold text-amber-400 uppercase font-sans mb-3 block">
                ✦ Beyond Boundaries
              </span>
              <h2 className="text-4xl md:text-6xl font-sans tracking-tight text-white leading-none">
                Your Next Destination <br />
                <span className="font-serif italic text-amber-400 font-normal">Is Calling.</span>
              </h2>
            </div>
          </div>

        </div>
      </div>

      <div className="md:hidden w-full h-full flex flex-col items-center justify-center px-6 py-20 relative z-10 select-none">
        <div className="absolute top-10 flex flex-col items-center">
          <span className="text-[9px] tracking-[0.25em] font-bold text-amber-400 uppercase font-sans mb-1 block">
            ✦ Premium Stays
          </span>
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-sans block">
            Scene 0{activeSceneIndex + 1} of 05
          </span>
        </div>

        <div className="relative w-full h-[410px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {activeSceneIndex === 0 && (
              <motion.div
                key="mob-scene-0"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full rounded-[2rem] glass-card p-6 flex flex-col justify-between text-left overflow-hidden relative"
              >
                <div className="absolute inset-0 z-0 opacity-20">
                  <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" alt="Arrival" />
                </div>
                <div className="relative z-10">
                  <span className="text-[9px] uppercase font-bold text-amber-400">✦ Arrival Scene</span>
                  <h3 className="text-2xl font-sans text-white mt-2 leading-tight">Amanpuri Resort</h3>
                  <span className="text-[8px] text-zinc-500 block uppercase tracking-widest mt-1">Phuket, Thailand</span>
                  <p className="text-zinc-400 text-xs mt-4 leading-relaxed font-light">
                    Step off the flight into oceanfront pavilions, framed by high palms and the calm turquoise waves of the Andaman Sea.
                  </p>
                </div>
                <div className="relative z-10 flex justify-between items-end border-t border-white/5 pt-4">
                  <span className="text-[8.5px] uppercase font-bold text-white">$1,450 / night</span>
                  <span className="text-[8.5px] uppercase font-bold text-amber-400 tracking-wider">Rating: 4.97</span>
                </div>
              </motion.div>
            )}

            {activeSceneIndex === 1 && (
              <motion.div
                key="mob-scene-1"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full rounded-[2rem] glass-card p-6 flex flex-col justify-between text-left overflow-hidden relative"
              >
                <div className="absolute inset-0 z-0 opacity-20">
                  <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" alt="Lobby" />
                </div>
                <div className="relative z-10">
                  <span className="text-[9px] uppercase font-bold text-amber-400">✦ The Lobby</span>
                  <h3 className="text-2xl font-sans text-white mt-2 leading-tight">Amangiri Canyon</h3>
                  <span className="text-[8px] text-zinc-500 block uppercase tracking-widest mt-1">Utah, USA</span>
                  <p className="text-zinc-400 text-xs mt-4 leading-relaxed font-light">
                    Limestone architecture and massive high ceilings frame clean views of the desert mesa, connecting you directly to nature.
                  </p>
                </div>
                <div className="relative z-10 flex justify-between items-end border-t border-white/5 pt-4">
                  <span className="text-[8.5px] uppercase font-bold text-white">$2,100 / night</span>
                  <span className="text-[8.5px] uppercase font-bold text-amber-400 tracking-wider">Rating: 4.95</span>
                </div>
              </motion.div>
            )}

            {activeSceneIndex === 2 && (
              <motion.div
                key="mob-scene-2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full rounded-[2rem] glass-card p-6 flex flex-col justify-between text-left overflow-hidden relative"
              >
                <div className="absolute inset-0 z-0 opacity-20">
                  <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" alt="Suite" />
                </div>
                <div className="relative z-10">
                  <span className="text-[9px] uppercase font-bold text-amber-400">✦ Luxury Suite</span>
                  <h3 className="text-2xl font-sans text-white mt-2 leading-tight">Amanzoe Sanctuary</h3>
                  <span className="text-[8px] text-zinc-500 block uppercase tracking-widest mt-1">Porto Heli, Greece</span>
                  <p className="text-zinc-400 text-xs mt-4 leading-relaxed font-light">
                    Calm, minimalist layouts with floor-to-ceiling glass windows that open up to warm Mediterranean morning sunlight.
                  </p>
                </div>
                <div className="relative z-10 flex justify-between items-end border-t border-white/5 pt-4">
                  <span className="text-[8.5px] uppercase font-bold text-white">$1,850 / night</span>
                  <span className="text-[8.5px] uppercase font-bold text-amber-400 tracking-wider">Rating: 4.98</span>
                </div>
              </motion.div>
            )}

            {activeSceneIndex === 3 && (
              <motion.div
                key="mob-scene-3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full rounded-[2rem] glass-card p-6 flex flex-col justify-between text-left overflow-hidden relative"
              >
                <div className="absolute inset-0 z-0 opacity-20">
                  <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" alt="Pool" />
                </div>
                <div className="relative z-10">
                  <span className="text-[9px] uppercase font-bold text-amber-400">✦ Infinity Pool</span>
                  <h3 className="text-2xl font-sans text-white mt-2 leading-tight">Amanwella Resort</h3>
                  <span className="text-[8px] text-zinc-500 block uppercase tracking-widest mt-1">Tangalle, Sri Lanka</span>
                  <p className="text-zinc-400 text-xs mt-4 leading-relaxed font-light">
                    Watch the sunset from lounge chairs beside an infinity pool that merges seamlessly with the ocean's horizon.
                  </p>
                </div>
                <div className="relative z-10 flex justify-between items-end border-t border-white/5 pt-4">
                  <span className="text-[8.5px] uppercase font-bold text-white">$1,150 / night</span>
                  <span className="text-[8.5px] uppercase font-bold text-amber-400 tracking-wider">Rating: 4.93</span>
                </div>
              </motion.div>
            )}

            {activeSceneIndex === 4 && (
              <motion.div
                key="mob-scene-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full rounded-[2rem] glass-card p-6 flex flex-col justify-between text-left overflow-hidden relative pointer-events-auto"
              >
                <div className="absolute inset-0 z-0 opacity-20">
                  <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" alt="Night" />
                </div>
                <div className="relative z-10 text-center flex flex-col items-center">
                  <span className="text-[9px] uppercase font-bold text-amber-400">✦ Night Experience</span>
                  <h3 className="text-xl font-sans text-white mt-2 leading-tight">Palazzo Chamber</h3>
                  <span className="text-[8px] text-zinc-500 block uppercase tracking-widest mt-1">Aman Venice, Italy</span>
                  
                  <button className="w-full bg-white text-black font-semibold text-[10px] uppercase tracking-wider py-3.5 rounded-full mt-8 flex items-center justify-center gap-1.5 shadow-xl">
                    <span>Reserve Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  
                  <button className="w-full bg-white/[0.04] text-white border border-white/10 font-semibold text-[10px] uppercase tracking-wider py-3.5 rounded-full mt-2.5">
                    <span>Talk To Our Experts</span>
                  </button>
                </div>
                <div className="relative z-10 flex justify-between items-end border-t border-white/5 pt-3">
                  <span className="text-[7.5px] uppercase text-zinc-500 tracking-wider">Scene 5 / 5</span>
                  <span className="text-[7.5px] font-bold text-amber-400 uppercase tracking-widest">AVN HOLIDAYS</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-6 mt-8">
          <button onClick={() => setActiveSceneIndex(prev => Math.max(0, prev - 1))} className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <button key={`dot-scene-${i}`} onClick={() => setActiveSceneIndex(i)} className={`h-2 rounded-full transition-all duration-300 ${i === activeSceneIndex ? "w-6 bg-amber-400" : "w-2 bg-white/20"}`} />
            ))}
          </div>
          <button onClick={() => setActiveSceneIndex(prev => Math.min(4, prev + 1))} className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
