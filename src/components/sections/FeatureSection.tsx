import React from 'react';
import { 
  Brain, 
  BarChart, 
  CalendarClock, 
  Layers,
  Zap,
  Target,
  LineChart,
  Users
} from 'lucide-react';

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
}

interface FeatureSectionProps {
  data: {
    title: string;
    subtitle: string;
    items: FeatureItem[];
  };
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ data }) => {
  const getIcon = (iconName: string, size = 40) => {
    const icons: Record<string, React.ReactNode> = {
      Brain: <Brain size={size} />,
      BarChart: <BarChart size={size} />,
      CalendarClock: <CalendarClock size={size} />,
      Layers: <Layers size={size} />,
      Zap: <Zap size={size} />,
      Target: <Target size={size} />,
      LineChart: <LineChart size={size} />,
      Users: <Users size={size} />
    };
    
    return icons[iconName] || <Zap size={size} />;
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{data.title}</h2>
          <p className="text-lg text-gray-600">{data.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.items.map((feature, index) => (
            <div 
              key={feature.id}
              className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="text-brand-primary mb-5">
                {getIcon(feature.icon)}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-gray-50 rounded-xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Powered by Advanced AI Technology
              </h3>
              <p className="text-gray-700 mb-6">
                Our platform combines the latest in artificial intelligence and machine learning 
                with proven educational methodologies to create a truly personalized learning experience.
              </p>

              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mr-3 text-brand-secondary mt-1">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <p className="text-gray-700">Deep learning algorithms that adapt to each student's needs</p>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 text-brand-secondary mt-1">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <p className="text-gray-700">Natural language processing for content comprehension</p>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 text-brand-secondary mt-1">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <p className="text-gray-700">Predictive analytics to identify knowledge gaps</p>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 text-brand-secondary mt-1">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <p className="text-gray-700">Real-time performance monitoring and feedback</p>
                </li>
              </ul>
            </div>

            <div className="relative rounded-xl overflow-hidden h-80 lg:h-96">
              <img 
                src="https://images.pexels.com/photos/5940721/pexels-photo-5940721.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="AI learning technology" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-brand-primary/70 flex items-end p-6">
                <span className="text-white font-semibold text-lg">Next-generation learning technology</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;