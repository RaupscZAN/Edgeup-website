import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  position: string;
  institution: string;
  avatar: string;
}

interface TestimonialSectionProps {
  data: {
    title: string;
    subtitle: string;
    items: Testimonial[];
  };
}

const TestimonialSection: React.FC<TestimonialSectionProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === data.items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? data.items.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{data.title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{data.subtitle}</p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          <div className="relative bg-white rounded-xl shadow-lg p-8 md:p-12 overflow-hidden">
            <div className="absolute top-0 left-0 w-24 h-24 text-blue-100 transform -translate-x-1/3 -translate-y-1/3 opacity-80">
              <Quote size={96} />
            </div>

            <div className="relative z-10">
              <div key={data.items[activeIndex].id} className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                  <img 
                    src={data.items[activeIndex].avatar} 
                    alt={data.items[activeIndex].name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 text-lg md:text-xl italic mb-6">
                    "{data.items[activeIndex].quote}"
                  </p>
                  <div>
                    <h4 className="text-gray-900 font-semibold text-lg">{data.items[activeIndex].name}</h4>
                    <p className="text-gray-600">
                      {data.items[activeIndex].position}, {data.items[activeIndex].institution}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation arrows */}
          <button 
            onClick={handlePrev}
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-blue-800 hover:bg-blue-50 transition-colors z-20"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={handleNext}
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-blue-800 hover:bg-blue-50 transition-colors z-20"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots navigation */}
          <div className="flex justify-center space-x-2 mt-6">
            {data.items.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-blue-800' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;