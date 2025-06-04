import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, Phone, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

type EnquirerRole = 'individual' | 'institution' | 'partner';

const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const isDemo = searchParams.get('demo') === 'true';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution: '',
    message: '',
    role: 'individual' as EnquirerRole
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const { siteSettings, addFormSubmission } = useCMS();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Contact EdgeUp - Book a Demo";
    
    if (isDemo) {
      setFormData(prev => ({
        ...prev,
        message: "I would like to schedule a demo of the EdgeUp platform for my institution."
      }));
    }
  }, [isDemo]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    if (!formData.name || !formData.email || !formData.institution || !formData.message || !formData.role) {
      setError('Please fill out all required fields.');
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Add form submission to CMS
      addFormSubmission({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        institution: formData.institution,
        message: formData.message,
        role: formData.role
      });

      // Send email notification
      const emailEndpoint = '/functions/v1/send-notification';
      await fetch(emailEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recipients: ['info@edgeup.in', 'jubran@edgeup.in', 'arvind.p.cbe@gmail.com']
        })
      });
      
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        institution: '',
        message: '',
        role: 'individual'
      });
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-16 md:pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-[#094d88] mb-4">
              {isDemo ? 'Book a Demo' : 'Get in Touch'}
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {isDemo 
                ? 'Experience the power of AI-driven personalization for your educational institution.' 
                : "Have questions or want to learn more about EdgeUp? We are here to help."}
            </p>
          </div>
          
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="bg-[#094d88] text-white p-8 md:p-12">
                <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Mail size={20} />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium">Email Us</p>
                      <a 
                        href={`mailto:${siteSettings?.contactInfo?.email}`} 
                        className="text-blue-200 hover:text-white transition-colors"
                      >
                        {siteSettings?.contactInfo?.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Phone size={20} />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium">Call Us</p>
                      <a 
                        href={`tel:${siteSettings?.contactInfo?.phone}`} 
                        className="text-blue-200 hover:text-white transition-colors"
                      >
                        {siteSettings?.contactInfo?.phone}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <MapPin size={20} />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium">Visit Us</p>
                      <address className="not-italic text-blue-200">
                        {siteSettings?.contactInfo?.address}
                      </address>
                    </div>
                  </div>

                  {/* Google Maps Integration */}
                  <div className="mt-6">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8290740215574!2d80.24673147573892!3d13.0603399902862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267376515b75f%3A0x4afd61c7c0de4f78!2sEdgeUp!5e0!3m2!1sen!2sin!4v1710850058953!5m2!1sen!2sin"
                      width="100%"
                      height="200"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
                
                {isDemo && (
                  <div className="mt-10 pt-10 border-t border-blue-700">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Calendar size={20} className="mr-2" />
                      Prefer to schedule directly?
                    </h3>
                    <a 
                      href="https://calendly.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-white text-sm font-medium rounded-md text-white hover:bg-white/10 transition-colors"
                    >
                      Book on Calendly
                      <ExternalLink size={16} className="ml-2" />
                    </a>
                  </div>
                )}
              </div>
              
              <div className="p-8 md:p-12">
                {submitSuccess ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-green-500\" fill="none\" stroke="currentColor\" viewBox="0 0 24 24">
                        <path strokeLinecap="round\" strokeLinejoin="round\" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank You!</h3>
                    <p className="text-gray-600 mb-6">
                      Your message has been received. We will get back to you shortly.
                    </p>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-700"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                      {isDemo ? 'Request a Demo' : 'Send Us a Message'}
                    </h2>
                    
                    {error && (
                      <div className="mb-6 bg-red-50 border border-red-200 text-red-700 p-3 rounded">
                        {error}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-1">
                          Institution <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="institution"
                          name="institution"
                          value={formData.institution}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                        I am <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="individual">An Individual Learner</option>
                        <option value="institution">An Institution</option>
                        <option value="partner">Looking to Partner with EdgeUp</option>
                      </select>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
                    >
                      {isSubmitting ? 'Sending...' : isDemo ? 'Request Demo' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How quickly can we implement EdgeUp?</h3>
                <p className="text-gray-600">
                  Most institutions can be fully onboarded within 2-4 weeks, depending on the scale of implementation and existing systems integration.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Does EdgeUp integrate with our existing LMS?</h3>
                <p className="text-gray-600">
                  Yes, EdgeUp is designed to integrate seamlessly with most popular LMS platforms, including Moodle, Canvas, and custom solutions.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How is EdgeUp priced?</h3>
                <p className="text-gray-600">
                  We offer flexible pricing models based on institution size and feature requirements. Contact us for a custom quote tailored to your needs.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Is training provided for our staff?</h3>
                <p className="text-gray-600">
                  Absolutely. We provide comprehensive training for faculty and staff as part of our implementation process, ensuring everyone can maximize the platform's potential.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;