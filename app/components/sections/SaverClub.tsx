"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { 
  Compass, Award, ArrowRight, ChevronLeft, ChevronRight 
} from "lucide-react";
import { MagneticButton } from "../ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export function SaverClub() {
  const clubContainerRef = useRef<HTMLDivElement>(null);
  const clubIntroRef = useRef<HTMLDivElement>(null);

  const [activeBenefitIndex, setActiveBenefitIndex] = useState(0);
  const [activeTierIndex, setActiveTierIndex] = useState(1); // Default to Gold
  const [, setClubProgress] = useState(0);

  const [clubCountMembers, setClubCountMembers] = useState(0);
  const [clubCountOffers, setClubCountOffers] = useState(0);

  useGSAP(() => {
    const clubTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: clubContainerRef.current,
        start: "top top",
        end: "+=320%",
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          setClubProgress(progress);
          
          const benIdx = Math.min(9, Math.floor(progress * 10.2));
          setActiveBenefitIndex(benIdx);

          setClubCountMembers(Math.min(5000, Math.floor(progress * 5300)));
          setClubCountOffers(Math.min(100, Math.floor(progress * 108)));
        }
      }
    });

    clubTimeline.to(".club-hero-card", {
      rotateY: 34,
      rotateX: 10,
      rotateZ: -5,
      scale: 1.06,
      x: "16vw",
      duration: 1.5,
      ease: "power2.inOut"
    }, 0.2);

    if (clubIntroRef.current) {
      clubTimeline.to(clubIntroRef.current, {
        opacity: 0,
        y: -60,
        filter: "blur(8px)",
        duration: 0.8
      }, 0.3);
    }

    for (let i = 0; i < 9; i++) {
      clubTimeline.to(`.club-bg-visual-${i}`, { opacity: 0, duration: 0.6 }, (i + 1) * 0.45);
      clubTimeline.to(`.club-bg-visual-${i + 1}`, { opacity: 0.22, duration: 0.6 }, (i + 1) * 0.45);
    }

    clubTimeline.fromTo(".club-tier-samples",
      { y: 120, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, ease: "power2.out" },
      4.2
    );

    clubTimeline.to(".club-hero-card", {
      scale: 0.58,
      opacity: 0,
      filter: "blur(12px)",
      duration: 1.0,
      ease: "power2.inIn"
    }, 5.0);

    clubTimeline.to(".club-tier-samples", {
      opacity: 0,
      y: 50,
      duration: 0.8
    }, 5.0);

    clubTimeline.fromTo(".club-ending-cta",
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, ease: "power2.out" },
      5.2
    );

    clubTimeline.fromTo(".club-drifting-photo",
      { opacity: 0, scale: 0.6, y: 160, rotate: -18 },
      { opacity: 0.65, scale: 1, y: 0, rotate: "random(-12, 12)", stagger: 0.08, duration: 1.2 },
      5.4
    );

  }, { scope: clubContainerRef });

  return (
    <section ref={clubContainerRef} className="relative w-full h-screen overflow-hidden bg-black z-20">
      <div className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-1000" style={{ background: "radial-gradient(circle at 50% 50%, rgba(251,191,36,0.06) 0%, rgba(9,9,11,1) 100%)" }} />
      
      {[
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1505080856163-267d49b30022?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1595818970664-4be341753c45?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80"
      ].map((imgUrl, i) => (
        <div 
          key={`club-bg-${i}`}
          className={`absolute inset-0 transition-opacity duration-[1000ms] pointer-events-none z-0 club-bg-visual-${i}`}
          style={{ opacity: i === activeBenefitIndex ? 0.22 : 0 }}
        >
          <img src={imgUrl} className="w-full h-full object-cover scale-105" alt="Benefit visual background" />
          <div className="absolute inset-0 bg-black/65" />
        </div>
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-950/0 via-zinc-950/20 to-zinc-950 z-[2] pointer-events-none" />

      <div className="hidden md:block w-full h-full relative z-10 select-none">
        <div className="absolute top-10 left-12 z-30 flex items-center gap-8">
          <span className="text-[10px] tracking-[0.25em] font-semibold text-amber-400 uppercase font-sans flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> Exclusive Membership
          </span>
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div 
                key={`ben-dot-${i}`}
                className={`h-[3px] rounded-full transition-all duration-500 ${i === activeBenefitIndex ? "w-6 bg-amber-400" : "w-2 bg-white/10"}`}
              />
            ))}
          </div>
        </div>

        <div ref={clubIntroRef} className="absolute inset-0 flex flex-col items-center justify-center text-center z-[25] px-6 pointer-events-none">
          <div className="max-w-3xl flex flex-col items-center">
            <span className="inline-block text-[9px] font-bold uppercase tracking-[0.3em] text-amber-400 bg-amber-400/5 border border-amber-400/20 px-3 py-1 rounded-full mb-6">
              ✦ Circle of Curation
            </span>
            <h2 className="text-5xl md:text-7xl font-sans tracking-tight text-white leading-none mb-6 flex flex-col">
              <span className="block opacity-95 font-light">Travel Like</span>
              <span className="block font-serif italic text-amber-400 font-normal mt-2">An Insider.</span>
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-[550px] font-light">
              Unlock custom benefits, private transfers, and hotel room upgrades curated for members who appreciate the art of fine travel.
            </p>
          </div>
        </div>

        <div className="absolute left-16 top-[28%] z-20 w-[380px] text-left flex flex-col gap-4">
          <AnimatePresence mode="wait">
            {[
              { title: "Priority Booking Concierge", desc: "Skip booking lanes with immediate, direct access to AVN's network operators." },
              { title: "Exclusive Room Upgrades", desc: "Enjoy space upgrades, overwater villa keys, and luxury cabin access." },
              { title: "Luxury Airport Lounge Access", desc: "Unwind inside premium lounge hubs globally before boarding your flights." },
              { title: "Bespoke Private Transfers", desc: "Luxury sedan pickups and chauffeur handoffs directly coordinate on tarmac." },
              { title: "Dedicated Local concierge", desc: "Walk custom trails, catamaran journeys, and restaurant checks guided locally." },
              { title: "Visa Assistance Validation", desc: "Fast-track international visa filings with guaranteed expert validations." },
              { title: "Early Access Stays Deals", desc: "Browse curated private villas weeks before standard release schedules." },
              { title: "Special Festival Escapes", desc: "Enjoy holiday packages custom-tailored for regional festivals and holidays." },
              { title: "Corporate Business Perks", desc: "Flexible flight cancellations and corporate board meeting coordination." },
              { title: "Lifetime Memories Stamps", desc: "Log stamps, stories, and photographs inside your Gold member profile." }
            ].map((ben, idx) => {
              if (idx !== activeBenefitIndex) return null;
              return (
                <motion.div
                  key={`ben-panel-${idx}`}
                  initial={{ opacity: 0, x: -30, filter: "blur(6px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: 30, filter: "blur(6px)" }}
                  transition={{ duration: 0.5 }}
                  className="glass-card rounded-[2.5rem] p-8 shadow-2xl relative border border-white/8 overflow-hidden w-full"
                >
                  <div className="absolute top-0 right-0 w-36 h-20 bg-gradient-to-bl from-white/[0.01] to-transparent pointer-events-none" />
                  <span className="text-[8.5px] font-bold text-amber-400 uppercase tracking-[0.2em]">Benefit 0{idx + 1}</span>
                  <h3 className="text-xl font-sans font-semibold text-white mt-2 mb-4 leading-tight">{ben.title}</h3>
                  <p className="text-zinc-400 text-xs font-light leading-relaxed select-text">{ben.desc}</p>
                </motion.div>
              );
            })}
          </AnimatePresence>

          <div className="glass-card rounded-2xl p-5 flex justify-between items-center mt-4">
            <div>
              <div className="text-lg font-sans font-bold text-white leading-none">{clubCountMembers}+</div>
              <span className="text-[8px] text-zinc-500 uppercase tracking-widest mt-1 block">Active Members</span>
            </div>
            <div className="h-6 w-[1px] bg-white/5" />
            <div>
              <div className="text-lg font-sans font-bold text-amber-400 leading-none">{clubCountOffers}+</div>
              <span className="text-[8px] text-zinc-500 uppercase tracking-widest mt-1 block">Custom Perks</span>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center z-15 pointer-events-none">
          <div className="relative w-[400px] h-[400px] flex items-center justify-center">
            <div className="relative w-[340px] h-[210px] club-hero-card rounded-2xl shadow-2xl bg-zinc-950 border border-white/10 z-10 p-6 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 animate-shimmer-foil pointer-events-none opacity-45 z-0" />
              <div className="flex justify-between items-start relative z-10">
                <Compass className="w-8 h-8 text-amber-400/80 animate-spin [animation-duration:15s]" />
                <span className="text-[8.5px] font-mono tracking-[0.25em] text-amber-400 font-bold uppercase">AVN SA SAVER</span>
              </div>
              <div className="my-auto flex flex-col text-left pl-1 relative z-10">
                <h4 className="text-sm font-sans uppercase font-bold tracking-[0.3em] text-white leading-none">SUPER SAVER</h4>
                <span className="text-[7px] text-zinc-500 uppercase tracking-[0.25em] mt-1">BLACK MEMERSHIP NO: #AVN-8041926</span>
              </div>
              <div className="border-t border-white/5 pt-3.5 flex justify-between items-center relative z-10">
                <div>
                  <span className="text-[7px] text-zinc-600 uppercase tracking-widest block leading-none">Member Since</span>
                  <span className="text-[9px] font-bold text-white mt-1 block font-mono">2016</span>
                </div>
                <div className="text-right">
                  <span className="text-[7px] text-zinc-600 uppercase tracking-widest block leading-none">Curation Level</span>
                  <span className="text-[9px] font-bold text-amber-400 mt-1 block uppercase tracking-wider">ELITE INSIDER</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-12 bottom-12 z-20 flex justify-between items-center club-tier-samples opacity-0">
          <div>
            <span className="text-[8px] text-zinc-500 uppercase tracking-widest block mb-0.5">Tier Matrix</span>
            <div className="text-[11px] font-bold text-white uppercase tracking-wider">Interactive material cards</div>
          </div>
          
          <div className="flex gap-8 select-none">
            <div 
              onClick={() => setActiveTierIndex(0)}
              className={`w-32 h-20 rounded-xl bg-gradient-to-tr from-zinc-400 via-zinc-200 to-zinc-500 p-3 flex flex-col justify-between text-left cursor-pointer border transition-all duration-300 ${activeTierIndex === 0 ? "scale-105 border-white shadow-xl" : "scale-90 border-white/5 opacity-55 hover:opacity-85"}`}
            >
              <span className="text-[8px] font-bold text-zinc-800 uppercase tracking-wider leading-none">Silver</span>
              <span className="text-[7px] text-zinc-900 font-mono mt-auto">BRUSHED ALUM</span>
            </div>
            <div 
              onClick={() => setActiveTierIndex(1)}
              className={`w-32 h-20 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-200 to-amber-700 p-3 flex flex-col justify-between text-left cursor-pointer border transition-all duration-300 ${activeTierIndex === 1 ? "scale-105 border-amber-300 shadow-xl" : "scale-90 border-white/5 opacity-55 hover:opacity-85"}`}
            >
              <span className="text-[8px] font-bold text-amber-900 uppercase tracking-wider leading-none">Gold</span>
              <span className="text-[7px] text-amber-950 font-mono mt-auto">LUXURY FOIL</span>
            </div>
            <div 
              onClick={() => setActiveTierIndex(2)}
              className={`w-32 h-20 rounded-xl bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-900 p-3 flex flex-col justify-between text-left cursor-pointer border transition-all duration-300 ${activeTierIndex === 2 ? "scale-105 border-white/30 shadow-2xl" : "scale-90 border-white/5 opacity-55 hover:opacity-85"}`}
            >
              <span className="text-[8px] font-bold text-white uppercase tracking-wider leading-none">Black</span>
              <span className="text-[7px] text-zinc-400 font-mono mt-auto">MATTE CERAMIC</span>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center club-ending-cta opacity-0 pointer-events-none">
          <div className="max-w-3xl flex flex-col items-center pointer-events-auto">
            <span className="inline-block text-[10px] tracking-[0.3em] font-semibold text-amber-400 uppercase font-sans mb-4 block select-none">
              ✦ Elite Travel Club
            </span>
            <h2 className="text-4xl md:text-7xl font-sans tracking-tight text-white leading-none mb-8">
              Join The Circle Of <br />
              <span className="font-serif italic text-amber-400 font-normal">Extraordinary Travel.</span>
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-[550px] mb-12 font-light select-text">
              Becoming a member of AVN Holidays Saver Club is an invitation to experiences curated to inspire. Connect with our concierge to secure your elite access code.
            </p>
            <div className="flex flex-row items-center gap-4">
              <MagneticButton className="group bg-white hover:bg-transparent text-black hover:text-white px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider border border-white flex items-center gap-3 transition-colors duration-300 cursor-pointer shadow-2xl">
                <span>Become A Member</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </MagneticButton>
              <MagneticButton className="group bg-white/[0.03] backdrop-blur-[20px] hover:bg-white/10 px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2.5 transition-all duration-300 border border-white/10 hover:border-white/20 cursor-pointer">
                <span>Explore Club Benefits</span>
              </MagneticButton>
            </div>
          </div>
        </div>

        {[
          "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80",
          "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=400&q=80",
          "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=80",
          "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&q=80",
          "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80",
          "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80"
        ].map((imgUrl, idx) => (
          <div 
            key={`drift-photo-${idx}`}
            className="absolute w-44 h-52 bg-zinc-950 border border-white/8 rounded-xl p-2.5 shadow-2xl z-[35] pointer-events-none select-none club-drifting-photo opacity-0"
            style={{ left: `${12 + idx * 13}%`, bottom: `${12 + (idx % 2) * 14}%` }}
          >
            <img src={imgUrl} className="w-full h-[80%] object-cover rounded" alt="Drifting memories" />
            <span className="text-[7.5px] text-zinc-500 block text-center mt-2 font-serif italic">
              {["Ubud, Bali", "Maldives Lagoon", "Swiss Alps Valley", "Sandy Beaches", "Srinagar Lakes", "Dubai Skylines"][idx]}
            </span>
          </div>
        ))}
      </div>

      <div className="md:hidden w-full h-full flex flex-col items-center justify-center px-6 py-20 relative z-10 select-none">
        <div className="absolute top-10 flex flex-col items-center">
          <span className="text-[9px] tracking-[0.25em] font-bold text-amber-400 uppercase font-sans mb-1 block">
            ✦ Exclusive Club
          </span>
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-sans block">
            Benefit 0{activeBenefitIndex + 1} of 10
          </span>
        </div>

        <div className="relative w-full h-[410px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {activeBenefitIndex === 0 && (
              <motion.div
                key="mob-ben-0"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full rounded-[2rem] glass-card p-6 flex flex-col justify-between text-left"
              >
                <div>
                  <span className="text-[9px] uppercase font-bold text-amber-400">✦ Benefit One</span>
                  <h3 className="text-2xl font-sans text-white mt-2 leading-tight">Priority Booking</h3>
                  <p className="text-zinc-400 text-xs mt-4 leading-relaxed font-light">
                    Skip booking lanes with immediate, direct access to AVN's network operators and direct concierge lines.
                  </p>
                </div>
                <div className="flex justify-between items-end border-t border-white/5 pt-4">
                  <span className="text-[8.5px] uppercase font-bold text-white">Direct Concierge</span>
                  <span className="text-[7.5px] uppercase text-zinc-500 tracking-wider">1/10 Perks</span>
                </div>
              </motion.div>
            )}

            {activeBenefitIndex === 1 && (
              <motion.div
                key="mob-ben-1"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full rounded-[2rem] glass-card p-6 flex flex-col justify-between text-left"
              >
                <div>
                  <span className="text-[9px] uppercase font-bold text-amber-400">✦ Benefit Two</span>
                  <h3 className="text-2xl font-sans text-white mt-2 leading-tight">Luxury Upgrades</h3>
                  <p className="text-zinc-400 text-xs mt-4 leading-relaxed font-light">
                    Enjoy room space upgrades, private overwater villas, and priority yacht deck bookings.
                  </p>
                </div>
                <div className="flex justify-between items-end border-t border-white/5 pt-4">
                  <span className="text-[8.5px] uppercase font-bold text-white">Suite Upgrades</span>
                  <span className="text-[7.5px] uppercase text-zinc-500 tracking-wider">2/10 Perks</span>
                </div>
              </motion.div>
            )}

            {activeBenefitIndex === 2 && (
              <motion.div
                key="mob-ben-2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full rounded-[2rem] glass-card p-6 flex flex-col justify-between text-left"
              >
                <div>
                  <span className="text-[9px] uppercase font-bold text-amber-400">✦ Benefit Three</span>
                  <h3 className="text-2xl font-sans text-white mt-2 leading-tight">Lounge Access</h3>
                  <p className="text-zinc-400 text-xs mt-4 leading-relaxed font-light">
                    Relax inside premium executive terminal lounge hubs globally before boarding your flights.
                  </p>
                </div>
                <div className="flex justify-between items-end border-t border-white/5 pt-4">
                  <span className="text-[8.5px] uppercase font-bold text-white">First-Class Lounges</span>
                  <span className="text-[7.5px] uppercase text-zinc-500 tracking-wider">3/10 Perks</span>
                </div>
              </motion.div>
            )}

            {activeBenefitIndex === 3 && (
              <motion.div
                key="mob-ben-3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full rounded-[2rem] glass-card p-6 flex flex-col justify-between text-left"
              >
                <div>
                  <span className="text-[9px] uppercase font-bold text-amber-400">✦ Benefit Four</span>
                  <h3 className="text-2xl font-sans text-white mt-2 leading-tight">Private Transfers</h3>
                  <p className="text-zinc-400 text-xs mt-4 leading-relaxed font-light">
                    Luxury sedan coordinates and private tarmac chauffeur handoffs directly set upon arrival.
                  </p>
                </div>
                <div className="flex justify-between items-end border-t border-white/5 pt-4">
                  <span className="text-[8.5px] uppercase font-bold text-white">Chauffeur Rides</span>
                  <span className="text-[7.5px] uppercase text-zinc-500 tracking-wider">4/10 Perks</span>
                </div>
              </motion.div>
            )}

            {activeBenefitIndex >= 4 && (
              <motion.div
                key="mob-ben-5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full rounded-[2rem] glass-card p-6 flex flex-col justify-between text-left pointer-events-auto"
              >
                <div className="text-center flex flex-col items-center">
                  <span className="text-[9px] uppercase font-bold text-amber-400">✦ Club Membership</span>
                  <h3 className="text-xl font-sans text-white mt-2 leading-tight">Join The Circle</h3>
                  <p className="text-zinc-400 text-[10px] mt-2 leading-relaxed font-light">
                    Enjoy room space upgrades and tarmac private chauffeur coordinates from a single gold profile.
                  </p>
                  
                  <button className="w-full bg-white text-black font-semibold text-[10px] uppercase tracking-wider py-3.5 rounded-full mt-8 flex items-center justify-center gap-1.5 shadow-xl">
                    <span>Become A Member</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex justify-between items-end border-t border-white/5 pt-3">
                  <span className="text-[7.5px] uppercase text-zinc-500 tracking-wider">Join Club</span>
                  <span className="text-[7.5px] font-bold text-amber-400 uppercase tracking-widest">AVN CLUB</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-6 mt-8">
          <button 
            onClick={() => setActiveBenefitIndex(prev => Math.max(0, prev - 1))}
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <button
                key={`dot-swipe-ben-${i}`}
                onClick={() => setActiveBenefitIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === activeBenefitIndex ? "w-6 bg-amber-400" : "w-2 bg-white/20"}`}
              />
            ))}
          </div>
          <button 
            onClick={() => setActiveBenefitIndex(prev => Math.min(9, prev + 1))}
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
