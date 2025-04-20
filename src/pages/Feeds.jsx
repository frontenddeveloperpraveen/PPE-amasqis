import React, { useEffect, useState } from "react";
import Searchbar from "../components/SearchBar_Filters";
import Camerafeed from "../components/Camerafeed";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE from "../BASE";
import { useCookies } from "react-cookie";

function Feeds() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [cameraData, setCameraData] = useState([]);

  const [filters, setFilters] = useState({
    location: "All",
    camera: "All",
    date: null,
    time: null,
    alertType: "All",
    incidentType: "All",
  });

  const fetchCameras = async (reset = false) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const token = cookies.token;
      if (!token) {
        console.error("No token found.");
        return;
      }

      const response = await axios.post(
        `${BASE}feeds`,
        { ...filters, page: reset ? 1 : page },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (reset) {
        setCameraData(response.data.cameras);
        setPage(2); // Reset to first page
      } else {
        setCameraData((prev) => [...prev, ...response.data.cameras]);
        setPage((prev) => prev + 1);
      }

      setHasMore(response.data.hasMore);
    } catch (error) {
      console.error("Error fetching cameras:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Reset and fetch first page when filters change
    fetchCameras(true);
  }, [filters]);

  const handleLoadMore = () => {
    fetchCameras();
  };

  return (
    <div className="w-full space-y-6">
      {/* Title */}
      <h1 className="text-3xl font-bold">Feed</h1>

      {/* Searchbar + Filters */}
      <Searchbar onFilterChange={setFilters} />

      {/* Section Title */}
      <div className="pt-4">
        <h2 className="text-xl font-semibold text-[#A6814C]">
          Yumna Field – Block 50{" "}
          <span className="text-sm font-normal text-gray-500">#0012</span>
        </h2>
      </div>

      {/* Video Grid */}
      <Camerafeed cameras={cameraData} />

      {/* Load more and Add camera buttons */}
      <div className="flex justify-between items-center pt-6">
        {hasMore && (
          <button
            className="bg-[#A6814C] text-white px-4 py-2 rounded-md hover:bg-[#926f3f] transition"
            onClick={handleLoadMore}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Load more"}
          </button>
        )}
      </div>
    </div>
  );
}

export default Feeds;
