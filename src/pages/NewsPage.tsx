import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download, ExternalLink } from 'lucide-react';
import CTASection from '../components/sections/CTASection';
import { useCMS } from '../context/CMSContext';

const NewsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "EdgeUp News & Media";
  }, []);

  const { getContentBlocks } = useCMS();
  const newsPageBlocks = getContentBlocks('news');

  // Find CTA block if it exists in CMS, otherwise use default
  const ctaBlock = newsPageBlocks.find(block => block.type === 'cta') || {
    type: 'cta',
    title: "Want to Learn More About EdgeUp?",
    subtitle: "Schedule a demo to see how our AI-powered platform can transform learning at your institution.",
    cta: { text: "Book a Demo", url: "/contact?demo=true" }
  };

  const newsItems = [
    {
      id: '1',
      title: 'EdgeUp Raises ₹8 Crore in Seed Funding',
      date: 'March 15, 2024',
      image: 'https://images.pexels.com/photos/7681091/pexels-photo-7681091.jpeg?auto=compress&cs=tinysrgb&w=1600',
      summary: 'Leading EdTech startup EdgeUp has secured ₹8 crore in seed funding from Enlighten Capital and other prominent investors to accelerate its mission of transforming competitive exam preparation through AI.',
      content: `EdgeUp, India's innovative AI-powered learning platform, today announced the successful completion of its seed funding round, raising ₹8 crore from a group of strategic investors led by Enlighten Capital.

The funding will be used to enhance EdgeUp's AI capabilities, expand its institutional partnerships, and strengthen its presence across India. The company plans to focus on developing more specialized modules for various competitive exams and improving its psychometric assessment tools.

"This investment validates our vision of transforming how institutions prepare students for competitive exams," said Jubran Siddique, CEO of EdgeUp. "With this funding, we'll be able to reach more institutions and impact millions of students across India."

The round saw participation from several notable angel investors and education sector veterans, highlighting the industry's confidence in EdgeUp's innovative approach to personalized learning.`
    },
    {
      id: '2',
      title: 'EdgeUp Partners with Leading UPSC Coaching Institutes',
      date: 'March 1, 2024',
      image: 'https://images.pexels.com/photos/4778611/pexels-photo-4778611.jpeg?auto=compress&cs=tinysrgb&w=1600',
      summary: 'Strategic partnerships with top coaching institutes mark a significant milestone in EdgeUp\'s mission to revolutionize UPSC preparation through AI-powered personalization.',
      content: `EdgeUp today announced partnerships with several leading UPSC coaching institutes across Delhi, Mumbai, and Bangalore. These partnerships will bring EdgeUp's AI-powered learning platform to thousands of UPSC aspirants.

The collaboration will enable these institutes to offer personalized learning experiences to their students, leveraging EdgeUp's advanced psychometric profiling and adaptive testing capabilities.

"Our partnership with these prestigious institutes marks a significant step in our journey," said Khalid Mohamed, Chairman of EdgeUp. "Together, we're setting new standards in UPSC preparation."

Initial results from pilot programs show significant improvements in student engagement and test scores, with some institutes reporting up to 30% better results in mock tests.`
    }
  ];

  return (
    <main className="pt-16 md:pt-24">
      {/* Hero Section */}
      <section className="py-16 bg-[#094d88] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              News & Media
            </h1>
            <p className="text-xl text-blue-100">
              Stay updated with the latest developments at EdgeUp as we transform
              the future of education through AI innovation.
            </p>
          </div>
        </div>
      </section>

      {/* News Articles */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="space-y-12">
              {newsItems.map((item) => (
                <article key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0 md:w-64">
                      <img
                        className="h-48 w-full md:h-full object-cover"
                        src={item.image}
                        alt={item.title}
                      />
                    </div>
                    <div className="p-6 md:p-8">
                      <div className="uppercase tracking-wide text-sm text-blue-800 font-semibold">
                        {item.date}
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 mt-2">
                        {item.title}
                      </h2>
                      <p className="mt-3 text-gray-600">
                        {item.summary}
                      </p>
                      <div className="mt-4">
                        <button
                          onClick={() => {
                            // In a real app, this would open a modal or navigate to a full article page
                            console.log('View full article:', item.id);
                          }}
                          className="inline-flex items-center text-blue-800 hover:text-blue-900"
                        >
                          Read more
                          <ExternalLink size={16} className="ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Media Kit Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Media Kit
              </h2>
              <p className="text-lg text-gray-600">
                Download our media kit for brand assets, company information, and press materials.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    EdgeUp Press Kit 2024
                  </h3>
                  <p className="text-gray-600">
                    Includes logos, brand guidelines, product screenshots, and company information.
                  </p>
                </div>
                <button
                  onClick={() => {
                    // In a real app, this would trigger the download
                    console.log('Download media kit');
                  }}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900 transition-colors"
                >
                  <Download size={20} className="mr-2" />
                  Download Kit
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Press Contact
                </h4>
                <div className="space-y-2">
                  <p className="text-gray-600">
                    For media inquiries, please contact:
                  </p>
                  <p className="font-medium">
                    Priya Sharma
                    <br />
                    Head of Communications
                    <br />
                    <a href="mailto:press@edgeup.ai" className="text-blue-800 hover:text-blue-900">
                      press@edgeup.ai
                    </a>
                  </p>
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

export default NewsPage;