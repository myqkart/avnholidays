"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { 
  Play, 
  ArrowRight, 
  MapPin, 
  Calendar, 
  Users, 
  Compass, 
  Star, 
  ShieldCheck, 
  BadgeHelp,
  ArrowUpRight,
  Menu,
  X,
  Sparkles,
  PhoneCall,
  Search,
  Globe,
  Award,
  ChevronDown,
  CloudSun,
  Clock,
  ThumbsUp,
  Plane,
  Heart,
  DollarSign,
  Map,
  BadgePercent
} from "lucide-react";

// ====================================================
// STATIC DATA DEFINITIONS
// ====================================================

interface Destination {
  id: string;
  name: string;
  country: string;
  headline: string;
  description: string;
  image: string;
  tags: string[];
  weather: {
    temp: string;
    season: string;
    duration: string;
    rating: string;
  };
  mapCoords: { x: number; y: number };
}

const DESTINATIONS: Destination[] = [
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    headline: "Whispers of Emerald Canopies",
    description: "Savor the quiet mist rising from sacred volcanos, ancient forest paths, and private plunge pools perched above emerald river gorges.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    tags: ["Nature", "Wellness", "Luxury"],
    weather: { temp: "28°C", season: "Apr - Oct", duration: "9.5h", rating: "4.9" },
    mapCoords: { x: 300, y: 155 }
  },
  {
    id: "switzerland",
    name: "Zermatt",
    country: "Switzerland",
    headline: "Glacial Symmetries & Silent Peaks",
    description: "Relax in hand-crafted timber chalets framing the Matterhorn, featuring floor-to-ceiling glass, private hot springs, and pristine snow fields.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    tags: ["Alpine", "Luxury", "Ski"],
    weather: { temp: "-2°C", season: "Dec - Mar", duration: "11h", rating: "4.8" },
    mapCoords: { x: 180, y: 75 }
  },
  {
    id: "dubai",
    name: "Al Maha",
    country: "Dubai, UAE",
    headline: "Gilded Dunes under Starry Canopies",
    description: "Experience the luxury of Bedouin-style suites nestled deep within the desert conservation reserve, featuring private pools and falconry experiences.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    tags: ["Desert", "Adventure", "Gourmet"],
    weather: { temp: "34°C", season: "Nov - Feb", duration: "7.5h", rating: "4.7" },
    mapCoords: { x: 215, y: 95 }
  },
  {
    id: "maldives",
    name: "Maldives",
    country: "Indian Ocean",
    headline: "Infinite Blues & Overwater Sanctuaries",
    description: "Step directly from your bedroom into a warm turquoise lagoon. Indulge in private island sandbank dinners, stargazing, and absolute solitude.",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80",
    tags: ["Ocean", "Romantic", "Solitude"],
    weather: { temp: "29°C", season: "Nov - Apr", duration: "10h", rating: "4.9" },
    mapCoords: { x: 248, y: 125 }
  },
  {
    id: "paris",
    name: "Paris",
    country: "France",
    headline: "Haute Couture & Heritage Balconies",
    description: "Overlook the Seine from historical suite terraces, where vintage velvet meets modern design. Discover custom perfume ateliers and private art tours.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    tags: ["Culture", "Shopping", "Romantic"],
    weather: { temp: "15°C", season: "May - Sep", duration: "12h", rating: "4.8" },
    mapCoords: { x: 172, y: 72 }
  },
  {
    id: "kashmir",
    name: "Kashmir",
    country: "India",
    headline: "Alpine Paradises & Floating Palaces",
    description: "Glide on glass-like lakes in hand-carved cedar houseboats, surrounded by snow-covered peaks, terraced Mughal gardens, and warm saffron tea.",
    image: "https://images.unsplash.com/photo-1595818970664-4be341753c45?auto=format&fit=crop&w=1200&q=80",
    tags: ["Valley", "Heritage", "Nature"],
    weather: { temp: "12°C", season: "Mar - Oct", duration: "8h", rating: "4.9" },
    mapCoords: { x: 245, y: 92 }
  }
];

interface TourPackage {
  id: string;
  name: string;
  destination: string;
  duration: string;
  price: string;
  headline: string;
  description: string;
  highlights: string[];
  badge: string;
  season: string;
  rating: string;
  image: string;
  mapCoords: string;
  details: {
    flight: string;
    weather: string;
    currency: string;
    visa: string;
  };
}

const PACKAGES: TourPackage[] = [
  {
    id: "pkg-bali",
    name: "Bali Serenity Escape",
    destination: "Ubud & Uluwatu",
    duration: "7 Days / 6 Nights",
    price: "$2,400",
    headline: "A spiritual sanctuary for wellness and ocean views",
    description: "Rejuvenate your spirit in private valley pool villas, experience custom flower bath therapies, and dine overlooking the Indian Ocean.",
    highlights: ["Luxury Valley Villa", "Private Driver", "Flower Bath Spa", "Uluwatu Sunset Tour", "Organic Culinary Journeys"],
    badge: "Wellness Sanctuary",
    season: "April - October",
    rating: "4.95",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    mapCoords: "8.4095° S, 115.1889° E",
    details: {
      flight: "9.5 hrs",
      weather: "28°C Warm",
      currency: "IDR (Rupiah)",
      visa: "Arrival VoA"
    }
  },
  {
    id: "pkg-swiss",
    name: "Alpine Grand Chalet",
    destination: "Zermatt & St. Moritz",
    duration: "9 Days / 8 Nights",
    price: "$4,800",
    headline: "Matterhorn peaks & vintage train journeys",
    description: "Ascend private glaciers, lounge in thermal natural pools, and sleep in hand-hewn oak chalets under the silhouette of Europe's iconic peak.",
    highlights: ["Ski-in/Ski-out Chalet", "Glacier Express tickets", "Indoor/Outdoor Spas", "Helicopter Peak Tour", "Michelin Dining"],
    badge: "Glacial Elite",
    season: "December - March",
    rating: "4.92",
    image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200&q=80",
    mapCoords: "46.0207° N, 7.7491° E",
    details: {
      flight: "11 hrs",
      weather: "-2°C Alpine",
      currency: "CHF (Franc)",
      visa: "Schengen Visa"
    }
  },
  {
    id: "pkg-dubai",
    name: "Gilded Desert Sanctuary",
    destination: "Al Maha Reserve",
    duration: "6 Days / 5 Nights",
    price: "$3,600",
    headline: "Endless desert horizons & royal luxury suites",
    description: "Nestle into luxury tented suites with individual temperature-controlled pools. Engage in falconry, desert safaris, and fine dune dining.",
    highlights: ["Private Pool Suite", "Wildlife Safari Guide", "Royal Falconry Exp", "Sand Dune Sunset Dinner", "Luxury SUV Transfer"],
    badge: "Desert Royalty",
    season: "November - February",
    rating: "4.88",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    mapCoords: "24.8415° N, 55.6322° E",
    details: {
      flight: "7.5 hrs",
      weather: "34°C Dry",
      currency: "AED (Dirham)",
      visa: "E-Visa Pre"
    }
  },
  {
    id: "pkg-maldives",
    name: "Overwater Lagoon Haven",
    destination: "Soneva Jani Reserve",
    duration: "5 Days / 4 Nights",
    price: "$5,200",
    headline: "Unmatched isolation over infinite crystal waters",
    description: "Step into your slide directly into the lagoon, retract your villa roof to count constellations, and enjoy private island sandbank picnics.",
    highlights: ["Retractable Roof Villa", "Lagoon Water Slide", "Private Sandbank Lunch", "Stargazing Deck", "Coral Conservation Tour"],
    badge: "Ultimate Romance",
    season: "November - April",
    rating: "4.98",
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1200&q=80",
    mapCoords: "5.3340° N, 73.3897° E",
    details: {
      flight: "10 hrs",
      weather: "29°C Tropical",
      currency: "MVR (Rufiyaa)",
      visa: "Arrival VoA"
    }
  },
  {
    id: "pkg-kashmir",
    name: "Saffron Valley Palace",
    destination: "Dal Lake, Srinagar",
    duration: "8 Days / 7 Nights",
    price: "$1,800",
    headline: "Hand-carved cedar boats & misty mountain valleys",
    description: "Glide on glass-like lakes in heritage shikaras, walk through cascading Gulmarg meadows, and sip locally grown saffron kahwa by wooden firepits.",
    highlights: ["Cedar Wood Houseboat", "Private Shikara Guide", "Gulmarg Gondola Ride", "Saffron Farm Visit", "Mughal Garden Tour"],
    badge: "Heritage Oasis",
    season: "March - October",
    rating: "4.96",
    image: "https://images.unsplash.com/photo-1595818970664-4be341753c45?auto=format&fit=crop&w=1200&q=80",
    mapCoords: "34.0837° N, 74.7973° E",
    details: {
      flight: "8 hrs",
      weather: "12°C Alpine",
      currency: "INR (Rupee)",
      visa: "E-Visa Easy"
    }
  },
  {
    id: "pkg-thailand",
    name: "Secret Islands Explorer",
    destination: "Phuket & Phi Phi Islands",
    duration: "7 Days / 6 Nights",
    price: "$2,100",
    headline: "Hidden lagoons & luxury catamaran expeditions",
    description: "Cruise past towering karst cliffs, snorkel in glowing bio-luminescent bays, and retreat to beachfront spa sanctuaries.",
    highlights: ["Private Catamaran Cruise", "Villas on Beachfront", "Bioluminescent Snorkel", "Hidden Cave Kayak", "Thai Cooking Class"],
    badge: "Oceanic Retreat",
    season: "November - April",
    rating: "4.90",
    image: "https://images.unsplash.com/photo-1528181304800-2f190854897d?auto=format&fit=crop&w=1200&q=80",
    mapCoords: "7.8804° N, 98.3922° E",
    details: {
      flight: "8.5 hrs",
      weather: "30°C Warm",
      currency: "THB (Baht)",
      visa: "VoA/Waiver"
    }
  }
];

// Helper to get image clip/mask class based on index
const getImageMaskClass = (index: number) => {
  switch (index) {
    case 0: // Bali: Organic blob
      return "rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] border border-white/10 shadow-[0_20px_50px_rgba(16,185,129,0.1)]";
    case 1: // Switzerland: Double fine borders
      return "rounded-2xl border-[3px] border-double border-white/20 p-2 shadow-[0_20px_50px_rgba(14,165,233,0.1)]";
    case 2: // Dubai: Oval dome
      return "rounded-t-full rounded-b-[40px] aspect-[4/5] max-h-[85%] border border-white/10 shadow-[0_20px_50px_rgba(234,179,8,0.1)]";
    case 3: // Maldives: Hexagon mask
      return "rounded-[2rem] border border-white/10 shadow-[0_20px_50px_rgba(6,182,212,0.1)] clip-maldives";
    case 4: // Paris: Classic circle
      return "rounded-full aspect-square max-h-[85%] border border-white/10 shadow-[0_20px_50px_rgba(217,70,239,0.1)]";
    case 5: // Kashmir: Standard clean card
      return "rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(13,148,136,0.1)]";
    default:
      return "rounded-2xl";
  }
};

// Organic floating weather pill component
interface FloatingWidgetProps {
  children: React.ReactNode;
  strength: number;
  className: string;
  smoothX: any;
  smoothY: any;
}

function FloatingWidget({ children, strength, className, smoothX, smoothY }: FloatingWidgetProps) {
  const widgetX = useTransform(smoothX, (x: number) => x * strength * 60);
  const widgetY = useTransform(smoothY, (y: number) => y * strength * 60);

  return (
    <motion.div
      style={{ x: widgetX, y: widgetY }}
      className={`absolute glass-panel px-4 py-2.5 rounded-xl flex items-center gap-2.5 select-none pointer-events-auto border border-white/5 shadow-lg animate-float-slow ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Magnetic Button Wrapper
function MagneticButton({ 
  children, 
  className, 
  onClick 
}: { 
  children: React.ReactNode; 
  className?: string; 
  onClick?: () => void;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 12 });
  const springY = useSpring(y, { stiffness: 120, damping: 12 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    
    // Offset from center (-0.5 to 0.5)
    const offsetX = (clientX / width) - 0.5;
    const offsetY = (clientY / height) - 0.5;
    
    x.set(offsetX * 35);
    y.set(offsetY * 35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

// Floating Card with Parallax
function FloatingCard({ 
  children, 
  strength, 
  className, 
  smoothX, 
  smoothY, 
  setRef 
}: {
  children: React.ReactNode;
  strength: number;
  className: string;
  smoothX: any;
  smoothY: any;
  setRef: (el: HTMLDivElement | null) => void;
}) {
  const cardX = useTransform(smoothX, (x: number) => x * strength * 80);
  const cardY = useTransform(smoothY, (y: number) => y * strength * 80);

  return (
    <motion.div
      ref={setRef}
      style={{ x: cardX, y: cardY }}
      className={`absolute glass-card px-5 py-3.5 rounded-2xl flex items-center gap-3 select-none pointer-events-auto transition-shadow hover:shadow-[0_12px_40px_rgba(255,255,255,0.06)] duration-500 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const floatingCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Section 2 Refs
  const showcaseContainerRef = useRef<HTMLDivElement>(null);
  const introHeaderRef = useRef<HTMLDivElement>(null);
  const showcaseGlowRef = useRef<HTMLDivElement>(null);
  const showcaseMapRef = useRef<HTMLDivElement>(null);
  
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgContainersRef = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const weatherWidgetRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Section 3 Refs
  const packagesContainerRef = useRef<HTMLDivElement>(null);
  const packagesIntroRef = useRef<HTMLDivElement>(null);
  const packagesGlowRef = useRef<HTMLDivElement>(null);
  const timelineProgressRef = useRef<HTMLDivElement>(null);
  
  const packageTextRefs = useRef<(HTMLDivElement | null)[]>([]);
  const packageCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const packageBubbleRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("explore");
  
  // Section 2 active destination states
  const [activeDestIndex, setActiveDestIndex] = useState(0);
  const [segmentProgress, setSegmentProgress] = useState(0);
  const [airplanePos, setAirplanePos] = useState({ x: 300, y: 155 });

  // Section 3 active package states
  const [activePackIndex, setActivePackIndex] = useState(0);
  const [packProgress, setPackProgress] = useState(0);

  // Mouse Coordinates for Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 100 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Normalize coordinates around center (-0.5 to 0.5)
    const x = (clientX / innerWidth) - 0.5;
    const y = (clientY / innerHeight) - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  // 3D Tilt for Experience Widget
  const widgetRotateX = useTransform(smoothY, (y: number) => y * -18);
  const widgetRotateY = useTransform(smoothX, (x: number) => x * 18);

  // 3D Tilt for Package Cards
  const packageRotateX = useTransform(smoothY, (y: number) => y * -10);
  const packageRotateY = useTransform(smoothX, (x: number) => x * 10);

  // Calculate Airplane Coordinates along a quadratic Bezier curve
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

  useEffect(() => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Centering setup for fixed navbar capsule
    gsap.set(navbarRef.current, { xPercent: -50 });

    // ====================================================
    // GSAP Timeline for Hero Pinning & Zoom-out
    // ====================================================
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=120%",
        scrub: 1.1,
        pin: true,
        anticipatePin: 1,
      }
    });

    scrollTl.to(bgRef.current, { scale: 1.25, ease: "sine.inOut" }, 0);
    scrollTl.to(mainContentRef.current, { scale: 0.88, opacity: 0, y: -30, ease: "power2.inOut" }, 0);
    scrollTl.to(widgetRef.current, { scale: 0.75, z: -150, opacity: 0.08, y: 40, ease: "power2.inOut" }, 0);
    
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

    scrollTl.to(scrollIndicatorRef.current, { opacity: 0, scale: 0.8, ease: "power1.out" }, 0);

    scrollTl.to(navbarRef.current, {
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

    // ====================================================
    // GSAP Timeline for Section 2: Destination Showcase
    // ====================================================
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
    destTimeline.to(introHeaderRef.current, { opacity: 0, y: -40, scale: 0.95, duration: 0.6 }, 0);

    // Initial State Setup
    gsap.set(textRefs.current[0], { opacity: 1, y: 0, pointerEvents: "auto" });
    gsap.set(imgContainersRef.current[0], { opacity: 1, pointerEvents: "auto", scale: 1 });
    gsap.set(weatherWidgetRefs.current[0], { opacity: 1, scale: 1 });

    // Transition 1: Bali -> Switzerland (Slide Left)
    destTimeline.to(textRefs.current[0], { opacity: 0, y: -40, duration: stepDuration }, 0.4);
    destTimeline.to(imgContainersRef.current[0], { 
      xPercent: -130, 
      rotate: -10, 
      opacity: 0, 
      scale: 0.85,
      duration: stepDuration 
    }, 0.4);
    destTimeline.to(weatherWidgetRefs.current[0], { opacity: 0, scale: 0.8, duration: stepDuration }, 0.4);

    destTimeline.to(showcaseGlowRef.current, { backgroundColor: "#0ea5e9", duration: stepDuration }, 0.4); 
    destTimeline.fromTo(textRefs.current[1], 
      { opacity: 0, y: 40 }, 
      { opacity: 1, y: 0, pointerEvents: "auto", duration: stepDuration }, 
      0.9
    );
    destTimeline.fromTo(imgContainersRef.current[1], 
      { scale: 0.3, opacity: 0 }, 
      { scale: 1, opacity: 1, pointerEvents: "auto", duration: stepDuration }, 
      0.9
    );
    destTimeline.fromTo(weatherWidgetRefs.current[1],
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1, duration: stepDuration },
      0.9
    );

    // Transition 2: Switzerland -> Dubai (Slide Down)
    destTimeline.to(textRefs.current[1], { opacity: 0, y: -40, duration: stepDuration }, 1.4);
    destTimeline.to(imgContainersRef.current[1], { 
      yPercent: 120, 
      opacity: 0, 
      duration: stepDuration 
    }, 1.4);
    destTimeline.to(weatherWidgetRefs.current[1], { opacity: 0, scale: 0.8, duration: stepDuration }, 1.4);

    destTimeline.to(showcaseGlowRef.current, { backgroundColor: "#eab308", duration: stepDuration }, 1.4); 
    destTimeline.fromTo(textRefs.current[2], 
      { opacity: 0, y: 40 }, 
      { opacity: 1, y: 0, pointerEvents: "auto", duration: stepDuration }, 
      1.9
    );
    destTimeline.fromTo(imgContainersRef.current[2], 
      { rotate: 15, xPercent: 130, opacity: 0 }, 
      { rotate: 0, xPercent: 0, opacity: 1, pointerEvents: "auto", duration: stepDuration }, 
      1.9
    );
    destTimeline.fromTo(weatherWidgetRefs.current[2],
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1, duration: stepDuration },
      1.9
    );

    // Transition 3: Dubai -> Maldives (Rotate to Polygon Mask)
    destTimeline.to(textRefs.current[2], { opacity: 0, y: -40, duration: stepDuration }, 2.4);
    destTimeline.to(imgContainersRef.current[2], { 
      scale: 0.75, 
      opacity: 0, 
      duration: stepDuration 
    }, 2.4);
    destTimeline.to(weatherWidgetRefs.current[2], { opacity: 0, scale: 0.8, duration: stepDuration }, 2.4);

    destTimeline.to(showcaseGlowRef.current, { backgroundColor: "#06b6d4", duration: stepDuration }, 2.4); 
    destTimeline.fromTo(textRefs.current[3], 
      { opacity: 0, y: 40 }, 
      { opacity: 1, y: 0, pointerEvents: "auto", duration: stepDuration }, 
      2.9
    );
    destTimeline.fromTo(imgContainersRef.current[3], 
      { clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)", opacity: 0 }, 
      { clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", opacity: 1, pointerEvents: "auto", duration: stepDuration }, 
      2.9
    );
    destTimeline.fromTo(weatherWidgetRefs.current[3],
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1, duration: stepDuration },
      2.9
    );

    // Transition 4: Maldives -> Paris (Mask to Heavy Blur)
    destTimeline.to(textRefs.current[3], { opacity: 0, y: -40, duration: stepDuration }, 3.4);
    destTimeline.to(imgContainersRef.current[3], { 
      xPercent: -110,
      opacity: 0, 
      duration: stepDuration 
    }, 3.4);
    destTimeline.to(weatherWidgetRefs.current[3], { opacity: 0, scale: 0.8, duration: stepDuration }, 3.4);

    destTimeline.to(showcaseGlowRef.current, { backgroundColor: "#d946ef", duration: stepDuration }, 3.4); 
    destTimeline.fromTo(textRefs.current[4], 
      { opacity: 0, y: 40 }, 
      { opacity: 1, y: 0, pointerEvents: "auto", duration: stepDuration }, 
      3.9
    );
    destTimeline.fromTo(imgContainersRef.current[4], 
      { filter: "blur(50px)", opacity: 0, scale: 0.9 }, 
      { filter: "blur(0px)", opacity: 1, scale: 1, pointerEvents: "auto", duration: stepDuration }, 
      3.9
    );
    destTimeline.fromTo(weatherWidgetRefs.current[4],
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1, duration: stepDuration },
      3.9
    );

    // Transition 5: Paris -> Kashmir (Blur to Zoom In Expansion)
    destTimeline.to(textRefs.current[4], { opacity: 0, y: -40, duration: stepDuration }, 4.4);
    destTimeline.to(imgContainersRef.current[4], { 
      yPercent: -120,
      opacity: 0, 
      duration: stepDuration 
    }, 4.4);
    destTimeline.to(weatherWidgetRefs.current[4], { opacity: 0, scale: 0.8, duration: stepDuration }, 4.4);

    destTimeline.to(showcaseGlowRef.current, { backgroundColor: "#0d9488", duration: stepDuration }, 4.4); 
    destTimeline.fromTo(textRefs.current[5], 
      { opacity: 0, y: 40 }, 
      { opacity: 1, y: 0, pointerEvents: "auto", duration: stepDuration }, 
      4.9
    );
    destTimeline.fromTo(imgContainersRef.current[5], 
      { scale: 0.6, opacity: 0, rotateY: 45 }, 
      { scale: 1.15, opacity: 1, rotateY: 0, pointerEvents: "auto", duration: stepDuration }, 
      4.9
    );
    destTimeline.fromTo(weatherWidgetRefs.current[5],
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1, duration: stepDuration },
      4.9
    );

    // Destination 6 Outro
    destTimeline.to(imgContainersRef.current[5], {
      scale: 0.9,
      opacity: 0.25,
      filter: "blur(4px)",
      duration: 0.6
    }, 5.5);
    destTimeline.to(textRefs.current[5], { opacity: 0.1, y: -20, duration: 0.6 }, 5.5);
    destTimeline.to(showcaseMapRef.current, { opacity: 0.05, duration: 0.6 }, 5.5);

    // ====================================================
    // GSAP Timeline for Section 3: Signature Tour Packages
    // ====================================================
    const packTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: packagesContainerRef.current,
        start: "top top",
        end: "+=600%", // Longer pinned scrub space for 6 packages + intro + stacked deck outro
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          // Split the progress into sections: Intro (0 to 0.1), 6 Packages (0.1 to 0.8), Stacking Outro (0.8 to 1.0)
          let activeIdx = 0;
          let activeProg = 0;

          if (progress < 0.1) {
            activeIdx = 0;
            activeProg = progress / 0.1;
          } else if (progress >= 0.8) {
            activeIdx = 5;
            activeProg = (progress - 0.8) / 0.2;
          } else {
            // Curate step indexes inside the packages sequence (0.1 to 0.8)
            const packageProgress = (progress - 0.1) / 0.7; // 0 to 1
            activeIdx = Math.min(5, Math.floor(packageProgress * 6));
            activeProg = (packageProgress * 6) - activeIdx;
          }

          setActivePackIndex(activeIdx);
          setPackProgress(activeProg);
        }
      }
    });

    const packStep = 1.5; // Logical time steps

    // 1. Packages intro fades out
    packTimeline.to(packagesIntroRef.current, { opacity: 0, y: -50, filter: "blur(6px)", duration: 0.6 }, 0.2);

    // Initial sets to make sure they start at 0
    packageTextRefs.current.forEach((el) => { if (el) gsap.set(el, { opacity: 0, y: 40 }); });
    packageCardRefs.current.forEach((el) => { if (el) gsap.set(el, { opacity: 0, scale: 0.7, rotate: 0 }); });
    packageBubbleRefs.current.forEach((el) => { if (el) gsap.set(el, { opacity: 0, scale: 0.7 }); });

    // Card 0 (Bali) enters
    packTimeline.to(packageTextRefs.current[0], { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.6 }, 0.6);
    packTimeline.to(packageCardRefs.current[0], { opacity: 1, scale: 1, pointerEvents: "auto", rotate: 0, duration: 0.6 }, 0.6);
    packTimeline.to(packageBubbleRefs.current[0], { opacity: 1, scale: 1, duration: 0.6 }, 0.6);

    // Transition 1: Bali -> Switzerland
    packTimeline.to(packageTextRefs.current[0], { opacity: 0, y: -40, duration: packStep }, 1.4);
    packTimeline.to(packageCardRefs.current[0], { 
      xPercent: -130, 
      rotate: -12, 
      scale: 0.85, 
      opacity: 0, 
      duration: packStep 
    }, 1.4);
    packTimeline.to(packageBubbleRefs.current[0], { opacity: 0, scale: 0.7, duration: packStep }, 1.4);

    packTimeline.to(packagesGlowRef.current, { backgroundColor: "#0284c7", duration: packStep }, 1.4); // Shift background color
    packTimeline.fromTo(packageTextRefs.current[1],
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, pointerEvents: "auto", duration: packStep },
      2.1
    );
    packTimeline.fromTo(packageCardRefs.current[1],
      { scale: 0.3, opacity: 0, yPercent: 40, rotate: 10 },
      { scale: 1, opacity: 1, yPercent: 0, rotate: 0, pointerEvents: "auto", duration: packStep },
      2.1
    );
    packTimeline.fromTo(packageBubbleRefs.current[1],
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1, duration: packStep },
      2.1
    );

    // Transition 2: Switzerland -> Dubai
    packTimeline.to(packageTextRefs.current[1], { opacity: 0, y: -40, duration: packStep }, 3.1);
    packTimeline.to(packageCardRefs.current[1], { 
      yPercent: 120, 
      rotate: 15, 
      opacity: 0, 
      duration: packStep 
    }, 3.1);
    packTimeline.to(packageBubbleRefs.current[1], { opacity: 0, scale: 0.7, duration: packStep }, 3.1);

    packTimeline.to(packagesGlowRef.current, { backgroundColor: "#ca8a04", duration: packStep }, 3.1);
    packTimeline.fromTo(packageTextRefs.current[2],
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, pointerEvents: "auto", duration: packStep },
      3.8
    );
    packTimeline.fromTo(packageCardRefs.current[2],
      { rotate: -15, xPercent: 130, opacity: 0 },
      { rotate: 0, xPercent: 0, opacity: 1, pointerEvents: "auto", duration: packStep },
      3.8
    );
    packTimeline.fromTo(packageBubbleRefs.current[2],
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1, duration: packStep },
      3.8
    );

    // Transition 3: Dubai -> Maldives
    packTimeline.to(packageTextRefs.current[2], { opacity: 0, y: -40, duration: packStep }, 4.8);
    packTimeline.to(packageCardRefs.current[2], { 
      scale: 0.7, 
      opacity: 0, 
      filter: "blur(8px)",
      duration: packStep 
    }, 4.8);
    packTimeline.to(packageBubbleRefs.current[2], { opacity: 0, scale: 0.7, duration: packStep }, 4.8);

    packTimeline.to(packagesGlowRef.current, { backgroundColor: "#0891b2", duration: packStep }, 4.8);
    packTimeline.fromTo(packageTextRefs.current[3],
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, pointerEvents: "auto", duration: packStep },
      5.5
    );
    packTimeline.fromTo(packageCardRefs.current[3],
      { clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)", opacity: 0 },
      { clipPath: "polygon(12% 0%, 88% 0%, 100% 50%, 88% 100%, 12% 100%, 0% 50%)", opacity: 1, pointerEvents: "auto", duration: packStep },
      5.5
    );
    packTimeline.fromTo(packageBubbleRefs.current[3],
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1, duration: packStep },
      5.5
    );

    // Transition 4: Maldives -> Kashmir
    packTimeline.to(packageTextRefs.current[3], { opacity: 0, y: -40, duration: packStep }, 6.5);
    packTimeline.to(packageCardRefs.current[3], { 
      xPercent: -120, 
      opacity: 0, 
      duration: packStep 
    }, 6.5);
    packTimeline.to(packageBubbleRefs.current[3], { opacity: 0, scale: 0.7, duration: packStep }, 6.5);

    packTimeline.to(packagesGlowRef.current, { backgroundColor: "#0d9488", duration: packStep }, 6.5);
    packTimeline.fromTo(packageTextRefs.current[4],
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, pointerEvents: "auto", duration: packStep },
      7.2
    );
    packTimeline.fromTo(packageCardRefs.current[4],
      { filter: "blur(40px)", opacity: 0, scale: 0.85 },
      { filter: "blur(0px)", opacity: 1, scale: 1, pointerEvents: "auto", duration: packStep },
      7.2
    );
    packTimeline.fromTo(packageBubbleRefs.current[4],
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1, duration: packStep },
      7.2
    );

    // Transition 5: Kashmir -> Thailand
    packTimeline.to(packageTextRefs.current[4], { opacity: 0, y: -40, duration: packStep }, 8.2);
    packTimeline.to(packageCardRefs.current[4], { 
      yPercent: -120, 
      opacity: 0, 
      duration: packStep 
    }, 8.2);
    packTimeline.to(packageBubbleRefs.current[4], { opacity: 0, scale: 0.7, duration: packStep }, 8.2);

    packTimeline.to(packagesGlowRef.current, { backgroundColor: "#0f766e", duration: packStep }, 8.2);
    packTimeline.fromTo(packageTextRefs.current[5],
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, pointerEvents: "auto", duration: packStep },
      8.9
    );
    packTimeline.fromTo(packageCardRefs.current[5],
      { scale: 0.6, rotateX: 30, opacity: 0 },
      { scale: 1, rotateX: 0, opacity: 1, pointerEvents: "auto", duration: packStep },
      8.9
    );
    packTimeline.fromTo(packageBubbleRefs.current[5],
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1, duration: packStep },
      8.9
    );

    // ====================================================
    // STACKING DECK OUTRO SEQUENCE
    // ====================================================
    // At the final stage of scroll, fade out active text and gather all 6 cards into a stacked postcard deck
    packTimeline.to(packageTextRefs.current[5], { opacity: 0, y: -40, duration: 1 }, 10.1);
    packTimeline.to(packageBubbleRefs.current[5], { opacity: 0, scale: 0.7, duration: 1 }, 10.1);

    // Card 1 Stacking
    packTimeline.to(packageCardRefs.current[0],
      { xPercent: 0, x: -35, y: -30, rotate: -10, scale: 0.85, opacity: 0.65, filter: "blur(2px)", duration: 1.5, ease: "power2.out" },
      10.2
    );
    // Card 2 Stacking
    packTimeline.to(packageCardRefs.current[1],
      { yPercent: 0, x: 25, y: -15, rotate: 6, scale: 0.86, opacity: 0.7, filter: "blur(1.5px)", duration: 1.5, ease: "power2.out" },
      10.2
    );
    // Card 3 Stacking
    packTimeline.to(packageCardRefs.current[2],
      { x: -15, y: 15, rotate: -6, scale: 0.87, opacity: 0.75, filter: "blur(1px)", duration: 1.5, ease: "power2.out" },
      10.2
    );
    // Card 4 Stacking
    packTimeline.to(packageCardRefs.current[3],
      { xPercent: 0, x: 35, y: 25, rotate: 8, scale: 0.88, opacity: 0.8, filter: "blur(0.5px)", duration: 1.5, ease: "power2.out" },
      10.2
    );
    // Card 5 Stacking
    packTimeline.to(packageCardRefs.current[4],
      { yPercent: 0, x: -25, y: 35, rotate: -4, scale: 0.89, opacity: 0.85, filter: "blur(0px)", duration: 1.5, ease: "power2.out" },
      10.2
    );
    // Card 6 Stacking
    packTimeline.to(packageCardRefs.current[5],
      { x: 0, y: 0, rotate: 2, scale: 0.9, opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "power2.out" },
      10.2
    );

    // Zoom the stacked collection out as the next section enters
    packTimeline.to([
      packageCardRefs.current[0],
      packageCardRefs.current[1],
      packageCardRefs.current[2],
      packageCardRefs.current[3],
      packageCardRefs.current[4],
      packageCardRefs.current[5]
    ], {
      scale: 0.68,
      y: 120,
      opacity: 0,
      filter: "blur(12px)",
      stagger: 0.05,
      duration: 1.2,
      ease: "power2.inIn"
    }, 11.8);

    // Particle Emitter Loop on Canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        let animationFrameId: number;
        let particles: Array<{
          x: number;
          y: number;
          size: number;
          speedX: number;
          speedY: number;
          opacity: number;
        }> = [];

        const handleResize = () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        };
        handleResize();
        window.addEventListener("resize", handleResize);

        // Generate static particles initially
        for (let i = 0; i < 75; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.5 + 0.6,
            speedX: (Math.random() - 0.5) * 0.15,
            speedY: -(Math.random() * 0.4 + 0.15),
            opacity: Math.random() * 0.45 + 0.15,
          });
        }

        const runParticles = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          particles.forEach((p) => {
            p.y += p.speedY;
            p.x += p.speedX;

            if (p.y < 0) {
              p.y = canvas.height;
              p.x = Math.random() * canvas.width;
            }
            if (p.x < 0 || p.x > canvas.width) {
              p.x = Math.random() * canvas.width;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(250, 204, 21, ${p.opacity})`;
            ctx.fill();
          });
          animationFrameId = requestAnimationFrame(runParticles);
        };
        runParticles();

        return () => {
          cancelAnimationFrame(animationFrameId);
          window.removeEventListener("resize", handleResize);
        };
      }
    }

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative w-full bg-black text-white selection:bg-amber-500/20 selection:text-amber-200">
      
      {/* ====================================================
          SECTION 1: HERO
          ==================================================== */}
      <section 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative min-h-screen w-full select-none overflow-hidden bg-black text-white pointer-events-auto"
        style={{ perspective: 1200 }}
      >
      {/* ====================================================
          BACKGROUND LAYERS
          ==================================================== */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full pointer-events-none scale-100 origin-center">
        {/* Layer 1: Looping Cinematic Video / Fallback */}
        <div className="absolute inset-0 w-full h-full bg-zinc-950 transition-opacity duration-1000">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={() => setIsVideoLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              isVideoLoaded ? "opacity-45" : "opacity-0"
            }`}
          >
            <source 
              src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-luxury-resort-in-maldives-41807-large.mp4" 
              type="video/mp4" 
            />
          </video>
          {/* Fallback elegant static frame */}
          {!isVideoLoaded && (
            <img
              src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1920&q=80"
              alt="Luxury Travel Haven"
              className="absolute inset-0 w-full h-full object-cover opacity-35"
              loading="eager"
            />
          )}
        </div>

        {/* Layer 2: Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/35 to-black/90 mix-blend-multiply z-[1]" />

        {/* Layer 3: Moving Atmospheric Fog */}
        <div className="absolute inset-0 z-[2] opacity-[0.12] pointer-events-none overflow-hidden mix-blend-screen">
          <div className="absolute top-[40%] left-0 w-[200%] h-1/2 bg-gradient-to-r from-transparent via-zinc-400/40 to-transparent blur-3xl animate-fog-slow" />
          <div className="absolute top-[50%] left-0 w-[200%] h-1/2 bg-gradient-to-r from-transparent via-zinc-500/25 to-transparent blur-3xl animate-fog-fast translate-y-8" />
        </div>

        {/* Layer 4: Particle Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 z-[3] pointer-events-none" />

        {/* Layer 5: Film Grain Overlay */}
        <div className="absolute inset-0 w-[115%] h-[115%] -left-[7%] -top-[7%] z-[4] pointer-events-none opacity-[0.038] mix-blend-overlay overflow-hidden animate-grain">
          <svg className="w-full h-full">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>

        {/* Layer 6: Large Slow Moving Blurred Shapes */}
        <div className="absolute inset-0 z-[0] overflow-hidden">
          <div className="absolute w-[600px] h-[600px] rounded-full bg-amber-500/10 blur-[130px] -top-32 -left-48 animate-pulse-slow" />
          <div className="absolute w-[700px] h-[700px] rounded-full bg-blue-500/8 blur-[150px] bottom-16 right-[-200px] animate-pulse-slow [animation-delay:4s]" />
        </div>
      </div>

      {/* ====================================================
          NAVBAR
          ==================================================== */}
      <header 
        ref={navbarRef}
        className="fixed top-6 left-1/2 z-[50] w-[90%] max-w-5xl rounded-full bg-white/[0.03] backdrop-blur-[20px] px-6 py-3.5 flex items-center justify-between border border-white/8 shadow-2xl pointer-events-auto"
      >
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/10">
            <Compass className="w-4 h-4 text-black group-hover:rotate-45 transition-transform duration-500" />
          </div>
          <span className="text-base font-medium tracking-[0.2em] uppercase font-sans text-glow">
            AVN <span className="text-amber-400">Holidays</span>
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          {["Destinations", "Hotels", "Packages", "Car Rentals", "About", "Contact"].map((item) => (
            <a 
              key={item} 
              href="#" 
              className="text-xs font-medium text-zinc-300 tracking-wider hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-amber-400 hover:after:w-full after:transition-all after:duration-300"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Call to Action Button */}
        <div className="hidden md:block">
          <MagneticButton className="px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded-full bg-white text-black border border-white hover:bg-transparent hover:text-white transition-all duration-300 cursor-pointer">
            Book Now
          </MagneticButton>
        </div>

        {/* Mobile Hamburger menu */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1 text-zinc-200 hover:text-white transition-colors cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-4 top-24 z-[49] rounded-2xl bg-black/90 backdrop-blur-2xl p-6 border border-white/8 shadow-2xl flex flex-col gap-5 md:hidden pointer-events-auto"
          >
            <div className="flex flex-col gap-4">
              {["Destinations", "Hotels", "Packages", "Car Rentals", "About", "Contact"].map((item) => (
                <a 
                  key={item} 
                  href="#" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-zinc-300 hover:text-white transition-colors border-b border-white/5 pb-2"
                >
                  {item}
                </a>
              ))}
            </div>
            <button className="w-full py-3 text-xs font-semibold uppercase tracking-wider rounded-full bg-amber-400 text-black">
              Book Your Experience
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====================================================
          MAIN HERO CONTENT
          ==================================================== */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center pt-28 pb-20 px-4 md:px-12 pointer-events-none">
        
        {/* PARALLAX FLOATING CARDS */}
        <div className="absolute inset-0 w-full h-full hidden sm:block overflow-hidden pointer-events-none">
          {/* Card 1: Star Rating */}
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

          {/* Card 2: Travelers Count */}
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

          {/* Card 3: Destinations Count */}
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

          {/* Card 4: Luxury Hotels */}
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

          {/* Card 5: Best Price */}
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

          {/* Card 6: 24/7 Support */}
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
          {/* Animated Badge */}
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

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans tracking-tight text-white leading-[1.08] mb-6 flex flex-col select-text">
            <span className="block opacity-90 tracking-wide font-light">
              Travel Beyond
            </span>
            <span className="block font-serif italic text-amber-400 my-1.5 font-normal scale-102">
              Destinations.
            </span>
            <span className="block text-zinc-300 font-light tracking-wide opacity-80">
              Collect Stories.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-[660px] mb-8 font-light select-text">
            Do not just cross coordinates on a map. Let the whisper of wind, the glow of quiet sunsets, 
            and the luxury of unstructured time carve unforgettable memories into your soul.
          </p>

          {/* CTA Buttons */}
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
        <motion.div 
          ref={widgetRef}
          style={{ 
            rotateX: widgetRotateX, 
            rotateY: widgetRotateY,
            transformStyle: "preserve-3d",
          }}
          className="w-full max-w-3xl mt-12 bg-white/[0.02] border border-white/5 backdrop-blur-2xl rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-2xl relative overflow-hidden pointer-events-auto select-none"
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
        </motion.div>

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
              animate={{ 
                y: [0, 10, 0],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-1 h-1.5 rounded-full bg-amber-400"
            />
          </div>
        </div>
      </div>
    </section>

      {/* ====================================================
          SECTION 2: IMMERSIVE DESTINATION SHOWCASE
          ==================================================== */}
      <section 
        ref={showcaseContainerRef} 
        id="destination-showcase"
        className="relative min-h-screen w-full bg-zinc-950 border-t border-white/5 flex flex-col items-center justify-center py-20 overflow-hidden"
      >
        {/* Dynamic background glow */}
        <div 
          ref={showcaseGlowRef}
          className="absolute w-[600px] h-[600px] rounded-full bg-[#10b981]/10 blur-[130px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[0] transition-colors duration-1000 pointer-events-none"
        />

        {/* Floating clouds overlay */}
        <div className="absolute inset-0 pointer-events-none z-[1] opacity-[0.08] mix-blend-screen">
          <div className="absolute w-[200%] h-full bg-gradient-to-r from-transparent via-zinc-400 to-transparent blur-3xl animate-fog-slow" />
        </div>

        {/* Content Grid */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full min-h-[80vh]">
          
          {/* LEFT COLUMN: ACTIVE DESTINATION */}
          <div className="lg:col-span-5 relative h-[380px] md:h-[450px] flex flex-col justify-center">
            
            <div 
              ref={introHeaderRef}
              className="absolute inset-0 flex flex-col justify-center text-left select-none z-[5]"
            >
              <h2 className="text-3xl sm:text-5xl md:text-6xl leading-[1.08] font-sans tracking-tight text-white mb-4">
                Discover <br />
                <span className="font-serif italic text-amber-400 font-normal">The World's</span> <br />
                Beautiful Places
              </h2>
              <p className="text-zinc-500 text-xs sm:text-sm font-light leading-relaxed max-w-[400px]">
                Scroll down to fly over Earth and uncover coordinates that define the peak of luxury, silence, and emotional discovery.
              </p>
            </div>

            {/* Active Destination Text Blocks */}
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

          {/* RIGHT COLUMN: ACTIVE DESTINATION IMAGE */}
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

                {/* Floating Weather Pills Container */}
                <div 
                  ref={(el) => { weatherWidgetRefs.current[idx] = el; }}
                  className="absolute inset-0 pointer-events-none z-[10] opacity-0 transition-opacity duration-300"
                >
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

        {/* FLOATING INTERACTIVE MAP PANEL */}
        <div 
          ref={showcaseMapRef}
          className="absolute bottom-6 right-6 z-[25] w-[280px] rounded-2xl bg-black/60 backdrop-blur-xl border border-white/5 p-4 shadow-2xl hidden md:block"
        >
          <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
            <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 font-bold">Satellite Radar Map</span>
            <span className="text-[8px] font-sans font-semibold text-amber-400 px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">
              Active Coordinates
            </span>
          </div>

          <div className="relative w-full h-[160px] bg-zinc-950/40 rounded-lg overflow-hidden border border-white/5">
            <svg viewBox="0 0 400 240" className="w-full h-full opacity-35">
              <path d="M160 60 Q190 50 220 50 T280 60 T320 80 T350 110 T330 150 T280 180 T200 160 Z" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
              <path d="M40 50 Q80 40 120 60 T140 100 T100 130 T60 110 Z" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
              <path d="M90 130 Q120 150 110 190 T90 220 T70 170 Z" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
              <path d="M150 100 Q190 100 200 130 T180 180 T150 190 T140 130 Z" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
              <path d="M300 170 Q330 170 340 190 T310 215 T290 190 Z" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />

              {/* Connecting Curved Routes */}
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
                    id={`route-${i}`}
                    d={`M ${current.x} ${current.y} Q ${midX} ${midY} ${next.x} ${next.y}`}
                    fill="none"
                    stroke={isActiveSegment || isPassed ? "rgba(245, 158, 11, 0.45)" : "rgba(255, 255, 255, 0.05)"}
                    strokeWidth={isActiveSegment ? "1.5" : "1"}
                    strokeDasharray={isActiveSegment ? "4 2" : "0"}
                    className="transition-all duration-500"
                  />
                );
              })}

              {/* Static Destination Dots */}
              {DESTINATIONS.map((dest, i) => {
                const isActive = i === activeDestIndex;
                return (
                  <g key={`dot-${dest.id}`}>
                    {isActive && (
                      <circle
                        cx={dest.mapCoords.x}
                        cy={dest.mapCoords.y}
                        r="8"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="1"
                        className="animate-ping"
                        style={{ transformOrigin: `${dest.mapCoords.x}px ${dest.mapCoords.y}px` }}
                      />
                    )}
                    <circle
                      cx={dest.mapCoords.x}
                      cy={dest.mapCoords.y}
                      r={isActive ? "4" : "2"}
                      fill={isActive ? "#f59e0b" : "#4b5563"}
                      className="transition-all duration-300"
                    />
                  </g>
                );
              })}

              {/* Flying Airplane SVG Node */}
              <g 
                style={{ 
                  transform: `translate(${airplanePos.x}px, ${airplanePos.y}px)`,
                  transition: "transform 0.05s linear"
                }}
              >
                <circle r="4" fill="#ffffff" className="animate-pulse shadow-glow" />
                <circle r="2" fill="#f59e0b" />
              </g>
            </svg>
          </div>

          <div className="mt-3 flex items-center justify-between text-left">
            <div>
              <span className="text-[8px] text-zinc-500 uppercase tracking-widest leading-none block">Active Point</span>
              <span className="text-[11px] font-semibold text-zinc-200">
                {DESTINATIONS[activeDestIndex].name}, {DESTINATIONS[activeDestIndex].country}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[8px] text-zinc-500 uppercase tracking-widest leading-none block">Fly Path</span>
              <span className="text-[10px] font-sans font-bold text-amber-500">
                Route #{activeDestIndex + 1}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 3: SIGNATURE TOUR PACKAGES EXPERIENCE
          ==================================================== */}
      <section 
        ref={packagesContainerRef}
        id="tour-packages"
        className="relative min-h-screen w-full bg-zinc-950 border-t border-white/5 flex flex-col items-center justify-center py-20 overflow-hidden"
      >
        {/* Dynamic environmental glow */}
        <div 
          ref={packagesGlowRef}
          className="absolute w-[600px] h-[600px] rounded-full bg-[#0ea5e9]/10 blur-[140px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[0] transition-colors duration-1000 pointer-events-none"
        />

        {/* Section Title Intro Header (Slides up and fades on scroll) */}
        <div 
          ref={packagesIntroRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-[25] pointer-events-none px-6"
        >
          <div className="max-w-2xl flex flex-col items-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-glow select-none mb-6">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin [animation-duration:8s]" />
              <span className="text-[9px] font-medium tracking-[0.25em] uppercase text-zinc-200">
                ✦ Signature Experiences
              </span>
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

        {/* Main Pinned Content Grid */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full min-h-[85vh]">
          
          {/* LEFT COLUMN: ACTIVE PACKAGE DETAILS */}
          <div className="lg:col-span-5 relative h-[420px] md:h-[480px] flex flex-col justify-center">
            {PACKAGES.map((pkg, idx) => {
              const isActive = idx === activePackIndex;
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
                      <span
                        key={hl}
                        className="text-[8.5px] uppercase tracking-wider bg-white/[0.03] border border-white/5 px-2.5 py-0.5 rounded text-zinc-300 hover:bg-white/10 hover:border-white/20 transition-all select-none cursor-pointer"
                      >
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

          {/* RIGHT COLUMN: MASSIVE ASYMMETRICAL FLOATING PACKAGE CARD */}
          <div className="lg:col-span-7 relative h-[380px] sm:h-[480px] md:h-[550px] flex items-center justify-center">
            
            {PACKAGES.map((pkg, idx) => {
              return (
                <div
                  key={pkg.id}
                  ref={(el) => { packageCardRefs.current[idx] = el; }}
                  className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none"
                  style={{
                    perspective: 1000,
                  }}
                >
                  {/* Organic Asymmetrical Glass Frame Wrapper */}
                  <motion.div 
                    style={{
                      rotateX: packageRotateX,
                      rotateY: packageRotateY,
                      transformStyle: "preserve-3d"
                    }}
                    className={`relative w-[90%] sm:w-[82%] h-[82%] md:h-[90%] overflow-hidden glass-card rounded-[2.5rem_1.5rem_2rem_1rem] p-3 pointer-events-auto`}
                  >
                    {/* Inner image container */}
                    <div className="relative w-full h-full overflow-hidden rounded-[2.2rem_1.2rem_1.8rem_0.8rem]">
                      {/* Glass reflections */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.08] z-[5] pointer-events-none" />
                      <div className="absolute -inset-x-16 w-36 bg-white/[0.06] blur-3xl rotate-45 -left-16 top-0 animate-[pulse_5s_infinite] pointer-events-none" />
                      
                      <img
                        src={pkg.image}
                        alt={pkg.name}
                        className="w-full h-full object-cover scale-110"
                      />
                    </div>
                  </motion.div>

                  {/* Floating Bubble Metadata Widgets around active Card */}
                  <div 
                    ref={(el) => { packageBubbleRefs.current[idx] = el; }}
                    className="absolute inset-0 pointer-events-none z-[12] opacity-0 transition-opacity duration-300"
                  >
                    {/* Flight helper */}
                    <FloatingWidget strength={0.18} className="top-[12%] left-[-2%] md:left-[4%]" smoothX={smoothX} smoothY={smoothY}>
                      <Plane className="w-4 h-4 text-sky-400" />
                      <div>
                        <div className="text-[10px] font-bold text-white leading-none">{pkg.details.flight}</div>
                        <span className="text-[7.5px] text-zinc-500 uppercase tracking-widest">Flight Transit</span>
                      </div>
                    </FloatingWidget>

                    {/* Local Currency helper */}
                    <FloatingWidget strength={0.3} className="bottom-[14%] left-[6%]" smoothX={smoothX} smoothY={smoothY}>
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                      <div>
                        <div className="text-[10px] font-semibold text-white leading-none">{pkg.details.currency}</div>
                        <span className="text-[7.5px] text-zinc-500 uppercase tracking-widest">Currency</span>
                      </div>
                    </FloatingWidget>

                    {/* Visa guideline helper */}
                    <FloatingWidget strength={0.25} className="top-[16%] right-[0%] md:right-[6%]" smoothX={smoothX} smoothY={smoothY}>
                      <ShieldCheck className="w-4 h-4 text-amber-400" />
                      <div>
                        <div className="text-[10px] font-bold text-white leading-none">{pkg.details.visa}</div>
                        <span className="text-[7.5px] text-zinc-500 uppercase tracking-widest">Visa rules</span>
                      </div>
                    </FloatingWidget>

                    {/* Local Weather helper */}
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

        {/* ====================================================
            VERTICAL JOURNEY TIMELINE SIDEBAR
            ==================================================== */}
        <div 
          ref={timelineProgressRef}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-[25] flex-col items-center gap-4 hidden md:flex"
        >
          {/* Vertical indicator line container */}
          <div className="relative w-[2px] h-[240px] bg-white/5 flex items-center justify-center">
            {/* Active filled golden indicator path line */}
            <div 
              className="absolute top-0 w-full bg-amber-400 transition-all duration-300"
              style={{
                height: `${(activePackIndex / 5) * 100}%`
              }}
            />

            {/* Connecting step dots */}
            {PACKAGES.map((pkg, i) => {
              const isActive = i === activePackIndex;
              const isCompleted = i < activePackIndex;
              return (
                <div
                  key={`time-node-${pkg.id}`}
                  className="absolute cursor-pointer flex items-center select-none"
                  style={{
                    top: `${(i / 5) * 100}%`,
                    left: "-7px"
                  }}
                >
                  <div 
                    className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all duration-500 ${
                      isActive 
                        ? "bg-amber-400 border-amber-400 shadow-lg shadow-amber-400/20 scale-125" 
                        : isCompleted 
                          ? "bg-amber-400/30 border-amber-400 scale-100" 
                          : "bg-zinc-950 border-white/10 scale-90"
                    }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-black" : isCompleted ? "bg-amber-400" : "bg-zinc-700"}`} />
                  </div>
                  <span className={`absolute left-6 text-[8px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                    isActive ? "text-amber-400 opacity-100 scale-105" : "text-zinc-500 opacity-0 scale-95"
                  }`}>
                    {pkg.destination.split(" ")[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 4: HOTELS & RESORTS PLACEHOLDER
          ==================================================== */}
      {/* Jammu Kashmir cards stacked deck outro transitions into this section */}
      <section className="relative w-full min-h-screen bg-black z-20 border-t border-white/5 flex flex-col items-center justify-center text-center px-6 py-32">
        <div className="max-w-3xl flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="w-full flex flex-col items-center"
          >
            <div className="w-12 h-[1px] bg-amber-400/50 mb-8" />
            <span className="text-[10px] tracking-[0.3em] font-semibold text-amber-400 uppercase font-sans mb-3 block">
              Luxury Stays & Refined Living
            </span>
            <h2 className="text-4xl md:text-6xl font-sans tracking-tight text-white leading-none mb-6">
              Grand Hotels <span className="font-serif italic text-amber-400 font-normal">& Resorts</span>
            </h2>
            <p className="text-zinc-500 text-sm md:text-base leading-relaxed max-w-[620px] mb-10 font-light select-text">
              Relax in architecture tailored to capture the landscape. Discover private villa keys, overwater decks, and heritage sanctuaries that set the standard for fine hospitality.
            </p>

            {/* CTAs */}
            <div className="flex flex-row items-center gap-4 pointer-events-auto">
              <MagneticButton className="group bg-white hover:bg-transparent text-black hover:text-white px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider border border-white flex items-center gap-3 transition-colors duration-300 cursor-pointer shadow-2xl">
                <span>Customize Your Dream Trip</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </MagneticButton>

              <MagneticButton className="group bg-white/[0.03] backdrop-blur-[20px] hover:bg-white/10 px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2.5 transition-all duration-300 border border-white/10 hover:border-white/20 cursor-pointer">
                <span>Talk To A Travel Expert</span>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>

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
    </div>
  );
}
