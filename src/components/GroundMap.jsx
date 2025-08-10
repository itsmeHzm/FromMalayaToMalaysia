import { MeshReflectorMaterial } from "@react-three/drei";

const GroundMap = () => {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -1.5, 0]}
      receiveShadow
    >
      <planeGeometry args={[1000, 100000]} />
      <MeshReflectorMaterial
        resolution={1024}
        mirror={1}
        mixBlur={2}
        mixStrength={1.5}
        depthScale={0.3}
        minDepthThreshold={0.9}
        maxDepthThreshold={1}
        metalness={0.6}
        roughness={0.05}
        transparent={true}
        opacity={0} // 0 = fully transparent, 1 = fully opaque
        color="white" // you can also try light gray or remove this
      />
    </mesh>
  );
};

export default GroundMap;
