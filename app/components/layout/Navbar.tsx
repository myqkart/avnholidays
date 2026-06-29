"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Menu, X } from "lucide-react";
import { MagneticButton } from "../ui/MagneticButton";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header 
        id="main-navbar"
        className="fixed top-6 left-1/2 z-[50] w-[90%] max-w-5xl rounded-full bg-white/[0.03] backdrop-blur-[20px] px-6 py-3.5 flex items-center justify-between border border-white/8 shadow-2xl pointer-events-auto"
        style={{ transform: "translateX(-50%)" }}
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
    </>
  );
}
