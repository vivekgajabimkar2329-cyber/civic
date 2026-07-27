import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Heart } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="w-full">
      {/* Newsletter Banner */}
      <div className="bg-[#00897b] text-white py-6">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold tracking-tight">Stay Updated with Civic AI</h3>
              <p className="text-teal-100 text-sm mt-1">Subscribe to our newsletter for the latest updates, news and announcements.</p>
            </div>
            <div className="flex w-full md:w-auto max-w-md">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 px-4 py-2.5 rounded-l-md text-slate-900 text-sm focus:outline-none"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-r-md font-semibold text-sm transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-[#0a192f] text-slate-300 py-16 border-t border-slate-800">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
            
            {/* Brand Column (takes 2 cols) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                   <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                     <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                   </svg>
                </div>
                <span className="font-bold text-xl text-white tracking-tight">
                  Civic <span className="text-blue-500">AI</span>
                </span>
              </div>
              <div className="space-y-1">
                 <p className="text-xs font-semibold text-white">Smart Governance,</p>
                 <p className="text-xs font-semibold text-white">Stronger Communities.</p>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
                Civic AI is an AI-powered platform designed to make governance smarter, faster and more transparent.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-colors">
                  <FaFacebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-colors">
                  <FaTwitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-colors">
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-colors">
                  <FaLinkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h4 className="text-white font-bold mb-6 text-sm">Platform</h4>
              <ul className="space-y-3 text-xs text-slate-400">
                <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
                <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                <li><Link to="/services" className="hover:text-blue-400 transition-colors">Services</Link></li>
                <li><Link to="/report" className="hover:text-blue-400 transition-colors">Report Issue</Link></li>
                <li><Link to="/track" className="hover:text-blue-400 transition-colors">Track Complaint</Link></li>
                <li><Link to="/analytics" className="hover:text-blue-400 transition-colors">Analytics</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 text-sm">Departments</h4>
              <ul className="space-y-3 text-xs text-slate-400">
                <li><Link to="/departments" className="hover:text-blue-400 transition-colors">All Departments</Link></li>
                <li><Link to="/departments" className="hover:text-blue-400 transition-colors">Municipal Corporation</Link></li>
                <li><Link to="/departments" className="hover:text-blue-400 transition-colors">Water Department</Link></li>
                <li><Link to="/departments" className="hover:text-blue-400 transition-colors">Electricity Board</Link></li>
                <li><Link to="/departments" className="hover:text-blue-400 transition-colors">Police Department</Link></li>
                <li><Link to="/departments" className="hover:text-blue-400 transition-colors">Transport Department</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 text-sm">Resources</h4>
              <ul className="space-y-3 text-xs text-slate-400">
                <li><Link to="/help" className="hover:text-blue-400 transition-colors">Help Center</Link></li>
                <li><Link to="/faq" className="hover:text-blue-400 transition-colors">FAQs</Link></li>
                <li><Link to="/help" className="hover:text-blue-400 transition-colors">Guidelines</Link></li>
                <li><Link to="/about" className="hover:text-blue-400 transition-colors">Blog</Link></li>
                <li><Link to="/help" className="hover:text-blue-400 transition-colors">API Documentation</Link></li>
                <li><Link to="/help" className="hover:text-blue-400 transition-colors">Downloads</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 text-sm">Legal</h4>
              <ul className="space-y-3 text-xs text-slate-400">
                <li><Link to="/about" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/about" className="hover:text-blue-400 transition-colors">Terms & Conditions</Link></li>
                <li><Link to="/about" className="hover:text-blue-400 transition-colors">Accessibility</Link></li>
                <li><Link to="/about" className="hover:text-blue-400 transition-colors">Disclaimer</Link></li>
                <li><Link to="/about" className="hover:text-blue-400 transition-colors">Refund Policy</Link></li>
              </ul>
            </div>

            {/* Connect Column */}
            <div>
              <h4 className="text-white font-bold mb-6 text-sm">Connect</h4>
              <ul className="space-y-4 text-xs text-slate-400">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <span>5th Floor, Smart City Building,<br/>Hyderabad, Telangana - 500081</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>1800 123 4567</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>support@civicai.gov.in</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-4 h-4 rounded-full border border-slate-500 flex items-center justify-center text-[8px] text-slate-500 shrink-0">L</span>
                  <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-[#050d1a] border-t border-slate-800 py-4">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
          <p>© 2026 Civic AI. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for a better tomorrow
          </p>
        </div>
      </div>
    </footer>
  );
};