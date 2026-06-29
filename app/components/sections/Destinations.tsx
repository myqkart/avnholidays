"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CloudSun, Calendar, Clock, ThumbsUp } from "lucide-react";
import { DESTINATIONS, getImageMaskClass } from "../../constants/data";
import { FloatingWidget } from "../ui/FloatingWidget";
import { useMouseParallax } from "../../hooks/useMouseParallax";

gsap.registerPlugin(ScrollTrigger);

const getAirplanePosition = (index: number, progress: number) => {
  const current = DESTINATIONS[index].mapCoords;
  const next = DESTINATIONS[(index + 1) % DESTINATIONS.length].mapCoords;
  
  const midX = (current.x + next.x) / 2;
  const midY = (current.y + next.y) / 2 - 25; // curve height
  
  const t = progress;
  const x = (1 - t) * (1 - t) * current.x + 2 * (1 - t) * t * midX + t * t * next.x;
  const y = (1 - t) * (1 - t) * current.y + 2 * (1 - t) * t * midY + t * t * next.y;
  
  return { x, y };
};

export function Destinations() {
  const showcaseContainerRef = useRef<HTMLDivElement>(null);
  const introHeaderRef = useRef<HTMLDivElement>(null);
  const showcaseGlowRef = useRef<HTMLDivElement>(null);
  const showcaseMapRef = useRef<HTMLDivElement>(null);
  
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgContainersRef = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const weatherWidgetRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeDestIndex, setActiveDestIndex] = useState(0);
  const [segmentProgress, setSegmentProgress] = useState(0);
  const [airplanePos, setAirplanePos] = useState({ x: 300, y: 155 });

  const { smoothX, smoothY } = useMouseParallax();

  useGSAP(() => {
    const destTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: showcaseContainerRef.current,
        start: "top top",
        end: "+=500%", 
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress; 
          const idx = Math.min(5, Math.floor(progress * 6));
          const segProgress = (progress * 6) - idx;
          
          setActiveDestIndex(idx);
          setSegmentProgress(segProgress);
          
          const pos = getAirplanePosition(idx, segProgress);
          setAirplanePos(pos);
        }
      }
    });

    const stepDuration = 1; 

    // Intro Header fades out as active destinations slide in
    if (introHeaderRef.current) destTimeline.to(introHeaderRef.current, { opacity: 0, y: -40, scale: 0.95, duration: 0.6 }, 0);

    // Initial State Setup
    if (textRefs.current[0]) gsap.set(textRefs.current[0], { opacity: 1, y: 0, pointerEvents: "auto" });
    if (imgContainersRef.current[0]) gsap.set(imgContainersRef.current[0], { opacity: 1, pointerEvents: "auto", scale: 1 });
    if (weatherWidgetRefs.current[0]) gsap.set(weatherWidgetRefs.current[0], { opacity: 1, scale: 1 });

    // Transition 1: Bali -> Switzerland (Slide Left)
    if (textRefs.current[0]) destTimeline.to(textRefs.current[0], { opacity: 0, y: -40, duration: stepDuration }, 0.4);
    if (imgContainersRef.current[0]) {
      destTimeline.to(imgContainersRef.current[0], { 
        xPercent: -130, 
        rotate: -10, 
        opacity: 0, 
        scale: 0.85,
        duration: stepDuration 
      }, 0.4);
    }
    if (weatherWidgetRefs.current[0]) destTimeline.to(weatherWidgetRefs.current[0], { opacity: 0, scale: 0.8, duration: stepDuration }, 0.4);

    if (showcaseGlowRef.current) destTimeline.to(showcaseGlowRef.current, { backgroundColor: "#0ea5e9", duration: stepDuration }, 0.4); 
    
    if (textRefs.current[1]) {
      destTimeline.fromTo(textRefs.current[1], 
        { opacity: 0, y: 40 }, 
        { opacity: 1, y: 0, pointerEvents: "auto", duration: stepDuration }, 
        0.9
      );
    }
    if (imgContainersRef.current[1]) {
      destTimeline.fromTo(imgContainersRef.current[1], 
        { scale: 0.3, opacity: 0 }, 
        { scale: 1, opacity: 1, pointerEvents: "auto", duration: stepDuration }, 
        0.9
      );
    }
    if (weatherWidgetRefs.current[1]) {
      destTimeline.fromTo(weatherWidgetRefs.current[1],
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: stepDuration },
        0.9
      );
    }

    // Transition 2: Switzerland -> Dubai (Slide Down)
    if (textRefs.current[1]) destTimeline.to(textRefs.current[1], { opacity: 0, y: -40, duration: stepDuration }, 1.4);
    if (imgContainersRef.current[1]) {
      destTimeline.to(imgContainersRef.current[1], { 
        yPercent: 120, 
        opacity: 0, 
        duration: stepDuration 
      }, 1.4);
    }
    if (weatherWidgetRefs.current[1]) destTimeline.to(weatherWidgetRefs.current[1], { opacity: 0, scale: 0.8, duration: stepDuration }, 1.4);

    if (showcaseGlowRef.current) destTimeline.to(showcaseGlowRef.current, { backgroundColor: "#eab308", duration: stepDuration }, 1.4); 
    
    if (textRefs.current[2]) {
      destTimeline.fromTo(textRefs.current[2], 
        { opacity: 0, y: 40 }, 
        { opacity: 1, y: 0, pointerEvents: "auto", duration: stepDuration }, 
        1.9
      );
    }
    if (imgContainersRef.current[2]) {
      destTimeline.fromTo(imgContainersRef.current[2], 
        { rotate: 15, xPercent: 130, opacity: 0 }, 
        { rotate: 0, xPercent: 0, opacity: 1, pointerEvents: "auto", duration: stepDuration }, 
        1.9
      );
    }
    if (weatherWidgetRefs.current[2]) {
      destTimeline.fromTo(weatherWidgetRefs.current[2],
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: stepDuration },
        1.9
      );
    }

    // Transition 3: Dubai -> Maldives (Rotate to Polygon Mask)
    if (textRefs.current[2]) destTimeline.to(textRefs.current[2], { opacity: 0, y: -40, duration: stepDuration }, 2.4);
    if (imgContainersRef.current[2]) {
      destTimeline.to(imgContainersRef.current[2], { 
        scale: 0.75, 
        opacity: 0, 
        duration: stepDuration 
      }, 2.4);
    }
    if (weatherWidgetRefs.current[2]) destTimeline.to(weatherWidgetRefs.current[2], { opacity: 0, scale: 0.8, duration: stepDuration }, 2.4);

    if (showcaseGlowRef.current) destTimeline.to(showcaseGlowRef.current, { backgroundColor: "#06b6d4", duration: stepDuration }, 2.4); 
    
    if (textRefs.current[3]) {
      destTimeline.fromTo(textRefs.current[3], 
        { opacity: 0, y: 40 }, 
        { opacity: 1, y: 0, pointerEvents: "auto", duration: stepDuration }, 
        2.9
      );
    }
    if (imgContainersRef.current[3]) {
      destTimeline.fromTo(imgContainersRef.current[3], 
        { yPercent: -130, scale: 0.5, opacity: 0 }, 
        { yPercent: 0, scale: 1, opacity: 1, pointerEvents: "auto", duration: stepDuration }, 
        2.9
      );
    }
    if (weatherWidgetRefs.current[3]) {
      destTimeline.fromTo(weatherWidgetRefs.current[3],
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: stepDuration },
        2.9
      );
    }

    // Transition 4: Maldives -> Paris (Slide Up)
    if (textRefs.current[3]) destTimeline.to(textRefs.current[3], { opacity: 0, y: -40, duration: stepDuration }, 3.4);
    if (imgContainersRef.current[3]) {
      destTimeline.to(imgContainersRef.current[3], { 
        rotate: -20, 
        xPercent: -130, 
        opacity: 0, 
        duration: stepDuration 
      }, 3.4);
    }
    if (weatherWidgetRefs.current[3]) destTimeline.to(weatherWidgetRefs.current[3], { opacity: 0, scale: 0.8, duration: stepDuration }, 3.4);

    if (showcaseGlowRef.current) destTimeline.to(showcaseGlowRef.current, { backgroundColor: "#d946ef", duration: stepDuration }, 3.4); 
    
    if (textRefs.current[4]) {
      destTimeline.fromTo(textRefs.current[4], 
        { opacity: 0, y: 40 }, 
        { opacity: 1, y: 0, pointerEvents: "auto", duration: stepDuration }, 
        3.9
      );
    }
    if (imgContainersRef.current[4]) {
      destTimeline.fromTo(imgContainersRef.current[4], 
        { rotate: 10, yPercent: 130, opacity: 0 }, 
        { rotate: 0, yPercent: 0, opacity: 1, pointerEvents: "auto", duration: stepDuration }, 
        3.9
      );
    }
    if (weatherWidgetRefs.current[4]) {
      destTimeline.fromTo(weatherWidgetRefs.current[4],
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: stepDuration },
        3.9
      );
    }

    // Transition 5: Paris -> Kashmir (Scale Up)
    if (textRefs.current[4]) destTimeline.to(textRefs.current[4], { opacity: 0, y: -40, duration: stepDuration }, 4.4);
    if (imgContainersRef.current[4]) {
      destTimeline.to(imgContainersRef.current[4], { 
        scale: 1.5, 
        opacity: 0, 
        duration: stepDuration 
      }, 4.4);
    }
    if (weatherWidgetRefs.current[4]) destTimeline.to(weatherWidgetRefs.current[4], { opacity: 0, scale: 0.8, duration: stepDuration }, 4.4);

    if (showcaseGlowRef.current) destTimeline.to(showcaseGlowRef.current, { backgroundColor: "#0d9488", duration: stepDuration }, 4.4); 
    
    if (textRefs.current[5]) {
      destTimeline.fromTo(textRefs.current[5], 
        { opacity: 0, y: 40 }, 
        { opacity: 1, y: 0, pointerEvents: "auto", duration: stepDuration }, 
        4.9
      );
    }
    if (imgContainersRef.current[5]) {
      destTimeline.fromTo(imgContainersRef.current[5], 
        { scale: 0.5, rotate: -5, opacity: 0 }, 
        { scale: 1, rotate: 0, opacity: 1, pointerEvents: "auto", duration: stepDuration }, 
        4.9
      );
    }
    if (weatherWidgetRefs.current[5]) {
      destTimeline.fromTo(weatherWidgetRefs.current[5],
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: stepDuration },
        4.9
      );
    }

    // Fade Map in and out based on section visibility
    if (showcaseMapRef.current) {
      destTimeline.fromTo(showcaseMapRef.current, 
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.4 }, 
        0
      );
      // Map fades out at very end
      destTimeline.to(showcaseMapRef.current, { opacity: 0, duration: 0.3 }, 5.5);
    }

  }, { scope: showcaseContainerRef });

  return (
    <section 
      ref={showcaseContainerRef} 
      id="destination-showcase"
      className="relative min-h-screen w-full bg-zinc-950 border-t border-white/5 flex flex-col items-center justify-center py-20 overflow-hidden"
    >
      <div 
        ref={showcaseGlowRef}
        className="absolute w-[600px] h-[600px] rounded-full bg-[#10b981]/10 blur-[130px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[0] transition-colors duration-1000 pointer-events-none"
      />

      <div className="absolute inset-0 pointer-events-none z-[1] opacity-[0.08] mix-blend-screen">
        <div className="absolute w-[200%] h-full bg-gradient-to-r from-transparent via-zinc-400 to-transparent blur-3xl animate-fog-slow" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full min-h-[80vh]">
        <div className="lg:col-span-5 relative h-[380px] md:h-[450px] flex flex-col justify-center">
          <div ref={introHeaderRef} className="absolute inset-0 flex flex-col justify-center text-left select-none z-[5]">
            <h2 className="text-3xl sm:text-5xl md:text-6xl leading-[1.08] font-sans tracking-tight text-white mb-4">
              Discover <br />
              <span className="font-serif italic text-amber-400 font-normal">The World's</span> <br />
              Beautiful Places
            </h2>
            <p className="text-zinc-500 text-xs sm:text-sm font-light leading-relaxed max-w-[400px]">
              Scroll down to fly over Earth and uncover coordinates that define the peak of luxury, silence, and emotional discovery.
            </p>
          </div>

          {DESTINATIONS.map((dest, idx) => (
            <div
              key={dest.id}
              ref={(el) => { textRefs.current[idx] = el; }}
              className="absolute inset-0 flex flex-col justify-center text-left opacity-0 pointer-events-none"
            >
              <span className="text-[10px] tracking-[0.3em] font-semibold text-amber-400 uppercase font-sans mb-2">
                {dest.country}
              </span>
              <h2 className="text-4xl md:text-6xl font-serif italic font-normal text-white mb-3">
                {dest.name}
              </h2>
              <h3 className="text-base md:text-lg text-zinc-300 font-light tracking-wide mb-4 border-b border-white/5 pb-3">
                {dest.headline}
              </h3>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed mb-6 font-light max-w-[420px] select-text">
                {dest.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {dest.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="text-[9px] uppercase tracking-widest bg-white/[0.04] border border-white/10 px-3 py-1 rounded-full text-zinc-300 hover:bg-white/10 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-7 relative h-[360px] sm:h-[450px] md:h-[520px] flex items-center justify-center">
          {DESTINATIONS.map((dest, idx) => (
            <div
              key={dest.id}
              ref={(el) => { imgContainersRef.current[idx] = el; }}
              className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none"
            >
              <div className={`relative w-[90%] sm:w-[85%] h-[85%] md:h-[90%] overflow-hidden ${getImageMaskClass(idx)}`}>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.06] z-[5] pointer-events-none" />
                <img
                  ref={(el) => { imgRefs.current[idx] = el; }}
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover scale-110"
                />
              </div>

              <div ref={(el) => { weatherWidgetRefs.current[idx] = el; }} className="absolute inset-0 pointer-events-none z-[10] opacity-0 transition-opacity duration-300">
                <FloatingWidget strength={0.2} className="top-[10%] left-[-4%] md:left-[2%]" smoothX={smoothX} smoothY={smoothY}>
                  <CloudSun className="w-4.5 h-4.5 text-amber-400" />
                  <div>
                    <div className="text-[11px] font-bold text-white leading-none">{dest.weather.temp}</div>
                    <span className="text-[8px] text-zinc-500 uppercase tracking-widest">Weather</span>
                  </div>
                </FloatingWidget>

                <FloatingWidget strength={0.3} className="bottom-[12%] left-[4%]" smoothX={smoothX} smoothY={smoothY}>
                  <Calendar className="w-4.5 h-4.5 text-emerald-400" />
                  <div>
                    <div className="text-[10px] font-semibold text-white leading-none">{dest.weather.season}</div>
                    <span className="text-[8px] text-zinc-500 uppercase tracking-widest">Best Season</span>
                  </div>
                </FloatingWidget>

                <FloatingWidget strength={0.25} className="top-[15%] right-[-2%] md:right-[4%]" smoothX={smoothX} smoothY={smoothY}>
                  <Clock className="w-4.5 h-4.5 text-sky-400" />
                  <div>
                    <div className="text-[11px] font-bold text-white leading-none">{dest.weather.duration}</div>
                    <span className="text-[8px] text-zinc-500 uppercase tracking-widest">Flight time</span>
                  </div>
                </FloatingWidget>

                <FloatingWidget strength={0.35} className="bottom-[15%] right-[-4%] md:right-[2%]" smoothX={smoothX} smoothY={smoothY}>
                  <ThumbsUp className="w-4.5 h-4.5 text-purple-400" />
                  <div>
                    <div className="text-[11px] font-bold text-white leading-none">{dest.weather.rating}/5</div>
                    <span className="text-[8px] text-zinc-500 uppercase tracking-widest">Luxury rating</span>
                  </div>
                </FloatingWidget>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div ref={showcaseMapRef} className="absolute bottom-6 right-6 z-[25] w-[280px] rounded-2xl bg-black/60 backdrop-blur-xl border border-white/5 p-4 shadow-2xl hidden md:block">
        <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
          <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 font-bold">Satellite Radar Map</span>
          <span className="text-[8px] font-sans font-semibold text-amber-400 px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">Active Coordinates</span>
        </div>

        <div className="relative w-full h-[160px] bg-zinc-950/40 rounded-lg overflow-hidden border border-white/5">
          <svg viewBox="0 0 400 240" className="w-full h-full opacity-35">
            <path d="M160 60 Q190 50 220 50 T280 60 T320 80 T350 110 T330 150 T280 180 T200 160 Z" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
            <path d="M40 50 Q80 40 120 60 T140 100 T100 130 T60 110 Z" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
            <path d="M90 130 Q120 150 110 190 T90 220 T70 170 Z" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
            <path d="M150 100 Q190 100 200 130 T180 180 T150 190 T140 130 Z" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
            <path d="M300 170 Q330 170 340 190 T310 215 T290 190 Z" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />

            {DESTINATIONS.map((dest, i) => {
              const current = dest.mapCoords;
              const next = DESTINATIONS[(i + 1) % DESTINATIONS.length].mapCoords;
              const midX = (current.x + next.x) / 2;
              const midY = (current.y + next.y) / 2 - 25;
              const isPassed = i < activeDestIndex;
              const isActiveSegment = i === activeDestIndex;
              
              return (
                <path
                  key={`route-${i}`}
                  d={`M ${current.x} ${current.y} Q ${midX} ${midY} ${next.x} ${next.y}`}
                  fill="none"
                  stroke={isActiveSegment || isPassed ? "rgba(245, 158, 11, 0.45)" : "rgba(255, 255, 255, 0.05)"}
                  strokeWidth={isActiveSegment ? "1.5" : "1"}
                  strokeDasharray={isActiveSegment ? "4 2" : "0"}
                  className="transition-all duration-500"
                />
              );
            })}

            {DESTINATIONS.map((dest, i) => {
              const isActive = i === activeDestIndex;
              return (
                <g key={`dot-${dest.id}`}>
                  {isActive && (
                    <circle cx={dest.mapCoords.x} cy={dest.mapCoords.y} r="8" fill="none" stroke="#f59e0b" strokeWidth="1" className="animate-ping" style={{ transformOrigin: `${dest.mapCoords.x}px ${dest.mapCoords.y}px` }} />
                  )}
                  <circle cx={dest.mapCoords.x} cy={dest.mapCoords.y} r={isActive ? "4" : "2"} fill={isActive ? "#f59e0b" : "#4b5563"} className="transition-all duration-300" />
                </g>
              );
            })}

            <g style={{ transform: `translate(${airplanePos.x}px, ${airplanePos.y}px)`, transition: "transform 0.05s linear" }}>
              <circle r="4" fill="#ffffff" className="animate-pulse shadow-glow" />
              <circle r="2" fill="#f59e0b" />
            </g>
          </svg>
        </div>

        <div className="mt-3 flex items-center justify-between text-left">
          <div>
            <span className="text-[8px] text-zinc-500 uppercase tracking-widest leading-none block">Active Point</span>
            <span className="text-[11px] font-semibold text-zinc-200">
              {DESTINATIONS[activeDestIndex]?.name}, {DESTINATIONS[activeDestIndex]?.country}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[8px] text-zinc-500 uppercase tracking-widest leading-none block">Fly Path</span>
            <span className="text-[10px] font-sans font-bold text-amber-500">Route #{activeDestIndex + 1}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
