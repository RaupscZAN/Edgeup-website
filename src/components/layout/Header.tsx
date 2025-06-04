import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import Logo from '../common/Logo';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { siteSettings } = useCMS();

  const navItems = [
    { title: 'Product', path: '/product' },
    { title: 'For Institutions', path: '/institutions' },
    { title: 'About Us', path: '/about' },
    { title: 'News', path: '/news' },
    { title: 'Contact', path: '/contact', isButton: false },
    { title: 'Book a Demo', path: '/contact?demo=true', isButton: true }
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              item.isButton ? (
                <Link
                  key={index}
                  to={item.path}
                  className="bg-[#10ac8b] hover:bg-[#10ac8b]/90 text-white px-5 py-2 rounded-md font-medium transition-all duration-300 transform hover:scale-105"
                >
                  {item.title}
                </Link>
              ) : (
                <Link
                  key={index}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-[#094d88] ${
                    location.pathname === item.path ? 'text-[#094d88]' : 
                    isScrolled ? 'text-gray-900' : 'text-gray-900'
                  }`}
                >
                  {item.title}
                </Link>
              )
            ))}
          </nav>

          <button
            className="md:hidden text-gray-900 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-4">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item, index) => (
              item.isButton ? (
                <Link
                  key={index}
                  to={item.path}
                  className="bg-[#10ac8b] hover:bg-[#10ac8b]/90 text-white px-4 py-2 rounded-md font-medium text-center"
                  onClick={toggleMenu}
                >
                  {item.title}
                </Link>
              ) : (
                <Link
                  key={index}
                  to={item.path}
                  className={`py-2 text-base font-medium ${
                    location.pathname === item.path ? 'text-[#094d88]' : 'text-gray-900'
                  }`}
                  onClick={toggleMenu}
                >
                  {item.title}
                </Link>
              )
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;