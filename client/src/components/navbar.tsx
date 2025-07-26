import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Leaf, Menu, X } from "lucide-react";
import { useContent } from "@/hooks/use-content";

import b48f5cac_0dd9_4e94_b48a_682921628c0b from "@assets/b48f5cac-0dd9-4e94-b48a-682921628c0b.jpg";

export default function Navbar() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { data: content } = useContent();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 bg-bone-white/95 backdrop-blur-sm border-b border-gray-200/50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            {content?.branding?.logoUrl ? (
              <>
                <img
                  src={content.branding.logoUrl}
                  alt="Logo"
                  className="h-8 lg:h-10 object-contain"
                />
                <span className="font-poppins font-semibold text-xl lg:desktop-text-xl">
                  {content?.branding?.logoText || "Vizart"}
                </span>
              </>
            ) : (
              <>
                <Leaf className="text-electric-blue text-xl lg:text-2xl lucide-glow" />
                <span className="font-poppins font-semibold text-xl lg:desktop-text-xl">
                  {content?.branding?.logoText || "Vizart"}
                </span>
              </>
            )}
          </Link>

          {/* Central Navigation (Desktop) */}
          <div className="hidden md:flex bg-light-gray rounded-md p-1 lg:p-2">
            <Link href="/">
              <button
                className={`px-6 py-2 lg:px-8 lg:py-3 rounded-xl font-medium lg:desktop-text-xl transition-all duration-200 ${
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
                className={`px-6 py-2 lg:px-8 lg:py-3 rounded-xl font-medium lg:desktop-text-xl transition-all duration-200 ${
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
                className={`px-6 py-2 lg:px-8 lg:py-3 rounded-xl font-medium lg:desktop-text-xl transition-all duration-200 ${
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
            <button className="bg-charcoal text-white px-6 py-2 lg:px-8 lg:py-3 rounded-xl font-medium lg:desktop-text-xl hover:bg-gray-800 transition-colors duration-200 flex items-center space-x-2">
              <img
                src={b48f5cac_0dd9_4e94_b48a_682921628c0b}
                alt="Profile"
                className="w-6 h-6 lg:w-8 lg:h-8 rounded-full object-cover"
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
