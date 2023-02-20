import React, { useRef, useState, useEffect } from "react";
import "./Navbarmobile.css";
import logo from "../../Assets/note-taking.png";
import { BiMenu } from "react-icons/bi";
import { TbBrandGithub, TbSmartHome } from "react-icons/tb";
import { ImBlogger } from "react-icons/im";
import {
  BsPerson,
  BsFileEarmarkCode,
  BsMedium,
  BsInstagram,
} from "react-icons/bs";
import { BiClipboard } from "react-icons/bi";
import { GrProjects } from "react-icons/gr";
import { TbMessageCircle } from "react-icons/tb";
import { RiPencilLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { GiEvilFork } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";

function Navmobile() {

  const sidebaref = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const homelinkref = useRef(null);
  const aboutlinkref = useRef(null);
  const projectlinkref = useRef(null);
  const contactlinkref = useRef(null);
  const bloglinkref = useRef(null);
  const resumelinkref = useRef(null);
  const [sidebarisopen, setsidebarisopen] = useState(false);
  const [prevPath, setprevPath] = useState("/");

    useEffect(() => {
        changeShadow(prevPath,location.pathname)
        setprevPath(location.pathname)
    }, [location.pathname]);
    const toggleSidebar = () => {
        setsidebarisopen(!sidebarisopen)
        if (sidebarisopen) {
            sidebaref.current.style.transform = "translateX(-260px)"
        }
        else {
            sidebaref.current.style.transform = "translateX(0px)"
        }
    };
  function changeShadow(current, next) {
    if (current == "/") {
      homelinkref.current.classList.remove("selected-fill");
    } else if (current === "/about") {
      aboutlinkref.current.classList.remove("selected-fill");
    } else if (current === "/projects") {
      projectlinkref.current.classList.remove("selected-fill");
    } else if (current === "/contact") {
      contactlinkref.current.classList.remove("selected-fill");
    } else if (current === "/resume") {
      resumelinkref.current.classList.remove("selected-fill");
    } else if (current.includes("/blogs")) {
      bloglinkref.current.classList.remove("selected-fill");
    }
    if (next == "/") {
      homelinkref.current.classList.add("selected-fill");
    } else if (next === "/about") {
      aboutlinkref.current.classList.add("selected-fill");
    } else if (next === "/projects") {
      projectlinkref.current.classList.add("selected-fill");
    } else if (next === "/contact") {
      contactlinkref.current.classList.add("selected-fill");
    } else if (next === "/resume") {
      resumelinkref.current.classList.add("selected-fill");
    } else if (next.includes("/blogs")) {
      bloglinkref.current.classList.add("selected-fill");
    }
  }

  const fn = (name) => {
    setsidebarisopen(!sidebarisopen);
    navigate(name);
    if (sidebarisopen) {
      sidebaref.current.style.transform = "translateX(-260px)";
    } else {
      sidebaref.current.style.transform = "translateX(0px)";
    }
  };
  return (
    <div className="mobile-nav">
      <div className="mob-nav">
        <div className="mob-nav-left">
          <img src={logo} />
        </div>
        <div className="mob-nav-right" onClick={toggleSidebar}>
          {sidebarisopen ? (
            <IoMdClose color="var(--fg-green)" size={38} />
          ) : (
            <BiMenu color="var(--fg-green)" size={38} />
          )}
        </div>
      </div>
      <div className="sidebar" ref={sidebaref}>
        <div className="logo-mob">
          <img src={logo} />
        </div>
        <div>
          <div className="mob-nav-links">
            <div
              className="mob-nav-link"
              ref={homelinkref}
              onClick={() => fn("/")}
            >
              <div>
                <TbSmartHome size={20} color="#AFB1B8" />
              </div>
              <div>Home</div>
            </div>
            <div
              className="mob-nav-link"
              ref={bloglinkref}
              onClick={() => fn("/blogs")}
            >
              <div>
                <RiPencilLine size={20} color="#AFB1B8" />
              </div>
              <div>Blogs</div>
            </div>
            <div
              className="mob-nav-link"
              ref={aboutlinkref}
              onClick={() => fn("/about")}
            >
              <div>
                <BsPerson size={20} color="#AFB1B8" />
              </div>
              <div>About</div>
            </div>
            <div
              className="mob-nav-link"
              ref={projectlinkref}
              onClick={() => fn("/projects")}
            >
              <div>
                <BsFileEarmarkCode size={20} color="#AFB1B8" />
              </div>
              <div>Projects</div>
            </div>
            <div
              className="mob-nav-link"
              ref={resumelinkref}
              onClick={() => fn("/resume")}
            >
              <div>
                <BiClipboard size={20} color="#AFB1B8" />
              </div>
              <div>Resume</div>
            </div>
            <div
              className="mob-nav-link"
              ref={contactlinkref}
              onClick={() => fn("/contact")}
            >
              <div>
                <TbMessageCircle size={20} color="#AFB1B8" />
              </div>
              <div>Contact</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Navmobile;
