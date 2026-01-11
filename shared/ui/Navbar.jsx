"use client";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = ({ logoText = "pdfSwifter" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Tools", href: "/utilities" },
    { name: "Premium", href: "/premium" },
    { name: "Pricing", href: "/pricing" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Help", href: "/help" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/85 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="shrink-0">
            <Link href="/" className="text-2xl font-bold text-slate-900 hover:text-slate-700">
              {logoText}
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition duration-150"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/signin"
              className="px-4 py-2 rounded-full border border-slate-300 text-slate-900 bg-white hover:border-slate-400 transition duration-150 font-semibold text-sm"
            >
              Log In
            </Link>
            <Link
              href="/premium"
              className="px-4 py-2 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition duration-150 font-semibold text-sm"
            >
              Start Premium
            </Link>
          </div>

          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-200"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-3 pt-3 pb-4 space-y-1 border-t border-slate-200 bg-white">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-amber-50 hover:text-slate-900"
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 border-t border-slate-200 flex flex-col space-y-2 px-3">
              <Link
                href="/signin"
                onClick={() => setIsMenuOpen(false)}
                className="w-full px-4 py-2 rounded-full border border-slate-300 text-slate-900 bg-white text-center font-semibold text-sm"
              >
                Log In
              </Link>
              <Link
                href="/premium"
                onClick={() => setIsMenuOpen(false)}
                className="w-full px-4 py-2 rounded-full bg-slate-900 text-white text-center font-semibold text-sm"
              >
                Start Premium
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
