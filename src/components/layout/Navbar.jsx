import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Flame, Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';
import { ThemeToggle } from '../common/ThemeToggle';
import { AccentSelector } from '../common/AccentSelector';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const navLinks = [
    { label: 'Explore Ideas', href: '/ideas' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Community', href: '/community' },
    { label: 'About', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F8F8F5]/90 backdrop-blur-md border-b border-[#E8E7E0] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-[#FF7043] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <Flame className="w-5 h-5 fill-white" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-[#171717] block leading-none">
              FUSE<span className="text-[#FF7043]">.</span>
            </span>
            <span className="text-[10px] font-semibold text-[#737373] tracking-wide block uppercase">
              Collab Platform
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                location.pathname === link.href
                  ? 'text-[#FF7043] bg-[#FFF0EB]'
                  : 'text-[#525252] hover:text-[#171717] hover:bg-[#F2F1EC] dark:text-[#A8A8A2] dark:hover:text-white dark:hover:bg-[#262624]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA, Accent & Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          <AccentSelector />
          <ThemeToggle />

          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button variant="primary" size="md" icon={ArrowRight} iconPosition="right">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="md">
                  Log in
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="md">
                  Get Started Free
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu & Theme Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <AccentSelector size="sm" />
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-[#525252] hover:text-[#171717] hover:bg-[#F2F1EC] dark:text-[#A8A8A2] dark:hover:text-white dark:hover:bg-[#262624]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E8E7E0] bg-[#F8F8F5] px-4 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-semibold text-[#171717] rounded-xl hover:bg-[#F2F1EC] dark:hover:bg-[#262624]"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-[#E8E7E0] flex flex-col gap-2">
            {isAuthenticated ? (
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="lg" className="w-full">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="md" className="w-full">
                    Log in
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" size="md" className="w-full">
                    Get Started Free
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
