import { Environment, OrbitControls } from "@react-three/drei";
import MalaysiaMap from "./MalaysiaMap";
import { useFrame, useThree } from "@react-three/fiber";
import { forwardRef, useImperativeHandle, useState, useRef, useEffect } from "react";
import * as THREE from "three";
import GroundMap from "./GroundMap";

export const Experience = forwardRef(({ onStateClick, onResetZoom, showSplash }, ref) => {
  const controlsRef = useRef();
  const { camera } = useThree();
  const [targetState, setTargetState] = useState(null);
  const [zoomProgress, setZoomProgress] = useState(0);
  const [isResetting, setIsResetting] = useState(false);
  const [introPlayed, setIntroPlayed] = useState(false);
  const resetMapRef = useRef();
  const animatingRef = useRef(false);
  const audioRef = useRef(null);

  const startPos = useRef(new THREE.Vector3());
  const startTarget = useRef(new THREE.Vector3());
  const endPos = useRef(new THREE.Vector3());
  const endTarget = useRef(new THREE.Vector3());

  useImperativeHandle(ref, () => ({
    resetZoom,
    zoomOutToDefault,
  }));

  useEffect(() => {
    if (!introPlayed) {
      playIntroZoomOut();
      setIntroPlayed(true);
    }
  }, []);

  useFrame((state, delta) => {
    if (animatingRef.current) {
      setZoomProgress((p) => {
        const nextP = Math.min(p + delta / 2.5, 1); // slower speed for intro
        const eased = 1 - Math.pow(1 - nextP, 3);

        camera.position.lerpVectors(startPos.current, endPos.current, eased);
        controlsRef.current.target.lerpVectors(startTarget.current, endTarget.current, eased);
        controlsRef.current.update();

        if (nextP >= 1) {
          animatingRef.current = false;
          if (isResetting && onResetZoom) {
            setIsResetting(false);
            onResetZoom();
          }
        }

        return nextP;
      });
    }
  });

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  };

  const playAudioSequence = async (stateName) => {
    stopAudio();
    const audioPaths =
      stateName === "Kuala_Lumpur"
        ? [1, 2, 3].map((i) => `/audio/${stateName}_${i}.mp3`)
        : [`/audio/${stateName}.mp3`];

    for (const path of audioPaths) {
      const audio = new Audio(path);
      audioRef.current = audio;
      try {
        await new Promise((resolve, reject) => {
          audio.onended = resolve;
          audio.onerror = reject;
          audio.play();
        });
      } catch (err) {
        console.warn("Audio failed to play:", path, err);
      }
    }
  };

  const handleStateClick = (mesh) => {
    if (mesh === targetState) return;

    const stateName = mesh.name;
    playAudioSequence(stateName);

    setTargetState(mesh);
    setZoomProgress(0);
    animatingRef.current = true;

    startPos.current.copy(camera.position);
    startTarget.current.copy(controlsRef.current.target);

    const box = new THREE.Box3().setFromObject(mesh);
    const center = new THREE.Vector3();
    box.getCenter(center);

    endTarget.current.copy(center);

    const direction = new THREE.Vector3()
      .subVectors(camera.position, controlsRef.current.target)
      .normalize();
    endPos.current.copy(center).add(direction.multiplyScalar(2.5));

    if (onStateClick) onStateClick(mesh);
  };

  const resetZoom = () => {
    if (resetMapRef.current) resetMapRef.current();
    stopAudio();
    zoomOutToDefault(true);
  };

  const zoomOutToDefault = (isResettingMode = false) => {
    setZoomProgress(0);
    animatingRef.current = true;
    setIsResetting(isResettingMode);
    setTargetState(null);

    startPos.current.copy(camera.position);
    startTarget.current.copy(controlsRef.current.target);

    endPos.current.set(0, 1, 8);
    endTarget.current.set(0, 0, 0);
  };

  const playIntroZoomOut = () => {
    setZoomProgress(0);
    animatingRef.current = true;

    // start inside map or at some cinematic position
    startPos.current.set(0, 0.2, 0.3); // very close to ground
    startTarget.current.set(0, 0, 0);

    endPos.current.set(0, 1, 8); // default camera view
    endTarget.current.set(0, 0, 0);
  };

  return (
    <>
      <MalaysiaMap onStateClick={handleStateClick} resetRef={resetMapRef} showSplash={showSplash}/>

      {targetState && (
        <mesh
          position={[0, 0, 0]}
          onClick={(e) => {
            e.stopPropagation();
            resetZoom();
          }}
        > 
          <planeGeometry args={[100, 100]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      )}

      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enableRotate={!targetState}
        enablePan={!targetState}
      />

      <color attach="background" args={["#e0e7ff"]} />
      <Environment preset="city" />

      <directionalLight
        position={[5, 5, 5]}
        intensity={2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <GroundMap />
    </>
  );
});
