import "./header.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Oil from "../pages/Oil";
import Brake from "../pages/Brake";
import Filter from "../pages/Filter";
import Gear from "../pages/Gear";
import Light from "../pages/Light";

const Header = () => {
  return (
    <div className="header-wrapper">
      <Router>
        <div className="side-nav">
          <nav className="nav">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            end>
              Oil
            </NavLink>

            <NavLink
              to="/light"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Light
            </NavLink>
            <NavLink
              to="/filter"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Filter
            </NavLink>
            <NavLink
              to="/brake"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Brake
            </NavLink>
            <NavLink
              to="/gear"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
             Gear
            </NavLink>
          </nav>
        </div>
        <div className="side-content">
          <Routes>
           
            <Route path="/" element={<Oil />} />
            <Route path="/filter" element={<Filter />} />
            <Route path="/light" element={<Light />} />
            <Route path="/brake" element={<Brake />} />
            <Route path="/gear" element={<Gear />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default Header;
