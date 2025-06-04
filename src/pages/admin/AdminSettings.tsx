import React, { useState } from 'react';
import { Save, Upload, Trash, Image } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminSidebar from '../../components/admin/AdminSidebar';

const AdminSettings: React.FC = () => {
  const { siteSettings, updateSiteSettings, media, addMedia } = useCMS();
  const [settings, setSettings] = useState(siteSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [showLogoSelector, setShowLogoSelector] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle nested properties
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setSettings({
        ...settings,
        [parent]: {
          ...settings[parent as keyof typeof settings],
          [child]: value
        }
      });
    } else {
      setSettings({
        ...settings,
        [name]: value
      });
    }
  };

  const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      contactInfo: {
        ...settings.contactInfo,
        socialLinks: {
          ...settings.contactInfo.socialLinks,
          [name]: value
        }
      }
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Create a URL for the uploaded file (in a real app, you'd upload to a server)
    const fileUrl = URL.createObjectURL(file);
    
    // Add to media library
    const mediaItem = {
      id: Date.now().toString(),
      name: file.name,
      type: 'image' as const,
      url: fileUrl,
      thumbnail: fileUrl,
      size: file.size,
      uploadedAt: new Date().toISOString()
    };
    
    addMedia(mediaItem);
    
    // Set as logo
    setSettings({
      ...settings,
      logo: fileUrl
    });

    // Reset file input
    e.target.value = '';
  };

  const handleSelectFromMedia = (mediaUrl: string) => {
    setSettings({
      ...settings,
      logo: mediaUrl
    });
    setShowLogoSelector(false);
  };

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call with small delay
    setTimeout(() => {
      updateSiteSettings(settings);
      setSaveMessage('Settings saved successfully!');
      setIsSaving(false);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSaveMessage('');
      }, 3000);
    }, 500);
  };

  // Filter media to only show images
  const imageMedia = media.filter(item => item.type === 'image');

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="pl-64">
        <AdminHeader title="Settings" />
        
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Site Settings</h2>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
              <Save size={16} className="mr-2" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

          {saveMessage && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 p-3 rounded">
              {saveMessage}
            </div>
          )}

          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">General Information</h3>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-1">
                    Site Name
                  </label>
                  <input
                    type="text"
                    id="siteName"
                    name="siteName"
                    value={settings.siteName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Logo
                  </label>
                  <div className="space-y-3">
                    {settings.logo && (
                      <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-md">
                        <img src={settings.logo} alt="Current Logo" className="h-12 w-auto" />
                        <div className="flex-1">
                          <p className="text-sm text-gray-600">Current Logo</p>
                        </div>
                        <button 
                          onClick={() => setSettings({...settings, logo: ''})}
                          className="text-red-600 hover:text-red-800"
                          title="Remove logo"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    )}
                    
                    <div className="flex space-x-2">
                      <label className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                        <Upload size={16} className="mr-2" />
                        Upload New Logo
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                        />
                      </label>
                      
                      {imageMedia.length > 0 && (
                        <button
                          onClick={() => setShowLogoSelector(true)}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <Image size={16} className="mr-2" />
                          Choose from Media
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactInfo.email"
                    value={settings.contactInfo.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="contactPhone"
                    name="contactInfo.phone"
                    value={settings.contactInfo.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="contactAddress" className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    id="contactAddress"
                    name="contactInfo.address"
                    value={settings.contactInfo.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Social Media Links</h3>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    id="linkedin"
                    name="linkedin"
                    value={settings.contactInfo.socialLinks.linkedin || ''}
                    onChange={handleSocialLinkChange}
                    placeholder="https://linkedin.com/company/your-company"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-1">
                    Twitter
                  </label>
                  <input
                    type="url"
                    id="twitter"
                    name="twitter"
                    value={settings.contactInfo.socialLinks.twitter || ''}
                    onChange={handleSocialLinkChange}
                    placeholder="https://twitter.com/your-handle"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 mb-1">
                    Facebook
                  </label>
                  <input
                    type="url"
                    id="facebook"
                    name="facebook"
                    value={settings.contactInfo.socialLinks.facebook || ''}
                    onChange={handleSocialLinkChange}
                    placeholder="https://facebook.com/your-page"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-1">
                    Instagram
                  </label>
                  <input
                    type="url"
                    id="instagram"
                    name="instagram"
                    value={settings.contactInfo.socialLinks.instagram || ''}
                    onChange={handleSocialLinkChange}
                    placeholder="https://instagram.com/your-profile"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">SEO Settings</h3>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="seoTitle" className="block text-sm font-medium text-gray-700 mb-1">
                    Default Page Title
                  </label>
                  <input
                    type="text"
                    id="seoTitle"
                    name="seoDefaults.title"
                    value={settings.seoDefaults.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="seoDescription" className="block text-sm font-medium text-gray-700 mb-1">
                    Default Meta Description
                  </label>
                  <textarea
                    id="seoDescription"
                    name="seoDefaults.description"
                    value={settings.seoDefaults.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Media Selector Modal */}
      {showLogoSelector && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowLogoSelector(false)} />
          <div className="relative bg-white rounded-lg max-w-4xl w-full mx-4 shadow-xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Choose Logo from Media Library</h3>
                <button
                  onClick={() => setShowLogoSelector(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
                {imageMedia.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectFromMedia(item.url)}
                    className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="h-24 bg-gray-100 flex items-center justify-center">
                      <img
                        src={item.url}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="p-2">
                      <p className="text-xs font-medium text-gray-900 truncate">{item.name}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {imageMedia.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No images in media library. Upload some images first.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSettings;