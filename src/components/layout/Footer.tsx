import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primary-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-accent-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-xl font-bold text-primary-800">P</span>
              </div>
              <span className="text-2xl font-bold">PitchMint</span>
            </div>
            <p className="text-surface-300 mb-4 max-w-md">
              The premier virtual Shark Tank platform connecting innovative startups 
              with visionary investors. Build the future together.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-surface-300 hover:text-accent-500 transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-surface-300 hover:text-accent-500 transition-colors">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="#" className="text-surface-300 hover:text-accent-500 transition-colors">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-surface-300 hover:text-accent-500 transition-colors">
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <a href="/pitches" className="text-surface-300 hover:text-accent-500 transition-colors">
                  Browse Pitches
                </a>
              </li>
              <li>
                <a href="/events" className="text-surface-300 hover:text-accent-500 transition-colors">
                  Live Events
                </a>
              </li>
              <li>
                <a href="/mentors" className="text-surface-300 hover:text-accent-500 transition-colors">
                  Find Mentors
                </a>
              </li>
              <li>
                <a href="/dashboard" className="text-surface-300 hover:text-accent-500 transition-colors">
                  Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-surface-300 hover:text-accent-500 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-surface-300 hover:text-accent-500 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-surface-300 hover:text-accent-500 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-surface-300 hover:text-accent-500 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-surface-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-surface-400 text-sm">
            © 2025 PitchMint. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/help" className="text-surface-400 hover:text-accent-500 transition-colors text-sm">
              Help Center
            </a>
            <a href="/support" className="text-surface-400 hover:text-accent-500 transition-colors text-sm">
              Support
            </a>
            <a href="/careers" className="text-surface-400 hover:text-accent-500 transition-colors text-sm">
              Careers
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
