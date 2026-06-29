export interface Destination {
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

export const DESTINATIONS: Destination[] = [
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

export interface TourPackage {
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

export const PACKAGES: TourPackage[] = [
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

export const getImageMaskClass = (index: number) => {
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
