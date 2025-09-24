// Sidebar.jsx
import React from "react";

const Sidebar = () => {
  return (
    <>
      {/* <div className="border-bottom w-100" > */}

      {/* <h5 className="pb-3 ps-4">Menu</h5> */}

      {/* </div> */}
      <ul className="nav flex-column w-100 px-3">
        <li className="nav-item  mb-2">
          <a href="/members" className=" text-white btn w-100 btn-dark">
            Members
          </a>
        </li>
        <li className="nav-item  mb-2">
          <a href="/addmember" className=" text-white btn w-100 btn-dark">
            Add Member
          </a>
        </li>
        <li className="nav-item mb-2">
          <a href="/relations" className="text-white btn w-100 btn-dark">
            Relations
          </a>
        </li>
        <li className="nav-item mb-2">
          <a href="/addrelations" className="text-white btn w-100 btn-dark">
            Add Relation
          </a>
        </li>
        <li className="nav-item mb-2">
          <a href="/findyourfamily" className="text-white btn w-100 btn-dark">
            Find Your Family
          </a>
        </li>
      </ul>
    </>
  );
};

export default Sidebar;
