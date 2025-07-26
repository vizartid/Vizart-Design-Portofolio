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
  const { data: content } = useContent();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Handle navbar visibility
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      // Handle navbar size/styling changes
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-sm" 
          : "bg-white border-b border-gray-200/30"
      } ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-500 ease-in-out ${
          isScrolled ? "h-14 lg:h-16" : "h-16 lg:h-20"
        }`}>
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
                <span className={`font-poppins font-semibold transition-all duration-500 ease-in-out ${
                  isScrolled ? "text-lg lg:text-xl" : "text-xl lg:desktop-text-xl"
                }`}>
                  {content?.branding?.logoText || "Vizart"}
                </span>
              </>
            ) : (
              <>
                <Leaf className={`text-electric-blue lucide-glow transition-all duration-500 ease-in-out ${
                  isScrolled ? "text-lg lg:text-xl" : "text-xl lg:text-2xl"
                }`} />
                <span className={`font-poppins font-semibold transition-all duration-500 ease-in-out ${
                  isScrolled ? "text-lg lg:text-xl" : "text-xl lg:desktop-text-xl"
                }`}>
                  {content?.branding?.logoText || "Vizart"}
                </span>
              </>
            )}
          </Link>

          {/* Central Navigation (Desktop) */}
          <div className={`hidden md:flex bg-light-gray rounded-md transition-all duration-500 ease-in-out ${
            isScrolled ? "p-1" : "p-1 lg:p-2"
          }`}>
            <Link href="/">
              <button
                className={`rounded-xl font-medium transition-all duration-500 ease-in-out ${
                  isScrolled 
                    ? "px-4 py-2 text-base" 
                    : "px-6 py-2 lg:px-8 lg:py-3 lg:desktop-text-xl"
                } ${
                  location === "/"
                    ? "bg-white shadow-sm text-charcoal"
                    : "text-gray-600 hover:text-charcoal"
                }`}
              >
                Home
              </button>
            </Link>
            <Link href="/works">
              <button
                className={`rounded-xl font-medium transition-all duration-500 ease-in-out ${
                  isScrolled 
                    ? "px-4 py-2 text-base" 
                    : "px-6 py-2 lg:px-8 lg:py-3 lg:desktop-text-xl"
                } ${
                  location === "/works"
                    ? "bg-white shadow-sm text-charcoal"
                    : "text-gray-600 hover:text-charcoal"
                }`}
              >
                Works
              </button>
            </Link>
            <Link href="/tools-editor">
              <button
                className={`rounded-xl font-medium transition-all duration-500 ease-in-out ${
                  isScrolled 
                    ? "px-4 py-2 text-base" 
                    : "px-6 py-2 lg:px-8 lg:py-3 lg:desktop-text-xl"
                } ${
                  location === "/tools-editor"
                    ? "bg-white shadow-sm text-charcoal"
                    : "text-gray-600 hover:text-charcoal"
                }`}
              >
                Tools Editor
              </button>
            </Link>
          </div>

          {/* CTA Button (Desktop) */}
          <div className="hidden md:block">
            <button className={`bg-charcoal text-white rounded-xl font-medium hover:bg-gray-800 transition-all duration-500 ease-in-out flex items-center space-x-2 ${
              isScrolled 
                ? "px-4 py-2 text-base" 
                : "px-6 py-2 lg:px-8 lg:py-3 lg:desktop-text-xl"
            }`}>
              <img
                src={b48f5cac_0dd9_4e94_b48a_682921628c0b}
                alt="Profile"
                className={`rounded-full object-cover transition-all duration-500 ease-in-out ${
                  isScrolled ? "w-5 h-5" : "w-6 h-6 lg:w-8 lg:h-8"
                }`}
              />
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
            <Link href="/tools-editor" onClick={() => setIsMenuOpen(false)}>
              <span className="block text-gray-600 font-medium">Tools Editor</span>
            </Link>
            <button className="w-full bg-charcoal text-white py-2 rounded-md font-medium mt-4 flex items-center justify-center space-x-2">
              <img
                src="/profile-foto.png"
                alt="Profile"
                className="w-6 h-6 rounded-full object-cover"
              />
              <span>Book a Call</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
