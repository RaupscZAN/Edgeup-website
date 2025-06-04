import React from 'react';
import { useCMS } from '../../context/CMSContext';

interface LogoProps {
  isWhite?: boolean;
}

const Logo: React.FC<LogoProps> = ({ isWhite = false }) => {
  const { siteSettings } = useCMS();
  
  return (
    <div className="flex items-center">
      <img 
        src="https://edgeup.in/wp-content/uploads/2024/03/edgeup-logo.png"
        alt="EdgeUp"
        className={`h-10 ${isWhite ? 'brightness-0 invert' : ''}`}
      />
    </div>
  );
};

export default Logo;