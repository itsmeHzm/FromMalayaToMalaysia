import { useGLTF, Html } from "@react-three/drei";
import { useRef, useState, useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function MalaysiaMap({ onStateClick, resetRef, showSplash, ...props }) {
  const { scene } = useGLTF("/Malaysia-map.glb");
  const mapRef = useRef();
  const { raycaster, mouse, camera, gl } = useThree();

  const originalMaterials = useRef(new Map());
  const [hoveredMesh, setHoveredMesh] = useState(null);
  const [clickedMesh, setClickedMesh] = useState(null);
  const [hoveredLabel, setHoveredLabel] = useState(null);
  const labelTimeout = useRef(null);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        originalMaterials.current.set(child.uuid, child.material);
      }
    });

    if (resetRef) {
      resetRef.current = () => {
        setClickedMesh(null);
        setHoveredMesh(null);
        setHoveredLabel(null);

        scene.traverse((child) => {
          if (child.isMesh) {
            const original = originalMaterials.current.get(child.uuid);
            if (original) {
              child.material = original;
            }
          }
        });
      };
    }
  }, [scene, resetRef]);

  const [rotationProgress, setRotationProgress] = useState(0);
  const totalDuration = 0;

  useEffect(() => {
    const handleClick = (event) => {
      const bounds = gl.domElement.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      const y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

      raycaster.setFromCamera({ x, y }, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        const clicked = intersects[0].object;

        if (clickedMesh && clickedMesh !== clicked) {
          clickedMesh.material = originalMaterials.current.get(clickedMesh.uuid);
        }

        clicked.material = clicked.material.clone();
        clicked.material.color = new THREE.Color("orange");
        clicked.material.emissive = new THREE.Color("orange");
        clicked.material.emissiveIntensity = 0.7;

        setClickedMesh(clicked);
        if (onStateClick) onStateClick(clicked);
      }
    };

    gl.domElement.addEventListener("click", handleClick);
    return () => gl.domElement.removeEventListener("click", handleClick);
  }, [raycaster, camera, scene, gl, onStateClick, clickedMesh]);

  useFrame((state, delta) => {
    if (rotationProgress < 1 && mapRef.current) {
      const newProgress = Math.min(rotationProgress + delta / totalDuration, 1);
      setRotationProgress(newProgress);

      const eased = 1 - Math.pow(1 - newProgress, 3);
      mapRef.current.rotation.y = Math.PI / 2 + Math.PI * 2 * eased + Math.PI;
    }

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const intersected = intersects[0].object;

      if (hoveredMesh !== intersected && intersected !== clickedMesh) {
        if (hoveredMesh && hoveredMesh !== clickedMesh) {
          hoveredMesh.material = originalMaterials.current.get(hoveredMesh.uuid);
        }

        intersected.material = intersected.material.clone();
        intersected.material.color = new THREE.Color("orange");
        intersected.material.emissive = new THREE.Color("orange");
        intersected.material.emissiveIntensity = 0.7;

        setHoveredMesh(intersected);
        setHoveredLabel({ mesh: intersected, name: intersected.name });

        clearTimeout(labelTimeout.current);
      }
    } else if (hoveredMesh && hoveredMesh !== clickedMesh) {
      hoveredMesh.material = originalMaterials.current.get(hoveredMesh.uuid);
      setHoveredMesh(null);

      // Fade out after delay
      labelTimeout.current = setTimeout(() => setHoveredLabel(null), 300);
    }
  });

  const labelPosition = useMemo(() => {
    if (!hoveredLabel?.mesh) return null;

    const box = new THREE.Box3().setFromObject(hoveredLabel.mesh);
    const center = new THREE.Vector3();
    box.getCenter(center);
    center.y += 1.2; // Slightly above the mesh
    return center;
  }, [hoveredLabel]);

  return (
    <>
      <primitive
        ref={mapRef}
        object={scene}
        scale={[0.16, 0.16, 0.16]}
        position={[-0.5, -2, 0]}
        {...props}
      />

      {!showSplash && hoveredLabel && labelPosition && (
        <Html position={labelPosition} center distanceFactor={10}>
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.75)",
              color: "#fff",
              padding: "6px 12px",
              borderRadius: "8px",
              fontSize: "14px",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            }}
          >
            {hoveredLabel.name.replace(/_/g, " ")}
          </div>
        </Html>
      )}
    </>
  );
}
