import React from "react";
import MainTable from "./table/MainTable";
import Cards from "../Cards/Cards";
import Footer from "../footer/Footer";
function MainDash() {
  return (
    <div className="maindash">
      <Cards/>
      <MainTable />
      <Footer/>
    </div>
  );
}

export default MainDash;
