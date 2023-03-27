import React, { useRef, useState } from "react";
import "./Navbarmobile.css";
import logo from "../../Assets/note-taking.png";
import { BiMenu } from "react-icons/bi";
import { TbSmartHome } from "react-icons/tb";
import { BsPerson, BsFileEarmarkCode } from "react-icons/bs";
import { BiClipboard } from "react-icons/bi";
import { RiPencilLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

function Navmobile() {
  const sidebaref = useRef(null);
  const navigate = useNavigate();

  const [sidebarisopen, setsidebarisopen] = useState(false);

  const toggleSidebar = () => {
    setsidebarisopen(!sidebarisopen);
    if (sidebarisopen) {
      sidebaref.current.style.transform = "translateX(-260px)";
    } else {
      sidebaref.current.style.transform = "translateX(0px)";
    }
  };

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
          <img src={logo} alt="Figure of our Logo" />
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
          <img src={logo} alt="Figure of out Logo" />
          <h3>Notely</h3>
        </div>
        <div>
          <div className="mob-nav-links">
            <div className="mob-nav-link" onClick={() => fn("/")}>
              <div>
                <TbSmartHome size={20} color="#AFB1B8" />
              </div>
              <div>Home</div>
            </div>
            <div className="mob-nav-link" onClick={() => fn("/search-note")}>
              <div>
                <RiPencilLine size={20} color="#AFB1B8" />
              </div>
              <div>Notes</div>
            </div>
            <div className="mob-nav-link" onClick={() => fn("/upload-note")}>
              <div>
                <BsFileEarmarkCode size={20} color="#AFB1B8" />
              </div>
              <div>Upload</div>
            </div>
            <div className="mob-nav-link" onClick={() => fn("/faq")}>
              <div>
                <BsPerson size={20} color="#AFB1B8" />
              </div>
              <div>FAQ's</div>
            </div>
            <div className="mob-nav-link" onClick={() => fn("/chat-forum")}>
              <div>
                <BsPerson size={20} color="#AFB1B8" />
              </div>
              <div>Chat</div>
            </div>
            <div className="mob-nav-link" onClick={() => fn("/login")}>
              <div>
                <BiClipboard size={20} color="#AFB1B8" />
              </div>
              <div>Login</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Navmobile;
