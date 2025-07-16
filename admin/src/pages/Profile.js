import React from "react";

function Sidebar() {
  return (
    <>
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item nav-profile">
            <div className="nav-link">
              <div className="profile-image">
                <img src="images/Face 14.jpg" alt="profile" />
              </div>
              <div className="profile-name">
                <p className="name">Yash Chauhan</p>
              </div>
            </div>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="/Dashboard">
              <i className="fa fa-home menu-icon"></i>
              <span className="menu-title">Dashboard</span>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="/Creationform">
              <i className="fas fa-plus menu-icon"></i>
              <span className="menu-title">Creation Form</span>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="/Courselist">
              <i className="fas fa-list menu-icon"></i>
              <span className="menu-title">Course List</span>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="/Coursemanagement">
              <i className="fas fa-tasks menu-icon"></i>
              <span className="menu-title">Course Management</span>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="/Profile">
              <i className="fas fa-user menu-icon"></i>
              <span className="menu-title">Profile</span>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="/Changepass">
              <i className="fas fa-lock menu-icon"></i>
              <span className="menu-title">Change Password</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;
