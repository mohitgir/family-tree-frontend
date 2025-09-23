import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      {/* //   <nav class="navbar bg-warning fixed-top">
    //     <div class="container-fluid">
    //  
    //     </div>

        
    //   </nav> */}
      <div className="row">
        <div className="col-md-3 bg-warning col-sm-12">
          <div className="bg-warning w-100">
            <nav className="navbar navbar-dark bg-warning MobileNavBar w-100">
              <div className="container-fluid">
                <a className="navbar-brand text-dark fw-bolder h1 " href="/">
                  Family-tree-app
                </a>
                <button
                  className="navbar-toggler "
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarToggleExternalContent"
                  aria-controls="navbarToggleExternalContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon text-dark" />
                </button>
              </div>
              <div className="w-100 border-bottom border-black"></div>
              <div className="MainSideNav py-3 w-100"><Sidebar/></div>
            </nav>
          </div>

          <div
            className="collapse"
            id="navbarToggleExternalContent"
            data-bs-theme="dark"
          >
            <div class="bg-warning p-4">
           <Sidebar/>
            </div>
          </div>

        </div>

        <div className="col-sm-12 col-md-9 min-vh-100  bg-dark text-white p-3">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
