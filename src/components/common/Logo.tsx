import React from 'react';
import { useCMS } from '../../context/CMSContext';

interface LogoProps {
  isWhite?: boolean;
}

const Logo: React.FC<LogoProps> = ({ isWhite = false }) => {
  const { siteSettings } = useCMS();
  
  // Use the logo from settings, fallback to default EdgeUp logo
  const logoUrl = siteSettings?.logo || "https://edgeup.in/wp-content/uploads/2024/03/edgeup-logo.png";
  const siteName = siteSettings?.siteName || "EdgeUp";
  
  return (
    <div className="flex items-center">
      <img 
        src={logoUrl}
        alt={siteName}
        className={`h-10 ${isWhite ? 'brightness-0 invert' : ''}`}
      />
    </div>
  );
};

export default Logo;