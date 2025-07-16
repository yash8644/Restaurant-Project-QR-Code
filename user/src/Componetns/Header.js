import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("http://localhost:1337/api/getcategory")
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Example of how to use handleClick (if needed later)
  const handleClick = () => {
    if (list.length > 0) {
      navigate(`/Invoice/${list[0].Order_no}`);
    }
  };

  return (
    <>
      <div className="bg-box">
        <img src="images/hero-bg1.jpg" alt="" />
      </div>

      <header className="header_section">
        <div className="container">
          <nav className="navbar navbar-expand-lg custom_nav-container">
            <a className="navbar-brand" href="/">
              <span>Royal Bites</span>
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className=""> </span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/">Home</a>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Menu
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    {list.map((val, index) => (
                      <li key={index}>
                        <Link
                          to="/Menu"
                          state={{ Category_id: val.Category_id }}
                          className="dropdown-item"
                        >
                          {val.Category_name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="/About">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Review">Review</a>
                </li>
                {/* <li className="nav-item">
                <button className="pibtn" onClick={handleClick}>Invoice</button>
                </li> */}
              </ul>

              <div className="user_option">
                <a href="/Cart" className="user_link"></a>
                <a className="cart_link" href="/Cart">
                  <svg
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 456.029 456.029"
                    style={{ enableBackground: "new 0 0 456.029 456.029" }}
                    xmlSpace="preserve"
                  >
                    <g>
                      <g>
                        <path d="M345.6,338.862c-29.184,0-53.248,23.552-53.248,53.248s23.552,53.248,53.248,53.248c29.184,0,53.248-23.552,53.248-53.248S374.784,338.862,345.6,338.862z" />
                      </g>
                    </g>
                    <g>
                      <g>
                        <path d="M439.296,84.91c-1.024,0-2.56-0.512-4.096-0.512H112.64l-5.12-34.304C104.448,27.566,84.992,10.67,61.952,10.67H20.48C9.216,10.67,0,19.886,0,31.15s9.216,20.48,20.48,20.48h41.472c2.56,0,4.608,2.048,5.12,4.608l31.744,216.064c4.096,27.136,27.648,47.616,55.296,47.616h212.992c26.624,0,49.664-18.944,55.296-45.056l33.28-166.4C457.728,97.71,450.56,86.958,439.296,84.91z" />
                      </g>
                    </g>
                    <g>
                      <g>
                        <path d="M215.04,389.55c-1.024-28.16-24.576-50.688-52.736-50.688-29.696,1.536-52.224,26.112-51.2,55.296,1.024,28.16,24.064,50.688,52.224,50.688h1.024C193.536,443.31,216.576,418.734,215.04,389.55z" />
                      </g>
                    </g>
                  </svg>
                </a>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
