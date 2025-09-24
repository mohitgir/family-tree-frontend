import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Layout from "./components/Layout";
// import FamilyTree from "./components/FamilyTree";
// import Footer from "./components/Footer";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Members from "./components/Members";
import AddMember from "./components/AddMember";
import AddRelations from "./components/AddRelations";
import FindYourFamily from "./components/FindYourFamily";


// import dotenv from 'dotenv';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/addmember" element={<AddMember />} />
          <Route path="/members" element={<Members />} />
          <Route path="/addrelations" element={<AddRelations />} />
          <Route path="/findyourfamily" element={<FindYourFamily />} />
        </Route>
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
