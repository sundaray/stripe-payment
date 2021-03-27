import React from "react";
import { motion } from "framer-motion";

const lineOneVariants = {
  initial: {
    rotate: 0,
    y: 0,
    transition: {
      type: "linear",
    },
  },
  animate: {
    rotate: 45,
    y: ".45rem",
    transition: {
      type: "linear",
    },
  },
};
const lineTwoVariants = {
  initial: {
    rotate: 0,
    y: 0,
    transition: {
      type: "linear",
    },
  },
  animate: {
    rotate: -45,
    y: "-.5rem",
    transition: {
      type: "linear",
    },
  },
};

const Hamburger = ({ menuOpen, onMenuClick }) => {
  return (
    <div className="hamburger" onClick={onMenuClick}>
      <div className="hamburger-line-container">
        <motion.div
          variants={lineOneVariants}
          initial="initial"
          animate={menuOpen ? "animate" : "initial"}
          className="hamburger-line hamburger-line-one"
        ></motion.div>
        <motion.div
          variants={lineTwoVariants}
          initial="initial"
          animate={menuOpen ? "animate" : "initial"}
          className="hamburger-line hamburger-line-two"
        ></motion.div>
      </div>
    </div>
  );
};

export default Hamburger;
