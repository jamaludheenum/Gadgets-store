import React from 'react';
import { Link } from 'react-router-dom'; // 1. Import Link for smooth navigation
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Github, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B0B0F] border-t border-white/5 pt-20 pb-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
          
          {/* 1. BRAND & SOCIAL MEDIA */}
          <div className="space-y-8">
            <Link to="/"> {/* Logo links back to Home */}
              <h2 className="text-3xl font-bold text-white tracking-tighter uppercase">
                Tech<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Nova</span>
              </h2>
            </Link>
            <div className="space-y-4">
               <h3 className="text-white font-bold uppercase text-[10px] tracking-[0.3em]">Follow Us</h3>
               <div className="flex gap-4">
                {[Facebook, Instagram, Twitter, Github].map((Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ y: -3, scale: 1.1 }}
                    className="w-10 h-10 rounded-xl bg-[#16161D] border border-white/5 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* 2. QUICK LINKS - NOW WITH REAL PATHS */}
          <div>
            <h3 className="text-white font-bold mb-8 uppercase text-xs tracking-[0.2em]">Quick Links</h3>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition-colors inline-block">Home</Link>
              </li>
              <li>
                {/* Point this to your main products page or section */}
                <Link to="/products" className="hover:text-cyan-400 transition-colors inline-block">Products</Link>
              </li>
              <li>
                {/* This could point to a specific category page or your store */}
                <Link to="/categories" className="hover:text-cyan-400 transition-colors inline-block">Categories</Link>
              </li>
            </ul>
          </div>

          {/* 3. CONTACT US */}
          <div>
            <h3 className="text-white font-bold mb-8 uppercase text-xs tracking-[0.2em]">Contact Us</h3>
            <ul className="space-y-5 text-gray-500 text-sm font-light">
              <li className="flex items-start gap-4">
                <MapPin size={18} className="text-cyan-500 shrink-0" />
                <span className="leading-relaxed">2049 Neon Blvd, Night City, Sector 7</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={18} className="text-cyan-500 shrink-0" />
                <span>+1 (555) TECH-NOVA</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={18} className="text-purple-500 shrink-0" />
                <span>support@technova.io</span>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM LEGAL BAR */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-600 text-[10px] uppercase tracking-widest font-medium">
            © {currentYear} TechNova Gear. All rights reserved.
          </p>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;