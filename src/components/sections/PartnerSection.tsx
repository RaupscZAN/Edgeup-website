import React from 'react';

interface Partner {
  id: string;
  name: string;
  logo: string;
}

interface PartnerSectionProps {
  data: {
    title: string;
    subtitle: string;
    items: Partner[];
  };
}

const PartnerSection: React.FC<PartnerSectionProps> = ({ data }) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{data.title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{data.subtitle}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {data.items.map((partner) => (
            <div 
              key={partner.id} 
              className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300"
              data-aos="fade-up"
            >
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="h-12 md:h-16 object-contain"
              />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="py-4 px-6 md:py-6 md:px-10 bg-gray-50 rounded-lg inline-block">
            <div className="text-[#094d88] font-semibold">
              We are proud to announce Edgeup has closed 8 Crore INR in Seed Funding
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;