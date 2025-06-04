import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  data: {
    title: string;
    subtitle: string;
    cta1?: {
      text: string;
      url: string;
    };
    cta2?: {
      text: string;
      url: string;
    };
    backgroundImage: string;
  };
}

const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  return (
    <section className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-[#094d88] z-10"
          aria-hidden="true"
        ></div>
        <img
          src={data.backgroundImage}
          alt="Students in a classroom"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex items-center">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fade-in-up">
            {data.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl animate-fade-in-up animation-delay-200">
            {data.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in-up animation-delay-400">
            {data.cta1 && (
              <Link
                to={data.cta1.url}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                {data.cta1.text}
              </Link>
            )}
            {data.cta2 && (
              <Link
                to={data.cta2.url}
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors duration-300"
              >
                {data.cta2.text}
                <ArrowRight size={16} className="ml-2" />
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-white/60 flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-white/60 rounded-full animate-scroll-down"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;