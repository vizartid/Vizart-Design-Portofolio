import { Leaf } from "lucide-react";
import { FaTwitter, FaLinkedin, FaInstagram, FaDribbble } from "react-icons/fa";
import { useContent } from "@/hooks/use-content";

export default function Footer() {
  const { data: content } = useContent();

  return (
    <footer className="bg-bone-white py-8 sm:py-12 relative">
      {/* Logo positioned at the top */}
      <div className="flex justify-center mb-8">
        <img
          src="/Vizart-studio.png"
          alt="Vizart Studio"
          className="h-25 object-contain"
        />
      </div>

      {/* Full width border line below logo */}
      <div className="border-t-2 border-gray-200"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="text-center pt-8">
            {/* Description */}
            <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto mb-10">
              We commit fully to every project, delivering top-quality
              <br />
              design that reflects your vision.
            </p>

            {/* CTA Button with profile image */}
            <div className="flex justify-center mb-4">
              <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors duration-200 flex items-center justify-center space-x-3">
                <img
                  src="/b48f5cac-0dd9-4e94-b48a-682921628c0b.jpg"
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span>Book a Call</span>
              </button>
            </div>

            {/* Contact Info */}
            <p className="text-gray-600 text-sm mb-6">
              or Email us at vizartstudio37@gmail.com
            </p>

            </div>
      </div>

      {/* Full width border line above navigation */}
      <div className="border-t-2 border-gray-200"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Links - Home and Works */}
        <div className="flex justify-center space-x-8 text-gray-600 pt-2">
          <a
            href="/"
            className="hover:text-charcoal transition-colors text-sm font-medium"
          >
            Home
          </a>
          <a
            href="/works"
            className="hover:text-charcoal transition-colors text-sm font-medium"
          >
            Works
          </a>
        </div>
      </div>
    </footer>
  );
}
