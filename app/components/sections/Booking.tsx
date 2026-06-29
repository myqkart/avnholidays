"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { 
  Plane, Map, Calendar, Users, DollarSign, Bookmark, FileText, PhoneCall, Compass 
} from "lucide-react";
import { MagneticButton } from "../ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export function Booking() {
  const bookingContainerRef = useRef<HTMLDivElement>(null);
  const bookingConsoleRef = useRef<HTMLDivElement>(null);
  const bookingLandscapeRef = useRef<HTMLDivElement>(null);

  const [bookingDest, setBookingDest] = useState("");
  const [bookingGuests, setBookingGuests] = useState(2);
  const [activeStyleIndex, setActiveStyleIndex] = useState<number | null>(null);

  useGSAP(() => {
    const bookingTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: bookingContainerRef.current,
        start: "top top",
        end: "+=280%",
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
      }
    });

    bookingTimeline.to(".booking-landscape-bg", {
      scale: 1.18,
      y: "-8%",
      ease: "none",
      duration: 8.0
    }, 0.0);

    bookingTimeline.to(".booking-cloud-a", { x: "22vw", ease: "none", duration: 7.0 }, 0.0);
    bookingTimeline.to(".booking-cloud-b", { x: "-18vw", ease: "none", duration: 8.5 }, 0.0);
    bookingTimeline.to(".booking-cloud-c", { x: "12vw", ease: "none", duration: 9.0 }, 0.0);

    bookingTimeline.fromTo(".booking-airplane",
      { x: "-15vw", y: "8vh", opacity: 0 },
      { x: "110vw", y: "-6vh", opacity: 1, duration: 4.5, ease: "power1.inOut" },
      0.15
    );

    bookingTimeline.fromTo(".booking-intro",
      { y: 70, opacity: 0, filter: "blur(10px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.0 },
      0.08
    );

    bookingTimeline.fromTo(bookingConsoleRef.current,
      { y: 120, opacity: 0, scale: 0.94 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
      0.2
    );

    bookingTimeline.fromTo(".booking-assurance-badge",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: "power2.out" },
      0.4
    );

    bookingTimeline.fromTo(".booking-style-chip",
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, stagger: 0.05, duration: 0.5, ease: "back.out(1.4)" },
      0.5
    );

    bookingTimeline.to(".booking-intro", {
      opacity: 0, y: -30, filter: "blur(8px)", duration: 0.8
    }, 4.4);

    bookingTimeline.to(bookingConsoleRef.current, {
      scale: 0.84,
      opacity: 0,
      filter: "blur(10px)",
      duration: 0.9
    }, 4.5);

    bookingTimeline.to(".booking-assurance-badge", {
      opacity: 0,
      y: -30,
      stagger: 0.04,
      duration: 0.5
    }, 4.5);

    bookingTimeline.to(".booking-landscape-bg", {
      scale: 2.8,
      filter: "blur(4px) brightness(1.35)",
      duration: 2.0,
      ease: "power2.inOut"
    }, 5.0);

    bookingTimeline.fromTo(".booking-ending-msg",
      { opacity: 0, scale: 0.92 },
      { opacity: 1, scale: 1, duration: 1.0, ease: "power2.out" },
      5.5
    );

  }, { scope: bookingContainerRef });

  return (
    <section ref={bookingContainerRef} className="relative w-full h-screen overflow-hidden bg-black z-20">
      <div
        ref={bookingLandscapeRef}
        className="absolute inset-0 booking-landscape-bg will-change-transform"
        style={{ transformOrigin: "50% 60%" }}
      >
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=85"
          className="w-full h-full object-cover scale-105"
          alt="Mountain sunrise landscape"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30" />
      </div>

      <div className="absolute inset-0 pointer-events-none z-[3] overflow-hidden">
        <div className="absolute top-[12%] left-[5%] booking-cloud-a opacity-55 will-change-transform">
          <div className="w-64 h-20 rounded-full bg-white/30 blur-2xl" />
        </div>
        <div className="absolute top-[8%] right-[10%] booking-cloud-b opacity-40 will-change-transform">
          <div className="w-96 h-24 rounded-full bg-white/25 blur-3xl" />
        </div>
        <div className="absolute top-[20%] left-[35%] booking-cloud-c opacity-30 will-change-transform">
          <div className="w-48 h-16 rounded-full bg-white/20 blur-2xl" />
        </div>
      </div>

      <div className="absolute top-[18%] z-[4] pointer-events-none booking-airplane opacity-0 will-change-transform">
        <Plane className="w-5 h-5 text-white/80 -rotate-[10deg]" />
      </div>

      <div className="absolute inset-0 z-[5] pointer-events-none hidden md:block">
        {[
          { text: "Best Price Promise", x: "8%",  y: "25%" },
          { text: "24×7 Support",       x: "6%",  y: "42%" },
          { text: "Trusted Since 2016", x: "9%",  y: "58%" },
          { text: "Personal Experts",   x: "7%",  y: "73%" },
          { text: "Secure Booking",     x: "82%", y: "28%" },
          { text: "Visa Assistance",    x: "83%", y: "44%" },
          { text: "Luxury Hotels",      x: "81%", y: "60%" },
          { text: "Global Network",     x: "83%", y: "76%" },
        ].map((badge) => (
          <div key={badge.text} className="booking-assurance-badge absolute opacity-0" style={{ left: badge.x, top: badge.y }}>
            <div className="flex items-center gap-1.5 bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
              <span className="text-[9px] font-semibold text-white/80 uppercase tracking-widest whitespace-nowrap">{badge.text}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:flex w-full h-full flex-col items-center justify-start pt-16 relative z-10">
        <div className="booking-intro text-center mb-10 px-6 opacity-0">
          <span className="inline-block text-[9px] font-bold uppercase tracking-[0.3em] text-amber-400 bg-amber-400/5 border border-amber-400/20 px-3 py-1 rounded-full mb-5">
            ✦ Your Journey Begins
          </span>
          <h2 className="text-5xl md:text-7xl font-sans tracking-tight text-white leading-none flex flex-col items-center">
            <span className="font-light opacity-90">The Next Great</span>
            <span className="font-serif italic text-amber-400 font-normal mt-1">Story Starts</span>
            <span className="font-semibold mt-1">With You.</span>
          </h2>
          <p className="text-zinc-400 text-sm font-light mt-5 max-w-[480px] mx-auto leading-relaxed">
            Every unforgettable journey begins with a single decision. Let us help you compose yours — exactly the way you've imagined it.
          </p>
        </div>

        <div ref={bookingConsoleRef} className="relative w-full max-w-4xl mx-auto px-6 opacity-0" style={{ perspective: "1200px" }}>
          <div className="relative rounded-[2.5rem] border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.7)] overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)", backdropFilter: "blur(40px) saturate(160%)" }}>
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent pointer-events-none" />

            <div className="p-8">
              <div className="flex items-center justify-between mb-7">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-amber-400 animate-spin [animation-duration:12s]" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-amber-400">Journey Planner</span>
                </div>
                <span className="text-[8px] text-zinc-500 uppercase tracking-wider">AVN Holidays × 2024</span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="col-span-1 flex flex-col gap-1.5">
                  <label className="text-[8px] font-bold uppercase tracking-widest text-zinc-500">Destination</label>
                  <div className="relative">
                    <Map className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                    <input type="text" placeholder="Where to?" value={bookingDest} onChange={(e) => setBookingDest(e.target.value)} className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-8 pr-3 py-3 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400/40 transition-colors" />
                  </div>
                </div>

                <div className="col-span-1 flex flex-col gap-1.5">
                  <label className="text-[8px] font-bold uppercase tracking-widest text-zinc-500">Travel Dates</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                    <input type="text" placeholder="Choose dates" className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-8 pr-3 py-3 text-xs text-zinc-600 focus:outline-none focus:border-amber-400/40 transition-colors cursor-pointer" readOnly />
                  </div>
                </div>

                <div className="col-span-1 flex flex-col gap-1.5">
                  <label className="text-[8px] font-bold uppercase tracking-widest text-zinc-500">Guests</label>
                  <div className="flex items-center bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 gap-3">
                    <Users className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
                    <button onClick={() => setBookingGuests(g => Math.max(1, g - 1))} className="text-zinc-400 hover:text-white text-xs w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">−</button>
                    <span className="text-xs text-white font-semibold flex-1 text-center">{bookingGuests}</span>
                    <button onClick={() => setBookingGuests(g => Math.min(20, g + 1))} className="text-zinc-400 hover:text-white text-xs w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">+</button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[8px] font-bold uppercase tracking-widest text-zinc-500">Budget Range</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                    <select className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-8 pr-3 py-3 text-xs text-zinc-500 focus:outline-none focus:border-amber-400/40 transition-colors appearance-none cursor-pointer">
                      <option className="bg-zinc-900">Under ₹50k</option>
                      <option className="bg-zinc-900">₹50k – ₹1L</option>
                      <option className="bg-zinc-900">₹1L – ₹3L</option>
                      <option className="bg-zinc-900">₹3L+</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[8px] font-bold uppercase tracking-widest text-zinc-500">Accommodation</label>
                  <div className="relative">
                    <Bookmark className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                    <select className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-8 pr-3 py-3 text-xs text-zinc-500 focus:outline-none focus:border-amber-400/40 transition-colors appearance-none cursor-pointer">
                      <option className="bg-zinc-900">Luxury Resort</option>
                      <option className="bg-zinc-900">Boutique Hotel</option>
                      <option className="bg-zinc-900">Villa / Private</option>
                      <option className="bg-zinc-900">Heritage Stay</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[8px] font-bold uppercase tracking-widest text-zinc-500">Special Requests</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                    <input type="text" placeholder="Anniversary, dietary…" className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-8 pr-3 py-3 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400/40 transition-colors" />
                  </div>
                </div>
              </div>

              <div className="mb-7">
                <label className="text-[8px] font-bold uppercase tracking-widest text-zinc-500 block mb-3">Travel Style</label>
                <div className="flex flex-wrap gap-2">
                  {["Luxury Escape", "Adventure", "Family Holiday", "Corporate", "Honeymoon", "Wellness", "Road Trip", "Beach", "Cultural", "Cruise"].map((style, si) => (
                    <button
                      key={`style-${si}`}
                      onClick={() => setActiveStyleIndex(si === activeStyleIndex ? null : si)}
                      className={`booking-style-chip opacity-0 px-3.5 py-1.5 rounded-full text-[9.5px] font-semibold uppercase tracking-wider border transition-all duration-300 ${si === activeStyleIndex ? "bg-amber-400 text-black border-amber-400 shadow-[0_0_16px_rgba(251,191,36,0.35)]" : "bg-white/[0.04] text-zinc-400 border-white/10 hover:border-white/20 hover:text-white"}`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 pt-5 border-t border-white/5">
                <MagneticButton className="group flex-1 bg-amber-400 hover:bg-amber-300 text-black py-4 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 transition-colors duration-300 shadow-[0_8px_32px_rgba(251,191,36,0.3)] cursor-pointer">
                  <Plane className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                  <span>Plan My Journey</span>
                </MagneticButton>
                <MagneticButton className="group flex-1 bg-white/[0.04] backdrop-blur-lg hover:bg-white/8 py-4 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all duration-300 border border-white/10 hover:border-white/20 cursor-pointer">
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Talk To An Expert</span>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none select-none booking-ending-msg" style={{ opacity: 0 }}>
        <div className="flex flex-col items-center text-center">
          <h2 className="text-[clamp(3.5rem,11vw,8.5rem)] font-serif italic text-white leading-none tracking-tight font-normal">
            Adventure
          </h2>
          <h2 className="text-[clamp(3.5rem,11vw,8.5rem)] font-sans font-bold text-amber-400 leading-none tracking-tight mt-[-0.08em]">
            Awaits.
          </h2>
          <div className="mt-10 h-px w-24 bg-white/20 mx-auto" />
          <p className="text-xl font-light text-white/60 mt-8 tracking-[0.5em] uppercase">Let's Go.</p>
        </div>
      </div>

      <div className="md:hidden w-full h-full flex flex-col relative z-10">
        <div className="relative flex-1 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover" alt="Mountain landscape" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90" />
          <div className="absolute bottom-6 left-5 right-5">
            <h2 className="text-3xl font-sans text-white leading-tight">
              <span className="font-light">The Next Great</span><br />
              <span className="font-serif italic text-amber-400 font-normal">Story Starts</span><br />
              <span className="font-semibold">With You.</span>
            </h2>
          </div>
        </div>

        <div className="bg-zinc-950 border-t border-white/8 px-5 pt-5 pb-24">
          <div className="flex flex-col gap-3">
            <div className="relative">
              <Map className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
              <input type="text" placeholder="Where to?" className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-8 pr-3 py-3 text-xs text-white placeholder:text-zinc-600 focus:outline-none" />
            </div>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                <input type="text" placeholder="Dates" className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-8 pr-3 py-3 text-xs text-zinc-600 focus:outline-none" readOnly />
              </div>
              <div className="flex items-center bg-white/[0.04] border border-white/10 rounded-xl px-3 gap-2 min-w-[100px]">
                <Users className="w-3 h-3 text-zinc-500" />
                <span className="text-xs text-white">{bookingGuests} Guest{bookingGuests > 1 ? "s" : ""}</span>
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
              {["Luxury", "Family", "Adventure", "Honeymoon", "Wellness"].map((s, si) => (
                <button
                  key={si}
                  onClick={() => setActiveStyleIndex(si === activeStyleIndex ? null : si)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider border transition-all duration-300 ${si === activeStyleIndex ? "bg-amber-400 text-black border-amber-400" : "bg-white/[0.04] text-zinc-400 border-white/10"}`}
                >
                  {s}
                </button>
              ))}
            </div>
            <button className="w-full bg-amber-400 text-black py-4 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl">
              <Plane className="w-3.5 h-3.5" />
              <span>Plan My Journey</span>
            </button>
            <button className="w-full bg-white/[0.04] border border-white/10 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white/70 flex items-center justify-center gap-2">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Talk To An Expert</span>
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}
