import React, { useState } from 'react';
import { Plus, Pencil, Trash, Upload } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { Page, ContentBlock, Testimonial } from '../../types';

const AdminTestimonials: React.FC = () => {
  const { pages, updatePage } = useCMS();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<Testimonial | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Get homepage and testimonials block
  const homepage = pages.find(page => page.slug === 'home');
  const testimonialsBlock = homepage?.blocks.find(block => block.type === 'testimonials') as ContentBlock & {
    items: Testimonial[];
  };

  const handleSaveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!homepage || !currentTestimonial) return;

    const updatedBlocks = homepage.blocks.map(block => {
      if (block.type === 'testimonials') {
        const items = block.items as Testimonial[];
        if (currentTestimonial.id) {
          // Update existing testimonial
          return {
            ...block,
            items: items.map(item => 
              item.id === currentTestimonial.id ? currentTestimonial : item
            )
          };
        } else {
          // Add new testimonial
          return {
            ...block,
            items: [...items, { ...currentTestimonial, id: Date.now().toString() }]
          };
        }
      }
      return block;
    });

    updatePage({ ...homepage, blocks: updatedBlocks });
    setIsModalOpen(false);
    setCurrentTestimonial(null);
  };

  const handleDeleteTestimonial = (testimonialId: string) => {
    if (!homepage) return;

    const updatedBlocks = homepage.blocks.map(block => {
      if (block.type === 'testimonials') {
        return {
          ...block,
          items: (block.items as Testimonial[]).filter(item => item.id !== testimonialId)
        };
      }
      return block;
    });

    updatePage({ ...homepage, blocks: updatedBlocks });
    setShowDeleteModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="pl-64">
        <AdminHeader title="Testimonials" />
        
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Manage Testimonials</h2>
            <button
              onClick={() => {
                setCurrentTestimonial({
                  id: '',
                  name: '',
                  position: '',
                  institution: '',
                  quote: '',
                  avatar: ''
                });
                setIsModalOpen(true);
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-900"
            >
              <Plus size={16} className="mr-2" />
              Add Testimonial
            </button>
          </div>

          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {testimonialsBlock?.items.map((testimonial) => (
                <div key={testimonial.id} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">
                        {testimonial.position}, {testimonial.institution}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => {
                        setCurrentTestimonial(testimonial);
                        setIsModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setCurrentTestimonial(testimonial);
                        setShowDeleteModal(true);
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Edit Modal */}
      {isModalOpen && currentTestimonial && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white rounded-lg max-w-2xl w-full mx-4 shadow-xl">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                {currentTestimonial.id ? 'Edit Testimonial' : 'Add New Testimonial'}
              </h3>
            </div>
            
            <form onSubmit={handleSaveTestimonial}>
              <div className="p-6">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Avatar Image
                  </label>
                  <div className="flex items-center space-x-4">
                    {currentTestimonial.avatar && (
                      <img
                        src={currentTestimonial.avatar}
                        alt="Avatar preview"
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    )}
                    <input
                      type="url"
                      value={currentTestimonial.avatar}
                      onChange={(e) => setCurrentTestimonial({
                        ...currentTestimonial,
                        avatar: e.target.value
                      })}
                      placeholder="Enter image URL"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={currentTestimonial.name}
                      onChange={(e) => setCurrentTestimonial({
                        ...currentTestimonial,
                        name: e.target.value
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Position
                    </label>
                    <input
                      type="text"
                      value={currentTestimonial.position}
                      onChange={(e) => setCurrentTestimonial({
                        ...currentTestimonial,
                        position: e.target.value
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Institution
                  </label>
                  <input
                    type="text"
                    value={currentTestimonial.institution}
                    onChange={(e) => setCurrentTestimonial({
                      ...currentTestimonial,
                      institution: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quote
                  </label>
                  <textarea
                    value={currentTestimonial.quote}
                    onChange={(e) => setCurrentTestimonial({
                      ...currentTestimonial,
                      quote: e.target.value
                    })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-900"
                >
                  {currentTestimonial.id ? 'Update Testimonial' : 'Add Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && currentTestimonial && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowDeleteModal(false)} />
          <div className="relative bg-white rounded-lg max-w-md w-full mx-4 shadow-xl">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Delete</h3>
              <p className="text-gray-500 mb-6">
                Are you sure you want to delete this testimonial? This action cannot be undone.
              </p>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteTestimonial(currentTestimonial.id)}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;