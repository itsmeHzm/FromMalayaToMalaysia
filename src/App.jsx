import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect } from "react";
import { Experience } from "./components/Experience";
import TimelinePanel from "./components/TimelinePanel";
import { Environment } from "@react-three/drei";

function App() {
  const [selectedState, setSelectedState] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const experienceRef = useRef();
  const [showSplash, setShowSplash] = useState(true);
const [isFadingOut, setIsFadingOut] = useState(false);
const [loadingProgress, setLoadingProgress] = useState(0);

useEffect(() => {
  const duration = Math.random() * 3000 + 2000; // 2000ms - 5000ms
  const startTime = Date.now();

  const interval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min((elapsed / duration) * 100, 100);
    setLoadingProgress(progress);

    if (progress >= 100) {
      clearInterval(interval);
      setIsFadingOut(true);
      setTimeout(() => setShowSplash(false), 1000); // after fade
    }
  }, 50);

  return () => clearInterval(interval);
}, []);


useEffect(() => {
  const timer = setTimeout(() => {
    setIsFadingOut(true);
    setTimeout(() => setShowSplash(false), 1000); // wait for fade out
  }, 3000);
  return () => clearTimeout(timer);
}, []);


  //Play background audio on load (or after interaction if blocked)
  useEffect(() => {
  const audio = new Audio("./audio/negaraku.mp3");
  audio.loop = true;
  audio.volume = 0.05;
  audioRef.current = audio;

  const tryPlay = () => {
    audioRef.current
      .play()
      .then(() => {
        console.log("🎶 Autoplay success");
      })
      .catch((err) => {
        console.warn("⚠️ Autoplay blocked, waiting for user interaction", err);

        const handleUserGesture = () => {
          audioRef.current?.play().catch((e) => console.warn("Still blocked:", e));
          window.removeEventListener("click", handleUserGesture);
        };

        window.addEventListener("click", handleUserGesture);
      });
  };

  tryPlay();

  return () => {
    audioRef.current?.pause();
  };
}, []);


  // 🔇 Toggle mute/unmute
  const toggleMute = () => {
  if (audioRef.current) {
    audioRef.current.muted = !audioRef.current.muted;
    setIsMuted(audioRef.current.muted);
    console.log("Muted:", audioRef.current.muted); // ✅ Confirm state
  }
};


  const handleClose = () => {
    if (experienceRef.current?.resetZoom) {
      experienceRef.current.resetZoom();
    }
    setSelectedState(null);
  };

  return (
    <main
      className="w-full h-full"
      style={{
        backgroundColor: "#ffffff",
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {showSplash && (
  <div
    onClick={() => {
      setIsFadingOut(true);
      setTimeout(() => setShowSplash(false), 1000);
    }}
    className={`splash-screen ${isFadingOut ? "fade-out" : ""}`}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        zIndex: 999,
      }}
    >
      <img
        src="/images/title.png"
        alt="Intro Splash"
        style={{
          maxWidth: "100%",
          maxHeight: "20vh",
          objectFit: "contain",
          pointerEvents: "none",
        }}
      />

      {/* Loading Bar */}
      <div
        style={{
          width: "900px",
          height: "10px",
          backgroundColor: "#ddd",
          borderRadius: "10px",
          marginTop: "20px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${loadingProgress}%`,
            height: "100%",
            backgroundColor: "#ffffff", //white
            transition: "width 0.1s linear",
          }}
        />
      </div>
    </div>
  </div>
)}



      {/* 🔇 Mute Button */}
      <button
        onClick={toggleMute}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          zIndex: 10,
          padding: "10px 15px",
          background: "rgba(255, 255, 255, 0.7)",
          border: "1px solid #ccc",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        {isMuted ? "🔈 Unmute" : "🔇 Mute"}
      </button>

      <img
  src="/images/title.png"
  alt="From Malaya To Malaysia Logo"
  style={{
    position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          maxWidth: "600px",
          height: "auto",
          objectFit: "contain",
          pointerEvents: "none",
  }}
/>

{/* Instruction Box */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          background: "rgba(0, 0, 0, 0.5)",
          color: "white",
          padding: "10px",
          borderRadius: "8px",
          fontSize: "13px",
          maxWidth: "220px",
          zIndex: 10,
        }}
      >
        🧭 How to Use:
        <ul style={{ margin: 0, paddingLeft: "16px" }}>
          <li>Click a state to view history</li>
          <li>Use mouse to rotate map</li>
          <li>Press "Mute" to toggle music</li>
        </ul>
      </div>
      <Canvas
        shadows
        camera={{
          position: [0, 1, 8],
          fov: 45,
        }}
      >
        <color attach="background" args={["#ffffff"]} />
        <Environment
          files="/hdr/citrus_orchard_road_puresky_1k.exr"
          background
        />

        <Suspense fallback={null}>
          <Experience
            ref={experienceRef}
            onStateClick={(mesh) => setSelectedState(mesh)}
            onResetZoom={() => setSelectedState(null)}
            showSplash={showSplash}
          />
        </Suspense>
      </Canvas>

      {selectedState && (
        <TimelinePanel
          selectedState={selectedState}
          onClose={handleClose}
        />
      )}
    </main>
  );
}

export default App;
