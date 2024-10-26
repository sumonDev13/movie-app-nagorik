'use client'
import React, { useState } from 'react';
import { Menu, Search, Sun, Moon, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import SearchBar from './SearchBar';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Home Section */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <span className="font-bold text-xl text-gray-900 dark:text-white">
                Movie App
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Bar */}
           <SearchBar/>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-gray-100" />
              ) : (
                <Moon className="h-5 w-5 text-gray-900" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleSearch}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Search className="h-5 w-5 text-gray-900 dark:text-gray-100" />
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 text-gray-900 dark:text-gray-100" />
              ) : (
                <Menu className="h-5 w-5 text-gray-900 dark:text-gray-100" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden pb-4 px-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 
                         text-gray-900 dark:text-gray-100 focus:outline-none 
                         focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={toggleTheme}
                className="w-full text-left px-3 py-2 rounded-lg 
                         text-gray-900 dark:text-gray-100
                         hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;