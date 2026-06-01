import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

// ============================================================================
// Footer Component - Only displayed on Home page
// ============================================================================

export default function Footer(): JSX.Element {
  return (
    <footer className="py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          {/* Logo */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <img 
              src="/Mavent-logo.png" 
              alt="Mavent Logo" 
              className="h-12 sm:h-14 lg:h-16 object-contain" 
              loading="lazy"
            />
          </div>

          <div className="border-t-2 border-gray-200 pt-6 sm:pt-8">
            {/* Description */}
            <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-8 lg:mb-10 text-sm sm:text-base px-2">
              Saya berkomitmen penuh pada setiap proyek, menghadirkan karya berkualitas tinggi
              <span className="hidden sm:inline"><br /></span>
              <span className="sm:hidden"> </span>
              yang mencerminkan visi dan tujuan Anda.
            </p>

            {/* CTA Button */}
            <div className="flex justify-center mb-3 sm:mb-4">
              <button className="bg-black text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors duration-200 flex items-center justify-center space-x-2 sm:space-x-3 text-sm sm:text-base">
                <img 
                  src="/Mavent-white.png" 
                  alt="Mavent Icon" 
                  className="w-4 h-4 sm:w-5 sm:h-5 object-contain" 
                />
                <span>Book a Call</span>
              </button>
            </div>

            {/* Contact Info */}
            <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6">
              or reach me at{' '}
              <a 
                href="mailto:mavent.id@gmail.com" 
                className="hover:text-gray-900 transition-colors underline"
              >
                mavent.id@gmail.com
              </a>
            </p>

            {/* Social Links */}
            <div className="flex justify-center gap-4 sm:gap-5 mb-6 sm:mb-8">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-gray-700 transition-colors p-2"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5 sm:w-5 sm:h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-blue-600 transition-colors p-2"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5 sm:w-5 sm:h-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-pink-500 transition-colors p-2"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5 sm:w-5 sm:h-5" />
              </a>
            </div>

            {/* Bottom Navigation & Copyright */}
            <div className="border-t-2 border-gray-200 pt-4 sm:pt-6">
              <nav className="flex justify-center flex-wrap gap-4 sm:gap-6 lg:gap-8 text-gray-600 mb-3 sm:mb-4">
                <a 
                  href="/" 
                  className="hover:text-charcoal transition-colors text-xs sm:text-sm font-medium"
                >
                  Home
                </a>
                <a 
                  href="/about" 
                  className="hover:text-charcoal transition-colors text-xs sm:text-sm font-medium"
                >
                  About
                </a>
                <a 
                  href="/works" 
                  className="hover:text-charcoal transition-colors text-xs sm:text-sm font-medium"
                >
                  Works
                </a>
              </nav>
              <p className="text-gray-400 text-[10px] sm:text-xs">
                2025 Muhammad Yusuf Aditiya. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
