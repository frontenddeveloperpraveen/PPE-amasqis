import React, { useRef, useEffect } from "react";

function Camerafeed({ cameras = [] }) {
  if (cameras.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No cameras available. Please add cameras to view feeds.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
      {cameras.map((camera) => (
        <CameraCard key={camera.id} camera={camera} />
      ))}
    </div>
  );
}

function CameraCard({ camera }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && camera.isLive && camera.streamUrl) {
      try {
        videoRef.current.src = camera.streamUrl;
        videoRef.current.load();

        // Handle different stream types
        if (camera.streamType === "hls") {
          // If using HLS.js or similar library
          // const hls = new Hls();
          // hls.loadSource(camera.streamUrl);
          // hls.attachMedia(videoRef.current);
        } else if (camera.streamType === "webrtc") {
          // Initialize WebRTC connection
        } else {
          // Standard MP4 or other directly playable format
          videoRef.current
            .play()
            .catch((e) => console.error("Autoplay prevented:", e));
        }
      } catch (error) {
        console.error("Error loading video stream:", error);
      }
    }
  }, [camera.isLive, camera.streamUrl, camera.streamType]);

  return (
    <div className="bg-gray-100 h-60 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
      <div className="h-4/5 bg-gray-300 flex items-center justify-center relative">
        {camera.isLive && camera.streamUrl ? (
          <>
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              muted
              loop
              autoPlay
              playsInline
              controls={false}
            />
            {/* <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
              <span className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></span>
              LIVE
            </span> */}
            <button
              className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-full"
              onClick={() => videoRef.current?.requestFullscreen()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
            </button>
          </>
        ) : (
          <div className="text-gray-500 flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <span className="mt-2">
              {camera.streamUrl ? "Camera Offline" : "No Stream URL"}
            </span>
          </div>
        )}
      </div>
      <div className="h-1/5 p-2 bg-white flex flex-col">
        <div className="font-medium text-sm truncate">{camera.name}</div>
        <div className="text-xs text-gray-500 truncate">
          {camera.location}
          {camera.streamType && (
            <span className="ml-2 px-1 py-0.5 bg-gray-100 rounded text-xs">
              {camera.streamType.toUpperCase()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Camerafeed;
