import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useContent } from "@/hooks/use-content";

export default function Navbar() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | "none">("none");
  const [isAtTop, setIsAtTop] = useState(true);
  const { data: content } = useContent();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = currentScrollY - lastScrollY;

      if (Math.abs(scrollDiff) > 5) {
        if (scrollDiff > 0) setScrollDirection("down");
        else setScrollDirection("up");
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) setIsVisible(false);
      else setIsVisible(true);

      if (currentScrollY > 30) setIsScrolled(true);
      else setIsScrolled(false);

      setIsAtTop(currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };

    const throttledHandleScroll = () => requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/works", label: "Works" },
  ];

  return (
    <nav
      className={`fixed top-4 w-full z-50 ${
        isAtTop && scrollDirection === "down" && !isVisible
          ? "transition-none"
          : "transition-all duration-700 ease-out"
      } ${isVisible ? "translate-y-0" : "-translate-y-[120%]"} ${isScrolled ? "pt-3 px-3 lg:pt-4 lg:px-4" : ""}`}
    >
      <div
        className={`transition-all duration-700 ease-out transform ${
          isScrolled
            ? "max-w-6xl mx-auto bg-white/95 backdrop-blur-md border border-gray-200/60 shadow-xl rounded-2xl scale-100"
            : "w-full bg-transparent scale-100"
        } ${scrollDirection === "up" && isScrolled ? "scale-100" : ""} ${scrollDirection === "down" && isScrolled ? "scale-95" : ""}`}
      >
        <div className={`transition-all duration-700 ease-out max-w-7xl mx-auto ${isScrolled ? "px-8 sm:px-10 lg:px-12" : "px-4 sm:px-6 lg:px-8"}`}>
          <div className={`flex justify-between items-center transition-all duration-700 ease-out ${isScrolled ? "h-12 lg:h-14 py-2" : "h-16 lg:h-20 py-3 lg:py-4"}`}>
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              {content?.branding?.logoUrl && (
                <>
                  <img
                    src={content.branding.logoUrl}
                    alt="Logo"
                    className={`object-contain transition-all duration-500 ease-in-out ${isScrolled ? "h-4 lg:h-8" : "h-8 lg:h-10"}`}
                  />
                  <span className={`font-poppins font-semibold transition-all duration-500 ease-in-out ${isScrolled ? "text-lg lg:text-xl" : "text-xl lg:desktop-text-xl"}`}>
                    {content?.branding?.logoText || "Vizart"}
                  </span>
                </>
              )}
              {!content?.branding?.logoUrl && (
                <span className={`font-poppins font-semibold transition-all duration-700 ease-out ${isScrolled ? "text-base lg:text-lg" : "text-xl lg:desktop-text-xl"}`}>
                  {content?.branding?.logoText || "Vizart"}
                </span>
              )}
            </Link>

            {/* Central Navigation (Desktop) */}
            <div
              className={`hidden md:flex rounded-xl transition-all duration-700 ease-out ${isScrolled ? "p-1.5" : "p-1 lg:p-2"}`}
              style={{ backgroundColor: "#e6e6e6" }}
            >
              {navLinks.map(({ href, label }) => (
                <Link key={href} href={href}>
                  <button
                    className={`rounded-xl font-medium transition-all duration-700 ease-out ${
                      isScrolled
                        ? "px-4 py-2 text-base lg:px-5 lg:py-2.5 lg:text-lg"
                        : "px-6 py-2 lg:px-8 lg:py-3 lg:desktop-text-xl"
                    } ${
                      location === href
                        ? "bg-white shadow-sm text-charcoal"
                        : "text-gray-600 hover:text-charcoal hover:bg-white/50"
                    }`}
                  >
                    {label}
                  </button>
                </Link>
              ))}
            </div>

            {/* CTA Button (Desktop) */}
            <div className="hidden md:block">
              <button
                className={`bg-black text-white rounded-xl font-medium hover:bg-gray-900 transition-all duration-700 ease-out ${
                  isScrolled
                    ? "px-4 py-2 text-base lg:px-5 lg:py-2.5 lg:text-lg"
                    : "px-6 py-2 lg:px-8 lg:py-3 lg:desktop-text-xl"
                }`}
              >
                <span>Book a Call</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/60 shadow-lg">
          <div className="px-6 py-8 space-y-2">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setIsMenuOpen(false)}>
                <span className="block text-charcoal font-medium text-lg py-3 border-b border-gray-100 last:border-b-0">
                  {label}
                </span>
              </Link>
            ))}
            <button className="w-full bg-black text-white py-4 px-6 rounded-xl font-medium text-lg mt-6 hover:bg-gray-900 transition-colors">
              <span>Book a Call</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
