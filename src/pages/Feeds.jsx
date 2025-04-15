import React from "react";
import Searchbar from "../components/SearchBar_Filters";
import Camerafeed from "../components/Camerafeed";

function Feeds() {
  const cameraData = [
    {
      id: 1,
      name: "Entrance Camera",
      location: "Main Entrance",
      isLive: true,
      streamUrl: "Praveen.mp4",
    },
    {
      id: 2,
      name: "Parking Lot",
      location: "North Parking",
      isLive: false,
      streamUrl: "rtsp://example.com/stream2",
    },
    {
      id: 3,
      name: "Reception",
      location: "Lobby Area",
      isLive: false,
      streamUrl: "rtsp://example.com/stream3",
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Title */}
      <h1 className="text-3xl font-bold">Feed</h1>

      {/* Searchbar + Filters */}
      <Searchbar />

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
        <button className="bg-[#A6814C] text-white px-4 py-2 rounded-md hover:bg-[#926f3f] transition">
          Load more
        </button>
      </div>
    </div>
  );
}

export default Feeds;
