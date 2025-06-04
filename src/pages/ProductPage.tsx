import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  BarChart, 
  CalendarClock, 
  Layers,
  CheckCircle,
  ExternalLink,
  Target,
  Eye,
  Shield,
  Zap
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import CTASection from '../components/sections/CTASection';

const ProductPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "EdgeUp Product - AI-Powered Learning Platform";
  }, []);

  const { getContentBlocks } = useCMS();
  const productPageBlocks = getContentBlocks('product');
  const ctaBlock = productPageBlocks.find(block => block.type === 'cta') || { 
    type: 'cta', 
    title: 'Ready to Transform Your Institution?', 
    subtitle: 'Join the growing network of forward-thinking institutions using EdgeUp to deliver personalized learning experiences.',
    cta: { 
      text: 'Book a Demo Today', 
      url: '/contact?demo=true' 
    } 
  };

  return (
    <main className="pt-16 md:pt-24">
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-[#094d88] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-6">
              Embedded Study Companion
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Intelligent Learning, Powered by AI
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-10">
              Rather than being a standalone app, EdgeUp functions as an embedded study companion, enabling partners to offer adaptive learning journeys, smart content delivery, contextual nudges, and real-time learner support.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/contact?demo=true"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[#094d88] bg-white hover:bg-blue-50 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Book a Demo
              </Link>
              <Link
                to="/institutions"
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors duration-300"
              >
                For Institutions
                <ExternalLink size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PASCO Framework Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              PASCO Framework
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Proprietary AI Framework
            </h2>
            <p className="text-lg text-gray-600">
              PASCO is EdgeUp's proprietary AI-powered framework designed to personalize and optimize learning journeys across age groups, by mapping and evolving student learning paths based on holistic learner profiling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100">
              <div className="flex items-center mb-4">
                <Brain className="h-6 w-6 text-blue-800" />
                <h3 className="text-lg font-semibold ml-3">Personality</h3>
              </div>
              <p className="text-gray-600">Understanding learning style and cognitive preferences</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100">
              <div className="flex items-center mb-4">
                <Target className="h-6 w-6 text-blue-800" />
                <h3 className="text-lg font-semibold ml-3">Aptitude</h3>
              </div>
              <p className="text-gray-600">Measuring natural abilities and potential</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100">
              <div className="flex items-center mb-4">
                <Zap className="h-6 w-6 text-blue-800" />
                <h3 className="text-lg font-semibold ml-3">Skills</h3>
              </div>
              <p className="text-gray-600">Assessing current capabilities and competencies</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100">
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-blue-800" />
                <h3 className="text-lg font-semibold ml-3">Character</h3>
              </div>
              <p className="text-gray-600">Evaluating motivation and learning behavior</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100">
              <div className="flex items-center mb-4">
                <Eye className="h-6 w-6 text-blue-800" />
                <h3 className="text-lg font-semibold ml-3">Observation</h3>
              </div>
              <p className="text-gray-600">Continuous monitoring and adaptation</p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">How PASCO Benefits Learning</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg">
                <div className="text-blue-800 mb-3">
                  <Brain size={24} />
                </div>
                <h4 className="font-semibold mb-2">Personalized Paths</h4>
                <p className="text-gray-600 text-sm">Creates unique learning journeys based on individual profiles</p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <div className="text-blue-800 mb-3">
                  <Target size={24} />
                </div>
                <h4 className="font-semibold mb-2">Adaptive Learning</h4>
                <p className="text-gray-600 text-sm">Continuously evolves with student progress</p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <div className="text-blue-800 mb-3">
                  <Eye size={24} />
                </div>
                <h4 className="font-semibold mb-2">Real-time Insights</h4>
                <p className="text-gray-600 text-sm">Provides actionable feedback for improvement</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Small Language Model Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              Proprietary SLM
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Small Language Model
            </h2>
            <p className="text-lg text-gray-600">
              EdgeUp uses its own proprietary Small Language Model (SLM) built using comprehensive educational resources and advanced AI technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-6">Comprehensive Learning Resources</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium">Prescribed Textbooks</h4>
                    <p className="text-gray-600">Curated content from standard educational materials</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium">Reading Materials</h4>
                    <p className="text-gray-600">Supplementary content for deeper understanding</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium">Educational Videos</h4>
                    <p className="text-gray-600">Visual learning resources for better comprehension</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium">Faculty & Student Notes</h4>
                    <p className="text-gray-600">Collaborative learning materials from educators and peers</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative rounded-xl overflow-hidden h-96">
              <img 
                src="https://images.pexels.com/photos/5940721/pexels-photo-5940721.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="Small Language Model" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <p className="text-white text-lg font-medium">
                  Intelligent content delivery powered by AI
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection data={ctaBlock} />
    </main>
  );
};

export default ProductPage;