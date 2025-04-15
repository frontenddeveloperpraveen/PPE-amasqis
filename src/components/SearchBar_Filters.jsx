import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  Plus,
  Calendar,
  Clock,
  Tag,
  AlertCircle,
} from "lucide-react";

function Searchbar({
  locations = [],
  cameras = [],
  tags = [],
  incidents = [],
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showCameraDropdown, setShowCameraDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showTagsDropdown, setShowTagsDropdown] = useState(false);
  const [showIncidentsDropdown, setShowIncidentsDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("00:00");
  const [selectedLocation, setSelectedLocation] = useState("All locations");
  const [selectedCamera, setSelectedCamera] = useState("All cameras");
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("All time");
  const [selectedTag, setSelectedTag] = useState("All tags");
  const [selectedIncident, setSelectedIncident] = useState("All incidents");

  const formatDate = (date) => {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  // Get today's date and calculate tomorrow and day after
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

  // Calculate max date (today)
  const maxDate = formatDate(today);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedTimeFilter(`Custom: ${e.target.value}`);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const toggleDropdown = (dropdown) => {
    // Close all dropdowns first
    setShowLocationDropdown(false);
    setShowCameraDropdown(false);
    setShowTimeDropdown(false);
    setShowTagsDropdown(false);
    setShowIncidentsDropdown(false);

    // Then toggle the selected one
    switch (dropdown) {
      case "location":
        setShowLocationDropdown(!showLocationDropdown);
        break;
      case "camera":
        setShowCameraDropdown(!showCameraDropdown);
        break;
      case "time":
        setShowTimeDropdown(!showTimeDropdown);
        break;
      case "tags":
        setShowTagsDropdown(!showTagsDropdown);
        break;
      case "incidents":
        setShowIncidentsDropdown(!showIncidentsDropdown);
        break;
      default:
        break;
    }
  };

  const selectOption = (type, value, label) => {
    switch (type) {
      case "location":
        setSelectedLocation(label);
        setShowLocationDropdown(false);
        break;
      case "camera":
        setSelectedCamera(label);
        setShowCameraDropdown(false);
        break;
      case "time":
        setSelectedTimeFilter(label);
        setShowTimeDropdown(false);
        break;
      case "tag":
        setSelectedTag(label);
        setShowTagsDropdown(false);
        break;
      case "incident":
        setSelectedIncident(label);
        setShowIncidentsDropdown(false);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-[#F8F5EC] border-none rounded-md focus:outline-none focus:ring-1"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-4 flex-wrap">
        {/* Location Dropdown */}
        <div className="relative">
          <button
            className="flex items-center gap-1 px-4 py-2 rounded-md border bg-[#F8F5EC]"
            onClick={() => toggleDropdown("location")}
          >
            {selectedLocation} <ChevronDown size={16} />
          </button>
          {showLocationDropdown && (
            <div className="absolute z-10 mt-1 w-56 bg-white rounded-md shadow-lg">
              <div className="p-2">
                <input
                  type="text"
                  placeholder="Search locations..."
                  className="w-full p-2 mb-2 border rounded"
                />
              </div>
              <ul className="max-h-60 overflow-auto">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => selectOption("location", "", "All locations")}
                >
                  All locations
                </li>
                {locations.map((location) => (
                  <li
                    key={location.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() =>
                      selectOption("location", location.id, location.name)
                    }
                  >
                    {location.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Camera Dropdown */}
        <div className="relative">
          <button
            className="flex items-center gap-1 px-4 py-2 rounded-md border bg-[#F8F5EC]"
            onClick={() => toggleDropdown("camera")}
          >
            {selectedCamera} <ChevronDown size={16} />
          </button>
          {showCameraDropdown && (
            <div className="absolute z-10 mt-1 w-56 bg-white rounded-md shadow-lg">
              <div className="p-2">
                <input
                  type="text"
                  placeholder="Search cameras..."
                  className="w-full p-2 mb-2 border rounded"
                />
              </div>
              <ul className="max-h-60 overflow-auto">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => selectOption("camera", "", "All cameras")}
                >
                  All cameras
                </li>
                {cameras.map((camera) => (
                  <li
                    key={camera.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() =>
                      selectOption("camera", camera.id, camera.name)
                    }
                  >
                    {camera.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Time Dropdown */}
        <div className="relative">
          <button
            className="flex items-center gap-1 px-4 py-2 rounded-md border bg-[#F8F5EC]"
            onClick={() => toggleDropdown("time")}
          >
            {selectedTimeFilter} <ChevronDown size={16} />
          </button>
          {showTimeDropdown && (
            <div className="absolute z-10 mt-1 w-64 bg-white rounded-md shadow-lg p-4">
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  className="px-3 py-1 border rounded"
                  onClick={() => selectOption("time", "", "All time")}
                >
                  All time
                </button>
                <button
                  className="px-3 py-1 border rounded"
                  onClick={() => {
                    setSelectedDate(formatDate(today));
                    selectOption("time", "today", "Today");
                  }}
                >
                  Today
                </button>
                <button
                  className="px-3 py-1 border rounded"
                  onClick={() => {
                    setSelectedDate(formatDate(tomorrow));
                    selectOption("time", "yesterday", "Yesterday");
                  }}
                >
                  Yesterday
                </button>
              </div>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={16} />
                  <span>Date</span>
                </div>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  max={maxDate} // Disables future dates
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={16} />
                  <span>Time</span>
                </div>
                <input
                  type="time"
                  value={selectedTime}
                  onChange={handleTimeChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          )}
        </div>

        {/* Tags Dropdown */}
        <div className="relative">
          <button
            className="flex items-center gap-1 px-4 py-2 rounded-md border bg-[#F8F5EC]"
            onClick={() => toggleDropdown("tags")}
          >
            <Tag size={16} />
            {selectedTag} <ChevronDown size={16} />
          </button>
          {showTagsDropdown && (
            <div className="absolute z-10 mt-1 w-56 bg-white rounded-md shadow-lg">
              <div className="p-2">
                <input
                  type="text"
                  placeholder="Search tags..."
                  className="w-full p-2 mb-2 border rounded"
                />
              </div>
              <ul className="max-h-60 overflow-auto">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => selectOption("tag", "", "All tags")}
                >
                  All tags
                </li>
                {tags.map((tag) => (
                  <li
                    key={tag.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => selectOption("tag", tag.id, tag.name)}
                  >
                    {tag.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Incidents Dropdown */}
        <div className="relative">
          <button
            className="flex items-center gap-1 px-4 py-2 rounded-md border bg-[#F8F5EC]"
            onClick={() => toggleDropdown("incidents")}
          >
            <AlertCircle size={16} />
            {selectedIncident} <ChevronDown size={16} />
          </button>
          {showIncidentsDropdown && (
            <div className="absolute z-10 mt-1 w-56 bg-white rounded-md shadow-lg">
              <div className="p-2">
                <input
                  type="text"
                  placeholder="Search incidents..."
                  className="w-full p-2 mb-2 border rounded"
                />
              </div>
              <ul className="max-h-60 overflow-auto">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => selectOption("incident", "", "All incidents")}
                >
                  All incidents
                </li>
                {incidents.map((incident) => (
                  <li
                    key={incident.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() =>
                      selectOption("incident", incident.id, incident.name)
                    }
                  >
                    {incident.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Add Camera Button */}
        <button className="flex items-center gap-2 px-4 py-2 rounded-md border bg-[#E0F7FA] text-[#00796B] hover:bg-[#B2EBF2] transition">
          <Plus size={16} />
          Add a new camera
        </button>
      </div>
    </div>
  );
}

export default Searchbar;
