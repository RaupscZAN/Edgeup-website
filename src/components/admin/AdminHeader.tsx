import React from 'react';
import { Menu, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Logo from '../common/Logo';

interface AdminHeaderProps {
  title: string;
  onMenuToggle?: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ title, onMenuToggle }) => {
  const { currentUser, logout } = useAuth();
  const [showDropdown, setShowDropdown] = React.useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="flex items-center justify-between px-4 md:px-6 h-16">
        <div className="flex items-center">
          <button
            onClick={onMenuToggle}
            className="md:hidden mr-4 p-1 rounded-md hover:bg-gray-100 focus:outline-none"
          >
            <Menu size={24} />
          </button>
          <div className="md:hidden">
            <Logo />
          </div>
          <h1 className="hidden md:block text-xl font-semibold text-gray-800">{title}</h1>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-medium">
              {currentUser?.name?.charAt(0) || 'A'}
            </div>
            <span className="hidden md:block text-sm font-medium text-gray-700">
              {currentUser?.name || 'Admin'}
            </span>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
              <div className="px-4 py-2 text-sm text-gray-700 border-b">
                <p className="font-medium">{currentUser?.name}</p>
                <p className="text-gray-500">{currentUser?.email}</p>
              </div>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              >
                <LogOut size={16} className="mr-2" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;