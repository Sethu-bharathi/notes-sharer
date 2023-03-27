import React, { useEffect, useRef, useState } from "react";
import "./NavbarMain.css";
import logo from "../../Assets/note-taking.png";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavUnlisted = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    text-decoration: none;
  }

  li {
    text-align: center;
    color: #fff;
    margin: 0 0.8rem;
    padding: 10px 10px;
    font-size: 1.2rem;
    position: relative;
    list-style: none;
  }
`;
const Navbarmain = () => {
  const activeClassName = "current";
  return (
    <nav className="main-nav">
      <div>
        <img src={logo} alt="Logo" srcSet="" height={50} />
      </div>
      <NavUnlisted>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? activeClassName : undefined)}
        >
          <li className="hover-line">Home</li>
        </NavLink>
        <NavLink
          to="/search-note"
          className={({ isActive }) => (isActive ? activeClassName : undefined)}
        >
          <li className="hover-line">Notes</li>
        </NavLink>
        <NavLink
          to="/new-note"
          className={({ isActive }) => (isActive ? activeClassName : undefined)}
        >
          <li className="hover-line">Create</li>
        </NavLink>
        <NavLink
          to="/upload-note"
          className={({ isActive }) => (isActive ? activeClassName : undefined)}
        >
          <li className="hover-line">Upload</li>
        </NavLink>
        <NavLink
          to="/chat-forum"
          className={({ isActive }) => (isActive ? activeClassName : undefined)}
        >
          <li className="hover-line">Chat</li>
        </NavLink>
        <NavLink
          to="/faq"
          className={({ isActive }) => (isActive ? activeClassName : undefined)}
        >
          <li className="hover-line">FAQ's</li>
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? activeClassName : undefined)}
        >
          <li className="hover-line">Login</li>
        </NavLink>
      </NavUnlisted>
    </nav>
  );
};
export default Navbarmain;
