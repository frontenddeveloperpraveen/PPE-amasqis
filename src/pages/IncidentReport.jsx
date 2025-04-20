import React, { useState, useEffect } from "react";
import { Calendar, ChevronDown, Search } from "lucide-react";
import { Bar, Line } from "react-chartjs-2";
import axios from "axios";
import { useCookies } from "react-cookie";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import BASE from "../BASE";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// StatusBadge component
const StatusBadge = ({ status }) => {
  const statusColors = {
    Resolved: "bg-green-100 text-green-800",
    "Under Review": "bg-yellow-100 text-yellow-800",
    Pending: "bg-blue-100 text-blue-800",
    Critical: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${
        statusColors[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status}
    </span>
  );
};

// DatePicker component
const DatePicker = ({ value, onChange, maxDate, minDate, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(value || "");
  const [displayDate, setDisplayDate] = useState(
    value ? new Date(value).toLocaleDateString() : ""
  );

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    setDisplayDate(
      selectedDate ? new Date(selectedDate).toLocaleDateString() : ""
    );
    onChange(selectedDate);
    setIsOpen(false);
  };

  const toggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".date-picker-container")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="date-picker-container relative">
      <div
        className="flex items-center border rounded-md px-3 py-2 cursor-pointer hover:border-[#9F8D64]"
        onClick={toggleCalendar}
      >
        <Calendar className="h-5 w-5 text-gray-400 mr-2" />
        <span className={date ? "text-gray-900" : "text-gray-400"}>
          {displayDate || placeholder}
        </span>
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-1 bg-white border rounded-md shadow-lg p-2">
          <input
            type="date"
            className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#9F8D64]"
            value={date}
            onChange={handleDateChange}
            max={maxDate}
            min={minDate}
          />
        </div>
      )}
    </div>
  );
};

const IncidentReport = () => {
  const [cookies] = useCookies(["token"]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize data with default values to prevent undefined errors
  const [data, setData] = useState({
    recentReports: [],
    incidents: [],
    statistics: {
      incidentTrends: {
        total: 0,
        change: "+0%",
        categories: [],
      },
      cameraActivity: {
        totalHours: 0,
        change: "+0%",
        locations: [],
      },
    },
    locations: [],
    cameraIds: [],
    personnelList: [],
    incidentTypes: [],
    statusOptions: [],
  });

  // State management
  const [filters, setFilters] = useState({
    dateRange: {
      startDate: "",
      endDate: "",
    },
    location: "",
    cameraId: "",
    incidentType: "",
    status: "",
    personnel: "",
  });

  const [dropdowns, setDropdowns] = useState({
    incidentType: false,
    status: false,
    personnel: false,
    location: false,
    cameraId: false,
  });

  const [searchTerms, setSearchTerms] = useState({
    incidentType: "",
    status: "",
    personnel: "",
    location: "",
    cameraId: "",
  });

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = cookies.token;
        if (!token) {
          throw new Error("No authentication token found");
        }

        // Fetch all necessary data
        const [incidentsRes, statsRes, optionsRes] = await Promise.all([
          axios.get(BASE + "api/incidents", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get(BASE + "api/incidents/stats", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get(BASE + "api/incidents/options", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        setData({
          recentReports: incidentsRes.data.recentReports || [],
          incidents: incidentsRes.data.incidents || [],
          statistics: {
            incidentTrends: statsRes.data.incidentTrends || {
              total: 0,
              change: "+0%",
              categories: [],
            },
            cameraActivity: statsRes.data.cameraActivity || {
              totalHours: 0,
              change: "+0%",
              locations: [],
            },
          },
          locations: optionsRes.data.locations || [],
          cameraIds: optionsRes.data.cameraIds || [],
          personnelList: optionsRes.data.personnelList || [],
          incidentTypes: optionsRes.data.incidentTypes || [],
          statusOptions: optionsRes.data.statusOptions || [],
        });
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [cookies.token]);

  // Filter incidents when filters change
  const [filteredIncidents, setFilteredIncidents] = useState([]);
  useEffect(() => {
    if (!data.incidents || data.incidents.length === 0) {
      setFilteredIncidents([]);
      return;
    }

    const filtered = data.incidents.filter((incident) => {
      const incidentDate = incident.timestamp?.split(" ")[0] || "";
      return (
        (!filters.dateRange.startDate ||
          incidentDate >= filters.dateRange.startDate) &&
        (!filters.dateRange.endDate ||
          incidentDate <= filters.dateRange.endDate) &&
        (!filters.location || incident.location?.includes(filters.location)) &&
        (!filters.cameraId || incident.cameraId?.includes(filters.cameraId)) &&
        (!filters.incidentType || incident.event === filters.incidentType) &&
        (!filters.status || incident.status === filters.status) &&
        (!filters.personnel || incident.personnel?.includes(filters.personnel))
      );
    });

    setFilteredIncidents(filtered);
  }, [filters, data.incidents]);

  // Filter handlers
  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const handleDateRangeChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [type]: value,
      },
    }));
  };

  // Dropdown toggle
  const toggleDropdown = (dropdownName) => {
    setDropdowns((prev) => ({
      ...prev,
      [dropdownName]: !prev[dropdownName],
    }));
  };

  // Handle search term changes
  const handleSearchTermChange = (dropdownName, value) => {
    setSearchTerms((prev) => ({
      ...prev,
      [dropdownName]: value,
    }));
  };

  // Get max date (today) for date picker
  const getMaxDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  // Options for dropdowns with search functionality
  const getFilteredOptions = (dropdownName) => {
    const searchTerm = searchTerms[dropdownName]?.toLowerCase() || "";

    switch (dropdownName) {
      case "incidentType":
        return (data.incidentTypes || []).filter((type) =>
          type?.toLowerCase().includes(searchTerm)
        );
      case "status":
        return (data.statusOptions || []).filter((status) =>
          status?.toLowerCase().includes(searchTerm)
        );
      case "personnel":
        return (data.personnelList || []).filter((person) =>
          person?.toLowerCase().includes(searchTerm)
        );
      case "location":
        return (data.locations || []).filter((loc) =>
          loc?.toLowerCase().includes(searchTerm)
        );
      case "cameraId":
        return (data.cameraIds || []).filter((cam) =>
          cam?.toLowerCase().includes(searchTerm)
        );
      default:
        return [];
    }
  };

  // Chart data for incident trends - with null checks
  const incidentTrendsChartData = {
    labels: (data.statistics?.incidentTrends?.categories || []).map(
      (c) => c?.name || ""
    ),
    datasets: [
      {
        label: "Incidents",
        data: (data.statistics?.incidentTrends?.categories || []).map(
          (c) => c?.value || 0
        ),
        backgroundColor: "#F8F5EC",
        borderColor: "#9F8D64",
        borderWidth: 1,
      },
    ],
  };

  // Chart data for camera activity - with null checks
  const cameraActivityChartData = {
    labels: (data.statistics?.cameraActivity?.locations || []).map(
      (l) => l?.name || ""
    ),
    datasets: [
      {
        label: "Activity Hours",
        data: (data.statistics?.cameraActivity?.locations || []).map(
          (l) => l?.value || 0
        ),
        borderColor: "#9F8D64",
        backgroundColor: "rgba(159, 141, 100, 0.1)",
        tension: 0.1,
        fill: true,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  // Handle report download
  const handleDownloadReport = async () => {
    try {
      const token = cookies.token;
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.post(
        BASE + "api/incidents/report",
        filters,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "incident_report.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError(err.message);
      console.error("Error downloading report:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold">Incident Report</h1>

      {/* Filter Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <DatePicker
            value={filters.dateRange.startDate}
            onChange={(value) => handleDateRangeChange("startDate", value)}
            maxDate={getMaxDate()}
            placeholder="Select start date"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-medium mb-1">End Date</label>
          <DatePicker
            value={filters.dateRange.endDate}
            onChange={(value) => handleDateRangeChange("endDate", value)}
            maxDate={getMaxDate()}
            minDate={filters.dateRange.startDate}
            placeholder="Select end date"
          />
        </div>

        {/* Location Dropdown */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">Location</label>
          <div className="relative">
            <button
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#9F8D64] text-left flex justify-between items-center"
              onClick={() => toggleDropdown("location")}
            >
              {filters.location || "Select location"}
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  dropdowns.location ? "rotate-180" : ""
                }`}
              />
            </button>
            {dropdowns.location && (
              <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                <div className="p-2 sticky top-0 bg-white border-b">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search locations..."
                      className="w-full pl-8 pr-3 py-1.5 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#9F8D64]"
                      value={searchTerms.location}
                      onChange={(e) =>
                        handleSearchTermChange("location", e.target.value)
                      }
                      autoFocus
                    />
                  </div>
                </div>
                <div className="divide-y">
                  {getFilteredOptions("location").length > 0 ? (
                    getFilteredOptions("location").map((location) => (
                      <div
                        key={location}
                        className={`px-4 py-2 hover:bg-gray-50 cursor-pointer ${
                          filters.location === location ? "bg-gray-100" : ""
                        }`}
                        onClick={() => {
                          handleFilterChange("location", location);
                          toggleDropdown("location");
                        }}
                      >
                        {location}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500">
                      No locations found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          {dropdowns.location && (
            <div
              className="fixed inset-0 z-0"
              onClick={() => toggleDropdown("location")}
            />
          )}
        </div>

        {/* Camera ID Dropdown */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">Camera ID</label>
          <div className="relative">
            <button
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#9F8D64] text-left flex justify-between items-center"
              onClick={() => toggleDropdown("cameraId")}
            >
              {filters.cameraId || "Select camera"}
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  dropdowns.cameraId ? "rotate-180" : ""
                }`}
              />
            </button>
            {dropdowns.cameraId && (
              <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                <div className="p-2 sticky top-0 bg-white border-b">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search cameras..."
                      className="w-full pl-8 pr-3 py-1.5 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#9F8D64]"
                      value={searchTerms.cameraId}
                      onChange={(e) =>
                        handleSearchTermChange("cameraId", e.target.value)
                      }
                      autoFocus
                    />
                  </div>
                </div>
                <div className="divide-y">
                  {getFilteredOptions("cameraId").length > 0 ? (
                    getFilteredOptions("cameraId").map((cameraId) => (
                      <div
                        key={cameraId}
                        className={`px-4 py-2 hover:bg-gray-50 cursor-pointer ${
                          filters.cameraId === cameraId ? "bg-gray-100" : ""
                        }`}
                        onClick={() => {
                          handleFilterChange("cameraId", cameraId);
                          toggleDropdown("cameraId");
                        }}
                      >
                        {cameraId}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500">
                      No cameras found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          {dropdowns.cameraId && (
            <div
              className="fixed inset-0 z-0"
              onClick={() => toggleDropdown("cameraId")}
            />
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Recent Report */}
        <div className="w-full md:w-2/5 bg-[#F8F5EC] rounded-lg p-6">
          <h2 className="text-xl font-bold mb-6">Recent Reports</h2>
          <div className="space-y-4">
            {(data.recentReports || []).map((report) => (
              <div
                key={report.id}
                className="flex justify-between items-center"
              >
                <span>{report.name}</span>
                <StatusBadge status={report.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Filter Options */}
        <div className="w-full md:w-3/5 flex flex-wrap gap-2">
          {["incidentType", "status", "personnel"].map((dropdown) => (
            <div key={dropdown} className="relative">
              <button
                className="flex items-center gap-1 px-4 py-2 rounded-md border bg-white capitalize hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#9F8D64]"
                onClick={() => toggleDropdown(dropdown)}
              >
                {dropdown.replace(/([A-Z])/g, " $1")}
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    dropdowns[dropdown] ? "rotate-180" : ""
                  }`}
                />
              </button>
              {dropdowns[dropdown] && (
                <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                  <div className="p-2 sticky top-0 bg-white border-b">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder={`Search ${dropdown.replace(
                          /([A-Z])/g,
                          " $1"
                        )}...`}
                        className="w-full pl-8 pr-3 py-1.5 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#9F8D64]"
                        value={searchTerms[dropdown]}
                        onChange={(e) =>
                          handleSearchTermChange(dropdown, e.target.value)
                        }
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="divide-y">
                    {getFilteredOptions(dropdown).length > 0 ? (
                      getFilteredOptions(dropdown).map((option) => (
                        <div
                          key={option}
                          className={`px-4 py-2 hover:bg-gray-50 cursor-pointer ${
                            filters[dropdown] === option ? "bg-gray-100" : ""
                          }`}
                          onClick={() => {
                            handleFilterChange(dropdown, option);
                            toggleDropdown(dropdown);
                          }}
                        >
                          {option}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-gray-500">
                        No options found
                      </div>
                    )}
                  </div>
                </div>
              )}
              {dropdowns[dropdown] && (
                <div
                  className="fixed inset-0 z-0"
                  onClick={() => toggleDropdown(dropdown)}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Incidents Table */}
      <div className="overflow-x-auto bg-white rounded-lg border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#9F8D64] text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Timestamp
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Camera Location
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Event Type
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Assigned Personnel
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredIncidents.length > 0 ? (
              filteredIncidents.map((incident) => (
                <tr key={incident.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {incident.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {incident.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {incident.event}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {incident.personnel}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <StatusBadge status={incident.status} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No incidents found matching your filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-md flex items-center gap-2 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          onClick={handleDownloadReport}
        >
          Download Report
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 10L12 15L17 10"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 15V3"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#9F8D64] focus:ring-offset-2">
          Schedule Report
        </button>
      </div>

      {/* Stats Section - Only show if data exists */}
      {data.statistics && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Incident Trends */}
          <div>
            <div className="mb-4">
              <h2 className="text-xl font-bold">Incident Trends</h2>
              <div className="flex items-end gap-2">
                <div className="text-3xl font-bold">
                  {data.statistics.incidentTrends?.total || 0} incidents
                </div>
                <div className="text-green-600 text-sm">
                  Last 7 Days {data.statistics.incidentTrends?.change || "+0%"}
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border">
              <Bar
                data={incidentTrendsChartData}
                options={chartOptions}
                height={150}
              />
            </div>
          </div>

          {/* Camera Activity */}
          <div>
            <div className="mb-4">
              <h2 className="text-xl font-bold">Camera Activity Levels</h2>
              <div className="flex items-end gap-2">
                <div className="text-3xl font-bold">
                  {data.statistics.cameraActivity?.totalHours || 0} hours
                </div>
                <div className="text-red-600 text-sm">
                  Last 30 Days {data.statistics.cameraActivity?.change || "+0%"}
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border">
              <Line
                data={cameraActivityChartData}
                options={chartOptions}
                height={150}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentReport;
