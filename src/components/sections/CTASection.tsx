import React from 'react';
import { Link } from 'react-router-dom';

interface CTASectionProps {
  data: {
    title: string;
    subtitle: string;
    cta?: {
      text: string;
      url: string;
    };
  };
}

const CTASection: React.FC<CTASectionProps> = ({ data }) => {
  return (
    <section className="py-20 bg-[#10ac8b] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{data.title}</h2>
        <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">{data.subtitle}</p>
        {data.cta && (
          <Link
            to={data.cta.url}
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-[#10ac8b] bg-white hover:bg-white/90 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {data.cta.text}
          </Link>
        )}
      </div>
    </section>
  );
};

export default CTASection;