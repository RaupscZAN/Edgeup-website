import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Image, 
  MessageSquare,
  Settings,
  LogOut,
  Quote,
  Blocks
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Logo from '../common/Logo';

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();
  
  const menuItems = [
    { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/admin/blocks', icon: <Blocks size={20} />, label: 'Content Blocks' },
    { path: '/admin/pages', icon: <FileText size={20} />, label: 'Pages' },
    { path: '/admin/testimonials', icon: <Quote size={20} />, label: 'Testimonials' },
    { path: '/admin/content', icon: <MessageSquare size={20} />, label: 'Inquiries' },
    { path: '/admin/media', icon: <Image size={20} />, label: 'Media' },
    { path: '/admin/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-black z-30">
      <div className="flex flex-col h-full">
        <div className="flex items-center h-16 px-4 bg-black/90">
          <Link to="/" className="flex items-center">
            <Logo isWhite />
          </Link>
        </div>

        <div className="flex-1 flex flex-col overflow-y-auto py-6">
          <nav className="flex-1 px-3 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm rounded-md transition-colors ${
                  location.pathname === item.path
                    ? 'bg-black/90 text-white'
                    : 'text-white hover:bg-black/70'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-black/70">
          <button
            onClick={logout}
            className="flex w-full items-center px-4 py-2 text-sm text-white hover:bg-black/70 rounded-md transition-colors"
          >
            <LogOut size={20} className="mr-3" />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;