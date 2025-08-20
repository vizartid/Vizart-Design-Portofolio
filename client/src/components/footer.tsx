
import { Leaf } from "lucide-react";
import { FaTwitter, FaLinkedin, FaInstagram, FaDribbble } from "react-icons/fa";
import { useContent } from "@/hooks/use-content";

export default function Footer() {
  const { data: content } = useContent();

  return (
    <footer className="bg-bone-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Single continuous border line */}
        <div className="border-t-2 border-gray-200 pt-8 mb-8"></div>
        
        {/* Main footer content */}
        <div className="text-center space-y-6">
          {/* Logo */}
          <div className="flex justify-center">
            <img
              src="/Vizart-studio.png"
              alt="Vizart Studio"
              className="h-16 object-contain"
            />
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
            We commit fully to every project, delivering top-quality
            design that reflects your vision.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center">
            <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors duration-200">
              Book a Call
            </button>
          </div>

          {/* Contact Info */}
          <p className="text-gray-600 text-sm">
            or Email us at vizartstudio37@gmail.com
          </p>

          {/* Navigation Links */}
          <div className="flex justify-center space-x-8 text-gray-600">
            <a href="#" className="hover:text-charcoal transition-colors text-sm">
              Home
            </a>
            <a href="#" className="hover:text-charcoal transition-colors text-sm">
              Works
            </a>
          </div>
        </div>

        {/* Bottom section with copyright and social media */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 mt-8 border-t-2 border-gray-200">
          <p className="text-gray-600 text-sm mb-4 sm:mb-0 text-center sm:text-left">
            © 2025 Vizart Studio. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-600 hover:text-charcoal transition-colors"
            >
              <FaTwitter className="text-xl" />
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-charcoal transition-colors"
            >
              <FaLinkedin className="text-xl" />
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-charcoal transition-colors"
            >
              <FaInstagram className="text-xl" />
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-charcoal transition-colors"
            >
              <FaDribbble className="text-xl" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
