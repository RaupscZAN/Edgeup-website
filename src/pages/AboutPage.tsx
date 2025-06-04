import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Linkedin, 
  Twitter, 
  ArrowRight,
  CheckCircle 
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import CTASection from '../components/sections/CTASection';

const AboutPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "About EdgeUp - Our Story and Mission";
  }, []);

  const { getContentBlocks } = useCMS();
  const aboutPageBlocks = getContentBlocks('about');

  // Find CTA block if it exists in CMS, otherwise use default
  const ctaBlock = aboutPageBlocks.find(block => block.type === 'cta') || {
    type: 'cta',
    title: "Ready to Transform Education at Your Institution?",
    subtitle: "Join the growing network of forward-thinking institutions using EdgeUp to deliver personalized learning experiences.",
    cta: { text: "Book a Demo Today", url: "/contact?demo=true" }
  };

  const teamMembers = [
    {
      name: "Jubran Siddique",
      position: "Chief Executive Officer",
      bio: "Former Head of AI at a leading EdTech company, Jubran brings deep expertise in machine learning and educational psychology.",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1600",
      linkedin: "https://linkedin.com/in/jubran-siddique",
      twitter: "https://twitter.com/jubransiddique"
    },
    {
      name: "Khalid Mohamed",
      position: "Chairman",
      bio: "With 20+ years in education technology, Khalid has helped scale multiple EdTech ventures across Asia.",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1600",
      linkedin: "https://linkedin.com/in/khalid-mohamed",
      twitter: "https://twitter.com/khalidmohamed"
    }
  ];

  const milestones = [
    {
      year: "2022",
      title: "The Beginning",
      description: "EdgeUp was founded with a vision to make education more human, precise, and learner-centric."
    },
    {
      year: "2023",
      title: "First Partnerships",
      description: "Launched successful pilot programs with leading coaching institutes across India."
    },
    {
      year: "2024",
      title: "Seed Funding",
      description: "Secured ₹8 Cr in seed funding from Enlighten Capital and other leading investors."
    },
    {
      year: "2025",
      title: "Expansion",
      description: "Expanding our reach to serve more institutions and learners across India."
    }
  ];

  return (
    <main className="pt-16 md:pt-24">
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-[#094d88] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Making Education More Human Through AI
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-10">
              We are building the future of personalized learning, helping institutions 
              deliver better outcomes through AI-powered precision education.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-xl text-gray-600">
              To empower educational institutions with AI-driven tools that make learning 
              more personalized, effective, and accessible for every student.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-blue-800 mb-4">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalization at Scale</h3>
              <p className="text-gray-600">
                Using AI to understand and adapt to each learner's unique needs and learning style.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-blue-800 mb-4">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Data-Driven Insights</h3>
              <p className="text-gray-600">
                Empowering educators with actionable insights to make informed decisions.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-blue-800 mb-4">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Accessible Excellence</h3>
              <p className="text-gray-600">
                Making quality education more accessible through technology and innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600">
              Meet the visionaries behind EdgeUp's mission to transform education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-blue-800 mb-4">{member.position}</p>
                  <p className="text-gray-600 mb-4">{member.bio}</p>
                  <div className="flex space-x-4">
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-800 transition-colors"
                    >
                      <Linkedin size={20} />
                    </a>
                    <a 
                      href={member.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-800 transition-colors"
                    >
                      <Twitter size={20} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">
              From idea to impact: The story of EdgeUp's growth and evolution.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-100"></div>
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div 
                    key={index}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    <div className="flex-1 md:w-1/2"></div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-800 rounded-full border-4 border-white"></div>
                    <div className="flex-1 md:w-1/2 bg-gray-50 p-6 rounded-lg shadow-sm">
                      <div className="text-blue-800 font-bold mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Backed by Leading Investors
                  </h2>
                  <p className="text-gray-600 mb-6">
                    We are proud to be supported by investors who share our vision for 
                    the future of education. Our recent ₹8 Cr seed funding round was 
                    led by Enlighten Capital, with participation from industry veterans 
                    and education experts.
                  </p>
                  <Link
                    to="/news"
                    className="inline-flex items-center text-blue-800 font-medium hover:text-blue-900"
                  >
                    Read about our funding news
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
                <div className="space-y-6">
                  <div className="p-6 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Lead Investor</div>
                    <div className="text-xl font-semibold">Enlighten Capital</div>
                    <div className="text-gray-600 mt-2">
                      "EdgeUp's innovative approach to personalized learning has the potential 
                      to revolutionize education in India."
                    </div>
                  </div>
                  <div className="p-6 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-800">₹8 Cr</div>
                    <div className="text-gray-600">Seed Funding Raised</div>
                  </div>
                </div>
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

export default AboutPage;