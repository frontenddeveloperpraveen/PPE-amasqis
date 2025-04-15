import React from "react";
import { Search, ChevronDown } from "lucide-react";
import ChartLineGraph from "../components/ChartLineGraph";

const cameras = [
  {
    id: 1,
    name: "Camera 1",
    location: "Office, Sector: Lobby",
    image: "/lovable-uploads/2f4ef973-e22e-407f-9e67-721c9173b0e2.png"
  },
  {
    id: 2,
    name: "Camera 2",
    location: "Warehouse, Sector: Loading Bay",
    image: "/lovable-uploads/689d9128-eb3f-4f2b-a00b-9f5a8bb0057a.png"
  },
  {
    id: 3,
    name: "Camera 3",
    location: "Store, Sector: Checkout",
    image: "/lovable-uploads/2f4ef973-e22e-407f-9e67-721c9173b0e2.png"
  },
  {
    id: 4,
    name: "Camera 4",
    location: "Al Tajor, Sector: Oil Extraction",
    image: "/lovable-uploads/689d9128-eb3f-4f2b-a00b-9f5a8bb0057a.png"
  },
  {
    id: 5,
    name: "Camera 5",
    location: "Al Tajor, Sector: Stairs",
    image: "/lovable-uploads/2f4ef973-e22e-407f-9e67-721c9173b0e2.png"
  }
];

const HealthMonitoring = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Health Monitoring</h1>
      
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="AI Powered Search"
          className="w-full pl-10 pr-4 py-2.5 bg-[#F8F5EC] border-none rounded-md focus:outline-none focus:ring-1"
        />
      </div>
      
      {/* Filters */}
      <div className="flex gap-4">
        <button className="flex items-center gap-1 px-4 py-2 rounded-md border bg-[#F8F5EC]">
          All locations <ChevronDown size={16} />
        </button>
        <button className="flex items-center gap-1 px-4 py-2 rounded-md border bg-[#F8F5EC]">
          All cameras <ChevronDown size={16} />
        </button>
        <button className="flex items-center gap-1 px-4 py-2 rounded-md border bg-[#F8F5EC]">
          All time <ChevronDown size={16} />
        </button>
      </div>
      
      {/* Field Section */}
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gold">Yumna Field - Block 50</h2>
          <p className="text-gray-500">#0012</p>
        </div>
        
        {/* Camera 1 Analytics */}
        <div className="bg-white rounded-lg border mb-6">
          <div className="flex items-center p-4 border-b">
            <div className="w-12 h-12 mr-4">
              <img src="/lovable-uploads/2f4ef973-e22e-407f-9e67-721c9173b0e2.png" alt="Camera" className="w-full h-full object-cover rounded" />
            </div>
            <div>
              <h3 className="font-medium">Camera 1</h3>
              <p className="text-sm text-gray-500">Location: Office, Sector: Lobby</p>
            </div>
            <div className="ml-auto">
              <button className="text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="p-4">
            <h4 className="font-medium mb-1">Camera 1 Analytics</h4>
            <p className="text-sm text-gray-500 mb-4">Today</p>
            
            <ChartLineGraph />
            
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <div>1:00AM</div>
              <div>2:00PM</div>
              <div>3:00PM</div>
              <div>4:00PM</div>
              <div>5:00PM</div>
              <div>6:00PM</div>
              <div>7:00PM</div>
            </div>
          </div>
        </div>
        
        {/* Other Cameras */}
        {cameras.slice(1).map((camera) => (
          <div key={camera.id} className="bg-white rounded-lg border mb-4 flex items-center p-4">
            <div className="w-12 h-12 mr-4">
              <img src={camera.image} alt="Camera" className="w-full h-full object-cover rounded" />
            </div>
            <div>
              <h3 className="font-medium">{camera.name}</h3>
              <p className="text-sm text-gray-500">Location: {camera.location}</p>
            </div>
            <div className="ml-auto">
              <button className="text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthMonitoring;
