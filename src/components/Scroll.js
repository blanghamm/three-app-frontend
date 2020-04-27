import React, { useEffect } from "react";
import { useSpring, a } from "react-spring";
import { useScroll } from "react-use-gesture";
import styled from "styled-components";

const Slider = styled(a.div)`
  justify-content: center;
  text-decoration: none;
  user-select: none;
  border-style: none !important;
  font-size: 20px;
  font-weight: bold;
  background: black;
`;

function Scroll() {
  const [{ width }, set] = useSpring(() => ({ width: "0%" }));
  const height = document.documentElement.scrollHeight;

  const bind = useScroll(
    ({ xy: [, y] }) => set({ width: (y / height) * 100 + "%" }),
    { domTarget: window }
  );

  useEffect(bind, [bind]);

  return <Slider style={{ width }} />;
}

export default Scroll;
