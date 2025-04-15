import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const tabs = [
  "User Management",
  "Camera Configuration",
  "Alert & Notification Settings",
  "System Preferences",
];

const accordionItems = [
  "User Management",
  "Camera Configuration",
  "Alert & Notification Settings",
  "System Preferences",
  "Audit Logs & Activity History",
  "Integration Settings",
];

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("User Management");
  const [openAccordions, setOpenAccordions] = useState({});

  const toggleAccordion = (item) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  return (
  <div className="p-8 mt-20">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500">
          Manage system configurations, user roles, and preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b mb-6">
        {tabs.map((tab) => (
            <a
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`cursor-pointer pb-2 text-sm font-medium transition-colors duration-200 ${
                activeTab === tab
                ? "text-black border-b-2 border-green-600"
                : "text-[#A6814C] hover:text-green-700"
            }`}
            >
            {tab}
            </a>
        ))}
        </div>



      {/* Accordions */}
      <div className="space-y-2">
        {accordionItems.map((item) => (
          <div
            key={item}
            className="border-b cursor-pointer"
            onClick={() => toggleAccordion(item)}
          >
            <div className="flex justify-between items-center px-2 py-3">
              <span className="font-medium text-gray-800 text-sm">{item}</span>
              {openAccordions[item] ? (
                <ChevronUp size={16} className="text-gray-600" />
              ) : (
                <ChevronDown size={16} className="text-gray-600" />
              )}
            </div>

            {openAccordions[item] && (
              <div className="px-4 py-2 text-sm text-gray-600">
                {/* Replace this with real content */}
                Placeholder content for <strong>{item}</strong>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
