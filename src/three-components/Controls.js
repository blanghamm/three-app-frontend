import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { extend, useThree, useFrame } from "react-three-fiber";
import React, { useRef } from "react";

extend({ OrbitControls });

export default function Controls(props) {
  const { camera } = useThree();
  const controls = useRef();
  useFrame(() => controls.current.render(), 2);
  return <orbitControls ref={controls} args={[camera]} {...props} />;
}
