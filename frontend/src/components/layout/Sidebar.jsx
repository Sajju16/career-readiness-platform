import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
    { name: 'Career Goal', path: '/goal', icon: 'target' },
    { name: 'Resume Upload', path: '/resume', icon: 'upload_file' },
    { name: 'Analysis Report', path: '/report', icon: 'analytics' },
    { name: 'Learning Roadmap', path: '/roadmap', icon: 'auto_stories' },
    { name: 'Profile', path: '/profile', icon: 'person' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-[280px] bg-surface-container-lowest dark:bg-inverse-surface border-r border-outline-variant dark:border-outline hidden lg:flex flex-col p-stack-md z-50">
      <div className="mb-10 px-4">
        <h1 className="font-headline-md text-headline-md font-black text-primary dark:text-primary-fixed">CareerVelocity</h1>
        <p className="font-label-md text-label-md text-on-surface-variant">AI Readiness</p>
      </div>

      <nav className="flex-grow space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:translate-x-1 duration-200 ${
                isActive
                  ? 'bg-primary-container/10 text-primary dark:text-primary-fixed font-bold'
                  : 'text-on-surface-variant dark:text-surface-variant hover:bg-surface-container dark:hover:bg-surface-container-high'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`material-symbols-outlined ${isActive ? 'active-tab' : ''}`}
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                  data-icon={item.icon}
                >
                  {item.icon}
                </span>
                <span className="font-label-md text-label-md">{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-6 space-y-2 border-t border-outline-variant">
        <button className="w-full bg-primary text-on-primary py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity mb-4">
          <span className="material-symbols-outlined" data-icon="upload_file">upload_file</span>
          Analyze Resume
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-on-surface-variant dark:text-surface-variant hover:bg-surface-container dark:hover:bg-surface-container-high transition-all hover:translate-x-1 duration-200">
          <span className="material-symbols-outlined" data-icon="settings">settings</span>
          <span className="font-label-md text-label-md">Settings</span>
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-on-surface-variant dark:text-surface-variant hover:bg-surface-container dark:hover:bg-surface-container-high transition-all hover:translate-x-1 duration-200"
        >
          <span className="material-symbols-outlined" data-icon="logout">logout</span>
          <span className="font-label-md text-label-md">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
