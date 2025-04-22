import React, { useEffect, useState } from "react";
import Searchbar from "../components/SearchBar_Filters";
import Camerafeed from "../components/Camerafeed";
import ChartLineGraph from "../components/ChartLineGraph.jsx";
import ChartBarGraph from "../components/ChartBarGraph";
import ChartWaveGraph from "../components/ChartWaveGraph.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE from "../BASE";
import { useCookies } from "react-cookie";

function Overview() {
  // All data organized in a single JSON object
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);

  const [filters, setfilters] = useState({
    location: "All",
    camera: "All",
    date: null,
    time: null,
    alertType: "All",
    incidentType: "All",
  });

  const fetchOverview = async () => {
    try {
      const token = cookies.token;
      if (!token) {
        console.error("No token found.");
        return;
      }

      console.log("Filters request ->", filters);

      const response = await axios.post(
        `${BASE}overview`,
        filters, // send filters object directly
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Overview data (Response from server):", response.data);
      setdashboardData(response.data); // Update state with fetched data
      setisPageLoading(false);
      // TODO: Handle data (e.g., set state)
    } catch (error) {
      console.error("Error fetching overview:", error);
    }
  };

  useEffect(() => {
    console.log(filters);
    fetchOverview();
  }, [filters]);

  const [isPageLoading, setisPageLoading] = useState(true);

  const [dashboardData, setdashboardData] = useState({
    efficiencyChartData: [
      { week: "Week 1", value: 75, zone: "Zone 1" },
      { week: "Week 2", value: 85, zone: "Zone 2" },
      { week: "Week 3", value: 92, zone: "Zone 3" },
    ],

    monthlyResponse: [
      { month: "Jan", value: 60, zone: "Zone A" },
      { month: "Feb", value: 85, zone: "Zone B" },
      { month: "Mar", value: 95, zone: "Zone C" },
      { month: "Apr", value: 78, zone: "Zone D" },
    ],

    alertTrends: [
      { day: "Mon", alerts: 12, zone: "Zone 1" },
      { day: "Tue", alerts: 18, zone: "Zone 2" },
      { day: "Wed", alerts: 15, zone: "Zone 3" },
      { day: "Thu", alerts: 22, zone: "Zone 4" },
      { day: "Fri", alerts: 14, zone: "Zone 5" },
    ],

    performanceMetrics: [
      { hour: "00:00", performance: 45, zone: "Night" },
      { hour: "04:00", performance: 60, zone: "Night" },
      { hour: "08:00", performance: 85, zone: "Morning" },
      { hour: "12:00", performance: 92, zone: "Afternoon" },
      { hour: "16:00", performance: 78, zone: "Evening" },
      { hour: "20:00", performance: 65, zone: "Evening" },
    ],

    summaryReports: [
      {
        title: "Daily Security Report",
        subtitle: "Summarized incidents and alerts",
        img: "/images/daily.png",
      },
      {
        title: "Weekly Operations Summary",
        subtitle: "Detailed operational insights",
        img: "/images/weekly.png",
      },
      {
        title: "Monthly Incident Analysis",
        subtitle: "Comprehensive incident breakdown",
        img: "/images/monthly.png",
      },
    ],

    cameraData: [
      {
        id: 1,
        name: "Entrance Camera",
        location: "Main Entrance",
        isLive: true,
        streamUrl: "output_1.mp4",
      },
      {
        id: 2,
        name: "Parking Lot",
        location: "North Parking",
        isLive: true,
        streamUrl: "output_2.mp4",
      },
      {
        id: 3,
        name: "Reception",
        location: "Lobby Area",
        isLive: true,
        streamUrl: "output_3.mp4",
      },
      {
        id: 4,
        name: "Working Area",
        location: "Working Area",
        isLive: true,
        streamUrl: "output_4.mp4",
      },
      {
        id: 5,
        name: "Stairs",
        location: "Office",
        isLive: true,
        streamUrl: "output_5.mp4",
      },
      {
        id: 6,
        name: "Stairs",
        location: "Main Office",
        isLive: true,
        streamUrl: "output_6.mp4",
      },
      {
        id: 7,
        name: "Working Area",
        location: "Working Area",
        isLive: true,
        streamUrl: "output_7.mp4",
      },
      {
        id: 8,
        name: "Working Area",
        location: "Working Area",
        isLive: true,
        streamUrl: "output_8.mp4",
      },
      {
        id: 9,
        name: "Working Area",
        location: "Working Area",
        isLive: true,
        streamUrl: "output_9.mp4",
      },
      {
        id: 10,
        name: "Working Area",
        location: "Working Area",
        isLive: true,
        streamUrl: "output_10.mp4",
      },
    ],

    stats: {
      securityAlerts: 85,
      operationalEfficiency: 92,
      incidentResponseTime: 15,
      alertChange: "+5%",
      efficiencyChange: "+2%",
      responseTimeChange: "-3%",
    },
  });

  useEffect(() => {
    if (isPageLoading) {
      fetchOverview();
      setisPageLoading(false);
    }
  }, []);

  return (
    <>
      {isPageLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="loader">Loading</div>
        </div>
      ) : (
        <div className="space-y-8">
          <h1 className="text-3xl font-bold">Overview</h1>
          <Searchbar
            onFilterChange={(filters) => {
              console.log("Filters changed:", filters);
              setfilters(filters);
            }}
          />
          <Camerafeed cameras={dashboardData.cameraData} />

          {/* Analytics Overview */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Analytics Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Site Security Alerts with Bar Graph */}
              <div className="border rounded-xl p-4 shadow-sm">
                <h3 className="text-lg font-medium">Site Security Alerts</h3>
                <p className="text-2xl font-bold">
                  {dashboardData.stats.securityAlerts} Alerts
                </p>
                <p className="text-sm text-gray-500">
                  Last 24 hours{" "}
                  <span className="text-green-500">
                    {dashboardData.stats.alertChange}
                  </span>
                </p>
                <div className="mt-4 h-40">
                  <ChartBarGraph
                    data={dashboardData.alertTrends}
                    dataKey="day"
                    valueKey="alerts"
                    barColor="#F5F0E5"
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  {dashboardData.alertTrends.map((item, index) => (
                    <span key={index}>{item.zone}</span>
                  ))}
                </div>
              </div>

              {/* Operational Efficiency with Wave Graph */}
              <div className="border rounded-xl p-4 shadow-sm">
                <h3 className="text-lg font-medium">Operational Efficiency</h3>
                <p className="text-2xl font-bold">
                  {dashboardData.stats.operationalEfficiency}% Efficiency
                </p>
                <p className="text-sm text-gray-500">
                  Last week{" "}
                  <span className="text-green-500">
                    {dashboardData.stats.efficiencyChange}
                  </span>
                </p>
                <div className="mt-4 h-40">
                  <ChartWaveGraph
                    data={dashboardData.performanceMetrics}
                    dataKey="hour"
                    valueKey="performance"
                    waveColor="#757575"
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  {dashboardData.performanceMetrics
                    .filter((_, index) => index % 2 === 0)
                    .map((item, index) => (
                      <span key={index}>{item.zone}</span>
                    ))}
                </div>
              </div>

              {/* Incident Response Time */}
              <div className="md:col-span-2 border rounded-xl p-4 shadow-sm">
                <h3 className="text-lg font-medium">Incident Response Time</h3>
                <p className="text-2xl font-bold text-red-600">
                  {dashboardData.stats.incidentResponseTime} mins
                </p>
                <p className="text-sm text-gray-500">
                  Last month{" "}
                  <span className="text-red-500">
                    {dashboardData.stats.responseTimeChange}
                  </span>
                </p>

                <div className="mt-6 h-64 flex">
                  {/* Vertical Month Labels */}
                  {/* <div className="flex flex-col justify-between h-full mr-2 pb-7">
                {dashboardData.monthlyResponse.map((item, index) => (
                  <div
                    key={index}
                    className="text-xs text-gray-500 h-full flex items-center"
                  >
                    {item.month}
                  </div>
                ))}
              </div> */}

                  {/* Bar Chart */}
                  <div className="flex-grow">
                    <ChartBarGraph
                      data={dashboardData.monthlyResponse}
                      dataKey="month"
                      valueKey="value"
                      barColor="#F5F0E5"
                      horizontal={true}
                    />
                  </div>
                </div>

                {/* Zone Labels */}
              </div>
            </div>
          </section>

          {/* Summary Reports */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Summary Reports</h2>
            <div className="space-y-4">
              {dashboardData.summaryReports.map((report, index) => (
                <div
                  key={index}
                  className="flex items-center border rounded-xl p-4 shadow-sm"
                >
                  <div className="flex-grow">
                    <h4 className="text-lg font-medium">{report.title}</h4>
                    <p className="text-sm text-gray-500">{report.subtitle}</p>
                    <button
                      className="mt-2 text-sm text-white bg-black px-4 py-1 rounded-full hover:bg-gray-800"
                      onClick={() => navigate("/incident-report")}
                    >
                      View Report →
                    </button>
                  </div>
                  <img
                    src={report.img}
                    alt={report.title}
                    className="h-20 w-32 rounded-lg object-cover ml-4"
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default Overview;
