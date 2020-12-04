import React, { useState } from "react";
import "./styles.css";
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform
} from "framer-motion";
import Building from "./shasha.jpeg";

export default function App() {
  const [ballText, setBallText] = useState("DRAG DOWN TO ENTER");
  const controls = useAnimation();
  const y = useMotionValue(0);
  const buildingY = useTransform(y, [0, 195], [0, -100]);
  const lineY = useTransform(y, [0, 195], [0, 220]);
  const ballColor = useTransform(y, [0, 195], ["#000", "#fff"]);
  const textColor = useTransform(y, [0, 195], ["#fff", "#000"]);
  const ballScale = useTransform(y, [0, 195], [1, 2]);

  return (
    <div className="App" style={styles.app}>
      <div style={styles.lineWrap}>
        <motion.div style={styles.line} y={lineY} />
      </div>
      <motion.div
        drag="y"
        scale={ballScale}
        animate={controls}
        dragElastic={false}
        backgroundColor={ballColor}
        color={textColor}
        onDrag={(e, info) => {
          y.set(info.offset.y);
          if (y.get() > 100) {
            setBallText("ENTER");
          } else {
            setBallText("DRAG DOWN TO ENTER");
          }
        }}
        onDragEnd={() => {
          if (y.get() > 100) {
            controls.start({
              scale: 3,
              opacity: 0
            });
          } else {
            y.set(0);
            controls.start({
              y: 0
            });
          }
        }}
        dragConstraints={{ top: 0, bottom: 100 }}
        style={styles.ball}
      >
        {ballText}
      </motion.div>
      <motion.div style={styles.building} y={buildingY}>
        <img src={Building} height="100%" />
      </motion.div>
    </div>
  );
}

const styles = {
  app: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh"
  },
  line: {
    width: 1,
    backgroundColor: "#333",
    height: 95
  },
  lineWrap: {
    width: 1,
    height: 200,
    position: "absolute",
    marginTop: 100,
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    overflow: "hidden"
  },
  ball: {
    width: 100,
    height: 100,
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 11,
    cursor: "pointer",
    zIndex: 9999
  },
  building: {
    position: "absolute",
    bottom: -100,
    left: 0,
    right: 0,
    height: 400,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray",
    overflow: "hidden"
  }
};
