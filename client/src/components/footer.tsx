import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { useContent } from "@/hooks/use-content";

export default function Footer() {
  const { data: content } = useContent();

  return (
    <footer className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src="/Mavent-black.png" alt="Logo" className="h-16 object-contain" />
          </div>

          <div className="border-t-2 border-gray-200 pt-8">
            {/* Description */}
            <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto mb-10">
              Saya berkomitmen penuh pada setiap proyek, menghadirkan karya berkualitas tinggi
              <br />
              yang mencerminkan visi dan tujuan Anda.
            </p>

            {/* CTA Button */}
            <div className="flex justify-center mb-4">
              <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors duration-200 flex items-center justify-center space-x-3">
                <img src="/Mavent-white.png" alt="Logo" className="w-5 h-5 object-contain" />
                <span>Book a Call</span>
              </button>
            </div>

            {/* Contact Info */}
            <p className="text-gray-600 text-sm mb-6">
              or reach me at rizky@example.com
            </p>

            {/* Social links */}
            <div className="flex justify-center gap-5 mb-8">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-700 transition-colors">
                <FaGithub className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>

            <div className="border-t-2 border-gray-200 pt-6">
              <div className="flex justify-center space-x-8 text-gray-600 mb-4">
                <a href="/" className="hover:text-charcoal transition-colors text-sm font-medium">Home</a>
                <a href="/about" className="hover:text-charcoal transition-colors text-sm font-medium">About</a>
                <a href="/works" className="hover:text-charcoal transition-colors text-sm font-medium">Works</a>
              </div>
              <p className="text-gray-400 text-xs">
                © 2025 Rizky Pratama. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
