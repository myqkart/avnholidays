import dynamic from "next/dynamic";
import { SmoothScroll } from "./components/layout/SmoothScroll";
import { Hero } from "./components/sections/Hero";

// Lazy load sections below the fold to improve initial bundle size
const Destinations = dynamic(() => import("./components/sections/Destinations").then(mod => mod.Destinations));
const Packages = dynamic(() => import("./components/sections/Packages").then(mod => mod.Packages));
const Journey = dynamic(() => import("./components/sections/Journey").then(mod => mod.Journey));
const Hotels = dynamic(() => import("./components/sections/Hotels").then(mod => mod.Hotels));
const GlobalNetwork = dynamic(() => import("./components/sections/GlobalNetwork").then(mod => mod.GlobalNetwork));
const SaverClub = dynamic(() => import("./components/sections/SaverClub").then(mod => mod.SaverClub));
const TravelerStories = dynamic(() => import("./components/sections/TravelerStories").then(mod => mod.TravelerStories));
const Booking = dynamic(() => import("./components/sections/Booking").then(mod => mod.Booking));
const Footer = dynamic(() => import("./components/layout/Footer").then(mod => mod.Footer));

export default function Home() {
  return (
    <div className="relative w-full bg-black text-white selection:bg-amber-500/20 selection:text-amber-200">
      <SmoothScroll>
        <Hero />
        <Destinations />
        <Packages />
        <Journey />
        <Hotels />
        <GlobalNetwork />
        <SaverClub />
        <TravelerStories />
        <Booking />
        <Footer />
      </SmoothScroll>
    </div>
  );
}
