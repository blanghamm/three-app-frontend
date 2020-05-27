import React, { useRef, useEffect, useMemo } from "react";
import { extend, useThree, useFrame } from "react-three-fiber";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass";
import * as THREE from "three";

extend({
  EffectComposer,
  ShaderPass,
  RenderPass,
  UnrealBloomPass,
  FilmPass,
});

export default function Effects() {
  const aspect = useMemo(() => new THREE.Vector3(), []);
  const composer = useRef();
  const { scene, gl, size, camera } = useThree();
  useEffect(() => void composer.current.setSize(size.width, size.height), [
    size,
  ]);
  useFrame(() => composer.current.render(), 2);
  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <unrealBloomPass
        attachArray="passes"
        scene={scene}
        camera={camera}
        args={[aspect, 0.4, 0, 0.9]}
      />
      <filmPass attachArray="passes" args={[0.05, 0.5, 15, false]} />
    </effectComposer>
  );
}
