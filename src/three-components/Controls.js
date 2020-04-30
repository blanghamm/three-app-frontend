import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { extend, useThree, useFrame } from "react-three-fiber";
import React, { useRef } from "react";

extend({ OrbitControls });

export default function Controls(props) {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  const controls = useRef();
  useFrame((state) => controls.current.update());
  return (
    <orbitControls ref={controls} args={[camera, domElement]} {...props} />
  );
}
