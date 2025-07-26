import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Globe, BarChart2, Briefcase, 
  LogOut, ChevronLeft, ChevronRight, Menu,
  Settings
} from 'lucide-react';
import toast from 'react-hot-toast';

interface SidebarProps {
  isMobile: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobile }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      if (isMobile && isMobileOpen && sidebar && !sidebar.contains(event.target as Node)) {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isMobileOpen]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard', allowedRoles: ['hr', 'guest'] },
    { name: 'Candidate Analytics', icon: <Users size={20} />, path: '/candidates', allowedRoles: ['hr'] },
    // { name: 'Market Mapping', icon: <Globe size={20} />, path: '/market-mapping', allowedRoles: ['hr', 'guest'] },
    // { name: 'Competitor Analysis', icon: <BarChart2 size={20} />, path: '/competitors', allowedRoles: ['hr', 'guest'] },
    { name: 'Job Roles', icon: <Briefcase size={20} />, path: '/job-roles', allowedRoles: ['hr', 'guest'] },
    { name: 'About Us', icon: <Settings size={20} />, path: '/about', allowedRoles: ['hr', 'guest'] },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isAllowed = (allowedRoles: string[]) => {
    return user && allowedRoles.includes(user.role);
  };

  const sidebarClasses = `
    h-screen bg-white dark:bg-gray-900 
    transition-all duration-300 ease-in-out 
    ${isMobile ? 'fixed top-0 left-0 z-50' : 'relative'} 
    ${isCollapsed && !isMobile ? 'w-20' : 'w-64'} 
    ${isMobile && isMobileOpen ? 'translate-x-0' : isMobile ? '-translate-x-full' : ''}
    shadow-lg
  `;

  return (
    <>
      {isMobile && (
        <button 
          onClick={toggleMobileSidebar}
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-primary-600 text-white"
        >
          <Menu size={24} />
        </button>
      )}
      
      <div id="sidebar" className={sidebarClasses}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold">
                TH
              </div>
              {!isCollapsed && (
                <h1 className="ml-3 font-bold text-gray-800 dark:text-white">TalentHuntPro</h1>
              )}
            </div>
            {!isMobile && (
              <button 
                onClick={toggleSidebar} 
                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
              >
                {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
              </button>
            )}
          </div>
          
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-2 px-2">
              {navItems.map((item) => {
                if (!isAllowed(item.allowedRoles)) {
                  return null;
                }
                
                return (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={`
                        flex items-center p-3 rounded-md transition-colors
                        ${isActive(item.path) 
                          ? 'bg-primary-50 text-primary-600 dark:bg-gray-800 dark:text-primary-400' 
                          : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                        }
                      `}
                    >
                      <span className="flex-shrink-0">{item.icon}</span>
                      {!isCollapsed && <span className="ml-3">{item.name}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <button 
              onClick={handleLogout}
              className="flex items-center w-full p-3 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
            >
              <LogOut size={20} />
              {!isCollapsed && <span className="ml-3">Logout</span>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;