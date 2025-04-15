import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Files,
  BarChart2,
  Settings,
  HelpCircle,
  FileText,
  Workflow,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className="w-64 min-h-screen bg-white border-r shrink-0 ">
      <div className="p-4 border-b ">
        <div className="flex items-center space-x-2">
          <div className="h-9 w-10 rounded-full bg-gray-100 flex items-center justify-center">
            <img
              src="/lovable-uploads/d81ce90e-3c44-4407-98e5-424e2aa1244f.png"
              alt="Logo"
              className="h-8 w-8 rounded-full"
            />
          </div>
          <div>
            <h3 className="font-medium text-sm">Acme Inc.</h3>
            <p className="text-xs text-gold">Petroleum & Gas Surveillance</p>
          </div>
        </div>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/overview"
              className={`flex items-center space-x-3 p-2 rounded-md ${
                isActive("/overview")
                  ? "bg-[#f8f5ec] text-gold"
                  : "hover:bg-gray-100"
              }`}
            >
              <Home size={18} />
              <span>Overview</span>
            </Link>
          </li>
          <li>
            <Link
              to="/feed"
              className={`flex items-center space-x-3 p-2 rounded-md ${
                isActive("/feed")
                  ? "bg-[#f8f5ec] text-gold"
                  : "hover:bg-gray-100"
              }`}
            >
              <Files size={18} />
              <span>Feed</span>
            </Link>
          </li>
          <li>
            <Link
              to="/performance"
              className={`flex items-center space-x-3 p-2 rounded-md ${
                isActive("/performance")
                  ? "bg-[#f8f5ec] text-gold"
                  : "hover:bg-gray-100"
              }`}
            >
              <BarChart2 size={18} />
              <span>Performance</span>
            </Link>
          </li>
          <li>
            <Link
              to="/incident-report"
              className={`flex items-center space-x-3 p-2 rounded-md ${
                isActive("/incident-report")
                  ? "bg-[#f8f5ec] text-gold"
                  : "hover:bg-gray-100"
              }`}
            >
              <FileText size={18} />
              <span>Incident reports</span>
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className={`flex items-center space-x-3 p-2 rounded-md ${
                isActive("/settings")
                  ? "bg-[#f8f5ec] text-gold"
                  : "hover:bg-gray-100"
              }`}
            >
              <Settings size={18} />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="absolute bottom-0 w-64 border-t">
        <ul className="p-4 space-y-2">
          <li>
            <Link
              to="/help"
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100"
            >
              <HelpCircle size={18} />
              <span>Help & feedback</span>
            </Link>
          </li>
          <li>
            <Link
              to="/docs"
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100"
            >
              <FileText size={18} />
              <span>Docs</span>
            </Link>
          </li>
          <li>
            <Link
              to="/api"
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100"
            >
              <Workflow size={18} />
              <span>API reference</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
