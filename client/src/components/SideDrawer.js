import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./stateSlices/loginSlice";

const drawerVariants = {
  initial: {
    y: "-100vh",
    opacity: 0,
    transition: {
      type: "linear",
    },
  },
  animate: {
    y: "0vh",
    opacity: 1,
    transition: {
      type: "linear",
    },
  },
};

const SideDrawer = ({ menuOpen, onSidedrawerNavbarLinkClick }) => {
  const { user } = useSelector((state) => state.login);

  const dispatch = useDispatch();

  const logoutSubmitHandler = () => {
    dispatch(logout());
    localStorage.removeItem("loggedInUser");
    window.location = "/";
  };

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          variants={drawerVariants}
          initial="initial"
          animate="animate"
          exit="initial"
          className="sideDrawer"
        >
          <nav className="sideDrawer-navbar">
            <ul className="sideDrawer-navbar-list">
              <li onClick={onSidedrawerNavbarLinkClick}>
                <Link
                  to="/buy"
                  className="sideDrawer-navbar-link"
                  activeStyle={{
                    color: "#F2F2F2",
                    borderBottom: ".3rem solid orangered",
                    padding: "1rem 0",
                  }}
                >
                  Shop
                </Link>
              </li>
              <li className="sidedrawer-navbar-link-divider"></li>
              {user ? (
                <div class="dropdown">
                  <button
                    className="btn btn-lg btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenu2"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {user.firstName}
                  </button>
                  <div
                    className="dropdown-menu dropdown-menu-right"
                    aria-labelledby="dropdownMenu2"
                  >
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={logoutSubmitHandler}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <li className="navbar-list-item">
                  <Link
                    to="/registerLogin"
                    className="navbar-link"
                    activeStyle={{
                      color: "#F2F2F2",
                      borderBottom: ".3rem solid orangered",
                      padding: "1rem 0",
                    }}
                    onClick={onSidedrawerNavbarLinkClick}
                  >
                    Register/Login
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SideDrawer;
