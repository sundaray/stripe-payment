import React from "react";
import Hamburger from "./Hamburger";
import SideDrawer from "./SideDrawer";
import Overlay from "./Overlay";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./stateSlices/loginSlice";

const Header = ({
  menuOpen,
  onMenuClick,
  onOverlayClick,
  onSidedrawerNavbarLinkClick,
}) => {
  const { user } = useSelector((state) => state.login);

  const dispatch = useDispatch();

  const logoutSubmitHandler = () => {
    dispatch(logout());
    localStorage.removeItem("loggedInUser");
    window.location = "/";
  };

  return (
    <header>
      <Hamburger menuOpen={menuOpen} onMenuClick={onMenuClick} />
      <SideDrawer
        menuOpen={menuOpen}
        onSidedrawerNavbarLinkClick={onSidedrawerNavbarLinkClick}
      />
      <Overlay menuOpen={menuOpen} onOverlayClick={onOverlayClick} />
      <ul className="navbar-list">
        <li className="navbar-list-item">
          <NavLink
            to="/buy"
            className="navbar-link"
            activeStyle={{
              color: "#F2F2F2",
              borderBottom: ".3rem solid orangered",
              padding: "1rem 0",
            }}
          >
            Shop
          </NavLink>
        </li>
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
            <NavLink
              to="/registerLogin"
              className="navbar-link"
              activeStyle={{
                color: "#F2F2F2",
                borderBottom: ".3rem solid orangered",
                padding: "1rem 0",
              }}
            >
              Register/Login
            </NavLink>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
