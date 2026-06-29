"use client";

import { useRef, useState } from "react";
import { motion, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Sparkles, MapPin, Clock, Calendar, Star, Plane, DollarSign, ShieldCheck, CloudSun } from "lucide-react";
import { PACKAGES } from "../../constants/data";
import { FloatingWidget } from "../ui/FloatingWidget";
import { useMouseParallax } from "../../hooks/useMouseParallax";

gsap.registerPlugin(ScrollTrigger);

export function Packages() {
  const packagesContainerRef = useRef<HTMLDivElement>(null);
  const packagesIntroRef = useRef<HTMLDivElement>(null);
  const packagesGlowRef = useRef<HTMLDivElement>(null);
  const timelineProgressRef = useRef<HTMLDivElement>(null);
  
  const packageTextRefs = useRef<(HTMLDivElement | null)[]>([]);
  const packageCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const packageBubbleRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activePackIndex, setActivePackIndex] = useState(0);
  const [packProgress, setPackProgress] = useState(0);

  const { smoothX, smoothY } = useMouseParallax();

  const packageRotateX = useTransform(smoothY, (y: number) => y * -10);
  const packageRotateY = useTransform(smoothX, (x: number) => x * 10);

  useGSAP(() => {
    const packTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: packagesContainerRef.current,
        start: "top top",
        end: "+=600%", 
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          let activeIdx = 0;
          let activeProg = 0;

          if (progress < 0.1) {
            activeIdx = 0;
            activeProg = progress / 0.1;
          } else if (progress >= 0.8) {
            activeIdx = 5;
            activeProg = (progress - 0.8) / 0.2;
          } else {
            const packageProgress = (progress - 0.1) / 0.7;
            activeIdx = Math.min(5, Math.floor(packageProgress * 6));
            activeProg = (packageProgress * 6) - activeIdx;
          }

          setActivePackIndex(activeIdx);
          setPackProgress(activeProg);
        }
      }
    });

    const packStep = 1.5;

    if (packagesIntroRef.current) {
      packTimeline.to(packagesIntroRef.current, { opacity: 0, y: -50, filter: "blur(6px)", duration: 0.6 }, 0.2);
    }

    packageTextRefs.current.forEach((el) => { if (el) gsap.set(el, { opacity: 0, y: 40 }); });
    packageCardRefs.current.forEach((el) => { if (el) gsap.set(el, { opacity: 0, scale: 0.7, rotate: 0 }); });
    packageBubbleRefs.current.forEach((el) => { if (el) gsap.set(el, { opacity: 0, scale: 0.7 }); });

    if (packageTextRefs.current[0]) packTimeline.to(packageTextRefs.current[0], { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.6 }, 0.6);
    if (packageCardRefs.current[0]) packTimeline.to(packageCardRefs.current[0], { opacity: 1, scale: 1, pointerEvents: "auto", rotate: 0, duration: 0.6 }, 0.6);
    if (packageBubbleRefs.current[0]) packTimeline.to(packageBubbleRefs.current[0], { opacity: 1, scale: 1, duration: 0.6 }, 0.6);

    // 1 -> 2
    if (packageTextRefs.current[0]) packTimeline.to(packageTextRefs.current[0], { opacity: 0, y: -40, duration: packStep }, 1.4);
    if (packageCardRefs.current[0]) packTimeline.to(packageCardRefs.current[0], { xPercent: -130, rotate: -12, scale: 0.85, opacity: 0, duration: packStep }, 1.4);
    if (packageBubbleRefs.current[0]) packTimeline.to(packageBubbleRefs.current[0], { opacity: 0, scale: 0.7, duration: packStep }, 1.4);

    if (packagesGlowRef.current) packTimeline.to(packagesGlowRef.current, { backgroundColor: "#0284c7", duration: packStep }, 1.4);
    if (packageTextRefs.current[1]) packTimeline.fromTo(packageTextRefs.current[1], { opacity: 0, y: 40 }, { opacity: 1, y: 0, pointerEvents: "auto", duration: packStep }, 2.1);
    if (packageCardRefs.current[1]) packTimeline.fromTo(packageCardRefs.current[1], { scale: 0.3, opacity: 0, yPercent: 40, rotate: 10 }, { scale: 1, opacity: 1, yPercent: 0, rotate: 0, pointerEvents: "auto", duration: packStep }, 2.1);
    if (packageBubbleRefs.current[1]) packTimeline.fromTo(packageBubbleRefs.current[1], { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: packStep }, 2.1);

    // 2 -> 3
    if (packageTextRefs.current[1]) packTimeline.to(packageTextRefs.current[1], { opacity: 0, y: -40, duration: packStep }, 3.1);
    if (packageCardRefs.current[1]) packTimeline.to(packageCardRefs.current[1], { yPercent: 120, rotate: 15, opacity: 0, duration: packStep }, 3.1);
    if (packageBubbleRefs.current[1]) packTimeline.to(packageBubbleRefs.current[1], { opacity: 0, scale: 0.7, duration: packStep }, 3.1);

    if (packagesGlowRef.current) packTimeline.to(packagesGlowRef.current, { backgroundColor: "#ca8a04", duration: packStep }, 3.1);
    if (packageTextRefs.current[2]) packTimeline.fromTo(packageTextRefs.current[2], { opacity: 0, y: 40 }, { opacity: 1, y: 0, pointerEvents: "auto", duration: packStep }, 3.8);
    if (packageCardRefs.current[2]) packTimeline.fromTo(packageCardRefs.current[2], { rotate: -15, xPercent: 130, opacity: 0 }, { rotate: 0, xPercent: 0, opacity: 1, pointerEvents: "auto", duration: packStep }, 3.8);
    if (packageBubbleRefs.current[2]) packTimeline.fromTo(packageBubbleRefs.current[2], { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: packStep }, 3.8);

    // 3 -> 4
    if (packageTextRefs.current[2]) packTimeline.to(packageTextRefs.current[2], { opacity: 0, y: -40, duration: packStep }, 4.8);
    if (packageCardRefs.current[2]) packTimeline.to(packageCardRefs.current[2], { scale: 0.7, opacity: 0, filter: "blur(8px)", duration: packStep }, 4.8);
    if (packageBubbleRefs.current[2]) packTimeline.to(packageBubbleRefs.current[2], { opacity: 0, scale: 0.7, duration: packStep }, 4.8);

    if (packagesGlowRef.current) packTimeline.to(packagesGlowRef.current, { backgroundColor: "#0891b2", duration: packStep }, 4.8);
    if (packageTextRefs.current[3]) packTimeline.fromTo(packageTextRefs.current[3], { opacity: 0, y: 40 }, { opacity: 1, y: 0, pointerEvents: "auto", duration: packStep }, 5.5);
    if (packageCardRefs.current[3]) packTimeline.fromTo(packageCardRefs.current[3], { clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)", opacity: 0 }, { clipPath: "polygon(12% 0%, 88% 0%, 100% 50%, 88% 100%, 12% 100%, 0% 50%)", opacity: 1, pointerEvents: "auto", duration: packStep }, 5.5);
    if (packageBubbleRefs.current[3]) packTimeline.fromTo(packageBubbleRefs.current[3], { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: packStep }, 5.5);

    // 4 -> 5
    if (packageTextRefs.current[3]) packTimeline.to(packageTextRefs.current[3], { opacity: 0, y: -40, duration: packStep }, 6.5);
    if (packageCardRefs.current[3]) packTimeline.to(packageCardRefs.current[3], { xPercent: -120, opacity: 0, duration: packStep }, 6.5);
    if (packageBubbleRefs.current[3]) packTimeline.to(packageBubbleRefs.current[3], { opacity: 0, scale: 0.7, duration: packStep }, 6.5);

    if (packagesGlowRef.current) packTimeline.to(packagesGlowRef.current, { backgroundColor: "#0d9488", duration: packStep }, 6.5);
    if (packageTextRefs.current[4]) packTimeline.fromTo(packageTextRefs.current[4], { opacity: 0, y: 40 }, { opacity: 1, y: 0, pointerEvents: "auto", duration: packStep }, 7.2);
    if (packageCardRefs.current[4]) packTimeline.fromTo(packageCardRefs.current[4], { filter: "blur(40px)", opacity: 0, scale: 0.85 }, { filter: "blur(0px)", opacity: 1, scale: 1, pointerEvents: "auto", duration: packStep }, 7.2);
    if (packageBubbleRefs.current[4]) packTimeline.fromTo(packageBubbleRefs.current[4], { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: packStep }, 7.2);

    // 5 -> 6
    if (packageTextRefs.current[4]) packTimeline.to(packageTextRefs.current[4], { opacity: 0, y: -40, duration: packStep }, 8.2);
    if (packageCardRefs.current[4]) packTimeline.to(packageCardRefs.current[4], { yPercent: -120, opacity: 0, duration: packStep }, 8.2);
    if (packageBubbleRefs.current[4]) packTimeline.to(packageBubbleRefs.current[4], { opacity: 0, scale: 0.7, duration: packStep }, 8.2);

    if (packagesGlowRef.current) packTimeline.to(packagesGlowRef.current, { backgroundColor: "#0f766e", duration: packStep }, 8.2);
    if (packageTextRefs.current[5]) packTimeline.fromTo(packageTextRefs.current[5], { opacity: 0, y: 40 }, { opacity: 1, y: 0, pointerEvents: "auto", duration: packStep }, 8.9);
    if (packageCardRefs.current[5]) packTimeline.fromTo(packageCardRefs.current[5], { scale: 0.6, rotateX: 30, opacity: 0 }, { scale: 1, rotateX: 0, opacity: 1, pointerEvents: "auto", duration: packStep }, 8.9);
    if (packageBubbleRefs.current[5]) packTimeline.fromTo(packageBubbleRefs.current[5], { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: packStep }, 8.9);

    // Stacking Outro
    if (packageTextRefs.current[5]) packTimeline.to(packageTextRefs.current[5], { opacity: 0, y: -40, duration: 1 }, 10.1);
    if (packageBubbleRefs.current[5]) packTimeline.to(packageBubbleRefs.current[5], { opacity: 0, scale: 0.7, duration: 1 }, 10.1);

    if (packageCardRefs.current[0]) packTimeline.to(packageCardRefs.current[0], { xPercent: 0, x: -35, y: -30, rotate: -10, scale: 0.85, opacity: 0.65, filter: "blur(2px)", duration: 1.5, ease: "power2.out" }, 10.2);
    if (packageCardRefs.current[1]) packTimeline.to(packageCardRefs.current[1], { yPercent: 0, x: 25, y: -15, rotate: 6, scale: 0.86, opacity: 0.7, filter: "blur(1.5px)", duration: 1.5, ease: "power2.out" }, 10.2);
    if (packageCardRefs.current[2]) packTimeline.to(packageCardRefs.current[2], { x: -15, y: 15, rotate: -6, scale: 0.87, opacity: 0.75, filter: "blur(1px)", duration: 1.5, ease: "power2.out" }, 10.2);
    if (packageCardRefs.current[3]) packTimeline.to(packageCardRefs.current[3], { xPercent: 0, x: 35, y: 25, rotate: 8, scale: 0.88, opacity: 0.8, filter: "blur(0.5px)", duration: 1.5, ease: "power2.out" }, 10.2);
    if (packageCardRefs.current[4]) packTimeline.to(packageCardRefs.current[4], { yPercent: 0, x: -25, y: 35, rotate: -4, scale: 0.89, opacity: 0.85, filter: "blur(0px)", duration: 1.5, ease: "power2.out" }, 10.2);
    if (packageCardRefs.current[5]) packTimeline.to(packageCardRefs.current[5], { x: 0, y: 0, rotate: 2, scale: 0.9, opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "power2.out" }, 10.2);

    packTimeline.to(packageCardRefs.current.filter(Boolean), {
      scale: 0.68,
      y: 120,
      opacity: 0,
      filter: "blur(12px)",
      stagger: 0.05,
      duration: 1.2,
      ease: "power2.inIn"
    }, 11.8);

  }, { scope: packagesContainerRef });

  return (
    <section ref={packagesContainerRef} id="tour-packages" className="relative min-h-screen w-full bg-zinc-950 border-t border-white/5 flex flex-col items-center justify-center py-20 overflow-hidden">
      <div ref={packagesGlowRef} className="absolute w-[600px] h-[600px] rounded-full bg-[#0ea5e9]/10 blur-[140px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[0] transition-colors duration-1000 pointer-events-none" />

      <div ref={packagesIntroRef} className="absolute inset-0 flex flex-col items-center justify-center text-center z-[25] pointer-events-none px-6">
        <div className="max-w-2xl flex flex-col items-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-glow select-none mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin [animation-duration:8s]" />
            <span className="text-[9px] font-medium tracking-[0.25em] uppercase text-zinc-200">✦ Signature Experiences</span>
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-sans tracking-tight text-white leading-none mb-6 flex flex-col">
            <span className="block opacity-90 font-light">Journeys</span>
            <span className="block font-serif italic text-amber-400 font-normal my-1">Designed To Be</span>
            <span className="block opacity-85 font-light">Remembered.</span>
          </h2>
          <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed max-w-[460px] font-light">
            Scroll down to leaf through our luxury travel journal. Collect experiences handcrafted for wild memories, pure serenity, and heritage grandeur.
          </p>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full min-h-[85vh]">
        <div className="lg:col-span-5 relative h-[420px] md:h-[480px] flex flex-col justify-center">
          {PACKAGES.map((pkg, idx) => {
            return (
              <div
                key={pkg.id}
                ref={(el) => { packageTextRefs.current[idx] = el; }}
                className="absolute inset-0 flex flex-col justify-center text-left opacity-0 pointer-events-none"
              >
                <span className="inline-block text-[9px] font-bold uppercase tracking-[0.25em] text-amber-400 bg-amber-400/5 border border-amber-400/20 px-3 py-1 rounded-full mb-3 self-start select-none">
                  ✦ {pkg.badge}
                </span>
                
                <div className="flex items-end justify-between border-b border-white/5 pb-2.5 mb-3.5">
                  <div>
                    <span className="text-[9px] tracking-widest text-zinc-500 uppercase leading-none block mb-1">Curated Journey</span>
                    <h2 className="text-3xl md:text-4xl font-serif italic font-normal text-white">{pkg.name}</h2>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] tracking-widest text-zinc-500 uppercase block mb-1">Starting From</span>
                    <span className="text-lg md:text-xl font-bold font-sans text-amber-400">{pkg.price}</span>
                  </div>
                </div>

                <div className="flex gap-4 text-[10px] text-zinc-400 font-light mb-4">
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-zinc-500" /> {pkg.duration}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-zinc-500" /> {pkg.season}</span>
                  <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> {pkg.rating} Rating</span>
                </div>

                <p className="text-zinc-400 text-xs md:text-sm leading-relaxed mb-6 font-light select-text">
                  {pkg.description}
                </p>

                <span className="text-[8px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Package Highlights</span>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {pkg.highlights.map((hl) => (
                    <span key={hl} className="text-[8.5px] uppercase tracking-wider bg-white/[0.03] border border-white/5 px-2.5 py-0.5 rounded text-zinc-300 hover:bg-white/10 hover:border-white/20 transition-all select-none cursor-pointer">
                      {hl}
                    </span>
                  ))}
                </div>

                <div className="text-[9px] tracking-wide text-zinc-500 flex items-center gap-1.5 select-text border-t border-white/5 pt-3">
                  <MapPin className="w-3.5 h-3.5 text-zinc-600" /> Coordinates: <span className="font-semibold text-zinc-300">{pkg.mapCoords}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-7 relative h-[380px] sm:h-[480px] md:h-[550px] flex items-center justify-center">
          {PACKAGES.map((pkg, idx) => {
            return (
              <div
                key={pkg.id}
                ref={(el) => { packageCardRefs.current[idx] = el; }}
                className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none"
                style={{ perspective: 1000 }}
              >
                <motion.div 
                  style={{ rotateX: packageRotateX, rotateY: packageRotateY, transformStyle: "preserve-3d" }}
                  className="relative w-[90%] sm:w-[82%] h-[82%] md:h-[90%] overflow-hidden glass-card rounded-[2.5rem_1.5rem_2rem_1rem] p-3 pointer-events-auto"
                >
                  <div className="relative w-full h-full overflow-hidden rounded-[2.2rem_1.2rem_1.8rem_0.8rem]">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.08] z-[5] pointer-events-none" />
                    <div className="absolute -inset-x-16 w-36 bg-white/[0.06] blur-3xl rotate-45 -left-16 top-0 animate-[pulse_5s_infinite] pointer-events-none" />
                    <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover scale-110" />
                  </div>
                </motion.div>

                <div ref={(el) => { packageBubbleRefs.current[idx] = el; }} className="absolute inset-0 pointer-events-none z-[12] opacity-0 transition-opacity duration-300">
                  <FloatingWidget strength={0.18} className="top-[12%] left-[-2%] md:left-[4%]" smoothX={smoothX} smoothY={smoothY}>
                    <Plane className="w-4 h-4 text-sky-400" />
                    <div>
                      <div className="text-[10px] font-bold text-white leading-none">{pkg.details.flight}</div>
                      <span className="text-[7.5px] text-zinc-500 uppercase tracking-widest">Flight Transit</span>
                    </div>
                  </FloatingWidget>

                  <FloatingWidget strength={0.3} className="bottom-[14%] left-[6%]" smoothX={smoothX} smoothY={smoothY}>
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="text-[10px] font-semibold text-white leading-none">{pkg.details.currency}</div>
                      <span className="text-[7.5px] text-zinc-500 uppercase tracking-widest">Currency</span>
                    </div>
                  </FloatingWidget>

                  <FloatingWidget strength={0.25} className="top-[16%] right-[0%] md:right-[6%]" smoothX={smoothX} smoothY={smoothY}>
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="text-[10px] font-bold text-white leading-none">{pkg.details.visa}</div>
                      <span className="text-[7.5px] text-zinc-500 uppercase tracking-widest">Visa rules</span>
                    </div>
                  </FloatingWidget>

                  <FloatingWidget strength={0.35} className="bottom-[18%] right-[-2%] md:right-[4%]" smoothX={smoothX} smoothY={smoothY}>
                    <CloudSun className="w-4 h-4 text-purple-400" />
                    <div>
                      <div className="text-[10px] font-semibold text-white leading-none">{pkg.details.weather}</div>
                      <span className="text-[7.5px] text-zinc-500 uppercase tracking-widest">Weather</span>
                    </div>
                  </FloatingWidget>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div ref={timelineProgressRef} className="absolute left-6 top-1/2 -translate-y-1/2 z-[25] flex-col items-center gap-4 hidden md:flex">
        <div className="relative w-[2px] h-[240px] bg-white/5 flex items-center justify-center">
          <div className="absolute top-0 w-full bg-amber-400 transition-all duration-300" style={{ height: `${(activePackIndex / 5) * 100}%` }} />
          {PACKAGES.map((pkg, i) => {
            const isActive = i === activePackIndex;
            const isCompleted = i < activePackIndex;
            return (
              <div key={`time-node-${pkg.id}`} className="absolute cursor-pointer flex items-center select-none" style={{ top: `${(i / 5) * 100}%`, left: "-7px" }}>
                <div className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all duration-500 ${isActive ? "bg-amber-400 border-amber-400 shadow-lg shadow-amber-400/20 scale-125" : isCompleted ? "bg-amber-400/30 border-amber-400 scale-100" : "bg-zinc-950 border-white/10 scale-90"}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-black" : isCompleted ? "bg-amber-400" : "bg-zinc-700"}`} />
                </div>
                <span className={`absolute left-6 text-[8px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${isActive ? "text-amber-400 opacity-100 scale-105" : "text-zinc-500 opacity-0 scale-95"}`}>
                  {pkg.destination.split(" ")[0]}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
