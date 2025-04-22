import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import {
  Search,
  ChevronDown,
  Plus,
  Calendar,
  Clock,
  Tag,
  AlertCircle,
  Loader2,
} from "lucide-react";
import BASE from "../BASE";

function Searchbar({
  onFilterChange, // Callback function to handle filter changes
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const [cookies] = useCookies(["token"]);

  // Dropdown visibility states
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showCameraDropdown, setShowCameraDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showTagsDropdown, setShowTagsDropdown] = useState(false);
  const [showIncidentsDropdown, setShowIncidentsDropdown] = useState(false);

  // Search terms for each dropdown
  const [locationSearchTerm, setLocationSearchTerm] = useState("");
  const [cameraSearchTerm, setCameraSearchTerm] = useState("");
  const [tagSearchTerm, setTagSearchTerm] = useState("");
  const [incidentSearchTerm, setIncidentSearchTerm] = useState("");

  // Selected values
  const [selectedDate, setSelectedDate] = useState("All");
  const [selectedTime, setSelectedTime] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All locations");
  const [selectedCamera, setSelectedCamera] = useState("All cameras");
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("All time");
  const [selectedTag, setSelectedTag] = useState("All tags");
  const [selectedIncident, setSelectedIncident] = useState("All incidents");

  // Data states
  const [locations, setLocations] = useState([]);
  const [cameras, setCameras] = useState([]);
  const [tags, setTags] = useState([]);
  const [incidents, setIncidents] = useState([]);

  // Loading states
  const [loadingLocations, setLoadingLocations] = useState(false);
  const [loadingCameras, setLoadingCameras] = useState(false);
  const [loadingTags, setLoadingTags] = useState(false);
  const [loadingIncidents, setLoadingIncidents] = useState(false);

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

  const fetchLocations = async () => {
    setLoadingLocations(true);
    try {
      // const response = await axios.get("/api/overview/locations");
      // setLocations(response.data);
      setLocations([
        { id: 1, name: "Location 1" },
        { id: 2, name: "Location 2" },
      ]);
    } catch (error) {
      console.error("Error fetching locations:", error);
    } finally {
      setLoadingLocations(false);
    }
  };

  // const fetchCameras = async () => {
  //   console.log("Fetching cameras...", cookies);
  //   setLoadingCameras(true);
  //   try {
  //     const response = await axios.get(BASE + "api/overview/cameras", {
  //       headers: {
  //         Authorization: `Bearer ${cookies.token}`,
  //       },
  //     });
  //     console.log("Cameras response:", response.data);
  //     setCameras(response.data.cameras);
  //   } catch (error) {
  //     console.error("Error fetching cameras:", error);
  //   } finally {
  //     setLoadingCameras(false);
  //   }
  // };

  const fetchCameras = async () => {
    console.log("Fetching cameras...", cookies);
    setLoadingCameras(true);
    try {
      const response = await axios.get(
        BASE + "api/overview/cameras?location=" + selectedLocation,
        {
          // headers: {
          //   Authorization: Bearer ${cookies.token},
          // },
        }
      );
      console.log("Cameras response:", response.data);
      setCameras(response.data.cameras);
    } catch (error) {
      console.error("Error fetching cameras:", error);
    } finally {
      setLoadingCameras(false);
    }
  };

  const fetchTags = async () => {
    setLoadingTags(true);
    try {
      // const response = await axios.get("/api/overview/tags");
      setTags([
        { id: 1, name: "Tag 1" },
        { id: 2, name: "Tag 2" },
        { id: 3, name: "Tag 3" },
      ]);
    } catch (error) {
      console.error("Error fetching tags:", error);
    } finally {
      setLoadingTags(false);
    }
  };

  const fetchIncidents = async () => {
    setLoadingIncidents(true);
    try {
      // const response = await axios.get("/api/overview/incidents");
      setIncidents([
        { id: 1, name: "Incident 1" },
        { id: 2, name: "Incident 2" },
        { id: 3, name: "Incident 3" },
        { id: 4, name: "Incident 4" },
        { id: 5, name: "Incident 5" },
      ]);
    } catch (error) {
      console.error("Error fetching incidents:", error);
    } finally {
      setLoadingIncidents(false);
    }
  };

  const toggleDropdown = (dropdown) => {
    // Close all dropdowns first
    setShowLocationDropdown(false);
    setShowCameraDropdown(false);
    setShowTimeDropdown(false);
    setShowTagsDropdown(false);
    setShowIncidentsDropdown(false);

    // Then toggle the selected one and fetch data if needed
    switch (dropdown) {
      case "location":
        setShowLocationDropdown(!showLocationDropdown);
        if (!showLocationDropdown && locations.length === 0) {
          fetchLocations();
        }
        break;
      case "camera":
        setShowCameraDropdown(!showCameraDropdown);
        if (!showCameraDropdown && cameras.length === 0) {
          fetchCameras();
        }
        break;
      case "time":
        setShowTimeDropdown(!showTimeDropdown);
        break;
      case "tags":
        setShowTagsDropdown(!showTagsDropdown);
        if (!showTagsDropdown && tags.length === 0) {
          fetchTags();
        }
        break;
      case "incidents":
        setShowIncidentsDropdown(!showIncidentsDropdown);
        if (!showIncidentsDropdown && incidents.length === 0) {
          fetchIncidents();
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    triggerFilterChange();
  }, [
    selectedCamera,
    selectedDate,
    selectedIncident,
    selectedLocation,
    selectedTag,
    selectedTime,
    selectedTimeFilter,
  ]);

  const triggerFilterChange = () => {
    if (onFilterChange) {
      const filters = {
        searchQuery,
        location:
          selectedLocation === "All locations" ? "All" : selectedLocation,
        camera: selectedCamera === "All cameras" ? "All" : selectedCamera,
        // timeFilter:
        //   selectedTimeFilter === "All time" ? null : selectedTimeFilter,
        date: selectedDate,
        time: selectedTime,
        alertType: selectedTag === "All tags" ? "All" : selectedTag,
        incidentType:
          selectedIncident === "All incidents" ? "All" : selectedIncident,
      };
      onFilterChange(filters);
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

  // Handle search query changes with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerFilterChange();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter functions for each dropdown
  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(locationSearchTerm.toLowerCase())
  );

  const filteredCameras = cameras.filter((camera) =>
    camera.name.toLowerCase().includes(cameraSearchTerm.toLowerCase())
  );

  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(tagSearchTerm.toLowerCase())
  );

  const filteredIncidents = incidents.filter((incident) =>
    incident.name.toLowerCase().includes(incidentSearchTerm.toLowerCase())
  );

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
                  value={locationSearchTerm}
                  onChange={(e) => setLocationSearchTerm(e.target.value)}
                />
              </div>
              <ul className="max-h-60 overflow-auto">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => selectOption("location", "", "All locations")}
                >
                  All locations
                </li>
                {loadingLocations ? (
                  <li className="px-4 py-2 flex justify-center">
                    <Loader2 className="animate-spin" />
                  </li>
                ) : (
                  filteredLocations.map((location) => (
                    <li
                      key={location.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() =>
                        selectOption("location", location.id, location.name)
                      }
                    >
                      {location.name}
                    </li>
                  ))
                )}
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
                  value={cameraSearchTerm}
                  onChange={(e) => setCameraSearchTerm(e.target.value)}
                />
              </div>
              <ul className="max-h-60 overflow-auto">
                {loadingCameras ? (
                  <li className="px-4 py-2 flex justify-center">
                    <Loader2 className="animate-spin" />
                  </li>
                ) : cameras.length === 0 ? (
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    No Camera Found
                  </li>
                ) : (
                  <>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => selectOption("camera", "", "All cameras")}
                    >
                      All cameras
                    </li>
                    {filteredCameras.map((camera) => (
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
                  </>
                )}
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
                  max={maxDate}
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
                  value={tagSearchTerm}
                  onChange={(e) => setTagSearchTerm(e.target.value)}
                />
              </div>
              <ul className="max-h-60 overflow-auto">
                {loadingTags ? (
                  <li className="px-4 py-2 flex justify-center">
                    <Loader2 className="animate-spin" />
                  </li>
                ) : filteredTags.length === 0 ? (
                  <li className="px-4 py-2 text-gray-500 text-center">
                    No tags found
                  </li>
                ) : (
                  <>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => selectOption("tag", "", "All tags")}
                    >
                      All tags
                    </li>
                    {filteredTags.map((tag) => (
                      <li
                        key={tag.id}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => selectOption("tag", tag.id, tag.name)}
                      >
                        {tag.name}
                      </li>
                    ))}
                  </>
                )}
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
                  value={incidentSearchTerm}
                  onChange={(e) => setIncidentSearchTerm(e.target.value)}
                />
              </div>
              <ul className="max-h-60 overflow-auto">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => selectOption("incident", "", "All incidents")}
                >
                  All incidents
                </li>
                {loadingIncidents ? (
                  <li className="px-4 py-2 flex justify-center">
                    <Loader2 className="animate-spin" />
                  </li>
                ) : (
                  filteredIncidents.map((incident) => (
                    <li
                      key={incident.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() =>
                        selectOption("incident", incident.id, incident.name)
                      }
                    >
                      {incident.name}
                    </li>
                  ))
                )}
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
