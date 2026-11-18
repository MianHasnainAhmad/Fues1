import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Github, Twitter, Linkedin, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-[#E8E7E0] pt-16 pb-12 text-[#525252]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 sm:gap-10 pb-12 border-b border-[#F0EFEA]">
          {/* Brand info */}
          <div className="col-span-1 sm:col-span-2 md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#FF7043] flex items-center justify-center text-white shadow-xs">
                <Flame className="w-5 h-5 fill-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-[#171717]">
                FUSE<span className="text-[#FF7043]">.</span>
              </span>
            </Link>
            <p className="text-sm text-[#737373] max-w-sm leading-relaxed">
              "Your idea doesn't have to be complete to begin." A human-centered platform connecting rough concepts with developers, designers, and domain specialists.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-[#F8F8F5] text-[#525252] hover:text-[#171717] hover:bg-[#F2F1EC] dark:hover:text-white dark:hover:bg-[#282825] transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-[#F8F8F5] text-[#525252] hover:text-[#171717] hover:bg-[#F2F1EC] dark:hover:text-white dark:hover:bg-[#282825] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-[#F8F8F5] text-[#525252] hover:text-[#171717] hover:bg-[#F2F1EC] dark:hover:text-white dark:hover:bg-[#282825] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav column 1 */}
          <div>
            <h4 className="text-xs font-bold text-[#171717] uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/ideas" className="hover:text-[#FF7043] transition-colors">
                  Explore Ideas
                </Link>
              </li>
              <li>
                <Link to="/ideas/create" className="hover:text-[#FF7043] transition-colors">
                  Share Your Concept
                </Link>
              </li>
              <li>
                <Link to="/ai-companion" className="hover:text-[#FF7043] transition-colors">
                  AI Companion & Similarity
                </Link>
              </li>
              <li>
                <Link to="/collaborators" className="hover:text-[#FF7043] transition-colors">
                  Discover Talent
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav column 2 */}
          <div>
            <h4 className="text-xs font-bold text-[#171717] uppercase tracking-wider mb-4">Community</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/community" className="hover:text-[#FF7043] transition-colors">
                  Community Charter
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#FF7043] transition-colors">
                  Why Incomplete Ideas?
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-[#FF7043] transition-colors">
                  Team Workspaces
                </Link>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-[#FF7043] transition-colors">
                  Success Stories
                </a>
              </li>
            </ul>
          </div>

          {/* Nav column 3 */}
          <div>
            <h4 className="text-xs font-bold text-[#171717] uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/login" className="hover:text-[#FF7043] transition-colors">
                  Member Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-[#FF7043] transition-colors">
                  Create an Account
                </Link>
              </li>
              <li>
                <span className="text-[#A3A3A3] text-xs">Django REST + React 19 Stack</span>
              </li>
              <li>
                <span className="text-[#A3A3A3] text-xs">Final Year Project 2026</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#737373] gap-4">
          <p>© {new Date().getFullYear()} Fuse Collaboration Inc. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Designed with <Heart className="w-3.5 h-3.5 text-[#FF7043] fill-current" /> for creative thinkers & builders
          </p>
        </div>
      </div>
    </footer>
  );
};
