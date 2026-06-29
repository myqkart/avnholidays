"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { 
  Sparkles, Award, Globe, Compass, Plane, CloudSun, 
  ShieldCheck, DollarSign, FileText, Users, Bookmark, 
  ArrowRight, ChevronLeft, ChevronRight 
} from "lucide-react";
import { MagneticButton } from "../ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export function Journey() {
  const journeyContainerRef = useRef<HTMLDivElement>(null);
  const journeyTrackRef = useRef<HTMLDivElement>(null);
  const journeyBgRef = useRef<HTMLDivElement>(null);
  const journeyIntroRef = useRef<HTMLDivElement>(null);

  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [, setJourneyProgress] = useState(0);

  useGSAP(() => {
    const journeyTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: journeyContainerRef.current,
        start: "top top",
        end: "+=380%",
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          setJourneyProgress(progress);
          const chIdx = Math.min(4, Math.floor(progress * 5));
          setActiveChapterIndex(chIdx);
        }
      }
    });

    if (journeyTrackRef.current) {
      journeyTimeline.to(journeyTrackRef.current, {
        x: "-400vw",
        ease: "none",
        duration: 5.5
      }, 0.2);
    }

    if (journeyBgRef.current) {
      journeyTimeline.to(journeyBgRef.current, {
        background: "radial-gradient(circle at 50% 50%, rgba(251,113,133,0.16) 0%, rgba(253,186,116,0.12) 40%, rgba(9,9,11,1) 100%)",
        duration: 1.2
      }, 0);
      journeyTimeline.to(journeyBgRef.current, {
        background: "radial-gradient(circle at 50% 50%, rgba(245,158,11,0.14) 0%, rgba(244,63,94,0.12) 45%, rgba(9,9,11,1) 100%)",
        duration: 1.2
      }, 1.2);
      journeyTimeline.to(journeyBgRef.current, {
        background: "radial-gradient(circle at 50% 50%, rgba(236,72,153,0.14) 0%, rgba(139,92,246,0.12) 50%, rgba(9,9,11,1) 100%)",
        duration: 1.2
      }, 2.4);
      journeyTimeline.to(journeyBgRef.current, {
        background: "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.16) 0%, rgba(244,63,94,0.14) 50%, rgba(9,9,11,1) 100%)",
        duration: 1.2
      }, 3.6);
    }

    if (journeyIntroRef.current) {
      journeyTimeline.to(journeyIntroRef.current, {
        opacity: 0,
        y: -60,
        filter: "blur(8px)",
        duration: 0.6
      }, 0.3);
    }

    // Chapter 1
    journeyTimeline.fromTo(".ch1-passport", { y: 60, rotate: -15, opacity: 0 }, { y: 0, rotate: 6, opacity: 1, duration: 0.8 }, 0.4);
    journeyTimeline.fromTo(".ch1-text", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.4);
    journeyTimeline.fromTo(".ch1-plane", { x: -80, y: 80, opacity: 0 }, { x: 140, y: -90, opacity: 1, duration: 1.1 }, 0.6);

    // Chapter 2
    journeyTimeline.fromTo(".ch2-text", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 1.3);
    journeyTimeline.fromTo(".ch2-card", { scale: 0.8, opacity: 0, filter: "blur(6px)" }, { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.8 }, 1.3);
    journeyTimeline.fromTo(".ch2-path", { strokeDashoffset: 600 }, { strokeDashoffset: 0, duration: 1.0, ease: "power2.inOut" }, 1.5);
    journeyTimeline.fromTo(".ch2-bubble", { opacity: 0, scale: 0.75 }, { opacity: 1, scale: 1, stagger: 0.12, duration: 0.6 }, 1.6);

    // Chapter 3
    journeyTimeline.fromTo(".ch3-text", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 2.5);
    journeyTimeline.fromTo(".ch3-img-1", { y: 120, rotate: -4, opacity: 0, scale: 0.9 }, { y: 0, rotate: -2, opacity: 1, scale: 1, duration: 0.8 }, 2.5);
    journeyTimeline.fromTo(".ch3-img-2", { y: -120, rotate: 6, opacity: 0, scale: 0.9 }, { y: 0, rotate: 3, opacity: 1, scale: 1, duration: 0.8 }, 2.6);
    journeyTimeline.fromTo(".ch3-img-3", { y: 160, rotate: -6, opacity: 0, scale: 0.85 }, { y: 0, rotate: -5, opacity: 1, scale: 1, duration: 0.8 }, 2.7);

    // Chapter 4
    journeyTimeline.fromTo(".ch4-text", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 3.7);
    journeyTimeline.fromTo(".ch4-polaroid-1", { y: 260, rotate: -12, opacity: 0 }, { y: 0, rotate: -7, opacity: 1, duration: 0.9 }, 3.7);
    journeyTimeline.fromTo(".ch4-polaroid-2", { y: 320, rotate: 12, opacity: 0 }, { y: 0, rotate: 5, opacity: 1, duration: 0.9 }, 3.8);
    journeyTimeline.fromTo(".ch4-polaroid-3", { y: 380, rotate: -6, opacity: 0 }, { y: 0, rotate: -1, opacity: 1, duration: 0.9 }, 3.9);
    journeyTimeline.fromTo(".ch4-stamp", { scale: 2.8, opacity: 0, rotate: -45 }, { scale: 1, opacity: 1, rotate: 15, duration: 0.5, ease: "bounce.out" }, 4.1);

    // Chapter 5
    journeyTimeline.fromTo(".ch5-text", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 4.8);
    journeyTimeline.fromTo(".ch5-journal", { scale: 0.7, opacity: 0, rotate: -8 }, { scale: 1, opacity: 1, rotate: 0, duration: 0.8 }, 4.8);

    journeyTimeline.to(".ch5-zoom-wrapper", {
      scale: 0.76,
      opacity: 0.1,
      filter: "blur(10px)",
      duration: 0.8
    }, 5.2);

    journeyTimeline.fromTo(".ch5-cta", { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0, ease: "power2.out" }, 5.3);

    journeyTimeline.to(".ch5-hotel-zoom", {
      scale: 3.5,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power2.inOut"
    }, 6.0);

  }, { scope: journeyContainerRef });

  return (
    <section ref={journeyContainerRef} className="relative w-full h-screen overflow-hidden bg-black z-20">
      <div 
        ref={journeyBgRef}
        className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-1000"
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(251,113,133,0.16) 0%, rgba(253,186,116,0.12) 40%, rgba(9,9,11,1) 100%)" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-950/0 via-zinc-950/20 to-zinc-950 z-[2] pointer-events-none" />

      <div className="hidden md:block w-full h-full relative z-10">
        <div className="absolute top-10 left-12 z-30 flex items-center gap-8 select-none">
          <span className="text-[10px] tracking-[0.25em] font-semibold text-amber-400 uppercase font-sans flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Crafted Experiences
          </span>
          <div className="flex gap-2.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={`chapter-dot-${i}`} className={`h-[3px] rounded-full transition-all duration-500 ${i === activeChapterIndex ? "w-8 bg-amber-400" : "w-3 bg-white/10"}`} />
            ))}
          </div>
        </div>

        <div ref={journeyIntroRef} className="absolute inset-0 flex flex-col items-center justify-center text-center z-[25] px-6 pointer-events-none">
          <div className="max-w-3xl flex flex-col items-center">
            <span className="inline-block text-[9px] font-bold uppercase tracking-[0.3em] text-amber-400 bg-amber-400/5 border border-amber-400/20 px-3 py-1 rounded-full mb-6">
              ✦ Chapter Prologue
            </span>
            <h2 className="text-5xl md:text-7xl font-sans tracking-tight text-white leading-none mb-6 flex flex-col">
              <span className="block opacity-95 font-light">It's Never Just</span>
              <span className="block font-serif italic text-amber-400 font-normal mt-2">A Trip.</span>
              <span className="block font-semibold mt-2">It's Your Story.</span>
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-[550px] font-light">
              We handle the flight paths, reservations, and keys, so that you can dwell entirely inside the moment. Dwell in the stories of a lifetime.
            </p>
          </div>
        </div>

        <div ref={journeyTrackRef} className="flex flex-row w-[500vw] h-full" style={{ willChange: "transform" }}>
          
          <div className="w-screen h-full flex-shrink-0 flex items-center justify-center relative px-16">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-12 gap-16 items-center">
              <div className="col-span-5 text-left ch1-text opacity-0">
                <span className="inline-block text-[9px] font-bold uppercase tracking-[0.25em] text-amber-400/80 mb-3 block">
                  ✦ Chapter 01 / Dream
                </span>
                <h3 className="text-4xl md:text-5xl font-sans tracking-tight text-white mb-6 leading-tight">
                  It Starts With <br />
                  <span className="font-serif italic text-amber-400 font-normal">A Dream.</span>
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-light max-w-[420px] select-text">
                  Every journey is born from raw inspiration. A passing photograph, a memory of a scent, a quiet urge to cross coordinate lines. We turn quiet aspirations into concrete reality.
                </p>
                <div className="inline-flex items-center gap-3 bg-white/[0.02] border border-white/5 px-4 py-2.5 rounded-xl backdrop-blur-xl animate-float-slow">
                  <Award className="w-4 h-4 text-amber-400" />
                  <div className="text-left">
                    <div className="text-[10px] font-semibold text-white leading-none">Trusted Since 2016</div>
                    <span className="text-[7.5px] text-zinc-500 uppercase tracking-widest">A Decade of Fine Journeys</span>
                  </div>
                </div>
              </div>
              <div className="col-span-7 relative h-[500px] flex items-center justify-center">
                <div className="absolute w-[360px] h-[360px] opacity-25 animate-globe-spin z-0 pointer-events-none">
                  <svg viewBox="0 0 100 100" className="w-full h-full stroke-zinc-700 stroke-[0.4] fill-none">
                    <circle cx="50" cy="50" r="45" />
                    <ellipse cx="50" cy="50" rx="45" ry="15" />
                    <ellipse cx="50" cy="50" rx="45" ry="30" />
                    <ellipse cx="50" cy="50" rx="15" ry="45" />
                    <ellipse cx="50" cy="50" rx="30" ry="45" />
                    <line x1="5" y1="50" x2="95" y2="50" />
                    <line x1="50" y1="5" x2="50" y2="95" />
                  </svg>
                </div>
                <div className="absolute inset-0 z-10 pointer-events-none ch1-plane opacity-0">
                  <svg viewBox="0 0 400 300" className="w-full h-full fill-none">
                    <path d="M 50 250 Q 180 80 320 60" stroke="rgba(251, 191, 36, 0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
                  </svg>
                  <div className="absolute w-6 h-6 bg-zinc-900 border border-white/10 rounded-full flex items-center justify-center shadow-lg" style={{ left: "310px", top: "50px" }}>
                    <Plane className="w-3.5 h-3.5 text-amber-400 rotate-45" />
                  </div>
                </div>
                <div className="relative w-[280px] h-[380px] ch1-passport opacity-0 z-10">
                  <div className="w-full h-full glass-card rounded-[2rem] p-6 text-left flex flex-col justify-between relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/5 rounded-full blur-2xl pointer-events-none" />
                    <div className="flex justify-between items-start">
                      <Compass className="w-8 h-8 text-amber-400/80 animate-spin [animation-duration:12s]" />
                      <span className="text-[9px] tracking-widest text-zinc-500 uppercase">AVN Passport</span>
                    </div>
                    <div className="my-auto flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full border border-amber-400/20 flex items-center justify-center mb-4">
                        <Globe className="w-8 h-8 text-amber-400" />
                      </div>
                      <h4 className="text-xs uppercase tracking-[0.25em] font-semibold text-zinc-300">Curated Explorer</h4>
                      <span className="text-[8px] text-zinc-500 uppercase tracking-widest mt-1">Status: Infinite Horizons</span>
                    </div>
                    <div className="border-t border-white/5 pt-4">
                      <div className="text-[7.5px] text-zinc-500 uppercase tracking-widest">Journey Holder</div>
                      <div className="text-[10px] font-bold text-white uppercase mt-0.5 tracking-wide">AVN GLOBAL VOYAGER</div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-[8%] left-[8%] w-36 h-40 bg-zinc-900/60 border border-white/8 rounded-lg p-2.5 rotate-[-12deg] z-0 shadow-xl pointer-events-none">
                  <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80" className="w-full h-[80%] object-cover rounded" alt="dream" />
                  <span className="text-[8px] text-zinc-500 block text-center mt-2 font-serif italic">Bali, 2026</span>
                </div>
                <div className="absolute bottom-[10%] right-[6%] w-36 h-40 bg-zinc-900/60 border border-white/8 rounded-lg p-2.5 rotate-[8deg] z-0 shadow-xl pointer-events-none">
                  <img src="https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=400&q=80" className="w-full h-[80%] object-cover rounded" alt="dream" />
                  <span className="text-[8px] text-zinc-500 block text-center mt-2 font-serif italic">Zermatt, 2026</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-screen h-full flex-shrink-0 flex items-center justify-center relative px-16">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-12 gap-16 items-center">
              <div className="col-span-5 text-left ch2-text opacity-0">
                <span className="inline-block text-[9px] font-bold uppercase tracking-[0.25em] text-amber-400/80 mb-3 block">
                  ✦ Chapter 02 / Planning
                </span>
                <h3 className="text-4xl md:text-5xl font-sans tracking-tight text-white mb-6 leading-tight">
                  Effortless planning, <br />
                  <span className="font-serif italic text-amber-400 font-normal">zero friction.</span>
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-light max-w-[420px] select-text">
                  No tab-juggling or disjointed schedules. Our bespoke planning framework integrates flights, luxury keys, visa checks, and private transfers into one continuous itinerary, backed by local experts.
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <div className="inline-flex items-center gap-2 bg-white/[0.02] border border-white/5 px-3 py-1.5 rounded-full text-zinc-300 text-[9px] uppercase tracking-widest">✦ Personalized Itineraries</div>
                  <div className="inline-flex items-center gap-2 bg-white/[0.02] border border-white/5 px-3 py-1.5 rounded-full text-zinc-300 text-[9px] uppercase tracking-widest">✦ Visa Assistance</div>
                </div>
              </div>
              <div className="col-span-7 relative h-[500px] flex items-center justify-center">
                <div className="relative w-[340px] h-[280px] ch2-card opacity-0 z-10">
                  <div className="w-full h-full glass-card rounded-[2rem] p-6 text-left flex flex-col justify-between shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-36 h-20 bg-gradient-to-bl from-white/[0.02] to-transparent pointer-events-none" />
                    <div className="flex justify-between items-center border-b border-white/5 pb-3">
                      <div>
                        <div className="text-[10px] font-bold text-white tracking-wide uppercase">AVN Connect Dashboard</div>
                        <span className="text-[7.5px] text-zinc-500 uppercase tracking-widest">System Status: Active</span>
                      </div>
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                    <div className="my-auto relative h-28 flex items-center justify-between">
                      <svg className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-[2px] z-0 overflow-visible">
                        <path d="M 10 1 H 280" stroke="rgba(251, 191, 36, 0.15)" strokeWidth="2" className="ch2-path" style={{ strokeDasharray: "8 4" }} />
                      </svg>
                      <div className="flex justify-between w-full relative z-10 px-2">
                        <div className="flex flex-col items-center gap-1.5 ch2-bubble opacity-0">
                          <div className="w-9 h-9 rounded-full bg-zinc-950 border border-white/10 hover:border-amber-400/50 flex items-center justify-center transition-colors">
                            <Plane className="w-4 h-4 text-sky-400" />
                          </div>
                          <span className="text-[8px] text-zinc-400 uppercase tracking-wider">Flight</span>
                        </div>
                        <div className="flex flex-col items-center gap-1.5 ch2-bubble opacity-0">
                          <div className="w-9 h-9 rounded-full bg-zinc-950 border border-white/10 hover:border-amber-400/50 flex items-center justify-center transition-colors">
                            <CloudSun className="w-4 h-4 text-emerald-400" />
                          </div>
                          <span className="text-[8px] text-zinc-400 uppercase tracking-wider">Stays</span>
                        </div>
                        <div className="flex flex-col items-center gap-1.5 ch2-bubble opacity-0">
                          <div className="w-9 h-9 rounded-full bg-zinc-950 border border-white/10 hover:border-amber-400/50 flex items-center justify-center transition-colors">
                            <ShieldCheck className="w-4 h-4 text-amber-400" />
                          </div>
                          <span className="text-[8px] text-zinc-400 uppercase tracking-wider">Visa</span>
                        </div>
                        <div className="flex flex-col items-center gap-1.5 ch2-bubble opacity-0">
                          <div className="w-9 h-9 rounded-full bg-zinc-950 border border-white/10 hover:border-amber-400/50 flex items-center justify-center transition-colors">
                            <DollarSign className="w-4 h-4 text-purple-400" />
                          </div>
                          <span className="text-[8px] text-zinc-400 uppercase tracking-wider">Rates</span>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-white/5 pt-3.5 flex justify-between items-center">
                      <span className="text-[7.5px] text-zinc-500 uppercase tracking-widest">Active flight: AVN-902</span>
                      <span className="text-[8.5px] font-bold text-amber-400 uppercase tracking-wide bg-amber-400/5 border border-amber-400/20 px-2 py-0.5 rounded">Best Price Match</span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-[12%] right-[10%] bg-zinc-900/80 border border-white/10 rounded-xl px-4 py-2.5 flex items-center gap-3 backdrop-blur-xl shadow-lg rotate-[5deg] select-none pointer-events-none">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <div className="text-left">
                    <div className="text-[9px] font-bold text-white uppercase tracking-wide">AVN Travel Ticket</div>
                    <span className="text-[7px] text-zinc-500 uppercase">LUGGAGE CODE: #AVN-8041</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-screen h-full flex-shrink-0 flex items-center justify-center relative px-16">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-12 gap-16 items-center">
              <div className="col-span-5 text-left ch3-text opacity-0">
                <span className="inline-block text-[9px] font-bold uppercase tracking-[0.25em] text-amber-400/80 mb-3 block">
                  ✦ Chapter 03 / Adventure
                </span>
                <h3 className="text-4xl md:text-5xl font-sans tracking-tight text-white mb-6 leading-tight">
                  Venture into <br />
                  <span className="font-serif italic text-amber-400 font-normal">the wilderness.</span>
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-light max-w-[420px] select-text">
                  Step far beyond traditional sightseeing. Sleep in architecture tailored specifically to capture the landscape. Walk hidden pathways guided by local experts who live the culture daily.
                </p>
                <div className="inline-flex items-center gap-3 bg-white/[0.02] border border-white/5 px-4 py-2.5 rounded-xl backdrop-blur-xl animate-float-drift">
                  <Users className="w-4 h-4 text-purple-400" />
                  <div className="text-left">
                    <div className="text-[10px] font-semibold text-white leading-none">Local Concierge Experts</div>
                    <span className="text-[7.5px] text-zinc-500 uppercase tracking-widest">24×7 Active In-Country Support</span>
                  </div>
                </div>
              </div>
              <div className="col-span-7 relative h-[500px] flex items-center justify-center">
                <div className="absolute left-[8%] bottom-[8%] w-[220px] h-[280px] rounded-[2rem_1rem_1.5rem_1rem] overflow-hidden border border-white/10 shadow-2xl z-10 ch3-img-1 opacity-0">
                  <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover scale-110" alt="Adventure" />
                </div>
                <div className="absolute right-[12%] top-[10%] w-[260px] h-[300px] rounded-[1.5rem_2rem_1rem_2rem] overflow-hidden border border-white/10 shadow-2xl z-0 ch3-img-2 opacity-0">
                  <img src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover scale-110" alt="Adventure" />
                </div>
                <div className="absolute left-[36%] bottom-[12%] w-[200px] h-[220px] rounded-[1.5rem] overflow-hidden border border-white/10 shadow-2xl z-20 ch3-img-3 opacity-0">
                  <img src="https://images.unsplash.com/photo-1528181304800-2f190854897d?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover scale-110" alt="Adventure" />
                </div>
              </div>
            </div>
          </div>

          <div className="w-screen h-full flex-shrink-0 flex items-center justify-center relative px-16">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-12 gap-16 items-center">
              <div className="col-span-5 text-left ch4-text opacity-0">
                <span className="inline-block text-[9px] font-bold uppercase tracking-[0.25em] text-amber-400/80 mb-3 block">
                  ✦ Chapter 04 / Memories
                </span>
                <h3 className="text-4xl md:text-5xl font-sans tracking-tight text-white mb-6 leading-tight">
                  Stamps in your soul, <br />
                  <span className="font-serif italic text-amber-400 font-normal">not just pages.</span>
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-light max-w-[420px] select-text">
                  Every landmark coordinates leave an imprint. Witness your custom travel passport fill with approved destination stamps, and your memory wall collect the Polaroids of raw moments.
                </p>
                <div className="inline-flex items-center gap-3 bg-white/[0.02] border border-white/5 px-4 py-2.5 rounded-xl backdrop-blur-xl animate-float-slow">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <div className="text-left">
                    <div className="text-[10px] font-semibold text-white leading-none">Best Rate Protection</div>
                    <span className="text-[7.5px] text-zinc-500 uppercase tracking-widest">Guaranteed Fine Services</span>
                  </div>
                </div>
              </div>
              <div className="col-span-7 relative h-[500px] flex items-center justify-center">
                <div className="relative w-[340px] h-[340px] glass-card rounded-[2.5rem] p-6 text-left flex flex-col justify-between shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.01] to-white/[0.04] pointer-events-none" />
                  <div className="flex justify-between items-start border-b border-white/5 pb-3">
                    <div>
                      <div className="text-[10px] font-bold text-white tracking-wide uppercase">Voyage Logs</div>
                      <span className="text-[7.5px] text-zinc-500 uppercase tracking-widest">Journal ID: #AVN-2026</span>
                    </div>
                    <Bookmark className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="my-auto py-4 flex flex-col gap-2">
                    <div className="text-[9px] text-zinc-400 italic">"Overwater decks in Maldives.Retracting roofs to count constellations under infinite night skies."</div>
                    <span className="text-[8px] text-zinc-500 font-semibold uppercase tracking-widest mt-1">— Soneva Sandbanks, June 2026</span>
                  </div>
                  <div className="absolute right-6 bottom-6 w-24 h-24 ch4-stamp opacity-0 pointer-events-none select-none">
                    <div className="w-full h-full rounded-full border-[3px] border-double border-emerald-400/40 flex flex-col items-center justify-center rotate-12 bg-zinc-950/20 backdrop-blur-sm">
                      <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-widest leading-none">APPROVED</span>
                      <span className="text-[6.5px] text-emerald-400/80 font-mono mt-0.5">AVN HOLIDAYS</span>
                    </div>
                  </div>
                </div>
                <div className="absolute left-[0%] top-[12%] w-[120px] h-[150px] bg-zinc-900 border border-white/8 rounded-lg p-2 rotate-[-15deg] shadow-2xl z-20 ch4-polaroid-1 opacity-0 animate-float-slow">
                  <img src="https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=300&q=80" className="w-full h-[76%] object-cover rounded" alt="Maldives" />
                  <span className="text-[7px] text-zinc-400 block text-center mt-1.5 font-serif italic">Maldives Escape</span>
                </div>
                <div className="absolute right-[4%] bottom-[8%] w-[130px] h-[160px] bg-zinc-900 border border-white/8 rounded-lg p-2.5 rotate-[12deg] shadow-2xl z-20 ch4-polaroid-2 opacity-0 animate-float-drift">
                  <img src="https://images.unsplash.com/photo-1595818970664-4be341753c45?auto=format&fit=crop&w=300&q=80" className="w-full h-[76%] object-cover rounded" alt="Kashmir" />
                  <span className="text-[7px] text-zinc-400 block text-center mt-1.5 font-serif italic">Srinagar Valley</span>
                </div>
                <div className="absolute right-[12%] top-[8%] w-[110px] h-[140px] bg-zinc-900 border border-white/8 rounded-lg p-2 rotate-[-5deg] shadow-2xl z-10 ch4-polaroid-3 opacity-0">
                  <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=300&q=80" className="w-full h-[76%] object-cover rounded" alt="Dubai" />
                  <span className="text-[7px] text-zinc-400 block text-center mt-1.5 font-serif italic">Dubai Skylines</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-screen h-full flex-shrink-0 flex items-center justify-center relative px-16">
            <div className="absolute inset-0 flex items-center justify-center ch5-zoom-wrapper pointer-events-none select-none z-0">
              <div className="max-w-4xl w-full grid grid-cols-12 gap-10 items-center">
                <div className="col-span-5 text-left ch5-text opacity-0">
                  <span className="text-[9px] uppercase tracking-widest text-zinc-600 block mb-2">✦ Chapter 05</span>
                  <h3 className="text-3xl font-sans text-white mb-4">The Journey Ends. <br /> The Memories Never Do.</h3>
                </div>
                <div className="col-span-7 flex items-center justify-center gap-6">
                  <div className="w-36 h-48 bg-zinc-900/40 border border-white/5 rounded-xl p-3 shadow-lg ch5-journal opacity-0">
                    <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=300&q=80" className="w-full h-[80%] object-cover rounded" alt="dream" />
                  </div>
                  <div className="w-36 h-48 bg-zinc-900/40 border border-white/5 rounded-xl p-3 shadow-lg rotate-6">
                    <img src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=300&q=80" className="w-full h-[80%] object-cover rounded" alt="dream" />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 max-w-3xl flex flex-col items-center text-center ch5-cta opacity-0 pointer-events-auto">
              <span className="inline-block text-[10px] tracking-[0.3em] font-semibold text-amber-400 uppercase font-sans mb-4 block select-none">
                ✦ Start Designing Your Escape
              </span>
              <h2 className="text-4xl md:text-7xl font-sans tracking-tight text-white leading-none mb-8">
                Let's Create <br />
                <span className="font-serif italic text-amber-400 font-normal">Your Next Story.</span>
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-[550px] mb-12 font-light select-text">
                Relax in curation structured by design. Embark on experiences crafted to inspire. Connect with our dedicated travel experts to custom-develop your next luxury itinerary.
              </p>
              <div className="flex flex-row items-center gap-4">
                <MagneticButton className="group bg-white hover:bg-transparent text-black hover:text-white px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider border border-white flex items-center gap-3 transition-colors duration-300 cursor-pointer shadow-2xl">
                  <span>Plan My Journey</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                </MagneticButton>
                <MagneticButton className="group bg-white/[0.03] backdrop-blur-[20px] hover:bg-white/10 px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2.5 transition-all duration-300 border border-white/10 hover:border-white/20 cursor-pointer">
                  <span>Talk To Our Experts</span>
                </MagneticButton>
              </div>
            </div>

            <div className="absolute inset-0 z-[40] pointer-events-none overflow-hidden ch5-hotel-zoom opacity-0 scale-90 flex items-center justify-center">
              <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80" className="w-full h-full object-cover scale-100" alt="Luxury Hotel Lobby" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80 z-[41] pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden w-full h-full flex flex-col items-center justify-center px-6 py-20 relative z-10 select-none">
        <div className="absolute top-10 flex flex-col items-center">
          <span className="text-[9px] tracking-[0.25em] font-bold text-amber-400 uppercase font-sans mb-1 block">
            ✦ Crafted Experiences
          </span>
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-sans block">
            Chapter 0{activeChapterIndex + 1} of 05
          </span>
        </div>

        <div className="relative w-full h-[400px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {activeChapterIndex === 0 && (
              <motion.div
                key="mob-ch-0"
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full rounded-[2rem] glass-card p-6 flex flex-col justify-between text-left"
              >
                <div>
                  <span className="text-[9px] uppercase font-bold text-amber-400">✦ Dream</span>
                  <h3 className="text-2xl font-sans text-white mt-2 leading-tight">It Starts With <span className="font-serif italic text-amber-400 font-normal">A Dream.</span></h3>
                  <p className="text-zinc-400 text-xs mt-4 leading-relaxed font-light">
                    Every escape starts with inspiration. A memory of a sunset or a quiet urge to travel. We turn quiet dreams into stamped passports.
                  </p>
                </div>
                <div className="flex justify-between items-end border-t border-white/5 pt-4">
                  <span className="text-[7.5px] uppercase text-zinc-500 tracking-wider">Chapter 1 / 5</span>
                  <div className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[8.5px] uppercase tracking-widest text-zinc-300 font-semibold">
                    Trusted Since 2016
                  </div>
                </div>
              </motion.div>
            )}

            {activeChapterIndex === 1 && (
              <motion.div
                key="mob-ch-1"
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full rounded-[2rem] glass-card p-6 flex flex-col justify-between text-left"
              >
                <div>
                  <span className="text-[9px] uppercase font-bold text-amber-400">✦ Planning</span>
                  <h3 className="text-2xl font-sans text-white mt-2 leading-tight">Effortless <span className="font-serif italic text-amber-400 font-normal">Planning.</span></h3>
                  <p className="text-zinc-400 text-xs mt-4 leading-relaxed font-light">
                    We coordinate flights, luxury stays, visa assistance, and transfers under a single unified itinerary dashboard.
                  </p>
                </div>
                <div className="flex justify-between items-end border-t border-white/5 pt-4">
                  <span className="text-[7.5px] uppercase text-zinc-500 tracking-wider">Chapter 2 / 5</span>
                  <div className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[8.5px] uppercase tracking-widest text-zinc-300 font-semibold">
                    Visa Assistance
                  </div>
                </div>
              </motion.div>
            )}

            {activeChapterIndex === 2 && (
              <motion.div
                key="mob-ch-2"
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full rounded-[2rem] glass-card p-6 flex flex-col justify-between text-left"
              >
                <div>
                  <span className="text-[9px] uppercase font-bold text-amber-400">✦ Adventure</span>
                  <h3 className="text-2xl font-sans text-white mt-2 leading-tight">Into The <span className="font-serif italic text-amber-400 font-normal">Wilderness.</span></h3>
                  <p className="text-zinc-400 text-xs mt-4 leading-relaxed font-light">
                    Venture off the grid into local culture, customized catamaran cruises, and architectural wonders with local experts.
                  </p>
                </div>
                <div className="flex justify-between items-end border-t border-white/5 pt-4">
                  <span className="text-[7.5px] uppercase text-zinc-500 tracking-wider">Chapter 3 / 5</span>
                  <div className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[8.5px] uppercase tracking-widest text-zinc-300 font-semibold">
                    Local Concierges
                  </div>
                </div>
              </motion.div>
            )}

            {activeChapterIndex === 3 && (
              <motion.div
                key="mob-ch-3"
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full rounded-[2rem] glass-card p-6 flex flex-col justify-between text-left"
              >
                <div>
                  <span className="text-[9px] uppercase font-bold text-amber-400">✦ Memories</span>
                  <h3 className="text-2xl font-sans text-white mt-2 leading-tight">Stamps in <span className="font-serif italic text-amber-400 font-normal">Your Soul.</span></h3>
                  <p className="text-zinc-400 text-xs mt-4 leading-relaxed font-light">
                    Watch your passport fill with destination stamps and your travel journal fill with raw, beautiful Polaroids of sunsets.
                  </p>
                </div>
                <div className="flex justify-between items-end border-t border-white/5 pt-4">
                  <span className="text-[7.5px] uppercase text-zinc-500 tracking-wider">Chapter 4 / 5</span>
                  <div className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[8.5px] uppercase tracking-widest text-zinc-300 font-semibold">
                    Best Rates Checked
                  </div>
                </div>
              </motion.div>
            )}

            {activeChapterIndex === 4 && (
              <motion.div
                key="mob-ch-4"
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full rounded-[2rem] glass-card p-6 flex flex-col justify-between text-left pointer-events-auto"
              >
                <div className="text-center flex flex-col items-center">
                  <span className="text-[9px] uppercase font-bold text-amber-400">✦ Create Story</span>
                  <h3 className="text-xl font-sans text-white mt-2 leading-tight">Let's Create Your Next Story.</h3>
                  <p className="text-zinc-400 text-[10px] mt-2 leading-relaxed font-light">
                    Talk with our travel expert designers to organize your next curated luxury holiday escape.
                  </p>
                  <button className="w-full bg-white text-black font-semibold text-[10px] uppercase tracking-wider py-3.5 rounded-full mt-6 flex items-center justify-center gap-1.5 shadow-xl">
                    <span>Plan My Journey</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button className="w-full bg-white/[0.04] text-white border border-white/10 font-semibold text-[10px] uppercase tracking-wider py-3.5 rounded-full mt-2.5 flex items-center justify-center">
                    <span>Talk To Our Experts</span>
                  </button>
                </div>
                <div className="flex justify-between items-end border-t border-white/5 pt-3">
                  <span className="text-[7.5px] uppercase text-zinc-500 tracking-wider">Chapter 5 / 5</span>
                  <span className="text-[7.5px] font-bold text-amber-400 uppercase tracking-widest">AVN HOLIDAYS</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-6 mt-8">
          <button onClick={() => setActiveChapterIndex(prev => Math.max(0, prev - 1))} className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <button key={`dot-swipe-${i}`} onClick={() => setActiveChapterIndex(i)} className={`h-2 rounded-full transition-all duration-300 ${i === activeChapterIndex ? "w-6 bg-amber-400" : "w-2 bg-white/20"}`} />
            ))}
          </div>
          <button onClick={() => setActiveChapterIndex(prev => Math.min(4, prev + 1))} className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
