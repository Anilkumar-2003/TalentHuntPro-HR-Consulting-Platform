import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { Bell, Sun, Moon, Search, X } from 'lucide-react';
import { Notification } from '../../types';
import { mockNotifications } from '../../data/mockData';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  
  const markAsRead = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const navigateToProfile = () => {
    navigate('/profile');
  };

  const getRoleDisplay = (role: string) => {
    return role === 'hr' ? 'HR Manager' : 'Guest User';
  };

  const getRoleBadgeColor = (role: string) => {
    return role === 'hr' ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-800';
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm h-16 px-6 flex items-center justify-between">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Search candidates, jobs, or markets..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {searchQuery && (
          <button 
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => setSearchQuery('')}
          >
            <X size={18} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
          </button>
        )}
      </div>
      
      <div className="flex items-center space-x-4">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <div className="relative">
          <button 
            onClick={toggleNotifications}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 h-5 w-5 rounded-full bg-error-500 text-white text-xs flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
              <div className="p-3 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                <h3 className="font-medium">Notifications</h3>
                {unreadCount > 0 && (
                  <button className="text-xs text-primary-600 dark:text-primary-400 hover:underline">
                    Mark all as read
                  </button>
                )}
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                  <div>
                    {notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`
                          p-3 border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer
                          ${!notification.read ? 'bg-primary-50 dark:bg-gray-800' : ''}
                        `}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start">
                          <div className={`
                            w-2 h-2 mt-1.5 rounded-full flex-shrink-0 mr-2
                            ${!notification.read ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-700'}
                          `} />
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{notification.title}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{notification.message}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {new Date(notification.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                    No notifications
                  </div>
                )}
              </div>
              <div className="p-2 border-t border-gray-200 dark:border-gray-800 text-center">
                <button className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>
        
        {user && (
          <div 
            className="flex items-center cursor-pointer"
            onClick={navigateToProfile}
          >
            <img 
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0D8ABC&color=fff`}
              alt="User profile" 
              className="w-8 h-8 rounded-full object-cover border-2 border-white dark:border-gray-800"
            />
            <div className="ml-2 hidden sm:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
              <div className="flex items-center">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                  {getRoleDisplay(user.role)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;