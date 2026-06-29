"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Play, ArrowRight, MapPin, Calendar, Users, Compass, Star, ShieldCheck, BadgeHelp, Sparkles, Globe, Award } from "lucide-react";
import { MagneticButton } from "../ui/MagneticButton";
import { FloatingCard } from "../ui/FloatingCard";
import { useMouseParallax } from "../../hooks/useMouseParallax";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const floatingCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("explore");

  const { smoothX, smoothY, handleMouseMove } = useMouseParallax();

  // 3D Tilt for Experience Widget
  // We recreate useTransform locally since we can't easily extract it without creating a custom hook for everything
  const widgetRotateX = smoothY.get() * -18;
  const widgetRotateY = smoothX.get() * 18;

  useGSAP(() => {
    // Initial Navbar Setup
    const navbar = document.getElementById('main-navbar');
    if (navbar) {
      gsap.set(navbar, { xPercent: -50 });
    }

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "bottom bottom",
        end: "+=120%",
        scrub: 1.1,
        pin: true,
        anticipatePin: 1,
      }
    });

    if (bgRef.current) scrollTl.to(bgRef.current, { scale: 1.25, ease: "sine.inOut" }, 0);
    if (mainContentRef.current) scrollTl.to(mainContentRef.current, { scale: 0.88, opacity: 0, y: -30, ease: "power2.inOut" }, 0);
    
    floatingCardsRef.current.forEach((card, index) => {
      if (!card) return;
      const directionX = index % 2 === 0 ? -220 : 220;
      const directionY = index < 3 ? -180 : 180;
      scrollTl.to(card, { 
        x: directionX, 
        y: directionY, 
        scale: 0.6, 
        opacity: 0, 
        filter: "blur(8px)",
        ease: "power2.inOut" 
      }, 0);
    });

    if (scrollIndicatorRef.current) scrollTl.to(scrollIndicatorRef.current, { opacity: 0, scale: 0.8, ease: "power1.out" }, 0);

    if (navbar) {
      scrollTl.to(navbar, {
        y: -24,
        xPercent: -50,
        width: "100vw",
        maxWidth: "100vw",
        borderRadius: "0px",
        paddingLeft: "3rem",
        paddingRight: "3rem",
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(24px)",
        borderColor: "rgba(255, 255, 255, 0.04)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        ease: "power2.inOut"
      }, 0);
    }
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full select-none overflow-hidden bg-black text-white pointer-events-auto"
      style={{ perspective: 1200 }}
    >
      {/* Background Layers */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full pointer-events-none scale-100 origin-center">
        <div className="absolute inset-0 w-full h-full bg-zinc-950 transition-opacity duration-1000">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedData={() => setIsVideoLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              isVideoLoaded ? "opacity-45" : "opacity-0"
            }`}
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-luxury-resort-in-maldives-41807-large.mp4" type="video/mp4" />
          </video>
          {!isVideoLoaded && (
            <img
              src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1920&q=80"
              alt="Luxury Travel Haven"
              className="absolute inset-0 w-full h-full object-cover opacity-35"
              loading="eager"
            />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/35 to-black/90 mix-blend-multiply z-[1]" />
        <div className="absolute inset-0 z-[2] opacity-[0.12] pointer-events-none overflow-hidden mix-blend-screen">
          <div className="absolute top-[40%] left-0 w-[200%] h-1/2 bg-gradient-to-r from-transparent via-zinc-400/40 to-transparent blur-3xl animate-fog-slow" />
          <div className="absolute top-[50%] left-0 w-[200%] h-1/2 bg-gradient-to-r from-transparent via-zinc-500/25 to-transparent blur-3xl animate-fog-fast translate-y-8" />
        </div>
        <canvas ref={canvasRef} className="absolute inset-0 z-[3] pointer-events-none" />
        <div className="absolute inset-0 w-[115%] h-[115%] -left-[7%] -top-[7%] z-[4] pointer-events-none opacity-[0.038] mix-blend-overlay overflow-hidden animate-grain">
          <svg className="w-full h-full">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>
        <div className="absolute inset-0 z-[0] overflow-hidden">
          <div className="absolute w-[600px] h-[600px] rounded-full bg-amber-500/10 blur-[130px] -top-32 -left-48 animate-pulse-slow" />
          <div className="absolute w-[700px] h-[700px] rounded-full bg-blue-500/8 blur-[150px] bottom-16 right-[-200px] animate-pulse-slow [animation-delay:4s]" />
        </div>
      </div>

      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center pt-28 pb-20 px-4 md:px-12 pointer-events-none">
        
        {/* PARALLAX FLOATING CARDS */}
        <div className="absolute inset-0 w-full h-full hidden sm:block overflow-hidden pointer-events-none">
          <FloatingCard 
            strength={0.35} 
            className="left-[8%] top-[24%]"
            smoothX={smoothX}
            smoothY={smoothY}
            setRef={(el) => { floatingCardsRef.current[0] = el; }}
          >
            <div className="w-8 h-8 rounded-full bg-amber-400/10 flex items-center justify-center">
              <Star className="w-4.5 h-4.5 text-amber-400 fill-amber-400" />
            </div>
            <div>
              <div className="flex text-[10px] text-amber-400">★★★★★</div>
              <div className="text-[11px] font-bold text-zinc-200 uppercase tracking-wider">4.9 Rating</div>
            </div>
          </FloatingCard>

          <FloatingCard 
            strength={0.4} 
            className="right-[7%] top-[28%]"
            smoothX={smoothX}
            smoothY={smoothY}
            setRef={(el) => { floatingCardsRef.current[1] = el; }}
          >
            <div className="w-9 h-9 rounded-full bg-teal-500/10 flex items-center justify-center">
              <Globe className="w-4.5 h-4.5 text-teal-400" />
            </div>
            <div>
              <div className="text-[14px] font-bold font-sans text-white leading-none">2500+</div>
              <div className="text-[10px] text-zinc-400 font-medium tracking-wide">Happy Travelers</div>
            </div>
          </FloatingCard>

          <FloatingCard 
            strength={0.3} 
            className="left-[10%] bottom-[23%]"
            smoothX={smoothX}
            smoothY={smoothY}
            setRef={(el) => { floatingCardsRef.current[2] = el; }}
          >
            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Compass className="w-4.5 h-4.5 text-blue-400" />
            </div>
            <div>
              <div className="text-[13px] font-bold text-white leading-none">120+</div>
              <div className="text-[10px] text-zinc-400 tracking-wide">Destinations</div>
            </div>
          </FloatingCard>

          <FloatingCard 
            strength={0.45} 
            className="right-[9%] bottom-[25%]"
            smoothX={smoothX}
            smoothY={smoothY}
            setRef={(el) => { floatingCardsRef.current[3] = el; }}
          >
            <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Award className="w-4.5 h-4.5 text-purple-400" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-zinc-100 uppercase tracking-widest leading-none">Aman Resorts</div>
              <div className="text-[9px] text-purple-300 font-semibold tracking-wider uppercase mt-1">Luxury Hotels</div>
            </div>
          </FloatingCard>

          <FloatingCard 
            strength={0.25} 
            className="left-[4%] top-[52%]"
            smoothX={smoothX}
            smoothY={smoothY}
            setRef={(el) => { floatingCardsRef.current[4] = el; }}
          >
            <div className="w-7 h-7 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-[10px] font-bold text-zinc-300 uppercase tracking-wider">Best Price</div>
          </FloatingCard>

          <FloatingCard 
            strength={0.3} 
            className="right-[3%] top-[55%]"
            smoothX={smoothX}
            smoothY={smoothY}
            setRef={(el) => { floatingCardsRef.current[5] = el; }}
          >
            <div className="w-7 h-7 rounded-full bg-rose-500/10 flex items-center justify-center">
              <BadgeHelp className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-[10px] font-bold text-zinc-300 uppercase tracking-wider">24×7 Care</div>
          </FloatingCard>
        </div>

        {/* Center Text Container */}
        <div ref={mainContentRef} className="w-full max-w-4xl flex flex-col items-center text-center scale-100 origin-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-glow select-none mb-6 animate-pulse"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-zinc-200">
              Trusted Travel Partner Since 2016
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans tracking-tight text-white leading-[1.08] mb-6 flex flex-col select-text">
            <span className="block opacity-90 tracking-wide font-light">Travel Beyond</span>
            <span className="block font-serif italic text-amber-400 my-1.5 font-normal scale-102">Destinations.</span>
            <span className="block text-zinc-300 font-light tracking-wide opacity-80">Collect Stories.</span>
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-[660px] mb-8 font-light select-text">
            Do not just cross coordinates on a map. Let the whisper of wind, the glow of quiet sunsets, 
            and the luxury of unstructured time carve unforgettable memories into your soul.
          </p>

          <div className="flex flex-row items-center gap-4 pointer-events-auto sm:mb-12">
            <MagneticButton className="group bg-white hover:bg-transparent text-black hover:text-white px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-white flex items-center gap-3 transition-colors duration-300 cursor-pointer shadow-lg shadow-white/5">
              <span>Start Your Journey</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
            </MagneticButton>

            <MagneticButton className="group bg-white/[0.03] backdrop-blur-[20px] hover:bg-white/10 px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2.5 transition-all duration-300 border border-white/10 hover:border-white/20 cursor-pointer">
              <Play className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Watch Experiences</span>
            </MagneticButton>
          </div>
        </div>

        {/* CENTER VISUAL: EXPERIENCE WIDGET */}
        <div 
          ref={widgetRef}
          className="w-full max-w-3xl mt-12 bg-white/[0.05] border border-white/10 backdrop-blur-md rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-2xl relative overflow-hidden pointer-events-auto select-none"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.04] pointer-events-none" />
          <div className="absolute -inset-y-12 w-28 bg-white/[0.04] blur-2xl rotate-12 -left-12 animate-[pulse_6s_infinite] pointer-events-none" />

          {/* Interactive Mode Tabs */}
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setActiveTab("explore")}
                className={`text-[10px] md:text-xs font-bold uppercase tracking-widest pb-1 transition-colors relative cursor-pointer ${
                  activeTab === "explore" ? "text-amber-400" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Explore Concepts
                {activeTab === "explore" && (
                  <motion.div layoutId="widgetTab" className="absolute bottom-0 left-0 w-full h-[1px] bg-amber-400" />
                )}
              </button>
              <button 
                onClick={() => setActiveTab("curated")}
                className={`text-[10px] md:text-xs font-bold uppercase tracking-widest pb-1 transition-colors relative cursor-pointer ${
                  activeTab === "curated" ? "text-amber-400" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Curated Retreats
                {activeTab === "curated" && (
                  <motion.div layoutId="widgetTab" className="absolute bottom-0 left-0 w-full h-[1px] bg-amber-400" />
                )}
              </button>
            </div>
            <div className="text-[9px] uppercase tracking-widest text-amber-500/80 font-semibold bg-amber-500/5 px-2.5 py-1 rounded border border-amber-500/10">
              Future Dashboard v2
            </div>
          </div>

          {/* Widget Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 divide-y-0 divide-x-0 md:divide-x divide-white/5 text-left">
            <div className="md:px-5 pb-3 md:pb-0 group/field">
              <div className="flex items-center gap-2 text-zinc-500 group-hover/field:text-amber-400 transition-colors duration-300 mb-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-[9px] uppercase tracking-widest font-semibold font-sans">Destination</span>
              </div>
              <div className="text-sm md:text-base font-medium text-zinc-100">Como, Italy</div>
              <div className="text-[10px] text-zinc-500 mt-0.5">Alpine Bliss & Luxury</div>
            </div>

            <div className="px-2 md:px-5 pb-3 md:pb-0 group/field">
              <div className="flex items-center gap-2 text-zinc-500 group-hover/field:text-amber-400 transition-colors duration-300 mb-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span className="text-[9px] uppercase tracking-widest font-semibold font-sans">Travel Date</span>
              </div>
              <div className="text-sm md:text-base font-medium text-zinc-100">September 2026</div>
              <div className="text-[10px] text-zinc-500 mt-0.5">Late Harvest Season</div>
            </div>

            <div className="md:px-5 pt-3 md:pt-0 group/field">
              <div className="flex items-center gap-2 text-zinc-500 group-hover/field:text-amber-400 transition-colors duration-300 mb-1.5">
                <Users className="w-3.5 h-3.5" />
                <span className="text-[9px] uppercase tracking-widest font-semibold font-sans">Guests</span>
              </div>
              <div className="text-sm md:text-base font-medium text-zinc-100">2 Travelers</div>
              <div className="text-[10px] text-zinc-500 mt-0.5">Curated Couple Sanctuary</div>
            </div>

            <div className="px-2 md:px-5 pt-3 md:pt-0 group/field">
              <div className="flex items-center gap-2 text-zinc-500 group-hover/field:text-amber-400 transition-colors duration-300 mb-1.5">
                <Compass className="w-3.5 h-3.5" />
                <span className="text-[9px] uppercase tracking-widest font-semibold font-sans">Experience</span>
              </div>
              <div className="text-sm md:text-base font-medium text-zinc-100">Private Wilderness</div>
              <div className="text-[10px] text-zinc-500 mt-0.5">Off-grid Aman Sanctuary</div>
            </div>
          </div>
        </div>

        {/* SCROLL INDICATOR */}
        <div 
          ref={scrollIndicatorRef}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 select-none pointer-events-auto"
        >
          <span className="text-[9px] uppercase tracking-[0.25em] font-semibold text-zinc-500">
            Scroll to Experience
          </span>
          <div className="w-[18px] h-[30px] rounded-full border border-white/20 flex justify-center p-1">
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1.5 rounded-full bg-amber-400"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
