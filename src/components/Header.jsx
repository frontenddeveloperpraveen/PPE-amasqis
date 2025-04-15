import { BellRing, User } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const notifications = [
  { id: 1, message: "Helmet not detected for Worker 23" },
  { id: 2, message: "New compliance report is available" },
  { id: 3, message: "Temperature anomaly detected in Zone B" },
  { id: 4, message: "New user registered" },
  { id: 5, message: "Camera 3 disconnected" },
  { id: 6, message: "Inspection due in 3 days" },
  { id: 7, message: "Air quality warning issued" },
  { id: 8, message: "Visitor access request pending" },
  // { id: 9, message: "PPE checklist updated" },
  // { id: 10, message: "Fire drill scheduled tomorrow" },
];

const Header = () => {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);

  const getPageTitle = () => {
    const path = location.pathname;

    if (path === "/") return "PPE Compliance - Executive Dashboard - Report";
    if (path === "/health-monitoring") return "PPE Compliance";
    if (path === "/performance")
      return "PPE Compliance - Executive Dashboard - Analytics";

    return "PPE Compliance";
  };

  const notificationCount = notifications.length;
  const displayCount = notificationCount > 9 ? "9+" : notificationCount;

  return (
    <header className="border-b bg-white flex items-center justify-between p-4 relative">
      <h1 className="font-medium flex items-center gap-2">
        <span className="bg-black text-white p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5z" />
            <path d="M8 7h6" />
            <path d="M8 11h8" />
            <path d="M8 15h6" />
          </svg>
        </span>
        {getPageTitle()}
      </h1>

      <div className="flex items-center space-x-4 relative">
        <div className="relative">
          <button
            className="p-2 rounded-full hover:bg-gray-100 relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <BellRing size={20} />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 min-w-[18px] h-[18px] flex items-center justify-center leading-none">
                {displayCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 shadow-lg rounded-lg text-sm z-50">
              <div className="p-2 border-b font-semibold">
                Recent Notifications
              </div>
              <ul className="max-h-60 overflow-y-auto">
                {notifications.map((note) => (
                  <li
                    key={note.id}
                    className="px-3 py-2 hover:bg-gray-100 border-b last:border-none"
                  >
                    {note.message}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="User"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
