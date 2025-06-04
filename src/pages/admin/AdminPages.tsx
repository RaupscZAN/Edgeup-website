import React, { useState } from 'react';
import { 
  Plus, 
  Pencil, 
  Trash, 
  Eye, 
  EyeOff,
  ArrowUp,
  ArrowDown,
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCMS } from '../../context/CMSContext';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { Page } from '../../types';

const AdminPages: React.FC = () => {
  const { pages, addPage, updatePage, deletePage } = useCMS();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pageToDelete, setPageToDelete] = useState<string | null>(null);

  // Filter and sort pages
  const filteredPages = pages
    .filter(page => 
      page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleAddPage = () => {
    setCurrentPage({
      id: '',
      title: '',
      slug: '',
      description: '',
      blocks: [],
      isPublished: true,
      lastUpdated: new Date().toISOString()
    });
    setIsModalOpen(true);
  };

  const handleEditPage = (page: Page) => {
    setCurrentPage(page);
    setIsModalOpen(true);
  };

  const handleDeletePage = (pageId: string) => {
    setPageToDelete(pageId);
    setShowDeleteModal(true);
  };

  const confirmDeletePage = () => {
    if (pageToDelete) {
      deletePage(pageToDelete);
      setShowDeleteModal(false);
      setPageToDelete(null);
    }
  };

  const handlePublishToggle = (page: Page) => {
    updatePage({
      ...page,
      isPublished: !page.isPublished
    });
  };

  const savePageDetails = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentPage) {
      if (currentPage.id) {
        // Update existing page
        updatePage(currentPage);
      } else {
        // Add new page
        addPage({
          ...currentPage,
          id: Date.now().toString(),
          lastUpdated: new Date().toISOString()
        });
      }
      setIsModalOpen(false);
      setCurrentPage(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="pl-64">
        <AdminHeader title="Pages" />
        
        <main className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">Pages</h2>
            <button
              onClick={handleAddPage}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus size={16} className="mr-2" />
              Add Page
            </button>
          </div>

          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-col md:flex-row space-y-2 md:space-y-0 md:items-center justify-between">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search pages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <button
                onClick={toggleSortOrder}
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Sort 
                {sortOrder === 'asc' ? (
                  <ArrowUp size={16} className="ml-2" />
                ) : (
                  <ArrowDown size={16} className="ml-2" />
                )}
              </button>
            </div>

            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Page Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Slug
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPages.map((page) => (
                  <tr key={page.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{page.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">/{page.slug}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(page.lastUpdated).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        page.isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {page.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handlePublishToggle(page)}
                          className="text-gray-500 hover:text-gray-700"
                          title={page.isPublished ? 'Unpublish' : 'Publish'}
                        >
                          {page.isPublished ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                        <button
                          onClick={() => handleEditPage(page)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDeletePage(page.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <Trash size={16} />
                        </button>
                        <Link
                          to={`/${page.slug}`}
                          target="_blank"
                          className="text-gray-500 hover:text-gray-700"
                          title="View"
                        >
                          <Eye size={16} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredPages.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                      No pages found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Page Modal */}
      {isModalOpen && currentPage && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white rounded-lg max-w-lg w-full mx-4 shadow-xl">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                {currentPage.id ? 'Edit Page' : 'Add New Page'}
              </h3>
            </div>
            
            <form onSubmit={savePageDetails}>
              <div className="p-6">
                <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Page Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={currentPage.title}
                    onChange={(e) => setCurrentPage({...currentPage, title: e.target.value})}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                    Slug
                  </label>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-1">/</span>
                    <input
                      type="text"
                      id="slug"
                      value={currentPage.slug}
                      onChange={(e) => setCurrentPage({...currentPage, slug: e.target.value})}
                      required
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description (SEO)
                  </label>
                  <textarea
                    id="description"
                    value={currentPage.description}
                    onChange={(e) => setCurrentPage({...currentPage, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPublished"
                    checked={currentPage.isPublished}
                    onChange={(e) => setCurrentPage({...currentPage, isPublished: e.target.checked})}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="isPublished" className="ml-2 text-sm text-gray-700">
                    Published
                  </label>
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
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {currentPage.id ? 'Update Page' : 'Add Page'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowDeleteModal(false)}></div>
          <div className="relative bg-white rounded-lg max-w-md w-full mx-4 shadow-xl">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Delete</h3>
              <p className="text-gray-500 mb-6">
                Are you sure you want to delete this page? This action cannot be undone.
              </p>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeletePage}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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

export default AdminPages;