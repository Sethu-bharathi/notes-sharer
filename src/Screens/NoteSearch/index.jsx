import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./Notesearch.css";

export default function NoteSearch() {
  useEffect(() => {
    fetch("http://127.0.0.1:5000/get-all-notes")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.notes);
        setNoteData(data.notes);
      }).catch(e=>{
        toast(e);
      });
  }, []);
  const [noteData, setNoteData] = useState([]);
  const colors=["orange","cyan","blue","red"];
  const images = [
    "icon-calculator.svg",
    "icon-supervisor.svg",
    "icon-karma.svg",
    "icon-team-builder.svg",
  ];
  const data = {
    courseName: "Operating system",
    topicsIncluded: "semaphore,Deadlock",
  };
  return (
    <div className="view-port">
      <div className="header">
        <h1>Search Through all notes</h1>
      </div>
      <div className="row1-container">
      {noteData.length > 0 ?
          noteData.map((note) => (
            <Card
            key={note.fileId}
            fileLink={note.fileLink}
              courseName={note.subjectName}
              topicsIncluded={note.topics}
              image={images[Math.floor(Math.random() * 4 - 0.1)]}
              className={colors[Math.floor(Math.random() * 4 - 0.1)]}
            />
          )):
          <h3 style={{textAlign:"center"}}>Notes Not available</h3>}

      </div>
    </div>
  );
}

const Card = (props) =>{
  const topics=props.topicsIncluded;
   return(
  <>
    <div className={`box box-down ${props.className}`}>
      <h2>{props.courseName}</h2>
      <ul>
        {topics.map((topic,index)=>
          <li key={index}>{topic.charAt(0).toUpperCase() + topic.slice(1)}</li>
        )}
      </ul>
      {props.fileLink && <a href={props.fileLink} title="PDf file" target="_blank" rel="external">View</a>}
      <img src={`https://assets.codepen.io/2301174/${props.image}`} alt="" />
    </div>
  </>
);}
