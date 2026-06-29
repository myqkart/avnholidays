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
  ChevronLeft,
  ChevronRight,
  CloudSun,
  Clock,
  ThumbsUp,
  Plane,
  Heart,
  DollarSign,
  Map,
  BadgePercent,
  Camera,
  FileText,
  Bookmark
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

  // Section 4 Refs
  const journeyContainerRef = useRef<HTMLDivElement>(null);
  const journeyTrackRef = useRef<HTMLDivElement>(null);
  const journeyBgRef = useRef<HTMLDivElement>(null);
  const journeyIntroRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const benefitsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const polaroidsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctaCardRef = useRef<HTMLDivElement>(null);

  // Section 4 States
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [journeyProgress, setJourneyProgress] = useState(0);

  // Section 5 (Hotels) Refs
  const hotelsContainerRef = useRef<HTMLDivElement>(null);
  const hotelsIntroRef = useRef<HTMLDivElement>(null);
  const hotelsContentRef = useRef<HTMLDivElement>(null);
  const hotelSceneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hotelPanelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reservationConsoleRef = useRef<HTMLDivElement>(null);

  // Section 5 (Hotels) States
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [activeHotelTypeIndex, setActiveHotelTypeIndex] = useState(0);
  const [hotelsProgress, setHotelsProgress] = useState(0);

  // Section 6 (Globe Network) Refs
  const globeContainerRef = useRef<HTMLDivElement>(null);
  const globeIntroRef = useRef<HTMLDivElement>(null);
  const globeSphereRef = useRef<HTMLDivElement>(null);
  const globeMapRef = useRef<HTMLDivElement>(null);
  const membershipCardRef = useRef<HTMLDivElement>(null);

  // Section 6 (Globe Network) States
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);
  const [globeProgress, setGlobeProgress] = useState(0);
  const [globeCountCountries, setGlobeCountCountries] = useState(0);
  const [globeCountFlights, setGlobeCountFlights] = useState(0);
  const [globeCountHotels, setGlobeCountHotels] = useState(0);

  // Section 7 (Super Saver Club) Refs
  const clubContainerRef = useRef<HTMLDivElement>(null);
  const clubIntroRef = useRef<HTMLDivElement>(null);
  const clubCardRef = useRef<HTMLDivElement>(null);
  const clubContentRef = useRef<HTMLDivElement>(null);

  // Section 7 (Super Saver Club) States
  const [activeBenefitIndex, setActiveBenefitIndex] = useState(0);
  const [clubProgress, setClubProgress] = useState(0);
  const [activeTierIndex, setActiveTierIndex] = useState(1);
  const [clubCountMembers, setClubCountMembers] = useState(0);
  const [clubCountOffers, setClubCountOffers] = useState(0);

  // Section 8 (Traveler Stories) Refs
  const storiesContainerRef = useRef<HTMLDivElement>(null);

  // Section 8 (Traveler Stories) States
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [storiesProgress, setStoriesProgress] = useState(0);

  // Section 9 (Cinematic Booking) Refs
  const bookingContainerRef = useRef<HTMLDivElement>(null);
  const bookingConsoleRef = useRef<HTMLDivElement>(null);
  const bookingLandscapeRef = useRef<HTMLDivElement>(null);

  // Section 9 (Cinematic Booking) States
  const [bookingProgress, setBookingProgress] = useState(0);
  const [activeStyleIndex, setActiveStyleIndex] = useState<number | null>(null);
  const [bookingDest, setBookingDest] = useState("");
  const [bookingGuests, setBookingGuests] = useState(2);
  const [showEndingMsg, setShowEndingMsg] = useState(false);

  // Footer Refs & States
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerMouseX, setFooterMouseX] = useState(0.5);
  const [footerMouseY, setFooterMouseY] = useState(0.5);
  const [shootingStarActive, setShootingStarActive] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [localTime, setLocalTime] = useState("");
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

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

  // Footer: Local time clock updater
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setLocalTime(now.toLocaleTimeString("en-IN", {
        hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true
      }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Footer: Periodic shooting star easter egg
  useEffect(() => {
    const fire = () => {
      setShootingStarActive(true);
      setTimeout(() => setShootingStarActive(false), 2000);
    };
    const id = setInterval(fire, 12000);
    fire(); // trigger once on mount
    return () => clearInterval(id);
  }, []);

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
        start: "bottom bottom",
        end: "+=120%",
        scrub: 1.1,
        pin: true,
        anticipatePin: 1,
      }
    });

    scrollTl.to(bgRef.current, { scale: 1.25, ease: "sine.inOut" }, 0);
    scrollTl.to(mainContentRef.current, { scale: 0.88, opacity: 0, y: -30, ease: "power2.inOut" }, 0);
    
    // Keep the widget fully visible and accessible during the pin.
    // Just a subtle parallax up and very minor scale down so it remains the focal point.
    scrollTl.to(widgetRef.current, { scale: 0.96, y: -30, ease: "power2.inOut" }, 0);
    
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

    // ====================================================
    // GSAP Timeline for Section 4: The Journey Experience
    // ====================================================
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

    // 1. Horizontal track scroll translation
    journeyTimeline.to(journeyTrackRef.current, {
      x: "-400vw",
      ease: "none",
      duration: 5.5
    }, 0.2);

    // 2. Background Radial Glow Shifter (Peachy Sunrise -> Golden Hour -> Purple Dusk Sunset)
    // Dream
    journeyTimeline.to(journeyBgRef.current, {
      background: "radial-gradient(circle at 50% 50%, rgba(251,113,133,0.16) 0%, rgba(253,186,116,0.12) 40%, rgba(9,9,11,1) 100%)",
      duration: 1.2
    }, 0);
    // Planning
    journeyTimeline.to(journeyBgRef.current, {
      background: "radial-gradient(circle at 50% 50%, rgba(245,158,11,0.14) 0%, rgba(244,63,94,0.12) 45%, rgba(9,9,11,1) 100%)",
      duration: 1.2
    }, 1.2);
    // Adventure
    journeyTimeline.to(journeyBgRef.current, {
      background: "radial-gradient(circle at 50% 50%, rgba(236,72,153,0.14) 0%, rgba(139,92,246,0.12) 50%, rgba(9,9,11,1) 100%)",
      duration: 1.2
    }, 2.4);
    // Memories
    journeyTimeline.to(journeyBgRef.current, {
      background: "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.16) 0%, rgba(244,63,94,0.14) 50%, rgba(9,9,11,1) 100%)",
      duration: 1.2
    }, 3.6);

    // 3. Editorial Section Title fading out
    journeyTimeline.to(journeyIntroRef.current, {
      opacity: 0,
      y: -60,
      filter: "blur(8px)",
      duration: 0.6
    }, 0.3);

    // 4. Chapter 1 (Dream) animations
    journeyTimeline.fromTo(".ch1-passport",
      { y: 60, rotate: -15, opacity: 0 },
      { y: 0, rotate: 6, opacity: 1, duration: 0.8 },
      0.4
    );
    journeyTimeline.fromTo(".ch1-text",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      0.4
    );
    journeyTimeline.fromTo(".ch1-plane",
      { x: -80, y: 80, opacity: 0 },
      { x: 140, y: -90, opacity: 1, duration: 1.1 },
      0.6
    );

    // 5. Chapter 2 (Planning) animations
    journeyTimeline.fromTo(".ch2-text",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      1.3
    );
    journeyTimeline.fromTo(".ch2-card",
      { scale: 0.8, opacity: 0, filter: "blur(6px)" },
      { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.8 },
      1.3
    );
    // Dashed path connector reveal
    journeyTimeline.fromTo(".ch2-path",
      { strokeDashoffset: 600 },
      { strokeDashoffset: 0, duration: 1.0, ease: "power2.inOut" },
      1.5
    );
    journeyTimeline.fromTo(".ch2-bubble",
      { opacity: 0, scale: 0.75 },
      { opacity: 1, scale: 1, stagger: 0.12, duration: 0.6 },
      1.6
    );

    // 6. Chapter 3 (Adventure) animations
    journeyTimeline.fromTo(".ch3-text",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      2.5
    );
    journeyTimeline.fromTo(".ch3-img-1",
      { y: 120, rotate: -4, opacity: 0, scale: 0.9 },
      { y: 0, rotate: -2, opacity: 1, scale: 1, duration: 0.8 },
      2.5
    );
    journeyTimeline.fromTo(".ch3-img-2",
      { y: -120, rotate: 6, opacity: 0, scale: 0.9 },
      { y: 0, rotate: 3, opacity: 1, scale: 1, duration: 0.8 },
      2.6
    );
    journeyTimeline.fromTo(".ch3-img-3",
      { y: 160, rotate: -6, opacity: 0, scale: 0.85 },
      { y: 0, rotate: -5, opacity: 1, scale: 1, duration: 0.8 },
      2.7
    );

    // 7. Chapter 4 (Memories) animations
    journeyTimeline.fromTo(".ch4-text",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      3.7
    );
    journeyTimeline.fromTo(".ch4-polaroid-1",
      { y: 260, rotate: -12, opacity: 0 },
      { y: 0, rotate: -7, opacity: 1, duration: 0.9 },
      3.7
    );
    journeyTimeline.fromTo(".ch4-polaroid-2",
      { y: 320, rotate: 12, opacity: 0 },
      { y: 0, rotate: 5, opacity: 1, duration: 0.9 },
      3.8
    );
    journeyTimeline.fromTo(".ch4-polaroid-3",
      { y: 380, rotate: -6, opacity: 0 },
      { y: 0, rotate: -1, opacity: 1, duration: 0.9 },
      3.9
    );
    journeyTimeline.fromTo(".ch4-stamp",
      { scale: 2.8, opacity: 0, rotate: -45 },
      { scale: 1, opacity: 1, rotate: 15, duration: 0.5, ease: "bounce.out" },
      4.1
    );

    // 8. Chapter 5 (Return Home & CTA Outro) animations
    journeyTimeline.fromTo(".ch5-text",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      4.8
    );
    journeyTimeline.fromTo(".ch5-journal",
      { scale: 0.7, opacity: 0, rotate: -8 },
      { scale: 1, opacity: 1, rotate: 0, duration: 0.8 },
      4.8
    );

    // Zoom and blur the memory elements
    journeyTimeline.to(".ch5-zoom-wrapper", {
      scale: 0.76,
      opacity: 0.1,
      filter: "blur(10px)",
      duration: 0.8
    }, 5.2);

    // Reveal final CTA text and buttons
    journeyTimeline.fromTo(".ch5-cta",
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, ease: "power2.out" },
      5.3
    );

    // Zoom into background hotel lobby transition
    journeyTimeline.to(".ch5-hotel-zoom", {
      scale: 3.5,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power2.inOut"
    }, 6.0);

    // ====================================================
    // GSAP Timeline for Section 5: Luxury Hotels Experience
    // ====================================================
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

    // Initial state configurations
    gsap.set(".hotel-scene-0", { opacity: 1, scale: 1, filter: "blur(0px)" });
    gsap.set([".hotel-scene-1", ".hotel-scene-2", ".hotel-scene-3", ".hotel-scene-4"], {
      opacity: 0,
      scale: 1.08,
      filter: "blur(15px)"
    });

    // Background Radial Shifting
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

    // Staggered Title Heading reveal
    hotelsTimeline.to(hotelsIntroRef.current, {
      opacity: 0,
      y: -60,
      filter: "blur(8px)",
      duration: 0.8
    }, 0.3);

    // Transition 1 (Arrival -> Lobby)
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

    // Transition 2 (Lobby -> Suite)
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

    // Transition 3 (Suite -> Infinity Pool)
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

    // Transition 4 (Pool -> Night Experience)
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

    // Float Booking Console
    hotelsTimeline.fromTo(".hotel-booking-console",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      5.0
    );

    // Dissolve into Clouds Outro
    hotelsTimeline.to(".hotel-clouds-outro", {
      opacity: 1,
      scale: 1.15,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power2.inOut"
    }, 5.8);

    // ====================================================
    // GSAP Timeline for Section 6: Interactive Global Travel Network
    // ====================================================
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

          // Counter metrics count-up
          setGlobeCountCountries(Math.min(45, Math.floor(progress * 50)));
          setGlobeCountFlights(Math.min(12400, Math.floor(progress * 13500)));
          setGlobeCountHotels(Math.min(850, Math.floor(progress * 920)));
        }
      }
    });

    // Horizontal Map rotation tween inside sphere
    globeTimeline.to(".globe-map-wide", {
      xPercent: -42,
      ease: "none",
      duration: 5.5
    }, 0.2);

    // Title reveal fading out
    globeTimeline.to(globeIntroRef.current, {
      opacity: 0,
      y: -60,
      filter: "blur(8px)",
      duration: 0.8
    }, 0.3);

    // Staggered Layer-specific path draws
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

    // Zoom into single focus city marker (fly-in camera zoom effect)
    globeTimeline.to(".globe-sphere-wrapper", {
      scale: 5.2,
      x: "18vw",
      y: "-12vh",
      opacity: 0.12,
      filter: "blur(6px)",
      duration: 1.2,
      ease: "power2.inOut"
    }, 5.5);

    // Hide surround cards
    globeTimeline.to([".globe-panel-left", ".globe-panel-right", ".globe-stats-bar"], {
      scale: 0.82,
      opacity: 0,
      filter: "blur(8px)",
      duration: 0.8
    }, 5.5);

    // Transition marker into Gold Membership card CTA
    globeTimeline.fromTo(".globe-cta-membership", 
      { scale: 0.72, opacity: 0, y: 100 }, 
      { scale: 1, opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }, 
      6.0
    );

    // ====================================================
    // GSAP Timeline for Section 7: Super Saver Club
    // ====================================================
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

          // Counter statistics
          setClubCountMembers(Math.min(5000, Math.floor(progress * 5300)));
          setClubCountOffers(Math.min(100, Math.floor(progress * 108)));
        }
      }
    });

    // 3D Card rotation and translation to the side
    clubTimeline.to(".club-hero-card", {
      rotateY: 34,
      rotateX: 10,
      rotateZ: -5,
      scale: 1.06,
      x: "16vw",
      duration: 1.5,
      ease: "power2.inOut"
    }, 0.2);

    // Intro header reveal title fading out
    clubTimeline.to(clubIntroRef.current, {
      opacity: 0,
      y: -60,
      filter: "blur(8px)",
      duration: 0.8
    }, 0.3);

    // Crossfading background supporting visuals (matching benefit indicators)
    for (let i = 0; i < 9; i++) {
      clubTimeline.to(`.club-bg-visual-${i}`, { opacity: 0, duration: 0.6 }, (i + 1) * 0.45);
      clubTimeline.to(`.club-bg-visual-${i + 1}`, { opacity: 0.22, duration: 0.6 }, (i + 1) * 0.45);
    }

    // Interactive Material tiers slide up
    clubTimeline.fromTo(".club-tier-samples",
      { y: 120, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, ease: "power2.out" },
      4.2
    );

    // Flatten and dissolve card at the final scroll phase
    clubTimeline.to(".club-hero-card", {
      scale: 0.58,
      opacity: 0,
      filter: "blur(12px)",
      duration: 1.0,
      ease: "power2.inIn"
    }, 5.0);

    // Fade out tier swatches
    clubTimeline.to(".club-tier-samples", {
      opacity: 0,
      y: 50,
      duration: 0.8
    }, 5.0);

    // Fade in final massive CTA text
    clubTimeline.fromTo(".club-ending-cta",
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, ease: "power2.out" },
      5.2
    );

    // Drifting travel polaroids scatter animation
    clubTimeline.fromTo(".club-drifting-photo",
      { opacity: 0, scale: 0.6, y: 160, rotate: -18 },
      { opacity: 0.65, scale: 1, y: 0, rotate: "random(-12, 12)", stagger: 0.08, duration: 1.2 },
      5.4
    );

    // ====================================================
    // GSAP Timeline for Section 8: Traveler Stories
    // ====================================================
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

    // Section header fades up on enter
    storiesTimeline.fromTo(".stories-header",
      { y: 60, opacity: 0, filter: "blur(8px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8 },
      0.05
    );

    // Staggered story card reveals
    storiesTimeline.fromTo(".story-card",
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: "power2.out" },
      0.25
    );

    // Marquee testimonials ticker
    storiesTimeline.fromTo(".stories-marquee-track",
      { x: "0%" },
      { x: "-50%", ease: "none", duration: 5.0 },
      0.0
    );

    // Stats bar rise up
    storiesTimeline.fromTo(".stories-stats-bar",
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      0.5
    );

    // ====================================================
    // GSAP Timeline for Section 9: Cinematic Booking Experience
    // ====================================================
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

    // Landscape slow parallax zoom
    bookingTimeline.to(".booking-landscape-bg", {
      scale: 1.18,
      y: "-8%",
      ease: "none",
      duration: 8.0
    }, 0.0);

    // Clouds drift across sky
    bookingTimeline.to(".booking-cloud-a", { x: "22vw", ease: "none", duration: 7.0 }, 0.0);
    bookingTimeline.to(".booking-cloud-b", { x: "-18vw", ease: "none", duration: 8.5 }, 0.0);
    bookingTimeline.to(".booking-cloud-c", { x: "12vw", ease: "none", duration: 9.0 }, 0.0);

    // Airplane crosses the sky
    bookingTimeline.fromTo(".booking-airplane",
      { x: "-15vw", y: "8vh", opacity: 0 },
      { x: "110vw", y: "-6vh", opacity: 1, duration: 4.5, ease: "power1.inOut" },
      0.15
    );

    // Intro header reveal
    bookingTimeline.fromTo(".booking-intro",
      { y: 70, opacity: 0, filter: "blur(10px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.0 },
      0.08
    );

    // Console float up
    bookingTimeline.fromTo(bookingConsoleRef.current,
      { y: 120, opacity: 0, scale: 0.94 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
      0.2
    );

    // Assurance badges stagger in
    bookingTimeline.fromTo(".booking-assurance-badge",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: "power2.out" },
      0.4
    );

    // Travel style chips stagger in
    bookingTimeline.fromTo(".booking-style-chip",
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, stagger: 0.05, duration: 0.5, ease: "back.out(1.4)" },
      0.5
    );

    // Console & intro dissolve — BEFORE ending message
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

    // Landscape camera fly-forward zoom
    bookingTimeline.to(".booking-landscape-bg", {
      scale: 2.8,
      filter: "blur(4px) brightness(1.35)",
      duration: 2.0,
      ease: "power2.inOut"
    }, 5.0);

    // Ending message fade in — only after everything else is gone
    bookingTimeline.fromTo(".booking-ending-msg",
      { opacity: 0, scale: 0.92 },
      { opacity: 1, scale: 1, duration: 1.0, ease: "power2.out" },
      5.5
    );

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
          SECTION 4: THE JOURNEY EXPERIENCE (WHY CHOOSE AVN)
          ==================================================== */}
      <section 
        ref={journeyContainerRef}
        className="relative w-full h-screen overflow-hidden bg-black z-20"
      >
        {/* Dynamic Light/Color Shift Backplate */}
        <div 
          ref={journeyBgRef}
          className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-1000"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(251,113,133,0.16) 0%, rgba(253,186,116,0.12) 40%, rgba(9,9,11,1) 100%)"
          }}
        />

        {/* Ambient floating particle embers overlay inside Section 4 */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-950/0 via-zinc-950/20 to-zinc-950 z-[2] pointer-events-none" />

        {/* ====================================================
            DESKTOP HARDRAFTED HORIZONTAL SCROLL STORY
            ==================================================== */}
        <div className="hidden md:block w-full h-full relative z-10">
          
          {/* Chapter Progress Tracker Header */}
          <div className="absolute top-10 left-12 z-30 flex items-center gap-8 select-none">
            <span className="text-[10px] tracking-[0.25em] font-semibold text-amber-400 uppercase font-sans flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Crafted Experiences
            </span>
            <div className="flex gap-2.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <div 
                  key={`chapter-dot-${i}`}
                  className={`h-[3px] rounded-full transition-all duration-500 ${
                    i === activeChapterIndex ? "w-8 bg-amber-400" : "w-3 bg-white/10"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Intro Title Overlay (Initially centered, fades out as user scrolls) */}
          <div 
            ref={journeyIntroRef}
            className="absolute inset-0 flex flex-col items-center justify-center text-center z-[25] px-6 pointer-events-none"
          >
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

          {/* Master Sliding Horizontal Track */}
          <div 
            ref={journeyTrackRef}
            className="flex flex-row w-[500vw] h-full"
            style={{ willChange: "transform" }}
          >
            {/* CHAPTER 1: DREAM */}
            <div className="w-screen h-full flex-shrink-0 flex items-center justify-center relative px-16">
              <div className="max-w-7xl mx-auto w-full grid grid-cols-12 gap-16 items-center">
                
                {/* Left: Headline & editorial paragraph */}
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
                  
                  {/* Embedded AVN Benefits floating glass label */}
                  <div className="inline-flex items-center gap-3 bg-white/[0.02] border border-white/5 px-4 py-2.5 rounded-xl backdrop-blur-xl animate-float-slow">
                    <Award className="w-4 h-4 text-amber-400" />
                    <div className="text-left">
                      <div className="text-[10px] font-semibold text-white leading-none">Trusted Since 2016</div>
                      <span className="text-[7.5px] text-zinc-500 uppercase tracking-widest">A Decade of Fine Journeys</span>
                    </div>
                  </div>
                </div>

                {/* Right: Globe & Floating Passport */}
                <div className="col-span-7 relative h-[500px] flex items-center justify-center">
                  
                  {/* Floating wireframe Globe */}
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

                  {/* Tiny flying airplane on dotted path */}
                  <div className="absolute inset-0 z-10 pointer-events-none ch1-plane opacity-0">
                    <svg viewBox="0 0 400 300" className="w-full h-full fill-none">
                      <path 
                        d="M 50 250 Q 180 80 320 60" 
                        stroke="rgba(251, 191, 36, 0.15)" 
                        strokeWidth="1.5" 
                        strokeDasharray="4 4" 
                      />
                    </svg>
                    <div 
                      className="absolute w-6 h-6 bg-zinc-900 border border-white/10 rounded-full flex items-center justify-center shadow-lg"
                      style={{
                        left: "310px",
                        top: "50px"
                      }}
                    >
                      <Plane className="w-3.5 h-3.5 text-amber-400 rotate-45" />
                    </div>
                  </div>

                  {/* Glass Passport Widget */}
                  <div className="relative w-[280px] h-[380px] ch1-passport opacity-0 z-10">
                    <div className="w-full h-full glass-card rounded-[2rem] p-6 text-left flex flex-col justify-between relative overflow-hidden shadow-2xl">
                      {/* Gold passport crest graphic */}
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

                  {/* Background floating polaroids */}
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

            {/* CHAPTER 2: PLANNING */}
            <div className="w-screen h-full flex-shrink-0 flex items-center justify-center relative px-16">
              <div className="max-w-7xl mx-auto w-full grid grid-cols-12 gap-16 items-center">
                
                {/* Left: Content */}
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
                    <div className="inline-flex items-center gap-2 bg-white/[0.02] border border-white/5 px-3 py-1.5 rounded-full text-zinc-300 text-[9px] uppercase tracking-widest">
                      ✦ Personalized Itineraries
                    </div>
                    <div className="inline-flex items-center gap-2 bg-white/[0.02] border border-white/5 px-3 py-1.5 rounded-full text-zinc-300 text-[9px] uppercase tracking-widest">
                      ✦ Visa Assistance
                    </div>
                  </div>
                </div>

                {/* Right: Connecting Route Dashboard */}
                <div className="col-span-7 relative h-[500px] flex items-center justify-center">
                  
                  {/* Dashboard card */}
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

                      {/* Timeline flow chart mapping */}
                      <div className="my-auto relative h-28 flex items-center justify-between">
                        {/* Connecting Line path */}
                        <svg className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-[2px] z-0 overflow-visible">
                          <path 
                            d="M 10 1 H 280" 
                            stroke="rgba(251, 191, 36, 0.15)" 
                            strokeWidth="2" 
                            className="ch2-path"
                            style={{ strokeDasharray: "8 4" }}
                          />
                        </svg>

                        {/* Route Nodes */}
                        <div className="flex justify-between w-full relative z-10 px-2">
                          {/* Flight Node */}
                          <div className="flex flex-col items-center gap-1.5 ch2-bubble opacity-0">
                            <div className="w-9 h-9 rounded-full bg-zinc-950 border border-white/10 hover:border-amber-400/50 flex items-center justify-center transition-colors">
                              <Plane className="w-4 h-4 text-sky-400" />
                            </div>
                            <span className="text-[8px] text-zinc-400 uppercase tracking-wider">Flight</span>
                          </div>

                          {/* Hotel Node */}
                          <div className="flex flex-col items-center gap-1.5 ch2-bubble opacity-0">
                            <div className="w-9 h-9 rounded-full bg-zinc-950 border border-white/10 hover:border-amber-400/50 flex items-center justify-center transition-colors">
                              <CloudSun className="w-4 h-4 text-emerald-400" />
                            </div>
                            <span className="text-[8px] text-zinc-400 uppercase tracking-wider">Stays</span>
                          </div>

                          {/* Visa Node */}
                          <div className="flex flex-col items-center gap-1.5 ch2-bubble opacity-0">
                            <div className="w-9 h-9 rounded-full bg-zinc-950 border border-white/10 hover:border-amber-400/50 flex items-center justify-center transition-colors">
                              <ShieldCheck className="w-4 h-4 text-amber-400" />
                            </div>
                            <span className="text-[8px] text-zinc-400 uppercase tracking-wider">Visa</span>
                          </div>

                          {/* Price Node */}
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

                  {/* Decorative flying luggage tag widget */}
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

            {/* CHAPTER 3: ADVENTURE */}
            <div className="w-screen h-full flex-shrink-0 flex items-center justify-center relative px-16">
              <div className="max-w-7xl mx-auto w-full grid grid-cols-12 gap-16 items-center">
                
                {/* Left: Content */}
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

                {/* Right: Layered Asymmetrical Images Stack */}
                <div className="col-span-7 relative h-[500px] flex items-center justify-center">
                  
                  {/* Photo 1: Valley pools (bottom left) */}
                  <div className="absolute left-[8%] bottom-[8%] w-[220px] h-[280px] rounded-[2rem_1rem_1.5rem_1rem] overflow-hidden border border-white/10 shadow-2xl z-10 ch3-img-1 opacity-0">
                    <img 
                      src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80" 
                      className="w-full h-full object-cover scale-110" 
                      alt="Adventure" 
                    />
                  </div>

                  {/* Photo 2: Switzerland peaks (top right) */}
                  <div className="absolute right-[12%] top-[10%] w-[260px] h-[300px] rounded-[1.5rem_2rem_1rem_2rem] overflow-hidden border border-white/10 shadow-2xl z-0 ch3-img-2 opacity-0">
                    <img 
                      src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=600&q=80" 
                      className="w-full h-full object-cover scale-110" 
                      alt="Adventure" 
                    />
                  </div>

                  {/* Photo 3: Boat/Catamaran expedition (center bottom) */}
                  <div className="absolute left-[36%] bottom-[12%] w-[200px] h-[220px] rounded-[1.5rem] overflow-hidden border border-white/10 shadow-2xl z-20 ch3-img-3 opacity-0">
                    <img 
                      src="https://images.unsplash.com/photo-1528181304800-2f190854897d?auto=format&fit=crop&w=600&q=80" 
                      className="w-full h-full object-cover scale-110" 
                      alt="Adventure" 
                    />
                  </div>
                  
                </div>
              </div>
            </div>

            {/* CHAPTER 4: MEMORIES */}
            <div className="w-screen h-full flex-shrink-0 flex items-center justify-center relative px-16">
              <div className="max-w-7xl mx-auto w-full grid grid-cols-12 gap-16 items-center">
                
                {/* Left: Content */}
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

                {/* Right: Floating Polaroids & Stamped Passport */}
                <div className="col-span-7 relative h-[500px] flex items-center justify-center">
                  
                  {/* Glass Travel Journal Backplate */}
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

                    {/* Stamped circle overlay graphic that bounces down */}
                    <div className="absolute right-6 bottom-6 w-24 h-24 ch4-stamp opacity-0 pointer-events-none select-none">
                      <div className="w-full h-full rounded-full border-[3px] border-double border-emerald-400/40 flex flex-col items-center justify-center rotate-12 bg-zinc-950/20 backdrop-blur-sm">
                        <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-widest leading-none">APPROVED</span>
                        <span className="text-[6.5px] text-emerald-400/80 font-mono mt-0.5">AVN HOLIDAYS</span>
                      </div>
                    </div>
                  </div>

                  {/* Polaroid 1 (Left floating) */}
                  <div className="absolute left-[0%] top-[12%] w-[120px] h-[150px] bg-zinc-900 border border-white/8 rounded-lg p-2 rotate-[-15deg] shadow-2xl z-20 ch4-polaroid-1 opacity-0 animate-float-slow">
                    <img src="https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=300&q=80" className="w-full h-[76%] object-cover rounded" alt="Maldives" />
                    <span className="text-[7px] text-zinc-400 block text-center mt-1.5 font-serif italic">Maldives Escape</span>
                  </div>

                  {/* Polaroid 2 (Right floating) */}
                  <div className="absolute right-[4%] bottom-[8%] w-[130px] h-[160px] bg-zinc-900 border border-white/8 rounded-lg p-2.5 rotate-[12deg] shadow-2xl z-20 ch4-polaroid-2 opacity-0 animate-float-drift">
                    <img src="https://images.unsplash.com/photo-1595818970664-4be341753c45?auto=format&fit=crop&w=300&q=80" className="w-full h-[76%] object-cover rounded" alt="Kashmir" />
                    <span className="text-[7px] text-zinc-400 block text-center mt-1.5 font-serif italic">Srinagar Valley</span>
                  </div>

                  {/* Polaroid 3 (Top right floating) */}
                  <div className="absolute right-[12%] top-[8%] w-[110px] h-[140px] bg-zinc-900 border border-white/8 rounded-lg p-2 rotate-[-5deg] shadow-2xl z-10 ch4-polaroid-3 opacity-0">
                    <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=300&q=80" className="w-full h-[76%] object-cover rounded" alt="Dubai" />
                    <span className="text-[7px] text-zinc-400 block text-center mt-1.5 font-serif italic">Dubai Skylines</span>
                  </div>
                  
                </div>
              </div>
            </div>

            {/* CHAPTER 5: RETURN HOME & CTA VIRTUAL WALL */}
            <div className="w-screen h-full flex-shrink-0 flex items-center justify-center relative px-16">
              
              {/* Inner container to zoom out/blur */}
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

              {/* Centered CTA Editorial Content Panel (Fades in over zoomed elements) */}
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

                {/* CTAs */}
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

              {/* Floating Luxury Hotel background portal wrapper for transitions */}
              <div className="absolute inset-0 z-[40] pointer-events-none overflow-hidden ch5-hotel-zoom opacity-0 scale-90 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80" 
                  className="w-full h-full object-cover scale-100" 
                  alt="Luxury Hotel Lobby" 
                />
                {/* Dark vignette cover that fades */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80 z-[41] pointer-events-none" />
              </div>

            </div>
          </div>
        </div>

        {/* ====================================================
            MOBILE REBUILT CAROUSEL SWIPER EXPERIENCE
            ==================================================== */}
        <div className="md:hidden w-full h-full flex flex-col items-center justify-center px-6 py-20 relative z-10 select-none">
          
          {/* Header Mobile Badge */}
          <div className="absolute top-10 flex flex-col items-center">
            <span className="text-[9px] tracking-[0.25em] font-bold text-amber-400 uppercase font-sans mb-1 block">
              ✦ Crafted Experiences
            </span>
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-sans block">
              Chapter 0{activeChapterIndex + 1} of 05
            </span>
          </div>

          {/* Swipe Content Cards */}
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

          {/* Swipe Arrow controls & Indicator dots */}
          <div className="flex items-center gap-6 mt-8">
            <button 
              onClick={() => setActiveChapterIndex(prev => Math.max(0, prev - 1))}
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex gap-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <button
                  key={`dot-swipe-${i}`}
                  onClick={() => setActiveChapterIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeChapterIndex ? "w-6 bg-amber-400" : "w-2 bg-white/20"
                  }`}
                />
              ))}
            </div>

            <button 
              onClick={() => setActiveChapterIndex(prev => Math.min(4, prev + 1))}
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </section>

      {/* ====================================================
          SECTION 5: LUXURY HOTELS EXPERIENCE
          ==================================================== */}
      <section 
        ref={hotelsContainerRef}
        className="relative w-full h-screen overflow-hidden bg-black z-20"
      >
        {/* Ambient shift glow backplate for Hotels */}
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-1000 hotel-bg-backplate"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(251,191,36,0.14) 0%, rgba(120,53,4,0.1) 40%, rgba(9,9,11,1) 100%)"
          }}
        />

        {/* Desktop Layout */}
        <div className="hidden md:block w-full h-full relative z-10">
          
          {/* Header Category Tracker and Badge */}
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

          {/* Intro Title Overlay (Scroll-revealed, then fades out) */}
          <div 
            ref={hotelsIntroRef}
            className="absolute inset-0 flex flex-col items-center justify-center text-center z-25 px-6 pointer-events-none"
          >
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

          {/* Multi-layered Scene Viewports */}
          <div ref={hotelsContentRef} className="w-full h-full relative">
            
            {/* SCENE 1: ARRIVAL */}
            <div className="absolute inset-0 w-full h-full hotel-scene-0 transition-transform duration-75 z-[10] flex items-center justify-center">
              {/* Hotel exterior facade with water ripples overlay */}
              <div className="absolute inset-0">
                <img 
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80" 
                  className="w-full h-full object-cover" 
                  alt="Arrival" 
                />
                <div className="absolute inset-0 bg-black/35 z-10 pointer-events-none" />
                
                {/* SVG Moving Water Reflections Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/20 to-transparent opacity-40 z-15 pointer-events-none animate-water-ripple">
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full fill-none stroke-amber-400/10 stroke-[0.3]">
                    <path d="M 0 50 Q 25 45 50 50 T 100 50" />
                    <path d="M 0 60 Q 25 55 50 60 T 100 60" />
                    <path d="M 0 70 Q 25 65 50 70 T 100 70" />
                  </svg>
                </div>
              </div>

              {/* Floating Info panel */}
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

              {/* Arriving luxury element: Coordinates marker */}
              <div className="absolute left-1/4 top-1/3 z-20 bg-zinc-950/80 border border-white/10 rounded-full px-4 py-2 flex items-center gap-2 backdrop-blur-xl animate-float-slow">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[8.5px] uppercase font-bold text-white tracking-widest">8.0066° N, 98.2794° E</span>
              </div>
            </div>

            {/* SCENE 2: LOBBY */}
            <div className="absolute inset-0 w-full h-full hotel-scene-1 transition-transform duration-75 z-[11] flex items-center justify-center pointer-events-none">
              <div className="absolute inset-0">
                <img 
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80" 
                  className="w-full h-full object-cover" 
                  alt="Lobby" 
                />
                <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
                
                {/* Moving light/shadow overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 via-transparent to-black/60 z-15 pointer-events-none" />
              </div>

              {/* Floating Info panel */}
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

            {/* SCENE 3: LUXURY SUITE */}
            <div className="absolute inset-0 w-full h-full hotel-scene-2 transition-transform duration-75 z-[12] flex items-center justify-center pointer-events-none">
              <div className="absolute inset-0">
                <img 
                  src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1920&q=80" 
                  className="w-full h-full object-cover" 
                  alt="Luxury Suite" 
                />
                <div className="absolute inset-0 bg-black/35 z-10 pointer-events-none" />
              </div>

              {/* Gentle swaying curtains overlay in front of windows */}
              <div className="absolute right-0 top-0 h-full w-1/4 bg-white/5 backdrop-blur-[1px] border-l border-white/10 z-15 animate-curtain-sway overflow-hidden">
                <div className="w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              </div>

              {/* Floating Info panel */}
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

            {/* SCENE 4: INFINITY POOL */}
            <div className="absolute inset-0 w-full h-full hotel-scene-3 transition-transform duration-75 z-[13] flex items-center justify-center pointer-events-none">
              <div className="absolute inset-0">
                <img 
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1920&q=80" 
                  className="w-full h-full object-cover" 
                  alt="Infinity Pool" 
                />
                <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none" />
                
                {/* Sunset peachy/violet lighting shift backplate overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-rose-500/10 via-transparent to-purple-900/15 z-15 pointer-events-none" />
              </div>

              {/* Floating Info panel */}
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

            {/* SCENE 5: NIGHT EXPERIENCE & RESERVATION CONSOLE */}
            <div className="absolute inset-0 w-full h-full hotel-scene-4 transition-transform duration-75 z-[14] flex items-center justify-center pointer-events-none">
              <div className="absolute inset-0">
                <img 
                  src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1920&q=80" 
                  className="w-full h-full object-cover" 
                  alt="Night Experience" 
                />
                <div className="absolute inset-0 bg-black/45 z-10 pointer-events-none" />
              </div>

              {/* Floating Luxury Booking Console */}
              <div className="absolute inset-x-6 bottom-16 flex justify-center z-25 pointer-events-auto hotel-booking-console opacity-0">
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
                    {/* Destination */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[7.5px] uppercase tracking-widest text-zinc-500 font-bold">Destination</span>
                      <div className="bg-zinc-950 border border-white/5 p-3 rounded-xl text-[10px] text-white font-semibold">
                        Amanpuri, Phuket
                      </div>
                    </div>
                    
                    {/* Check In */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[7.5px] uppercase tracking-widest text-zinc-500 font-bold">Check-In</span>
                      <div className="bg-zinc-950 border border-white/5 p-3 rounded-xl text-[10px] text-white font-semibold">
                        Oct 12, 2026
                      </div>
                    </div>

                    {/* Check Out */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[7.5px] uppercase tracking-widest text-zinc-500 font-bold">Check-Out</span>
                      <div className="bg-zinc-950 border border-white/5 p-3 rounded-xl text-[10px] text-white font-semibold">
                        Oct 19, 2026
                      </div>
                    </div>

                    {/* Guests */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[7.5px] uppercase tracking-widest text-zinc-500 font-bold">Guests</span>
                      <div className="bg-zinc-950 border border-white/5 p-3 rounded-xl text-[10px] text-white font-semibold">
                        02 Guests
                      </div>
                    </div>

                    {/* Room Type */}
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

            {/* OUTRO PORTAL: CLOUDS ZOOMING IN */}
            <div className="absolute inset-0 z-[45] pointer-events-none overflow-hidden flex items-center justify-center hotel-clouds-outro opacity-0">
              <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?auto=format&fit=crop&w=1920&q=80')"
                }}
              />
              <div className="absolute inset-0 bg-black/45 z-10" />
              {/* Ending Heading */}
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

        {/* ====================================================
            MOBILE REBUILT SWIPE SCENE CAROUSEL
            ==================================================== */}
        <div className="md:hidden w-full h-full flex flex-col items-center justify-center px-6 py-20 relative z-10 select-none">
          
          {/* Header Mobile Tracker */}
          <div className="absolute top-10 flex flex-col items-center">
            <span className="text-[9px] tracking-[0.25em] font-bold text-amber-400 uppercase font-sans mb-1 block">
              ✦ Premium Stays
            </span>
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-sans block">
              Scene 0{activeSceneIndex + 1} of 05
            </span>
          </div>

          {/* Swipe Content Cards */}
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

          {/* Controls */}
          <div className="flex items-center gap-6 mt-8">
            <button 
              onClick={() => setActiveSceneIndex(prev => Math.max(0, prev - 1))}
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex gap-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <button
                  key={`dot-scene-${i}`}
                  onClick={() => setActiveSceneIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeSceneIndex ? "w-6 bg-amber-400" : "w-2 bg-white/20"
                  }`}
                />
              ))}
            </div>

            <button 
              onClick={() => setActiveSceneIndex(prev => Math.min(4, prev + 1))}
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </section>

      {/* ====================================================
          SECTION 6: INTERACTIVE GLOBAL TRAVEL NETWORK
          ==================================================== */}
      <section 
        ref={globeContainerRef}
        className="relative w-full h-screen overflow-hidden bg-black z-20"
      >
        {/* Dynamic Atmospheric background with blinking stars */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-zinc-950 to-black z-0" />
        
        {/* Particle/Stars overlay */}
        <div className="absolute inset-0 bg-stars-blink opacity-45 pointer-events-none z-1 animate-stars-blink" style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }} />

        {/* Dynamic Shifting Aurora Light Glow */}
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

        {/* ====================================================
            DESKTOP INTERACTIVE STORYTELLING GLOBE
            ==================================================== */}
        <div className="hidden md:block w-full h-full relative z-10 select-none">
          
          {/* Header Trackers */}
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

          {/* Intro Title Overlay (Fades out on scroll) */}
          <div 
            ref={globeIntroRef}
            className="absolute inset-0 flex flex-col items-center justify-center text-center z-[25] px-6 pointer-events-none"
          >
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

          {/* Left panel: Live travel insights */}
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

          {/* Right panel: Flight metrics / details */}
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

          {/* Center: The Globe Sphere */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="relative w-[440px] h-[440px] globe-sphere-wrapper scale-100 flex items-center justify-center">
              
              {/* Outer 3D sphere mask element */}
              <div className="relative w-[380px] h-[380px] rounded-full overflow-hidden border border-white/10 bg-zinc-950 shadow-[0_0_80px_rgba(251,191,36,0.15)] flex items-center justify-center">
                
                {/* 3D shading covers */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-white/8 z-20 pointer-events-none" />
                <div className="absolute inset-0 shadow-[inset_-25px_-25px_60px_rgba(0,0,0,0.85),_inset_25px_25px_60px_rgba(255,255,255,0.06)] z-20 pointer-events-none" />
                
                {/* Dotted/Vector world map background track translating horizontally */}
                <div 
                  ref={globeMapRef}
                  className="absolute inset-y-0 left-0 w-[240%] h-full flex flex-row globe-map-wide z-10 pointer-events-none"
                  style={{ willChange: "transform" }}
                >
                  {/* Tiled Vector Earth Outline Map duplicate to simulate loop */}
                  {[0, 1].map((tile) => (
                    <div key={tile} className="w-[120%] h-full relative flex-shrink-0 opacity-45">
                      {/* Dotted grid simulating land */}
                      <div className="absolute inset-0 scale-95 opacity-80" style={{
                        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.08) 1.2px, transparent 1.2px)",
                        backgroundSize: "16px 16px"
                      }} />
                      
                      {/* Standard high-res vector silhouette contours drawn manually */}
                      <svg viewBox="0 0 1000 500" className="absolute inset-0 w-full h-full fill-white/[0.04] stroke-white/5 stroke-[0.5]">
                        {/* Americas */}
                        <path d="M 100 100 Q 150 180 200 240 T 260 480 Q 220 480 180 380 T 120 200 T 80 120 Z" />
                        {/* Eurasia & Africa */}
                        <path d="M 450 120 Q 550 80 750 100 T 900 150 Q 850 350 780 480 Q 620 420 540 380 T 450 120 Z" />
                        <path d="M 480 200 Q 580 250 620 380 Q 480 480 420 350 Z" />
                        {/* Australia */}
                        <path d="M 820 380 Q 880 380 900 440 T 840 460 Z" />
                      </svg>

                      {/* City Marker dots that rotate inside the tiled map */}
                      {/* Paris */}
                      <div className="absolute left-[54%] top-[24%] flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-amber-400 relative z-10" />
                        <span className="absolute w-6 h-6 rounded-full bg-amber-400/30 animate-marker-pulse" />
                        <span className="absolute -top-5 text-[7px] text-white font-bold tracking-widest uppercase bg-black/85 px-1 py-0.5 rounded border border-white/5">Paris</span>
                      </div>

                      {/* Dubai */}
                      <div className="absolute left-[62%] top-[34%] flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-sky-400 relative z-10" />
                        <span className="absolute w-6 h-6 rounded-full bg-sky-400/30 animate-marker-pulse" />
                        <span className="absolute -top-5 text-[7px] text-white font-bold tracking-widest uppercase bg-black/85 px-1 py-0.5 rounded border border-white/5">Dubai</span>
                      </div>

                      {/* Singapore */}
                      <div className="absolute left-[74%] top-[44%] flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 relative z-10" />
                        <span className="absolute w-6 h-6 rounded-full bg-emerald-400/30 animate-marker-pulse" />
                        <span className="absolute -top-5 text-[7px] text-white font-bold tracking-widest uppercase bg-black/85 px-1 py-0.5 rounded border border-white/5">Singapore</span>
                      </div>
                    </div>
                  ))}

                  {/* SVG glowing routes overlay on top of land silhouettes */}
                  <svg className="absolute inset-0 w-full h-full z-15 overflow-visible fill-none stroke-[1.5]">
                    {/* Layer 1: Holiday Packages (Cyan paths) */}
                    <path 
                      d="M 540 120 Q 620 170 740 220" 
                      stroke="rgba(20, 184, 166, 0.7)" 
                      className="globe-path-packages" 
                      style={{ strokeDasharray: "400", strokeDashoffset: "400" }} 
                    />
                    {/* Layer 2: Luxury Hotels (Amber paths) */}
                    <path 
                      d="M 620 170 Q 580 150 540 120" 
                      stroke="rgba(245, 158, 11, 0.7)" 
                      className="globe-path-hotels" 
                      style={{ strokeDasharray: "400", strokeDashoffset: "400" }} 
                    />
                    {/* Layer 3: Corporate (Indigo paths) */}
                    <path 
                      d="M 540 120 Q 740 180 820 380" 
                      stroke="rgba(99, 102, 241, 0.7)" 
                      className="globe-path-corporate" 
                      style={{ strokeDasharray: "400", strokeDashoffset: "400" }} 
                    />
                    {/* Layer 4: Visa (Violet paths) */}
                    <path 
                      d="M 740 220 Q 800 240 820 380" 
                      stroke="rgba(168, 85, 247, 0.7)" 
                      className="globe-path-visa" 
                      style={{ strokeDasharray: "400", strokeDashoffset: "400" }} 
                    />
                    {/* Layer 5: Groups (Rose paths) */}
                    <path 
                      d="M 620 170 Q 700 320 820 380" 
                      stroke="rgba(244, 63, 94, 0.7)" 
                      className="globe-path-groups" 
                      style={{ strokeDasharray: "400", strokeDashoffset: "400" }} 
                    />
                    {/* Layer 6: Car Rentals (Emerald paths) */}
                    <path 
                      d="M 540 120 Q 640 320 740 220" 
                      stroke="rgba(16, 185, 129, 0.7)" 
                      className="globe-path-rentals" 
                      style={{ strokeDasharray: "400", strokeDashoffset: "400" }} 
                    />
                  </svg>

                </div>

              </div>
            </div>
          </div>

          {/* Bottom layout: Statistics bar dashboard */}
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

          {/* Floating Gold Membership Card CTA (Animates in at final scroll progress zoom) */}
          <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none select-none globe-cta-membership opacity-0 scale-75">
            <div className="max-w-md w-full glass-card rounded-[2.5rem] p-8 border border-amber-400/20 shadow-[0_0_80px_rgba(251,191,36,0.1)] text-center flex flex-col items-center pointer-events-auto relative overflow-hidden">
              {/* Golden metallic reflection grid */}
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

              {/* CTAs */}
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

        {/* ====================================================
            MOBILE REBUILT SWIPE SYSTEM EXPERIENCE
            ==================================================== */}
        <div className="md:hidden w-full h-full flex flex-col items-center justify-center px-6 py-20 relative z-10 select-none">
          
          {/* Header tracker */}
          <div className="absolute top-10 flex flex-col items-center">
            <span className="text-[9px] tracking-[0.25em] font-bold text-amber-400 uppercase font-sans mb-1 block">
              ✦ Global Reach
            </span>
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-sans block">
              Layer 0{activeLayerIndex + 1} of 06
            </span>
          </div>

          {/* Swipe Content Cards */}
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

          {/* Swipe Controls */}
          <div className="flex items-center gap-6 mt-8">
            <button 
              onClick={() => setActiveLayerIndex(prev => Math.max(0, prev - 1))}
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex gap-2">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <button
                  key={`dot-lyr-${i}`}
                  onClick={() => setActiveLayerIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeLayerIndex ? "w-6 bg-amber-400" : "w-2 bg-white/20"
                  }`}
                />
              ))}
            </div>

            <button 
              onClick={() => setActiveLayerIndex(prev => Math.min(5, prev + 1))}
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </section>

      {/* ====================================================
          SECTION 7: SUPER SAVER CLUB — LUXURY MEMBERSHIP EXPERIENCE
          ==================================================== */}
      <section 
        ref={clubContainerRef}
        className="relative w-full h-screen overflow-hidden bg-black z-20"
      >
        {/* Dark luxury lighting backplate shift */}
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-1000"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(251,191,36,0.06) 0%, rgba(9,9,11,1) 100%)"
          }}
        />

        {/* Visual portals that crossfade matching activeBenefitIndex */}
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
            style={{
              opacity: i === activeBenefitIndex ? 0.22 : 0
            }}
          >
            <img 
              src={imgUrl} 
              className="w-full h-full object-cover scale-105" 
              alt="Benefit visual background" 
            />
            <div className="absolute inset-0 bg-black/65" />
          </div>
        ))}

        {/* Ambient auroras/starfield overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-950/0 via-zinc-950/20 to-zinc-950 z-[2] pointer-events-none" />

        {/* ====================================================
            DESKTOP MEMBERSHIP UNVEILING LAYOUT
            ==================================================== */}
        <div className="hidden md:block w-full h-full relative z-10 select-none">
          
          {/* Header Trackers */}
          <div className="absolute top-10 left-12 z-30 flex items-center gap-8">
            <span className="text-[10px] tracking-[0.25em] font-semibold text-amber-400 uppercase font-sans flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> Exclusive Membership
            </span>
            <div className="flex gap-2">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <div 
                  key={`ben-dot-${i}`}
                  className={`h-[3px] rounded-full transition-all duration-500 ${
                    i === activeBenefitIndex ? "w-6 bg-amber-400" : "w-2 bg-white/10"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Intro Title Overlay (Fades out on scroll) */}
          <div 
            ref={clubIntroRef}
            className="absolute inset-0 flex flex-col items-center justify-center text-center z-[25] px-6 pointer-events-none"
          >
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

          {/* Left Side: Floating Glass Benefit details (Emerges one by one) */}
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

            {/* Premium count-up statistics overlay */}
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

          {/* Center/Right: Floating Centurion-Style Matte Black Membership Card */}
          <div className="absolute inset-0 flex items-center justify-center z-15 pointer-events-none">
            <div className="relative w-[400px] h-[400px] flex items-center justify-center">
              
              {/* Matte Black Hero Card */}
              <div className="relative w-[340px] h-[210px] club-hero-card rounded-2xl shadow-2xl bg-zinc-950 border border-white/10 z-10 p-6 flex flex-col justify-between overflow-hidden">
                {/* Gold foil metallic reflection shimmer sweep overlay */}
                <div className="absolute inset-0 animate-shimmer-foil pointer-events-none opacity-45 z-0" />
                
                {/* Card Crest Emblem and Header */}
                <div className="flex justify-between items-start relative z-10">
                  <Compass className="w-8 h-8 text-amber-400/80 animate-spin [animation-duration:15s]" />
                  <span className="text-[8.5px] font-mono tracking-[0.25em] text-amber-400 font-bold uppercase">AVN SA SAVER</span>
                </div>

                {/* Embossed gold foil logo text */}
                <div className="my-auto flex flex-col text-left pl-1 relative z-10">
                  <h4 className="text-sm font-sans uppercase font-bold tracking-[0.3em] text-white leading-none">SUPER SAVER</h4>
                  <span className="text-[7px] text-zinc-500 uppercase tracking-[0.25em] mt-1">BLACK MEMERSHIP NO: #AVN-8041926</span>
                </div>

                {/* Bottom card metrics */}
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

          {/* Bottom layout: Material Tiers Swatches (Slides in at final scroll stage) */}
          <div className="absolute inset-x-12 bottom-12 z-20 flex justify-between items-center club-tier-samples opacity-0">
            <div>
              <span className="text-[8px] text-zinc-500 uppercase tracking-widest block mb-0.5">Tier Matrix</span>
              <div className="text-[11px] font-bold text-white uppercase tracking-wider">Interactive material cards</div>
            </div>
            
            <div className="flex gap-8 select-none">
              {/* Silver brushed aluminum */}
              <div 
                onClick={() => setActiveTierIndex(0)}
                className={`w-32 h-20 rounded-xl bg-gradient-to-tr from-zinc-400 via-zinc-200 to-zinc-500 p-3 flex flex-col justify-between text-left cursor-pointer border transition-all duration-300 ${
                  activeTierIndex === 0 ? "scale-105 border-white shadow-xl" : "scale-90 border-white/5 opacity-55 hover:opacity-85"
                }`}
              >
                <span className="text-[8px] font-bold text-zinc-800 uppercase tracking-wider leading-none">Silver</span>
                <span className="text-[7px] text-zinc-900 font-mono mt-auto">BRUSHED ALUM</span>
              </div>

              {/* Gold luxury foil */}
              <div 
                onClick={() => setActiveTierIndex(1)}
                className={`w-32 h-20 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-200 to-amber-700 p-3 flex flex-col justify-between text-left cursor-pointer border transition-all duration-300 ${
                  activeTierIndex === 1 ? "scale-105 border-amber-300 shadow-xl" : "scale-90 border-white/5 opacity-55 hover:opacity-85"
                }`}
              >
                <span className="text-[8px] font-bold text-amber-900 uppercase tracking-wider leading-none">Gold</span>
                <span className="text-[7px] text-amber-950 font-mono mt-auto">LUXURY FOIL</span>
              </div>

              {/* Black matte ceramic */}
              <div 
                onClick={() => setActiveTierIndex(2)}
                className={`w-32 h-20 rounded-xl bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-900 p-3 flex flex-col justify-between text-left cursor-pointer border transition-all duration-300 ${
                  activeTierIndex === 2 ? "scale-105 border-white/30 shadow-2xl" : "scale-90 border-white/5 opacity-55 hover:opacity-85"
                }`}
              >
                <span className="text-[8px] font-bold text-white uppercase tracking-wider leading-none">Black</span>
                <span className="text-[7px] text-zinc-400 font-mono mt-auto">MATTE CERAMIC</span>
              </div>
            </div>
          </div>

          {/* Centered Massive Ending CTA (Fades in over dissolved cards) */}
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

              {/* CTAs */}
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

          {/* Drifting travel photos scatter overlay (outro transition) */}
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
              style={{
                left: `${12 + idx * 13}%`,
                bottom: `${12 + (idx % 2) * 14}%`,
              }}
            >
              <img 
                src={imgUrl} 
                className="w-full h-[80%] object-cover rounded" 
                alt="Drifting memories" 
              />
              <span className="text-[7.5px] text-zinc-500 block text-center mt-2 font-serif italic">
                {[
                  "Ubud, Bali",
                  "Maldives Lagoon",
                  "Swiss Alps Valley",
                  "Sandy Beaches",
                  "Srinagar Lakes",
                  "Dubai Skylines"
                ][idx]}
              </span>
            </div>
          ))}

        </div>

        {/* ====================================================
            MOBILE REBUILT SWIPE SYSTEM EXPERIENCE
            ==================================================== */}
        <div className="md:hidden w-full h-full flex flex-col items-center justify-center px-6 py-20 relative z-10 select-none">
          
          {/* Header tracker */}
          <div className="absolute top-10 flex flex-col items-center">
            <span className="text-[9px] tracking-[0.25em] font-bold text-amber-400 uppercase font-sans mb-1 block">
              ✦ Exclusive Club
            </span>
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-sans block">
              Benefit 0{activeBenefitIndex + 1} of 10
            </span>
          </div>

          {/* Swipe Content Cards */}
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

          {/* Swipe controls */}
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
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeBenefitIndex ? "w-6 bg-amber-400" : "w-2 bg-white/20"
                  }`}
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

      {/* ====================================================
          SECTION 8: TRAVELER STORIES — CINEMATIC SOCIAL PROOF
          ==================================================== */}
      <section
        ref={storiesContainerRef}
        className="relative w-full h-screen overflow-hidden bg-zinc-950 z-20"
      >
        {/* Subtle warm paper background texture */}
        <div className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: "radial-gradient(ellipse at 20% 60%, rgba(251,191,36,0.04) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.015) 0%, transparent 50%), #09090b"
          }}
        />

        {/* ====================================================
            DESKTOP TRAVELER STORIES LAYOUT
            ==================================================== */}
        <div className="hidden md:flex w-full h-full flex-col relative z-10">

          {/* === TOP HEADER === */}
          <div className="stories-header absolute top-12 inset-x-12 flex justify-between items-end z-30 opacity-0">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-amber-400 flex items-center gap-2 mb-3">
                <Heart className="w-3 h-3 fill-amber-400 text-amber-400" /> Traveler Stories
              </span>
              <h2 className="text-4xl md:text-5xl font-sans text-white leading-tight tracking-tight">
                <span className="font-light opacity-90">Real Trips.</span>
                <br />
                <span className="font-serif italic text-amber-400 font-normal">Real Moments.</span>
              </h2>
            </div>
            <p className="text-zinc-500 text-xs leading-relaxed font-light max-w-[320px] text-right">
              5,000+ travelers have chosen AVN Holidays to turn their dream destinations into lived stories. Here are a few of theirs.
            </p>
          </div>

          {/* === MASONRY STORY CARDS GRID === */}
          <div className="absolute inset-x-12 top-[30%] grid grid-cols-4 gap-5 z-20 select-none">
            {[
              {
                name: "Priya Mehta",
                origin: "Mumbai, India",
                dest: "Bali, Indonesia",
                quote: "AVN curated every single detail — the Ubud rice terrace villa, the sunset dinner, even a private healer session. Nothing felt like a package. Everything felt like home.",
                imgUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=500&q=80",
                rating: 5,
                tall: true
              },
              {
                name: "Arjun Sharma",
                origin: "Delhi, India",
                dest: "Zurich, Switzerland",
                quote: "From Zurich to Interlaken, they handled every train, every hotel check-in, every fondue restaurant. I just showed up. Pure bliss.",
                imgUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=500&q=80",
                rating: 5,
                tall: false
              },
              {
                name: "Nadia Al Hassan",
                origin: "Dubai, UAE",
                dest: "Maldives",
                quote: "The overwater bungalow had a glass floor. I watched reef sharks swimming beneath me from my bed. This is exactly why AVN exists.",
                imgUrl: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=500&q=80",
                rating: 5,
                tall: false
              },
              {
                name: "Ravi Kapoor",
                origin: "Bangalore, India",
                dest: "Tokyo, Japan",
                quote: "A family trip with four kids. AVN made it smooth, fun, and insanely memorable. Even the bullet train seats were pre-selected.",
                imgUrl: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=500&q=80",
                rating: 5,
                tall: true
              }
            ].map((story, idx) => (
              <div
                key={`story-card-${idx}`}
                className={`story-card relative bg-zinc-900 rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl group cursor-pointer opacity-0 ${
                  story.tall ? "row-span-2" : ""
                }`}
              >
                <img
                  src={story.imgUrl}
                  alt={`${story.dest} story`}
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="p-5 flex flex-col gap-3">
                  {/* Stars */}
                  <div className="flex gap-0.5">
                    {Array.from({ length: story.rating }).map((_, si) => (
                      <Star key={si} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-zinc-300 text-[11px] leading-relaxed font-light italic">
                    "{story.quote}"
                  </p>
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
                {/* Gold accent corner */}
                <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-amber-400 opacity-70 group-hover:scale-150 transition-transform duration-300" />
              </div>
            ))}
          </div>

          {/* === MARQUEE TESTIMONIALS TICKER === */}
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
                <span key={i} className="text-[10px] text-zinc-500 font-light tracking-widest uppercase shrink-0">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* === BOTTOM STATS BAR === */}
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

        {/* ====================================================
            MOBILE TRAVELER STORIES
            ==================================================== */}
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
              {
                name: "Priya Mehta",
                dest: "Bali, Indonesia",
                quote: "AVN curated every single detail — nothing felt like a package. Everything felt like home.",
                imgUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80"
              },
              {
                name: "Arjun Sharma",
                dest: "Zurich, Switzerland",
                quote: "From Zurich to Interlaken, they handled every train and hotel. I just showed up. Pure bliss.",
                imgUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80"
              },
              {
                name: "Nadia Al Hassan",
                dest: "Maldives",
                quote: "The overwater bungalow had a glass floor. I watched reef sharks from my bed.",
                imgUrl: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=400&q=80"
              }
            ].map((story, idx) => (
              <div
                key={`mob-story-${idx}`}
                className="bg-zinc-900 rounded-[1.5rem] overflow-hidden border border-white/5"
              >
                <img src={story.imgUrl} alt={story.dest} className="w-full h-36 object-cover" />
                <div className="p-4">
                  <div className="flex gap-0.5 mb-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                    ))}
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

      {/* ====================================================
          SECTION 9: CINEMATIC BOOKING EXPERIENCE — FINAL CTA
          ==================================================== */}
      <section
        ref={bookingContainerRef}
        className="relative w-full h-screen overflow-hidden bg-black z-20"
      >
        {/* ── CINEMATIC LANDSCAPE BACKGROUND ── */}
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
          {/* Graduated scrim so console stays legible */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
          {/* Side vignettes */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30" />
        </div>

        {/* ── ANIMATED CLOUDS ── */}
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

        {/* ── ANIMATED AIRPLANE SVG ── */}
        <div className="absolute top-[18%] z-[4] pointer-events-none booking-airplane opacity-0 will-change-transform">
          <Plane className="w-5 h-5 text-white/80 -rotate-[10deg]" />
        </div>

        {/* ── FLOATING ASSURANCE BADGES ── */}
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
            <div
              key={badge.text}
              className="booking-assurance-badge absolute opacity-0"
              style={{ left: badge.x, top: badge.y }}
            >
              <div className="flex items-center gap-1.5 bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                <span className="text-[9px] font-semibold text-white/80 uppercase tracking-widest whitespace-nowrap">{badge.text}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── DESKTOP LAYOUT ── */}
        <div className="hidden md:flex w-full h-full flex-col items-center justify-start pt-16 relative z-10">

          {/* Intro text */}
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

          {/* ── FLOATING LUXURY BOOKING CONSOLE ── */}
          <div
            ref={bookingConsoleRef}
            className="relative w-full max-w-4xl mx-auto px-6 opacity-0"
            style={{ perspective: "1200px" }}
          >
            <div className="relative rounded-[2.5rem] border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.7)] overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                backdropFilter: "blur(40px) saturate(160%)"
              }}
            >
              {/* Glass highlight */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent pointer-events-none" />

              <div className="p-8">
                {/* Console top label */}
                <div className="flex items-center justify-between mb-7">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-amber-400 animate-spin [animation-duration:12s]" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-amber-400">Journey Planner</span>
                  </div>
                  <span className="text-[8px] text-zinc-500 uppercase tracking-wider">AVN Holidays × 2024</span>
                </div>

                {/* ── FORM FIELDS ROW 1 ── */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {/* Destination */}
                  <div className="col-span-1 flex flex-col gap-1.5">
                    <label className="text-[8px] font-bold uppercase tracking-widest text-zinc-500">Destination</label>
                    <div className="relative">
                      <Map className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                      <input
                        type="text"
                        placeholder="Where to?"
                        value={bookingDest}
                        onChange={(e) => setBookingDest(e.target.value)}
                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-8 pr-3 py-3 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400/40 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Travel Dates */}
                  <div className="col-span-1 flex flex-col gap-1.5">
                    <label className="text-[8px] font-bold uppercase tracking-widest text-zinc-500">Travel Dates</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                      <input
                        type="text"
                        placeholder="Choose dates"
                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-8 pr-3 py-3 text-xs text-zinc-600 focus:outline-none focus:border-amber-400/40 transition-colors cursor-pointer"
                        readOnly
                      />
                    </div>
                  </div>

                  {/* Guests */}
                  <div className="col-span-1 flex flex-col gap-1.5">
                    <label className="text-[8px] font-bold uppercase tracking-widest text-zinc-500">Guests</label>
                    <div className="flex items-center bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 gap-3">
                      <Users className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
                      <button
                        onClick={() => setBookingGuests(g => Math.max(1, g - 1))}
                        className="text-zinc-400 hover:text-white text-xs w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0"
                      >−</button>
                      <span className="text-xs text-white font-semibold flex-1 text-center">{bookingGuests}</span>
                      <button
                        onClick={() => setBookingGuests(g => Math.min(20, g + 1))}
                        className="text-zinc-400 hover:text-white text-xs w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0"
                      >+</button>
                    </div>
                  </div>
                </div>

                {/* ── FORM FIELDS ROW 2 ── */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {/* Budget */}
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

                  {/* Accommodation */}
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

                  {/* Special Requests */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[8px] font-bold uppercase tracking-widest text-zinc-500">Special Requests</label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                      <input
                        type="text"
                        placeholder="Anniversary, dietary…"
                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-8 pr-3 py-3 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400/40 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* ── TRAVEL STYLE CHIPS ── */}
                <div className="mb-7">
                  <label className="text-[8px] font-bold uppercase tracking-widest text-zinc-500 block mb-3">Travel Style</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Luxury Escape", "Adventure", "Family Holiday", "Corporate",
                      "Honeymoon", "Wellness", "Road Trip", "Beach", "Cultural", "Cruise"
                    ].map((style, si) => (
                      <button
                        key={`style-${si}`}
                        onClick={() => setActiveStyleIndex(si === activeStyleIndex ? null : si)}
                        className={`booking-style-chip opacity-0 px-3.5 py-1.5 rounded-full text-[9.5px] font-semibold uppercase tracking-wider border transition-all duration-300 ${
                          si === activeStyleIndex
                            ? "bg-amber-400 text-black border-amber-400 shadow-[0_0_16px_rgba(251,191,36,0.35)]"
                            : "bg-white/[0.04] text-zinc-400 border-white/10 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── CTA BUTTONS ── */}
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

        {/* ── ENDING MESSAGE OVERLAY — pure GSAP controlled ── */}
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

        {/* ── MOBILE LAYOUT ── */}
        <div className="md:hidden w-full h-full flex flex-col relative z-10">
          {/* Landscape fills top half */}
          <div className="relative flex-1 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80"
              className="w-full h-full object-cover"
              alt="Mountain landscape"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90" />
            <div className="absolute bottom-6 left-5 right-5">
              <h2 className="text-3xl font-sans text-white leading-tight">
                <span className="font-light">The Next Great</span><br />
                <span className="font-serif italic text-amber-400 font-normal">Story Starts</span><br />
                <span className="font-semibold">With You.</span>
              </h2>
            </div>
          </div>

          {/* Mobile console bottom sheet */}
          <div className="bg-zinc-950 border-t border-white/8 px-5 pt-5 pb-24">
            <div className="flex flex-col gap-3">
              <div className="relative">
                <Map className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Where to?"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-8 pr-3 py-3 text-xs text-white placeholder:text-zinc-600 focus:outline-none"
                />
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
              {/* Style chips */}
              <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
                {["Luxury", "Family", "Adventure", "Honeymoon", "Wellness"].map((s, si) => (
                  <button
                    key={si}
                    onClick={() => setActiveStyleIndex(si === activeStyleIndex ? null : si)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider border transition-all duration-300 ${
                      si === activeStyleIndex
                        ? "bg-amber-400 text-black border-amber-400"
                        : "bg-white/[0.04] text-zinc-400 border-white/10"
                    }`}
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

      {/* ════════════════════════════════════════════════════════════
          FOOTER — THE DESTINATION  (≥120vh cinematic experience)
          ════════════════════════════════════════════════════════════ */}
      <footer
        ref={footerRef}
        onMouseMove={(e) => {
          const r = footerRef.current?.getBoundingClientRect();
          if (r) {
            setFooterMouseX((e.clientX - r.left) / r.width);
            setFooterMouseY((e.clientY - r.top)  / r.height);
          }
        }}
        className="relative w-full min-h-[120vh] overflow-hidden bg-[#060810] z-20 select-none"
      >
        {/* ── DEEP SPACE STARFIELD ── */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {Array.from({ length: 110 }).map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute rounded-full bg-white animate-star-twinkle-footer"
              style={{
                left: `${Math.random() * 100}%`,
                top:  `${Math.random() * 100}%`,
                width: `${Math.random() < 0.12 ? 2 : 1}px`,
                height: `${Math.random() < 0.12 ? 2 : 1}px`,
                animationDelay: `${(i * 0.19).toFixed(2)}s`,
                animationDuration: `${(2.8 + Math.random() * 4).toFixed(1)}s`,
                opacity: Math.random() * 0.5 + 0.1
              }}
            />
          ))}
        </div>

        {/* ── AURORA GRADIENTS ── */}
        <div className="absolute inset-0 pointer-events-none z-1">
          <div className="absolute w-[700px] h-[300px] rounded-full blur-[120px] opacity-10 animate-aurora-footer"
            style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.6) 0%, transparent 70%)", left: "10%", top: "15%" }} />
          <div className="absolute w-[500px] h-[250px] rounded-full blur-[100px] opacity-8 animate-aurora-footer"
            style={{ background: "radial-gradient(ellipse, rgba(20,184,166,0.5) 0%, transparent 70%)", right: "8%", top: "25%", animationDelay: "6s" }} />
          <div className="absolute w-[400px] h-[200px] rounded-full blur-[80px] opacity-12 animate-aurora-footer"
            style={{ background: "radial-gradient(ellipse, rgba(251,191,36,0.35) 0%, transparent 70%)", left: "40%", bottom: "30%", animationDelay: "12s" }} />
        </div>

        {/* ── AMBIENT PARTICLES ── */}
        <div className="absolute inset-0 pointer-events-none z-1">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`fp-${i}`}
              className="absolute w-0.5 h-0.5 rounded-full bg-amber-400/60 animate-particle-drift"
              style={{
                left: `${5 + (i * 4.7) % 90}%`,
                bottom: `${10 + (i * 3.1) % 60}%`,
                "--dx": `${(Math.random() - 0.5) * 60}px`,
                "--dy": `-${60 + Math.random() * 60}px`,
                "--dur": `${6 + Math.random() * 8}s`,
                animationDelay: `${Math.random() * 8}s`
              } as React.CSSProperties}
            />
          ))}
        </div>

        {/* ── SHOOTING STAR EASTER EGG ── */}
        {shootingStarActive && (
          <div className="absolute z-10 pointer-events-none"
            style={{ left: `${10 + Math.random() * 40}%`, top: `${5 + Math.random() * 25}%` }}>
            <div className="h-[1.5px] bg-gradient-to-r from-transparent via-white to-white/10 animate-shooting-star rounded-full" />
          </div>
        )}

        {/* ═══════════════════════════════════════
            DESKTOP FOOTER LAYOUT
            ═══════════════════════════════════════ */}
        <div className="hidden md:block relative z-10 px-14 pt-24 pb-16">

          {/* ── TOP SECTION: Globe + Final Message ── */}
          <div className="flex items-start justify-between gap-16 mb-20">

            {/* LEFT: Editorial final message */}
            <div className="flex-1 max-w-[520px]">
              <span className="text-[8.5px] font-bold uppercase tracking-[0.3em] text-amber-400 flex items-center gap-2 mb-7">
                <Globe className="w-3 h-3" /> AVN Holidays
              </span>
              <h2 className="text-5xl xl:text-6xl font-sans text-white leading-none tracking-tight mb-7">
                <span className="block font-light opacity-90">The World</span>
                <span className="block font-serif italic text-amber-400 font-normal mt-1">Will Always</span>
                <span className="block font-semibold mt-1">Be Waiting.</span>
              </h2>
              <p className="text-zinc-500 text-xs leading-relaxed font-light max-w-[400px]">
                Thank you for letting AVN Holidays become part of your future memories. Wherever your next chapter takes you, we'll be there — quietly ensuring every moment is extraordinary.
              </p>

              {/* ── NEWSLETTER LUXURY INVITATION ── */}
              <div className="mt-10">
                <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 mb-4">
                  Receive Travel Inspiration
                </p>
                <div className="flex gap-3 max-w-sm">
                  <div className="flex-1 relative">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="w-full bg-white/[0.04] border border-white/10 focus:border-amber-400/50 rounded-full px-4 py-3 text-[11px] text-white placeholder:text-zinc-600 outline-none transition-colors backdrop-blur-sm"
                    />
                  </div>
                  <button className="bg-amber-400 hover:bg-amber-300 text-black text-[10px] font-bold uppercase tracking-wider px-5 py-3 rounded-full transition-colors whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* CENTER: Elegant rotating globe */}
            <div className="flex-shrink-0 flex flex-col items-center gap-5">
              {/* Globe sphere */}
              <div className="relative w-[260px] h-[260px] rounded-full overflow-hidden border border-white/8 shadow-[0_0_60px_rgba(99,102,241,0.15),0_0_120px_rgba(251,191,36,0.06)]"
                style={{
                  background: "radial-gradient(circle at 35% 35%, rgba(99,102,241,0.2) 0%, rgba(6,8,16,0.95) 70%)"
                }}
              >
                {/* 3D shading */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-transparent to-white/5 z-20 pointer-events-none" />
                <div className="absolute inset-0 shadow-[inset_-20px_-20px_50px_rgba(0,0,0,0.9),inset_15px_15px_40px_rgba(255,255,255,0.04)] z-20 pointer-events-none" />

                {/* Rotating land map */}
                <div className="absolute inset-y-0 left-0 w-[200%] h-full flex animate-globe-rotate z-10" style={{ willChange: "transform" }}>
                  {[0,1].map(t => (
                    <div key={t} className="w-1/2 h-full relative flex-shrink-0">
                      <div className="absolute inset-0 opacity-30" style={{
                        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
                        backgroundSize: "14px 14px"
                      }} />
                      <svg viewBox="0 0 500 260" className="absolute inset-0 w-full h-full fill-indigo-400/10 stroke-indigo-300/10 stroke-[0.5]">
                        <path d="M50 60 Q90 90 110 140 T130 250 Q100 250 80 180 T50 80 Z" />
                        <path d="M200 50 Q280 30 400 60 T490 90 Q460 200 400 240 Q300 200 240 180 T200 50 Z" />
                        <path d="M230 100 Q280 130 310 200 Q230 240 200 190 Z" />
                        <path d="M420 200 Q450 205 460 230 T430 240 Z" />
                      </svg>
                      {/* City markers */}
                      {[
                        { x: "50%", y: "28%", color: "#FBBF24" }, // Paris
                        { x: "62%", y: "38%", color: "#38BDF8" }, // Dubai
                        { x: "72%", y: "46%", color: "#34D399" }, // Singapore
                        { x: "30%", y: "32%", color: "#F472B6" }, // London
                      ].map((m, mi) => (
                        <div key={mi} className="absolute" style={{ left: m.x, top: m.y }}>
                          <span className="w-1.5 h-1.5 rounded-full block relative z-10" style={{ background: m.color }} />
                          <span className="absolute -inset-1 rounded-full opacity-50 animate-marker-pulse" style={{ background: m.color + "40" }} />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Cloud layer */}
                <div className="absolute inset-y-0 left-0 w-[200%] h-full flex animate-globe-cloud-rotate z-15 opacity-20 pointer-events-none" style={{ willChange: "transform" }}>
                  {[0,1].map(t => (
                    <div key={t} className="w-1/2 h-full relative flex-shrink-0">
                      <div className="absolute inset-0 opacity-60" style={{
                        backgroundImage: "radial-gradient(ellipse 60px 20px, rgba(255,255,255,0.15) 0%, transparent 70%)",
                        backgroundSize: "120px 80px",
                        backgroundPosition: "0 20%, 40px 60%"
                      }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Tiny aircraft orbiting below globe */}
              <div className="relative w-14 h-14 flex items-center justify-center">
                <div className="animate-orbit-dot absolute">
                  <Plane className="w-2.5 h-2.5 text-amber-400/70 -rotate-45" />
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400/30" />
              </div>
            </div>

            {/* RIGHT: Live detail floating widgets */}
            <div className="flex-1 max-w-[280px] flex flex-col gap-3 pt-4">
              <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-zinc-500 mb-1">Live Telemetry</p>

              {[
                { label: "Local Time", value: localTime || "—", icon: Clock },
                { label: "Weather", value: "28°C · Partly Cloudy", icon: CloudSun },
                { label: "Travelers Today", value: "1,248 Active", icon: Users },
                { label: "Countries Connected", value: "45 Nations", icon: Globe },
                { label: "Hotel Partners", value: "850+ Worldwide", icon: Bookmark },
              ].map(({ label, value, icon: Icon }, wi) => (
                <div
                  key={label}
                  className="animate-float-island glass-card rounded-2xl px-4 py-3 flex items-center gap-3"
                  style={{ animationDelay: `${wi * 0.9}s`, animationDuration: `${5 + wi * 0.7}s` }}
                >
                  <Icon className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <div>
                    <div className="text-[8px] text-zinc-600 uppercase tracking-widest leading-none">{label}</div>
                    <div className="text-[11px] text-white font-semibold mt-0.5">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── CONSTELLATION NAVIGATION ── */}
          <div className="relative mb-20">
            <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-zinc-600 mb-8">Explore</p>
            <div className="relative w-full h-32">
              {/* SVG constellation lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 128">
                {[
                  [120, 64, 240, 38],
                  [240, 38, 360, 76],
                  [360, 76, 480, 30],
                  [480, 30, 600, 64],
                  [600, 64, 720, 28],
                  [720, 28, 840, 72],
                  [840, 72, 960, 36],
                  [960, 36, 1080, 68],
                  [1080, 68, 1190, 44],
                  // cross-links
                  [240, 38, 480, 30],
                  [480, 30, 720, 28],
                  [720, 28, 960, 36],
                ].map(([x1,y1,x2,y2], li) => (
                  <line key={li} x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="rgba(251,191,36,0.15)" strokeWidth="0.8"
                    className="animate-constellation-pulse"
                    style={{ animationDelay: `${li * 0.3}s` }}
                  />
                ))}
              </svg>

              {/* Star nodes */}
              {[
                { label: "Home", x: 120, y: 64 },
                { label: "Destinations", x: 240, y: 38 },
                { label: "Hotels", x: 360, y: 76 },
                { label: "Packages", x: 480, y: 30 },
                { label: "Corporate", x: 600, y: 64 },
                { label: "Saver Club", x: 720, y: 28 },
                { label: "About", x: 840, y: 72 },
                { label: "Blog", x: 960, y: 36 },
                { label: "Gallery", x: 1080, y: 68 },
                { label: "Contact", x: 1190, y: 44 },
              ].map(({ label, x, y }, si) => (
                <div
                  key={label}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group"
                  style={{ left: `${(x / 1200) * 100}%`, top: `${(y / 128) * 100}%` }}
                  onMouseEnter={() => setHoveredStar(si)}
                  onMouseLeave={() => setHoveredStar(null)}
                >
                  {/* Star glow */}
                  <div className={`rounded-full bg-amber-400 transition-all duration-300 ${
                    hoveredStar === si
                      ? "w-3.5 h-3.5 shadow-[0_0_14px_rgba(251,191,36,0.8)]"
                      : "w-2 h-2 opacity-60 group-hover:opacity-100 animate-star-twinkle-footer"
                  }`}
                    style={{ animationDelay: `${si * 0.35}s`, animationDuration: `${3 + si * 0.2}s` }}
                  />
                  <span className={`mt-2 text-[7.5px] uppercase tracking-widest transition-all duration-300 ${
                    hoveredStar === si ? "text-amber-400 opacity-100" : "text-zinc-600 opacity-0 group-hover:opacity-100"
                  }`}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── CONTACT ISLANDS + SOCIAL SPHERES ── */}
          <div className="flex justify-between items-end mb-16 gap-8">

            {/* Contact floating islands */}
            <div className="flex gap-4 flex-wrap">
              {[
                { icon: PhoneCall, label: "Phone", val: "+91 98765 43210" },
                { icon: Globe, label: "Email", val: "hello@avnholidays.com" },
                { icon: Map, label: "Office", val: "Mumbai, India" },
                { icon: Clock, label: "Hours", val: "Mon–Sat · 9am–7pm" },
              ].map(({ icon: Icon, label, val }) => (
                <div key={label}
                  className="animate-float-island glass-card rounded-2xl px-5 py-4 flex flex-col gap-1.5 min-w-[150px] cursor-pointer hover:border-white/15 transition-colors"
                  style={{ animationDuration: `${6 + Math.random() * 3}s`, animationDelay: `${Math.random() * 3}s` }}
                >
                  <Icon className="w-3.5 h-3.5 text-amber-400 mb-0.5" />
                  <span className="text-[7.5px] text-zinc-600 uppercase tracking-widest">{label}</span>
                  <span className="text-[10px] text-white font-semibold">{val}</span>
                </div>
              ))}
            </div>

            {/* Social glass spheres */}
            <div className="flex gap-3">
              {[
                { name: "Instagram", color: "#E1306C", char: "IG" },
                { name: "Facebook",  color: "#1877F2", char: "FB" },
                { name: "YouTube",   color: "#FF0000", char: "YT" },
                { name: "LinkedIn",  color: "#0A66C2", char: "LI" },
                { name: "X",         color: "#FFFFFF", char: "X"  },
              ].map(({ name, color, char }, si) => (
                <div key={name}
                  title={name}
                  className="animate-social-float relative w-11 h-11 rounded-full cursor-pointer group"
                  style={{ animationDelay: `${si * 0.6}s` }}
                >
                  <div className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-lg group-hover:border-white/20 group-hover:bg-white/8 transition-all duration-300 flex items-center justify-center overflow-hidden">
                    {/* Glass shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent group-hover:from-white/18 transition-all duration-300" />
                    <span className="text-[8px] font-bold z-10 transition-colors duration-300 group-hover:scale-110 transform" style={{ color }}>{char}</span>
                  </div>
                  {/* Orbit dot on hover */}
                  <div className="absolute inset-0 rounded-full group-hover:block hidden">
                    <div className="animate-orbit-dot absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-1 h-1 rounded-full bg-white/50" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── DIVIDER ── */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/8 to-transparent mb-12" />

          {/* ── BOTTOM: Copyright + Ending ── */}
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[9px] text-zinc-600 leading-relaxed font-light">
                © {new Date().getFullYear()} AVN Holidays. All rights reserved.
              </p>
              <p className="text-[8.5px] text-zinc-700 font-light mt-0.5 italic">
                Crafting unforgettable journeys around the world.
              </p>
            </div>

            <div className="text-right">
              <p className="text-[8px] text-zinc-700 uppercase tracking-widest mb-1">Terms · Privacy · Cookies</p>
              <p className="text-[8.5px] text-zinc-600 font-light italic">Designed with love for wanderers everywhere.</p>
            </div>
          </div>

          {/* ── FINAL ENDING MESSAGE ── */}
          <div className="mt-20 text-center pb-4">
            <div className="inline-flex flex-col items-center gap-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
              <p className="text-[9px] uppercase tracking-[0.4em] text-zinc-600 font-light">
                The Journey Never Ends.
              </p>
              <p className="text-[8.5px] uppercase tracking-[0.3em] text-zinc-700 font-light italic">
                See You Again.
              </p>
              <Compass className="w-4 h-4 text-amber-400/30 animate-spin [animation-duration:20s] mt-1" />
            </div>
          </div>

        </div>

        {/* ═══════════════════════════════════════
            MOBILE FOOTER LAYOUT
            ═══════════════════════════════════════ */}
        <div className="md:hidden relative z-10 px-6 pt-16 pb-24 flex flex-col gap-10">

          {/* Globe + heading */}
          <div className="flex flex-col items-center gap-6 text-center">
            {/* Mini globe */}
            <div className="relative w-44 h-44 rounded-full overflow-hidden border border-white/8 shadow-[0_0_40px_rgba(99,102,241,0.12)]"
              style={{ background: "radial-gradient(circle at 35% 35%, rgba(99,102,241,0.2) 0%, rgba(6,8,16,0.95) 70%)" }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-transparent to-white/5 z-20 pointer-events-none" />
              <div className="absolute inset-y-0 left-0 w-[200%] h-full flex animate-globe-rotate z-10" style={{ willChange: "transform" }}>
                {[0,1].map(t => (
                  <div key={t} className="w-1/2 h-full relative flex-shrink-0">
                    <div className="absolute inset-0 opacity-25" style={{
                      backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
                      backgroundSize: "12px 12px"
                    }} />
                    <svg viewBox="0 0 500 260" className="absolute inset-0 w-full h-full fill-indigo-400/8 stroke-indigo-300/8 stroke-[0.5]">
                      <path d="M50 60 Q90 90 110 140 T130 250 Q100 250 80 180 T50 80 Z" />
                      <path d="M200 50 Q280 30 400 60 T490 90 Q460 200 400 240 Q300 200 240 180 T200 50 Z" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-sans text-white leading-tight">
                <span className="font-light block">The World</span>
                <span className="font-serif italic text-amber-400 font-normal block">Will Always</span>
                <span className="font-semibold block">Be Waiting.</span>
              </h2>
              <p className="text-zinc-500 text-[10px] leading-relaxed font-light mt-4 max-w-[280px] mx-auto">
                Thank you for letting AVN Holidays become part of your future memories.
              </p>
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-3">
            <p className="text-[8.5px] uppercase tracking-widest text-zinc-500 text-center font-bold">Receive Travel Inspiration</p>
            <input
              type="email"
              placeholder="your@email.com"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/10 rounded-full px-4 py-3.5 text-xs text-white placeholder:text-zinc-600 outline-none focus:border-amber-400/40"
            />
            <button className="w-full bg-amber-400 text-black font-bold text-[10px] uppercase tracking-wider py-3.5 rounded-full">Subscribe</button>
          </div>

          {/* Contact tiles */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: PhoneCall, label: "Phone", val: "+91 98765 43210" },
              { icon: Globe,     label: "Email", val: "hello@avnholidays.com" },
              { icon: Map,       label: "Office", val: "Mumbai, India" },
              { icon: Clock,     label: "Hours", val: "Mon–Sat · 9am–7pm" },
            ].map(({ icon: Icon, label, val }) => (
              <div key={label} className="glass-card rounded-2xl p-4 flex flex-col gap-1">
                <Icon className="w-3 h-3 text-amber-400" />
                <span className="text-[7px] text-zinc-600 uppercase tracking-widest">{label}</span>
                <span className="text-[9.5px] text-white font-semibold">{val}</span>
              </div>
            ))}
          </div>

          {/* Social */}
          <div className="flex gap-3 justify-center">
            {[
              { char: "IG", color: "#E1306C" },
              { char: "FB", color: "#1877F2" },
              { char: "YT", color: "#FF0000" },
              { char: "LI", color: "#0A66C2" },
              { char: "X",  color: "#FFFFFF" },
            ].map(({ char, color }) => (
              <div key={char} className="w-10 h-10 rounded-full glass-card border border-white/10 flex items-center justify-center cursor-pointer">
                <span className="text-[9px] font-bold" style={{ color }}>{char}</span>
              </div>
            ))}
          </div>

          {/* Live time */}
          <div className="glass-card rounded-2xl px-5 py-4 flex items-center gap-3">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <div>
              <div className="text-[7.5px] text-zinc-600 uppercase tracking-widest">Local Time</div>
              <div className="text-[11px] text-white font-semibold font-mono">{localTime}</div>
            </div>
          </div>

          {/* Footer copyright */}
          <div className="text-center border-t border-white/5 pt-8 flex flex-col items-center gap-3">
            <Compass className="w-4 h-4 text-amber-400/30 animate-spin [animation-duration:20s]" />
            <p className="text-[8px] text-zinc-700 font-light">
              © {new Date().getFullYear()} AVN Holidays
            </p>
            <p className="text-[7.5px] text-zinc-700 italic font-light">Crafting unforgettable journeys around the world.</p>
            <div className="mt-4 flex flex-col items-center gap-1">
              <p className="text-[8px] uppercase tracking-[0.35em] text-zinc-700">The Journey Never Ends.</p>
              <p className="text-[7.5px] uppercase tracking-[0.3em] text-zinc-800 italic">See You Again.</p>
            </div>
          </div>
        </div>

        {/* ── PREMIUM WHATSAPP FLOATING ORB ── */}
        <div className="fixed bottom-24 right-6 z-[60] md:bottom-8 md:right-8 flex flex-col items-end gap-2 group">
          {/* Tooltip */}
          <div className="hidden md:flex items-center gap-2 bg-zinc-900 border border-white/10 rounded-full px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mb-1 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[8.5px] text-white/80 font-medium whitespace-nowrap">Travel Expert Online</span>
          </div>
          {/* Orb */}
          <div className="relative cursor-pointer">
            {/* Ripple rings */}
            <div className="absolute inset-0 rounded-full bg-green-400/25 animate-whatsapp-ripple" />
            <div className="absolute inset-0 rounded-full bg-green-400/15 animate-whatsapp-ripple" style={{ animationDelay: "0.7s" }} />
            {/* Glass sphere */}
            <div className="relative w-14 h-14 rounded-full flex items-center justify-center border border-white/15 shadow-[0_8px_32px_rgba(37,211,102,0.25)] hover:shadow-[0_12px_40px_rgba(37,211,102,0.4)] transition-shadow duration-300"
              style={{ background: "linear-gradient(135deg, rgba(37,211,102,0.85), rgba(18,140,66,0.9))" }}>
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 via-transparent to-transparent pointer-events-none" />
              {/* WhatsApp SVG icon */}
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white relative z-10">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
          </div>
        </div>

      </footer>

    </div>
  );
}
