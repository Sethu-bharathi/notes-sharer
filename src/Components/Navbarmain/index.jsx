import React, { useEffect, useRef, useState } from "react";
import "./NavbarMain.css";
import logo from "../../Assets/note-taking.png"

const Navbarmain = () => {
  return <nav className="main-nav">
    <div>
      <img src={logo} alt="Logo" srcSet="" height={50}/>
    </div>
    <li>
      <ul>Home</ul>
      <ul>Notes</ul>
      <ul>Profile</ul>
      <ul>Login </ul>
    </li>
  </nav>;
};
export default Navbarmain;
