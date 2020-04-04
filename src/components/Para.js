import React from "react";
import { useSpring, a } from "react-spring";
import { useDrag } from "react-use-gesture";
import styled from "styled-components";

const P1 = styled(a.p)`
  justify-content: center;
  text-decoration: none;
  user-select: none;
  border-style: none !important;
  font-size: 20px;
  font-weight: bold;
  width: 200px;
`;

const Para = ({ socket }) => {
  const [{ x }, set] = useSpring(() => ({ x: 0, y: 0 }));

  const bind = useDrag(
    ({ down, movement: [mx, my] }) =>
      set(
        { x: down ? mx : 0, y: down ? my : 0, immediate: down },
        socket.emit("outgoing", mx / 1000)
      ),

    { bounds: { left: 0, right: 180, top: -50, bottom: 50 } }
  );

  return (
    <P1
      {...bind()}
      style={{
        x,
      }}
    >
      Nostrud amet ullamco minim id ea. Excepteur dolore occaecat proident ea
      labore. Veniam ullamco aliqua commodo eiusmod minim. Aliqua minim sunt
      elit id voluptate dolor amet Lorem officia enim ad. Nisi elit esse ullamco
      ipsum non cillum. Incididunt adipisicing deserunt ea officia ipsum
      consequat.
    </P1>
  );
};

export default Para;
