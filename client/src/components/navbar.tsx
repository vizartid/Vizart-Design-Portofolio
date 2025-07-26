import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Leaf, Menu, X } from "lucide-react";
import { useContent } from "@/hooks/use-content";

import b48f5cac_0dd9_4e94_b48a_682921628c0b from "@assets/b48f5cac-0dd9-4e94-b48a-682921628c0b.jpg";

export default function Navbar() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<
    "up" | "down" | "none"
  >("none");
  const { data: content } = useContent();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = currentScrollY - lastScrollY;

      // Determine scroll direction
      if (Math.abs(scrollDiff) > 5) {
        // Threshold to avoid jitter
        if (scrollDiff > 0) {
          setScrollDirection("down");
        } else {
          setScrollDirection("up");
        }
      }

      // Handle navbar visibility with improved logic
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      // Handle navbar styling changes with smoother threshold
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      setLastScrollY(currentScrollY);
    };

    const throttledHandleScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-700 ease-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${isScrolled ? "pt-3 px-3 lg:pt-4 lg:px-4" : "pt-4 px-4"}`}
    >
      <div
        className={`transition-all duration-700 ease-out max-w-5xl mx-auto ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border border-gray-200/60 shadow-xl rounded-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 py-3">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              {content?.branding?.logoUrl ? (
                <>
                  <img
                    src={content.branding.logoUrl}
                    alt="Logo"
                    className={`object-contain transition-all duration-500 ease-in-out ${
                      isScrolled ? "h-6 lg:h-8" : "h-8 lg:h-10"
                    }`}
                  />
                  <span
                    className={`font-poppins font-semibold transition-all duration-500 ease-in-out ${
                      isScrolled
                        ? "text-lg lg:text-xl"
                        : "text-xl lg:desktop-text-xl"
                    }`}
                  >
                    {content?.branding?.logoText || "Vizart"}
                  </span>
                </>
              ) : (
                <>
                  <Leaf className="w-6 h-6 text-electric-blue lucide-glow" />
                  <span className="font-poppins font-semibold text-lg">
                    {content?.branding?.logoText || "Vizart"}
                  </span>
                </>
              )}
            </Link>

            {/* Central Navigation (Desktop) */}
            <div
              className={`hidden md:flex rounded-xl p-1.5 transition-all duration-700 ease-out ${
                isScrolled
                  ? "bg-light-gray"
                  : "bg-light-gray/80 backdrop-blur-sm"
              }`}
            >
              <Link href="/">
                <button
                  className={`rounded-xl font-medium px-5 py-2 text-base transition-all duration-700 ease-out ${
                    location === "/"
                      ? "bg-light-gray shadow-sm text-charcoal"
                      : "text-gray-600 hover:text-charcoal hover:bg-white/50"
                  }`}
                >
                  Home
                </button>
              </Link>
              <Link href="/works">
                <button
                  className={`rounded-xl font-medium px-5 py-2 text-base transition-all duration-700 ease-out ${
                    location === "/works"
                      ? "bg-light-gray shadow-sm text-charcoal"
                      : "text-gray-600 hover:text-charcoal hover:bg-white/50"
                  }`}
                >
                  Works
                </button>
              </Link>
            </div>

            {/* CTA Button (Desktop) */}
            <div className="hidden md:block">
              <button className="bg-charcoal text-white rounded-xl font-medium hover:bg-gray-800 transition-colors duration-200 px-5 py-2 text-base">
                <span>Book a Call</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="text-xl lucide-glow" />
              ) : (
                <Menu className="text-xl lucide-glow" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-bone-white border-t border-gray-200">
          <div className="px-4 py-6 space-y-4">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <span className="block text-charcoal font-medium">Home</span>
            </Link>
            <Link href="/works" onClick={() => setIsMenuOpen(false)}>
              <span className="block text-gray-600 font-medium">Works</span>
            </Link>
            <button className="w-full bg-charcoal text-white py-2 rounded-md font-medium mt-4">
              <span>Book a Call</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
