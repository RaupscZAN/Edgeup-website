import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import CTASection from '../components/sections/CTASection';
import { useCMS } from '../context/CMSContext';

const InstitutionsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "EdgeUp for Institutions - AI-Powered Learning Platform";
  }, []);

  const { getContentBlocks } = useCMS();
  const institutionsPageBlocks = getContentBlocks('institutions');

  const ctaBlock = institutionsPageBlocks.find(block => block.type === 'cta') || {
    type: 'cta',
    title: "Ready to Transform Your Institution?",
    subtitle: "Join the growing network of forward-thinking institutions using EdgeUp to deliver personalized learning experiences.",
    cta: { text: "Book a Demo Today", url: "/contact?demo=true" }
  };

  return (
    <main className="pt-16 md:pt-24">
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-[#094d88] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Transform Your Institution with AI-Powered Learning
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-10">
              Empower your faculty and students with personalized learning experiences powered by advanced AI technology.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/contact?demo=true"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[#094d88] bg-white hover:bg-blue-50 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Book a Demo
              </Link>
              <Link
                to="/product"
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors duration-300"
              >
                Learn More
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Partner with EdgeUp?
            </h2>
            <p className="text-lg text-gray-600">
              Join leading institutions across India in delivering next-generation learning experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-800 mb-4">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Improved Outcomes</h3>
              <p className="text-gray-600">
                Our partner institutions report up to 32% improvement in student performance and higher success rates in competitive exams.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-800 mb-4">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Faculty Empowerment</h3>
              <p className="text-gray-600">
                Give your teachers powerful tools and insights to support each student's unique learning journey effectively.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-800 mb-4">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Competitive Edge</h3>
              <p className="text-gray-600">
                Stand out in the market with cutting-edge AI technology that delivers personalized learning at scale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Seamless Integration with Your Systems
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                EdgeUp works with your existing infrastructure, making implementation fast and hassle-free.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">LMS Integration</h4>
                    <p className="text-gray-600">Compatible with all major learning management systems including Moodle and Canvas.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Flexible API</h4>
                    <p className="text-gray-600">Custom integrations available through our comprehensive API.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Data Security</h4>
                    <p className="text-gray-600">Enterprise-grade security with end-to-end encryption and compliance with data protection regulations.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="Team collaboration"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg flex items-end p-6">
                <p className="text-white text-lg font-medium">Quick implementation with dedicated support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-gray-600">
              See how institutions across India are transforming education with EdgeUp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="mb-4">
                <img 
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                  alt="Success story" 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Delhi IAS Academy</h3>
              <p className="text-gray-600 mb-4">
                "EdgeUp helped us increase our UPSC selection rate by 28% in just one year."
              </p>
              <p className="text-sm text-gray-500">
                - Rajiv Sharma, Director
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="mb-4">
                <img 
                  src="https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                  alt="Success story" 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">NextGen Learning Solutions</h3>
              <p className="text-gray-600 mb-4">
                "The adaptive testing technology has transformed how we assess and support our students."
              </p>
              <p className="text-sm text-gray-500">
                - Priya Patel, CEO
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="mb-4">
                <img 
                  src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                  alt="Success story" 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Achievers NEET Academy</h3>
              <p className="text-gray-600 mb-4">
                "Our students' performance improved significantly with EdgeUp's personalized learning paths."
              </p>
              <p className="text-sm text-gray-500">
                - Anil Kumar, Founder
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple Implementation Process
            </h2>
            <p className="text-lg text-gray-600">
              Get up and running with EdgeUp in just a few weeks.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 mx-auto mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Initial Setup</h3>
                <p className="text-gray-600">System integration and configuration</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 mx-auto mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Data Migration</h3>
                <p className="text-gray-600">Secure transfer of existing content</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 mx-auto mb-4">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Staff Training</h3>
                <p className="text-gray-600">Comprehensive training sessions</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 mx-auto mb-4">
                  <span className="text-2xl font-bold">4</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Go Live</h3>
                <p className="text-gray-600">Launch with ongoing support</p>
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

export default InstitutionsPage;