import React, { useState } from 'react';
import { 
  Search, 
  Check, 
  Calendar,
  User,
  Building,
  Handshake,
  Clock,
  Phone,
  Mail,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { FormSubmission, EnquirerRole } from '../../types';

const AdminContent: React.FC = () => {
  const { formSubmissions, markSubmissionAsRead, updateSubmission } = useCMS();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [roleFilter, setRoleFilter] = useState<EnquirerRole | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<FormSubmission['status'] | 'all'>('all');
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');

  // Filter submissions based on all criteria
  const filteredSubmissions = formSubmissions.filter(submission => {
    const matchesSearch = 
      submission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.institution.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesReadFilter = 
      filter === 'all' ? true :
      filter === 'unread' ? !submission.isRead :
      submission.isRead;

    const matchesRoleFilter = 
      roleFilter === 'all' ? true :
      submission.role === roleFilter;

    const matchesStatusFilter =
      statusFilter === 'all' ? true :
      submission.status === statusFilter;

    return matchesSearch && matchesReadFilter && matchesRoleFilter && matchesStatusFilter;
  });

  const handleStatusChange = (submissionId: string, status: FormSubmission['status']) => {
    updateSubmission(submissionId, { status });
  };

  const handleSaveNotes = () => {
    if (selectedSubmission) {
      updateSubmission(selectedSubmission.id, { 
        notes,
        followUpDate: followUpDate || undefined
      });
      setShowNotes(false);
    }
  };

  const getRoleIcon = (role: EnquirerRole) => {
    switch (role) {
      case 'individual': return <User size={16} />;
      case 'institution': return <Building size={16} />;
      case 'partner': return <Handshake size={16} />;
    }
  };

  const getStatusColor = (status: FormSubmission['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-purple-100 text-purple-800';
      case 'closed': return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="pl-64">
        <AdminHeader title="Inquiries" />
        
        <main className="p-6">
          <div className="flex h-full">
            {/* Sidebar with submissions */}
            <div className="w-full md:w-96 bg-white border-r border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                {/* Search and filters */}
                <div className="space-y-4">
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search inquiries..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-full px-3 py-2 border rounded-md"
                    />
                  </div>

                  <div className="flex space-x-2">
                    <select
                      value={roleFilter}
                      onChange={(e) => setRoleFilter(e.target.value as EnquirerRole | 'all')}
                      className="flex-1 px-3 py-2 border rounded-md"
                    >
                      <option value="all">All Types</option>
                      <option value="individual">Individual</option>
                      <option value="institution">Institution</option>
                      <option value="partner">Partner</option>
                    </select>

                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as FormSubmission['status'] | 'all')}
                      className="flex-1 px-3 py-2 border rounded-md"
                    >
                      <option value="all">All Status</option>
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="in_progress">In Progress</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>

                  <div className="flex border rounded-md">
                    <button
                      onClick={() => setFilter('all')}
                      className={`flex-1 py-2 text-sm font-medium ${
                        filter === 'all' ? 'bg-blue-800 text-white' : 'bg-white text-gray-700'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setFilter('unread')}
                      className={`flex-1 py-2 text-sm font-medium ${
                        filter === 'unread' ? 'bg-blue-800 text-white' : 'bg-white text-gray-700'
                      }`}
                    >
                      Unread
                    </button>
                    <button
                      onClick={() => setFilter('read')}
                      className={`flex-1 py-2 text-sm font-medium ${
                        filter === 'read' ? 'bg-blue-800 text-white' : 'bg-white text-gray-700'
                      }`}
                    >
                      Read
                    </button>
                  </div>
                </div>
              </div>

              {/* Submissions list */}
              <div className="flex-1 overflow-y-auto">
                {filteredSubmissions.map((submission) => (
                  <div
                    key={submission.id}
                    onClick={() => {
                      setSelectedSubmission(submission);
                      if (!submission.isRead) {
                        markSubmissionAsRead(submission.id);
                      }
                    }}
                    className={`p-4 border-b cursor-pointer ${
                      selectedSubmission?.id === submission.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          {getRoleIcon(submission.role)}
                          <span className="font-medium">{submission.name}</span>
                        </div>
                        <p className="text-sm text-gray-600">{submission.institution}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-xs text-gray-500">
                          {new Date(submission.submittedAt).toLocaleDateString()}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full mt-1 ${getStatusColor(submission.status)}`}>
                          {submission.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submission details */}
            <div className="hidden md:block flex-1 bg-white p-6">
              {selectedSubmission ? (
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-semibold">{selectedSubmission.name}</h2>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedSubmission.status)}`}>
                          {selectedSubmission.status}
                        </span>
                        <span className="flex items-center text-gray-600">
                          {getRoleIcon(selectedSubmission.role)}
                          <span className="ml-1 capitalize">{selectedSubmission.role}</span>
                        </span>
                      </div>
                    </div>
                    
                    <select
                      value={selectedSubmission.status}
                      onChange={(e) => handleStatusChange(selectedSubmission.id, e.target.value as FormSubmission['status'])}
                      className="px-3 py-2 border rounded-md"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="in_progress">In Progress</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <Mail size={16} className="mr-2" />
                        <a href={`mailto:${selectedSubmission.email}`} className="text-blue-600 hover:underline">
                          {selectedSubmission.email}
                        </a>
                      </div>
                      {selectedSubmission.phone && (
                        <div className="flex items-center text-gray-600">
                          <Phone size={16} className="mr-2" />
                          <a href={`tel:${selectedSubmission.phone}`} className="text-blue-600 hover:underline">
                            {selectedSubmission.phone}
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <Building size={16} className="mr-2" />
                        <span>{selectedSubmission.institution}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock size={16} className="mr-2" />
                        <span>{new Date(selectedSubmission.submittedAt).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-lg font-medium mb-3 flex items-center">
                      <MessageSquare size={18} className="mr-2" />
                      Message
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="whitespace-pre-wrap">{selectedSubmission.message}</p>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Notes & Follow-up</h3>
                      <button
                        onClick={() => {
                          setNotes(selectedSubmission.notes || '');
                          setFollowUpDate(selectedSubmission.followUpDate || '');
                          setShowNotes(true);
                        }}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        {selectedSubmission.notes ? 'Edit Notes' : 'Add Notes'}
                      </button>
                    </div>

                    {selectedSubmission.followUpDate && (
                      <div className="flex items-center text-gray-600 mb-3">
                        <Calendar size={16} className="mr-2" />
                        <span>Follow-up scheduled for: {new Date(selectedSubmission.followUpDate).toLocaleDateString()}</span>
                      </div>
                    )}

                    {selectedSubmission.notes ? (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="whitespace-pre-wrap">{selectedSubmission.notes}</p>
                      </div>
                    ) : (
                      <div className="text-gray-500 italic">No notes added yet</div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <AlertCircle size={48} className="mx-auto mb-4 text-gray-400" />
                    <p>Select an inquiry to view details</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Notes Modal */}
      {showNotes && selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <h3 className="text-lg font-medium mb-4">Add Notes</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Follow-up Date
              </label>
              <input
                type="date"
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Add your notes here..."
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowNotes(false)}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNotes}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContent;