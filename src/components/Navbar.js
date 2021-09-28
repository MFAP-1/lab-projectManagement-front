import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { authContext } from "../contexts/authContext";

function Navbar() {
  const { logout } = useContext(authContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/projetos">
          Project.io
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/projetos">
                Home
              </NavLink>
            </li>
            <li
              className="nav-item d-flex align-items-center"
              onClick={logout}
              style={{ cursor: "pointer" }}
            >
              <span>Sair</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
