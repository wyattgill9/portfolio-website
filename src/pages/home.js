import React, { useState } from 'react';

// Custom Icon Components
const Mic = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
    <line x1="12" y1="19" x2="12" y2="23"></line>
    <line x1="8" y1="23" x2="16" y2="23"></line>
  </svg>
);

const MicOff = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="1" y1="1" x2="23" y2="23"></line>
    <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
    <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
    <line x1="12" y1="19" x2="12" y2="23"></line>
    <line x1="8" y1="23" x2="16" y2="23"></line>
  </svg>
);

const Headphones = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
  </svg>
);

const HeadphonesX = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
    <line x1="15" y1="9" x2="20" y2="4"></line>
    <line x1="20" y1="9" x2="15" y2="4"></line>
  </svg>
);

const Video = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7"></polygon>
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
  </svg>
);

const VideoOff = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>
);

export default function Component() {
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-gray-700 p-4 rounded-lg shadow-lg">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
            JD
          </div>
          <div>
            <h2 className="text-white text-lg font-semibold">JohnDoe</h2>
            <p className="text-gray-400 text-sm">#1234</p>
          </div>
        </div>
        <div className="mt-4 flex justify-center space-x-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-2 rounded-full ${
              isMuted ? "bg-red-500 hover:bg-red-600" : "bg-gray-600 hover:bg-gray-500"
            }`}
          >
            {isMuted ? <MicOff /> : <Mic />}
          </button>
          <button
            onClick={() => setIsDeafened(!isDeafened)}
            className={`p-2 rounded-full ${
              isDeafened ? "bg-red-500 hover:bg-red-600" : "bg-gray-600 hover:bg-gray-500"
            }`}
          >
            {isDeafened ? <HeadphonesX /> : <Headphones />}
          </button>
          <button
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`p-2 rounded-full ${
              isVideoOn ? "bg-green-500 hover:bg-green-600" : "bg-gray-600 hover:bg-gray-500"
            }`}
          >
            {isVideoOn ? <Video /> : <VideoOff />}
          </button>
        </div>
      </div>
    </div>
  );
}