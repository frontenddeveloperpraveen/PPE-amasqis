import React, { useState } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import ChartLineGraph from "../components/ChartLineGraph";
import DetectionBarGraph from "../components/DetectionBarGraph";
import HealthHeatmap from "../components/HealthHeatmap";

const cameras = [
  {
    id: 1,
    name: "Camera 1",
    location: "Office, Sector: Lobby",
    image: "2f4ef973-e22e-407f-9e67-721c9173b0e2.png",
    analytics: {
      cost: "$100",
      period: "30 days",
      data: [12, 19, 3, 5, 2, 3, 15],
    },
  },
  // ... other cameras (as already defined)
];

const locations = ["All locations", "Office", "Warehouse", "Store", "Al Tajor"];
const timePeriods = ["All time", "Last 7 days", "Last 30 days", "Last 90 days"];

const PerformanceAnalytics = () => {
  const [expandedCamera, setExpandedCamera] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("All locations");
  const [selectedTime, setSelectedTime] = useState("All time");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showCameraDropdown, setShowCameraDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleCameraExpand = (cameraId) => {
    setExpandedCamera(expandedCamera === cameraId ? null : cameraId);
  };

  const filteredCameras = cameras.filter((camera) => {
    const matchesSearch =
      camera.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camera.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation =
      selectedLocation === "All locations" ||
      camera.location.includes(selectedLocation);
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Performance & Analytics</h1>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="AI Powered Search"
          className="w-full pl-10 pr-4 py-2.5 bg-[#F8F5EC] border-none rounded-md focus:outline-none focus:ring-1"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="flex gap-4 relative">
        {/* Location Filter */}
        <div className="relative">
          <button
            className="flex items-center gap-1 px-4 py-2 rounded-md border bg-[#F8F5EC] min-w-[150px] justify-between"
            onClick={() => setShowLocationDropdown(!showLocationDropdown)}
          >
            {selectedLocation}
            {showLocationDropdown ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>
          {showLocationDropdown && (
            <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
              {locations.map((location) => (
                <div
                  key={location}
                  className={`px-4 py-2 hover:bg-[#F8F5EC] cursor-pointer ${
                    selectedLocation === location ? "bg-[#F8F5EC]" : ""
                  }`}
                  onClick={() => {
                    setSelectedLocation(location);
                    setShowLocationDropdown(false);
                  }}
                >
                  {location}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Camera Filter */}
        <div className="relative">
          <button
            className="flex items-center gap-1 px-4 py-2 rounded-md border bg-[#F8F5EC] min-w-[150px] justify-between"
            onClick={() => setShowCameraDropdown(!showCameraDropdown)}
          >
            All cameras
            {showCameraDropdown ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>
          {showCameraDropdown && (
            <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
              {cameras.map((camera) => (
                <div
                  key={camera.id}
                  className="px-4 py-2 hover:bg-[#F8F5EC] cursor-pointer"
                  onClick={() => {
                    setExpandedCamera(camera.id);
                    setShowCameraDropdown(false);
                  }}
                >
                  {camera.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Time Filter */}
        <div className="relative">
          <button
            className="flex items-center gap-1 px-4 py-2 rounded-md border bg-[#F8F5EC] min-w-[150px] justify-between"
            onClick={() => setShowTimeDropdown(!showTimeDropdown)}
          >
            {selectedTime}
            {showTimeDropdown ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>
          {showTimeDropdown && (
            <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
              {timePeriods.map((period) => (
                <div
                  key={period}
                  className={`px-4 py-2 hover:bg-[#F8F5EC] cursor-pointer ${
                    selectedTime === period ? "bg-[#F8F5EC]" : ""
                  }`}
                  onClick={() => {
                    setSelectedTime(period);
                    setShowTimeDropdown(false);
                  }}
                >
                  {period}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Field Section */}
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gold">
            Yumna Field - Block 50
          </h2>
          <p className="text-gray-500">#0012</p>
        </div>

        {filteredCameras.map((camera) => (
          <div
            key={camera.id}
            className="bg-white rounded-lg border mb-4 overflow-hidden transition-all duration-200"
          >
            <div
              className="flex items-center p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleCameraExpand(camera.id)}
            >
              <div className="w-12 h-12 mr-4">
                <img
                  src={camera.image}
                  alt="Camera"
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{camera.name}</h3>
                <p className="text-sm text-gray-500">
                  Location: {camera.location}
                </p>
              </div>
              <div className="ml-4">
                {expandedCamera === camera.id ? (
                  <ChevronUp className="text-gray-500" />
                ) : (
                  <ChevronDown className="text-gray-500" />
                )}
              </div>
            </div>

            {expandedCamera === camera.id && (
              <div className="p-4 border-t animate-fadeIn">
                <h4 className="font-medium mb-1">{camera.name} Analytics</h4>
                <div className="flex items-baseline">
                  <p className="text-3xl font-bold">{camera.analytics.cost}</p>
                  <p className="text-sm text-gray-500 ml-2">
                    Report Cost: {camera.analytics.period}
                  </p>
                </div>
                <ChartLineGraph data={camera.analytics.data} className="mt-4" />
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <div>Jan 1</div>
                  <div>Jan 2</div>
                  <div>Jan 3</div>
                  <div>Jan 4</div>
                  <div>Jan 5</div>
                  <div>Jan 6</div>
                  <div>Jan 7</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Detection Summary Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">
          Weekly Detection Summary
        </h2>
        <DetectionBarGraph />
      </div>

      {/* System Health Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">System Health Overview</h2>
        <HealthHeatmap />
      </div>
    </div>
  );
};

export default PerformanceAnalytics;
