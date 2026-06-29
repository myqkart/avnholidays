"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Heart, Star, ArrowRight } from "lucide-react";
import { MagneticButton } from "../ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export function TravelerStories() {
  const storiesContainerRef = useRef<HTMLDivElement>(null);
  
  const [, setStoriesProgress] = useState(0);
  const [, setActiveStoryIndex] = useState(0);

  useGSAP(() => {
    const storiesTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: storiesContainerRef.current,
        start: "top top",
        end: "+=200%",
        scrub: 1.0,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          setStoriesProgress(progress);
          setActiveStoryIndex(Math.min(4, Math.floor(progress * 5.2)));
        }
      }
    });

    storiesTimeline.fromTo(".stories-header",
      { y: 60, opacity: 0, filter: "blur(8px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8 },
      0.05
    );

    storiesTimeline.fromTo(".story-card",
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: "power2.out" },
      0.25
    );

    storiesTimeline.fromTo(".stories-marquee-track",
      { x: "0%" },
      { x: "-50%", ease: "none", duration: 5.0 },
      0.0
    );

    storiesTimeline.fromTo(".stories-stats-bar",
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      0.5
    );

  }, { scope: storiesContainerRef });

  return (
    <section ref={storiesContainerRef} className="relative w-full h-screen overflow-hidden bg-zinc-950 z-20">
      <div className="absolute inset-0 pointer-events-none z-0" style={{ background: "radial-gradient(ellipse at 20% 60%, rgba(251,191,36,0.04) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.015) 0%, transparent 50%), #09090b" }} />

      <div className="hidden md:flex w-full h-full flex-col relative z-10">
        <div className="stories-header absolute top-12 inset-x-12 flex justify-between items-end z-30 opacity-0">
          <div>
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-amber-400 flex items-center gap-2 mb-3">
              <Heart className="w-3 h-3 fill-amber-400 text-amber-400" /> Traveler Stories
            </span>
            <h2 className="text-4xl md:text-5xl font-sans text-white leading-tight tracking-tight">
              <span className="font-light opacity-90">Real Trips.</span><br />
              <span className="font-serif italic text-amber-400 font-normal">Real Moments.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-xs leading-relaxed font-light max-w-[320px] text-right">
            5,000+ travelers have chosen AVN Holidays to turn their dream destinations into lived stories. Here are a few of theirs.
          </p>
        </div>

        <div className="absolute inset-x-12 top-[30%] grid grid-cols-4 gap-5 z-20 select-none">
          {[
            { name: "Priya Mehta", origin: "Mumbai, India", dest: "Bali, Indonesia", quote: "AVN curated every single detail — the Ubud rice terrace villa, the sunset dinner, even a private healer session. Nothing felt like a package. Everything felt like home.", imgUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=500&q=80", rating: 5, tall: true },
            { name: "Arjun Sharma", origin: "Delhi, India", dest: "Zurich, Switzerland", quote: "From Zurich to Interlaken, they handled every train, every hotel check-in, every fondue restaurant. I just showed up. Pure bliss.", imgUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=500&q=80", rating: 5, tall: false },
            { name: "Nadia Al Hassan", origin: "Dubai, UAE", dest: "Maldives", quote: "The overwater bungalow had a glass floor. I watched reef sharks swimming beneath me from my bed. This is exactly why AVN exists.", imgUrl: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=500&q=80", rating: 5, tall: false },
            { name: "Ravi Kapoor", origin: "Bangalore, India", dest: "Tokyo, Japan", quote: "A family trip with four kids. AVN made it smooth, fun, and insanely memorable. Even the bullet train seats were pre-selected.", imgUrl: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=500&q=80", rating: 5, tall: true }
          ].map((story, idx) => (
            <div key={`story-card-${idx}`} className={`story-card relative bg-zinc-900 rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl group cursor-pointer opacity-0 ${story.tall ? "row-span-2" : ""}`}>
              <img src={story.imgUrl} alt={`${story.dest} story`} className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="p-5 flex flex-col gap-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: story.rating }).map((_, si) => <Star key={si} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-zinc-300 text-[11px] leading-relaxed font-light italic">"{story.quote}"</p>
                <div className="border-t border-white/5 pt-3 flex justify-between items-center">
                  <div>
                    <div className="text-white text-[10px] font-semibold">{story.name}</div>
                    <div className="text-zinc-600 text-[8.5px] uppercase tracking-widest">{story.origin}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-amber-400 text-[9px] font-bold uppercase tracking-wider">{story.dest}</div>
                  </div>
                </div>
              </div>
              <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-amber-400 opacity-70 group-hover:scale-150 transition-transform duration-300" />
            </div>
          ))}
        </div>

        <div className="absolute bottom-28 inset-x-0 overflow-hidden border-y border-white/5 py-4 z-25">
          <div className="flex gap-16 stories-marquee-track whitespace-nowrap" style={{ width: "200%" }}>
            {[
              `✦ "The most seamless travel experience I've ever had." — Kavya, Chennai`,
              `✦ "They booked our honeymoon in Santorini. Every detail perfect." — Rahul & Pooja`,
              `✦ "Corporate retreat for 40 people in Singapore. Flawless execution." — Akash Verma`,
              `✦ "Kashmir houseboat was a dream. AVN made it real." — Shreya Nair`,
              `✦ "First solo trip to Europe. AVN held my hand every step." — Megha, 23`,
              `✦ "The most seamless travel experience I've ever had." — Kavya, Chennai`,
              `✦ "They booked our honeymoon in Santorini. Every detail perfect." — Rahul & Pooja`,
              `✦ "Corporate retreat for 40 people in Singapore. Flawless execution." — Akash Verma`,
              `✦ "Kashmir houseboat was a dream. AVN made it real." — Shreya Nair`,
              `✦ "First solo trip to Europe. AVN held my hand every step." — Megha, 23`
            ].map((item, i) => (
              <span key={i} className="text-[10px] text-zinc-500 font-light tracking-widest uppercase shrink-0">{item}</span>
            ))}
          </div>
        </div>

        <div className="absolute inset-x-12 bottom-8 stories-stats-bar opacity-0 z-30 flex justify-between items-center">
          <div className="flex gap-12">
            {[
              { val: "5000+", label: "Happy Travelers" },
              { val: "98%", label: "Satisfaction Rate" },
              { val: "120+", label: "Destinations" },
              { val: "12yr", label: "Of Excellence" }
            ].map((stat) => (
              <div key={stat.label} className="text-left">
                <div className="text-lg font-bold text-white font-sans leading-none">{stat.val}</div>
                <span className="text-[8px] text-zinc-500 uppercase tracking-widest mt-1.5 block">{stat.label}</span>
              </div>
            ))}
          </div>
          <MagneticButton className="group bg-white hover:bg-transparent text-black hover:text-white px-6 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white flex items-center gap-2 transition-colors duration-300 cursor-pointer shadow-xl">
            <span>Read All Stories</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
          </MagneticButton>
        </div>
      </div>

      <div className="md:hidden w-full h-full flex flex-col relative z-10 px-6 py-16 overflow-y-auto">
        <div className="mb-8">
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-amber-400 block mb-3">
            ✦ Traveler Stories
          </span>
          <h2 className="text-3xl font-sans text-white leading-tight">
            <span className="font-light">Real Trips.</span><br />
            <span className="font-serif italic text-amber-400 font-normal">Real Moments.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {[
            { name: "Priya Mehta", dest: "Bali, Indonesia", quote: "AVN curated every single detail — nothing felt like a package. Everything felt like home.", imgUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80" },
            { name: "Arjun Sharma", dest: "Zurich, Switzerland", quote: "From Zurich to Interlaken, they handled every train and hotel. I just showed up. Pure bliss.", imgUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80" },
            { name: "Nadia Al Hassan", dest: "Maldives", quote: "The overwater bungalow had a glass floor. I watched reef sharks from my bed.", imgUrl: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=400&q=80" }
          ].map((story, idx) => (
            <div key={`mob-story-${idx}`} className="bg-zinc-900 rounded-[1.5rem] overflow-hidden border border-white/5">
              <img src={story.imgUrl} alt={story.dest} className="w-full h-36 object-cover" />
              <div className="p-4">
                <div className="flex gap-0.5 mb-2">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-zinc-400 text-[11px] italic leading-relaxed font-light">"{story.quote}"</p>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/5">
                  <span className="text-white text-[10px] font-semibold">{story.name}</span>
                  <span className="text-amber-400 text-[9px] font-bold uppercase tracking-wider">{story.dest}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
