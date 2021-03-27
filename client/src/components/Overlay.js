import React from "react";
import { motion } from "framer-motion";

const overlayVariants = {
  initial: {
    opacity: 0,
    y: "-100vh",
    transition: {
      type: "linear",
    },
  },
  animate: {
    opacity: 1,
    y: "0vh",
    transition: {
      type: "linear",
    },
  },
};

const Overlay = ({ menuOpen, onOverlayClick }) => {
  return (
    <motion.div
      variants={overlayVariants}
      initial="initial"
      animate={menuOpen ? "animate" : "initial"}
      className="overlay"
      onClick={onOverlayClick}
    ></motion.div>
  );
};

export default Overlay;
