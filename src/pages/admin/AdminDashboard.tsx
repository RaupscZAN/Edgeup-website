import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Image, 
  Settings, 
  MessageSquare, 
  Plus, 
  PlusCircle 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCMS } from '../../context/CMSContext';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminSidebar from '../../components/admin/AdminSidebar';

const AdminDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { pages, media, formSubmissions } = useCMS();
  const navigate = useNavigate();

  const unreadSubmissions = formSubmissions.filter(s => !s.isRead).length;
  
  const stats = [
    { label: 'Pages', value: pages.length, icon: <FileText size={20} />, color: 'bg-blue-100 text-blue-800', path: '/admin/pages' },
    { label: 'Media Items', value: media.length, icon: <Image size={20} />, color: 'bg-purple-100 text-purple-800', path: '/admin/media' },
    { label: 'Inquiries', value: formSubmissions.length, badge: unreadSubmissions > 0 ? unreadSubmissions : undefined, icon: <MessageSquare size={20} />, color: 'bg-yellow-100 text-yellow-800', path: '/admin/content' },
    { label: 'Settings', value: '', icon: <Settings size={20} />, color: 'bg-gray-100 text-gray-800', path: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="pl-64">
        <AdminHeader title="Dashboard" />
        
        <main className="p-6">
          <div className="mb-8">
            <h2 className="text-gray-700 text-xl font-semibold mb-2">Welcome back, {currentUser?.name}</h2>
            <p className="text-gray-500">Manage your website content and settings</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                onClick={() => navigate(stat.path)}
                className={`${stat.color} rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {stat.icon}
                    <span className="ml-2 font-medium">{stat.label}</span>
                  </div>
                  {stat.badge !== undefined && (
                    <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      {stat.badge}
                    </span>
                  )}
                </div>
                <div className="mt-2 text-2xl font-semibold">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          <div className="mb-8">
            <h3 className="text-gray-700 font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => navigate('/admin/pages')}
                className="flex items-center justify-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-gray-800"
              >
                <PlusCircle size={18} className="mr-2" />
                Create New Page
              </button>
              <button
                onClick={() => navigate('/admin/media')}
                className="flex items-center justify-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-gray-800"
              >
                <Plus size={18} className="mr-2" />
                Upload Media
              </button>
              <button
                onClick={() => navigate('/admin/settings')}
                className="flex items-center justify-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-gray-800"
              >
                <Settings size={18} className="mr-2" />
                Update Settings
              </button>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-gray-700 font-semibold mb-4">Recent Form Submissions</h3>
            {formSubmissions.length > 0 ? (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Institution
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {formSubmissions.slice(0, 5).map((submission) => (
                      <tr key={submission.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate('/admin/content')}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{submission.name}</div>
                          <div className="text-sm text-gray-500">{submission.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{submission.institution}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {new Date(submission.submittedAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${submission.isRead ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {submission.isRead ? 'Read' : 'New'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center text-gray-500">
                No form submissions yet.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;