import React from "react";
import "./main.css";
// import img from "../Assets/Notes.png"
import img from "../Assets/note-hero.jpg";
import smallNote from "../Assets/note.png";

export default function Main(params) {
  return (
    <section className="root">
      <div className="container">
        <div className="simple">
          <span>Simple Note planning tools</span>
          <img
            src={smallNote}
            className="small-note"
            alt="small note"
          />
        </div>
        <div className="heading">
          <span>Create. </span>Organize.<br></br>
        </div>
        <div className="heading">
          <span>Share. </span>
          <div className="rect">Easy.</div>
        </div>
      </div><img src={img} alt="Landing" srcSet="" width={200} className="landing-image"/>
    </section>
  );
}
