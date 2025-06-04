import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Linkedin, 
  Twitter, 
  Facebook, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import Logo from '../common/Logo';

const Footer: React.FC = () => {
  const { siteSettings } = useCMS();
  
  const footerLinks = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Our Team', href: '/about#team' },
        { name: 'News & Media', href: '/news' },
        { name: 'Careers', href: '/careers' },
      ],
    },
    {
      title: 'Product',
      links: [
        { name: 'Overview', href: '/product' },
        { name: 'Features', href: '/product#features' },
        { name: 'Use Cases', href: '/product#use-cases' },
        { name: 'Pricing', href: '/contact' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', href: '/blog' },
        { name: 'Case Studies', href: '/case-studies' },
        { name: 'Media Kit', href: '/news#media-kit' },
        { name: 'Privacy Policy', href: '/privacy-policy' },
      ],
    },
  ];

  return (
    <footer className="bg-[#094d88] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <div className="flex items-center">
                <Logo isWhite />
              </div>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              India's first AI-driven learning companion tailored for institutions
              preparing students for UPSC, state exams, and other competitive tests.
            </p>
            <div className="flex space-x-4">
              {siteSettings?.contactInfo?.socialLinks?.linkedin && (
                <a 
                  href={siteSettings.contactInfo.socialLinks.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <Linkedin size={20} />
                </a>
              )}
              {siteSettings?.contactInfo?.socialLinks?.twitter && (
                <a 
                  href={siteSettings.contactInfo.socialLinks.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <Twitter size={20} />
                </a>
              )}
              {siteSettings?.contactInfo?.socialLinks?.facebook && (
                <a 
                  href={siteSettings.contactInfo.socialLinks.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <Facebook size={20} />
                </a>
              )}
              {siteSettings?.contactInfo?.socialLinks?.instagram && (
                <a 
                  href={siteSettings.contactInfo.socialLinks.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <Instagram size={20} />
                </a>
              )}
            </div>
          </div>

          {footerLinks.map((column, i) => (
            <div key={i}>
              <h3 className="text-lg font-semibold mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, j) => (
                  <li key={j}>
                    <Link 
                      to={link.href} 
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} EdgeUp Technologies. All rights reserved.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-400">
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/cookie-policy" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;