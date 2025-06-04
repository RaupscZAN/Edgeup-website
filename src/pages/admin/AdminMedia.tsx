import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Image, 
  File, 
  Film,
  Search,
  X,
  Trash
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { MediaItem } from '../../types';

const AdminMedia: React.FC = () => {
  const { media, addMedia, deleteMedia } = useCMS();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'image' | 'video' | 'document'>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter media items
  const filteredMedia = media.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // For demo purposes, we'll simulate uploading by creating a URL for the selected file
    // In a real app, you would upload this to a server
    const file = files[0];
    const fileType = file.type.startsWith('image/')
      ? 'image'
      : file.type.startsWith('video/')
      ? 'video'
      : 'document';

    // Create a mock URL (in a real app, this would be a server URL)
    const fileUrl = URL.createObjectURL(file);
    
    // Add the new media item
    addMedia({
      id: Date.now().toString(),
      name: file.name,
      type: fileType,
      url: fileUrl,
      thumbnail: fileType === 'image' ? fileUrl : undefined,
      size: file.size,
      uploadedAt: new Date().toISOString()
    });

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    setShowUploadModal(false);
  };

  const handleDeleteMedia = () => {
    if (selectedMedia) {
      deleteMedia(selectedMedia.id);
      setSelectedMedia(null);
      setShowDeleteModal(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'image':
        return <Image size={24} />;
      case 'video':
        return <Film size={24} />;
      default:
        return <File size={24} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="pl-64">
        <AdminHeader title="Media Library" />
        
        <main className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">Media Library</h2>
            <button
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Upload size={16} className="mr-2" />
              Upload Media
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
                  placeholder="Search media..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              
              <div className="flex">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-3 py-2 text-sm font-medium rounded-l-md ${
                    filterType === 'all'
                      ? 'bg-blue-800 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterType('image')}
                  className={`px-3 py-2 text-sm font-medium ${
                    filterType === 'image'
                      ? 'bg-blue-800 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border-t border-b border-gray-300'
                  }`}
                >
                  Images
                </button>
                <button
                  onClick={() => setFilterType('video')}
                  className={`px-3 py-2 text-sm font-medium ${
                    filterType === 'video'
                      ? 'bg-blue-800 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border-t border-b border-gray-300'
                  }`}
                >
                  Videos
                </button>
                <button
                  onClick={() => setFilterType('document')}
                  className={`px-3 py-2 text-sm font-medium rounded-r-md ${
                    filterType === 'document'
                      ? 'bg-blue-800 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                  }`}
                >
                  Documents
                </button>
              </div>
            </div>

            {filteredMedia.length > 0 ? (
              <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredMedia.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedMedia(item)}
                    className={`border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow ${
                      selectedMedia?.id === item.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <div className="h-32 bg-gray-100 flex items-center justify-center">
                      {item.type === 'image' && item.thumbnail ? (
                        <img
                          src={item.url}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="text-gray-400">
                          {getIconForType(item.type)}
                        </div>
                      )}
                    </div>
                    <div className="p-2">
                      <p className="text-xs font-medium text-gray-900 truncate">{item.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(item.size)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                No media items found. Upload some media to get started.
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Media detail panel (shown when media is selected) */}
      {selectedMedia && (
        <div className="fixed inset-0 overflow-y-auto z-40 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSelectedMedia(null)}></div>
          <div className="relative bg-white rounded-lg max-w-2xl w-full mx-4 shadow-xl">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Media Details</h3>
              <button
                onClick={() => setSelectedMedia(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                <div className="w-full md:w-1/2 bg-gray-100 rounded-lg p-4 flex items-center justify-center">
                  {selectedMedia.type === 'image' ? (
                    <img
                      src={selectedMedia.url}
                      alt={selectedMedia.name}
                      className="max-w-full max-h-48 object-contain"
                    />
                  ) : (
                    <div className="text-gray-400">
                      {getIconForType(selectedMedia.type)}
                    </div>
                  )}
                </div>
                
                <div className="w-full md:w-1/2">
                  <h4 className="font-medium text-gray-900 mb-2">{selectedMedia.name}</h4>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Type:</span>
                      <span className="text-gray-900 capitalize">{selectedMedia.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Size:</span>
                      <span className="text-gray-900">{formatFileSize(selectedMedia.size)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Uploaded:</span>
                      <span className="text-gray-900">
                        {new Date(selectedMedia.uploadedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                    <div className="flex">
                      <input
                        type="text"
                        value={selectedMedia.url}
                        readOnly
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50 text-sm"
                      />
                      <button
                        onClick={() => navigator.clipboard.writeText(selectedMedia.url)}
                        className="px-3 py-2 border border-gray-300 border-l-0 rounded-r-md bg-gray-50 text-gray-700 hover:bg-gray-100"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <Trash size={16} className="mr-2" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowUploadModal(false)}></div>
          <div className="relative bg-white rounded-lg max-w-md w-full mx-4 shadow-xl">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Upload Media</h3>
              
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*,video/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                />
                <div className="flex justify-center mb-4">
                  <Upload size={32} className="text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Click to browse or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  Supports: Images, Videos, Documents (PDF, Word)
                </p>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
              </div>
            </div>
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
                Are you sure you want to delete this media item? This action cannot be undone.
              </p>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteMedia}
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

export default AdminMedia;