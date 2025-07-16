import React from "react";
function Sildebar(){
    return(
        <>
<nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item nav-profile">
            <div className="nav-link">
              <div className="profile-image">
                <img src="images/Face 14.jpg" alt="image"/>
              </div>
              <div className="profile-name">
                <p className="name">
                  Yash Chauhan
                </p>
                <p className="designation">                 
                </p>
              </div>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/Dashboard">
              <i className="fa fa-home menu-icon"></i>
              <span className="menu-title">Dashboard</span>
            </a>
          </li>
          {/* <li className="nav-item">
            <a className="nav-link" href="pages/Menu.js">
              <i className="fa fa-puzzle-piece menu-icon"></i>
              <span className="menu-title">Menu Management</span>
            </a>
          </li> */}
           <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#page-layouts" aria-expanded="false" aria-controls="page-layouts">
              <i className="fab fa-trello menu-icon"></i>
              <span className="menu-title">Manage Category</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="page-layouts">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item d-none d-lg-block"> <a className="nav-link" href="/AddCategory">Add Category</a></li>
                {/* <li className="nav-item"><a className="nav-link" href="/EditCategory">Edit Category</a></li> */}
                <li className="nav-item"> <a className="nav-link" href="/Viewcategory">View Category</a></li>
                
               
              </ul>
            </div>
          </li> 
          {/* <li className="nav-item d-none d-lg-block">
            <a className="nav-link" data-toggle="collapse" href="#sidebar-layouts" aria-expanded="false" aria-controls="sidebar-layouts">
              <i className="fas fa-columns menu-icon"></i>
              <span className="menu-title">Sidebar Layouts</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="sidebar-layouts">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <a className="nav-link" href="pages/layout/compact-menu.html">Compact menu</a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/layout/sidebar-collapsed.html">Icon menu</a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/layout/sidebar-hidden.html">Sidebar Hidden</a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/layout/sidebar-hidden-overlay.html">Sidebar Overlay</a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/layout/sidebar-fixed.html">Sidebar Fixed</a></li>
              </ul>
            </div>
          </li> */}
          {/* <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
              <i className="far fa-compass menu-icon"></i>
              <span className="menu-title">Basic UI Elements</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="ui-basic">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/accordions.html">Accordions</a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/buttons.html">Buttons</a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/badges.html">Badges</a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/breadcrumbs.html">Breadcrumbs</a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/dropdowns.html">Dropdowns</a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/modals.html">Modals</a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/progress.html">Progress bar</a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/pagination.html">Pagination</a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/tabs.html">Tabs</a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/typography.html">Typography</a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/tooltips.html">Tooltips</a></li>
              </ul>
              </div>
          </li> */}
          {/* <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#ui-advanced" aria-expanded="false" aria-controls="ui-advanced">
              <i className="fas fa-clipboard-list menu-icon"></i>
              <span className="menu-title">Advanced Elements</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="ui-advanced">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/dragula.html">Dragula</a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/clipboard.html">Clipboard</a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/context-menu.html">Context menu</a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/slider.html">Sliders</a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/carousel.html">Carousel</a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/colcade.html">Colcade</a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/loaders.html">Loaders</a></li>
              </ul>
            </div>
          </li> */}
          <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#form-elements" aria-expanded="false" aria-controls="form-elements">
              <i className="fab fa-wpforms menu-icon"></i>
              <span className="menu-title">Menu Management</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="form-elements">
              <ul className="nav flex-column sub-menu">
                           
                <li className="nav-item"><a className="nav-link" href="/Menu_Grid">Menu Grid</a></li>
                <li className="nav-item"><a className="nav-link" href="/AddProduct">Add Product</a></li>
                {/* <li className="nav-item"><a className="nav-link" href="Editmenu">Edit Menu</a></li> */}
              </ul>
            </div>
          </li>
          <li className="nav-item">
            {/* <a className="nav-link" data-toggle="collapse" href="#editors" aria-expanded="false" aria-controls="editors">
              <i className="fas fa-pen-square menu-icon"></i>
              <span className="menu-title">Invoice</span>
              <i className="menu-arrow"></i>
            </a> */}
            <div className="collapse" id="editors">
              {/* <ul className="nav flex-column sub-menu">
                <li className="nav-item"><a className="nav-link" href="/Invoice">Invoice Details</a></li>
                <li className="nav-item"><a className="nav-link" href="/InvoiceList">Invoice List</a></li>
              </ul> */}
            </div>
          </li>
          {/* <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#charts" aria-expanded="false" aria-controls="charts">
              <i className="fas fa-chart-pie menu-icon"></i>
              <span className="menu-title">Customer</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="charts">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <a className="nav-link" href="/Customer">Customer Review</a></li>
                <li className="nav-item"> <a className="nav-link" href="/CustomerList">Customer List</a></li>
               
              </ul>
              </div>
          </li> */}
           <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#tables" aria-expanded="false" aria-controls="tables">
              <i className="fas fa-table menu-icon"></i>
              <span className="menu-title">Table Management</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="tables">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <a className="nav-link" href="/viewtable">View Table</a></li>
                {/* <li className="nav-item"> <a className="nav-link" href="/Edittable">Edit Table</a></li> */}
                <li className="nav-item"> <a className="nav-link" href="/addtable">ADD table</a></li>
                
              </ul>
            </div>
          </li> 
          <li className="nav-item">
            <a className="nav-link" href="/Profile">
              <i className="fas fa-user menu-icon"></i>
              <span className="menu-title">Profile</span>
            </a>
          </li>
          {/* <li className="nav-item">
            <a className="nav-link" href="/Login">
              <i className="fas fa-user-circle menu-icon"></i>
              <span className="menu-title">Login</span>
            </a>
          </li> */}
          {/* <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#icons" aria-expanded="false" aria-controls="icons">
              <i className="fa fa-stop-circle menu-icon"></i>
              <span className="menu-title">Icons</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="icons">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <a className="nav-link" href="pages/icons/flag-icons.html">Flag icons</a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/icons/font-awesome.html">Font Awesome</a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/icons/simple-line-icon.html">Simple line icons</a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/icons/themify.html">Themify icons</a></li>
              </ul>
            </div>
          </li> */}
          {/* <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#maps" aria-expanded="false" aria-controls="maps">
              <i className="fas fa-map-marker-alt menu-icon"></i>
              <span className="menu-title">Maps</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="maps">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <a className="nav-link" href="pages/maps/mapeal.html">Mapeal</a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/maps/vector-map.html">Vector Map</a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/maps/google-maps.html">Google Map</a></li>
              </ul>
            </div>
          </li> */}
          {/* <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="/login" aria-expanded="false" aria-controls="auth">
              <i className="fas fa-user-circle"></i>
              <span className="menu-title">Login</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="auth">
              <ul className="nav flex-column sub-menu">
                
               
              </ul>
            </div>
          </li> */}
          {/* <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#error" aria-expanded="false" aria-controls="error">
              <i className="fas fa-exclamation-circle menu-icon"></i>
              <span className="menu-title">Error pages</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="error">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <a className="nav-link" href="pages/samples/error-404.html"> 404 </a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/samples/error-500.html"> 500 </a></li>
              </ul>
            </div>
          </li> */}
          {/* <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#general-pages" aria-expanded="false" aria-controls="general-pages">
              <i className="fas fa-file menu-icon"></i>
              <span className="menu-title">General Pages</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="general-pages">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <a className="nav-link" href="pages/samples/blank-page.html"> Blank Page </a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/samples/profile.html"> Profile </a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/samples/faq.html"> FAQ </a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/samples/faq-2.html"> FAQ 2 </a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/samples/news-grid.html"> News grid </a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/samples/timeline.html"> Timeline </a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/samples/search-results.html"> Search Results </a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/samples/portfolio.html"> Portfolio </a></li>
              </ul>
            </div>
          </li> */}
          {/* <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#apps" aria-expanded="false" aria-controls="apps">
              <i className="fas fa-briefcase menu-icon"></i>
              <span className="menu-title">Apps</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="apps">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <a className="nav-link" href="pages/apps/email.html"> Email </a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/apps/calendar.html"> Calendar </a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/apps/todo.html"> Todo </a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/apps/gallery.html"> Gallery </a></li>
              </ul>`
            </div>
          </li> */}
          {/* <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#e-commerce" aria-expanded="false" aria-controls="e-commerce">
              <i className="fas fa-shopping-cart menu-icon"></i>
              <span className="menu-title">E-commerce</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="e-commerce">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <a className="nav-link" href="pages/samples/invoice.html"> Invoice </a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/samples/pricing-table.html"> Pricing Table </a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/samples/orders.html"> Orders </a></li>
              </ul>
            </div>
          </li> */}
           <li className="nav-item">
            <a className="nav-link" href="/Changepass">
              <i className="far fa-file-alt menu-icon"></i>
              <span className="menu-title">Change Password</span>
            </a>
          </li> 
        </ul>
      </nav>
        </>
    );
}
export default Sildebar;