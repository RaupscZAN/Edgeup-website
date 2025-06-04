import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  ArrowRight,
  Brain,
  Target,
  Layers,
  Zap
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import HeroSection from '../components/sections/HeroSection';
import FeatureSection from '../components/sections/FeatureSection';
import TestimonialSection from '../components/sections/TestimonialSection';
import PartnerSection from '../components/sections/PartnerSection';
import CTASection from '../components/sections/CTASection';

const HomePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "EdgeUp - AI-Powered Learning Platform for Institutions";
  }, []);

  const { getContentBlocks } = useCMS();
  const homePageBlocks = getContentBlocks('home');

  // Find the blocks if they exist in CMS, otherwise use defaults
  const heroBlock = homePageBlocks.find(block => block.type === 'hero') || {
    type: 'hero',
    title: "AI-Powered Learning. Built for Institutions. Personalised for Learners.",
    subtitle: "EdgeUp functions as an embedded study companion, enabling partners to offer adaptive learning journeys, smart content delivery, contextual nudges, and real-time learner support powered by proprietary AI models.",
    cta1: { text: "Book a Demo", url: "/contact?demo=true" },
    cta2: { text: "Partner With Us", url: "/contact" },
    backgroundImage: "https://images.pexels.com/photos/8199562/pexels-photo-8199562.jpeg?auto=compress&cs=tinysrgb&w=1600"
  };

  const featuresBlock = homePageBlocks.find(block => block.type === 'features') || {
    type: 'features',
    title: "Transform Learning with AI-Powered Precision",
    subtitle: "Our platform helps institutions prepare students for UPSC, state exams, and other competitive tests with personalized learning experiences.",
    items: [
      {
        id: "1",
        title: "Psychometric Profiling",
        description: "Understand each learner's unique cognitive profile, learning style, and motivation patterns to create tailored study paths.",
        icon: "Brain"
      },
      {
        id: "2",
        title: "Adaptive Testing Engine",
        description: "Advanced algorithms that adjust question difficulty based on student performance, maximizing assessment effectiveness.",
        icon: "BarChart"
      },
      {
        id: "3",
        title: "Smart Study Plans",
        description: "AI-generated study schedules that optimize learning and retention based on individual strengths and weaknesses.",
        icon: "CalendarClock"
      },
      {
        id: "4",
        title: "Seamless Integration",
        description: "Works with your existing LMS or as a standalone platform, making implementation fast and hassle-free.",
        icon: "Layers"
      }
    ]
  };

  const testimonialsBlock = homePageBlocks.find(block => block.type === 'testimonials') || {
    type: 'testimonials',
    title: "Trusted by Leading Educational Institutions",
    subtitle: "See what our partners have to say about the impact of EdgeUp on their students' success.",
    items: [
      {
        id: "1",
        quote: "EdgeUp has transformed how we prepare students for UPSC. The personalized insights give our teachers powerful tools to support each student's journey.",
        name: "Rajiv Sharma",
        position: "Director",
        institution: "Delhi IAS Academy",
        avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        id: "2",
        quote: "The adaptive testing technology has significantly improved our assessment capabilities. Our students feel more confident and perform better in competitive exams.",
        name: "Priya Patel",
        position: "CEO",
        institution: "NextGen Learning Solutions",
        avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1600"
      },
      {
        id: "3",
        quote: "Implementing EdgeUp was seamless. Their team understood our needs and the platform has exceeded our expectations in enhancing student outcomes.",
        name: "Anil Kumar",
        position: "Founder",
        institution: "Achievers NEET Academy",
        avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1600"
      }
    ]
  };

  const partnersBlock = homePageBlocks.find(block => block.type === 'partners') || {
    type: 'partners',
    title: "Our Partners & Investors",
    subtitle: "Backed by leading education institutions and investors who believe in our vision.",
    items: [
      {
        id: "1",
        name: "Enlighten Capital",
        logo: "https://placehold.co/200x80/e2e8f0/475569?text=Enlighten+Capital&font=montserrat"
      },
      {
        id: "2",
        name: "National Education Alliance",
        logo: "https://placehold.co/200x80/e2e8f0/475569?text=NEA&font=montserrat"
      },
      {
        id: "3",
        name: "Future Academy",
        logo: "https://placehold.co/200x80/e2e8f0/475569?text=Future+Academy&font=montserrat"
      },
      {
        id: "4",
        name: "Bright Ventures",
        logo: "https://placehold.co/200x80/e2e8f0/475569?text=Bright+Ventures&font=montserrat"
      },
      {
        id: "5",
        name: "EdTech Innovators",
        logo: "https://placehold.co/200x80/e2e8f0/475569?text=EdTech+Innovators&font=montserrat"
      }
    ]
  };

  const ctaBlock = homePageBlocks.find(block => block.type === 'cta') || {
    type: 'cta',
    title: "Ready to Transform Education at Your Institution?",
    subtitle: "Join the growing network of forward-thinking institutions using EdgeUp to deliver personalized learning experiences.",
    settings: {
      cta: { text: "Book a Demo Today", url: "/contact?demo=true" }
    }
  };

  return (
    <main className="pt-16">
      <HeroSection data={heroBlock} />
      
      {/* Key Technology Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-blue-100 text-[#094d88] rounded-full text-sm font-medium mb-4">
              Proprietary Technology
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Bridging Traditional Coaching with Intelligent Learning
            </h2>
            <p className="text-lg text-gray-600">
              Our platform bridges the gap between traditional rote-based coaching and the need for intelligent, outcome-oriented learning through proprietary AI models and frameworks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* SLM Card */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl border border-blue-100">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Layers className="h-6 w-6 text-[#094d88]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 ml-4">Small Language Model (SLM)</h3>
              </div>
              <p className="text-gray-600 mb-4">
                EdgeUp uses its own proprietary SLM built using:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#10ac8b] mt-1 mr-3 flex-shrink-0" />
                  <span>Prescribed Textbooks</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#10ac8b] mt-1 mr-3 flex-shrink-0" />
                  <span>Curated Reading Materials</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#10ac8b] mt-1 mr-3 flex-shrink-0" />
                  <span>Educational Videos</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#10ac8b] mt-1 mr-3 flex-shrink-0" />
                  <span>Faculty & Student Notes</span>
                </li>
              </ul>
            </div>

            {/* PASCO Framework Card */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl border border-blue-100">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Brain className="h-6 w-6 text-[#094d88]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 ml-4">PASCO Framework</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Our proprietary AI-powered framework designed to personalize and optimize learning journeys across age groups.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-100">
                  <span className="font-semibold text-[#094d88]">P</span>ersonality
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-100">
                  <span className="font-semibold text-[#094d88]">A</span>ptitude
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-100">
                  <span className="font-semibold text-[#094d88]">S</span>kills
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-100">
                  <span className="font-semibold text-[#094d88]">C</span>haracter
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-100 col-span-2">
                  <span className="font-semibold text-[#094d88]">O</span>bservation
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Why Educational Institutions Choose EdgeUp
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform is designed specifically for the unique challenges of UPSC, 
              state services, and competitive exam preparation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="mb-4 text-[#094d88]">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Enhanced Student Outcomes</h3>
              <p className="text-gray-600">
                Students using EdgeUp show an average 32% improvement in test scores and higher success rates
                in competitive exams.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="mb-4 text-[#094d88]">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Instructor Empowerment</h3>
              <p className="text-gray-600">
                Our platform provides teachers with actionable insights to better support each student's
                unique learning journey.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="mb-4 text-[#094d88]">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Institution Growth</h3>
              <p className="text-gray-600">
                Partner institutions report increased enrollment, improved reputation, and stronger 
                student retention rates.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link 
              to="/product" 
              className="inline-flex items-center text-[#094d88] font-medium hover:text-[#094d88]/90"
            >
              Learn more about our platform
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      <FeatureSection data={featuresBlock} />
      <TestimonialSection data={testimonialsBlock} />
      <PartnerSection data={partnersBlock} />
      <CTASection data={ctaBlock} />
    </main>
  );
};

export default HomePage;