import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./Notesearch.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { ThumbDownAltOutlined } from "@mui/icons-material";

export default function NoteSearch() {
  const [userType, setuserType] = useState("student");
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData.data["teacher"]) {
      setuserType("teacher");
    }
    fetch("http://127.0.0.1:5000/get-all-notes")
      .then((res) => res.json())
      .then((data) => {
        setNoteData(data.notes);
      })
      .catch((e) => {
        toast(e);
      });
  }, []);

  const [noteData, setNoteData] = useState([]);
  const colors = ["red", "cyan", "orange", "blue"];
  const hex = [
    "hsl(0, 78%, 62%)",
    "hsl(180, 62%, 55%)",
    "hsl(34, 97%, 64%)",
    "hsl(212, 86%, 64%)",
  ];
  const images = [
    "icon-calculator.svg",
    "icon-supervisor.svg",
    "icon-karma.svg",
    "icon-team-builder.svg",
  ];

  const likeHandler = (userType, userId) => {};
  const disLikeHandler = (userId) => {};
  return (
    <div className="view-port">
      <div className="header">
        <h1>Search Through all notes</h1>
      </div>
      <div className="row1-container">
        {noteData.length > 0 ? (
          noteData.map((note) => {
            const colorRandom = Math.floor(Math.random() * 4 - 0.1);
            return (
              <Card
                key={note.fileId}
                id={note.fileId}
                fileLink={note.fileLink}
                courseName={note.subjectName}
                topicsIncluded={note.topics}
                image={images[Math.floor(Math.random() * 4 - 0.1)]}
                className={colors[colorRandom]}
                hex={hex[colorRandom]}
                liked={note.upVotes}
                disliked={note.downVotes}
                onLike={likeHandler}
                onDisLike={disLikeHandler}
                userType={userType}
              />
            );
          })
        ) : (
          <h3 style={{ textAlign: "center" }}>Notes Not available</h3>
        )}
      </div>
    </div>
  );
}

const Card = (props) => {
  const topics = props.topicsIncluded;
  const [Liked, setLiked] = useState(props.liked);
  const [DisLiked, setDisLiked] = useState(props.disliked);
  const [isLiked, setIsLiked] = useState(
    Liked.filter((item) => item.id === "0nXlteUZcpbZUbzi4N8cOez1Mls2")
      .length === 1
  );
  const [isDisliked, setIsDisliked] = useState(
    DisLiked.filter((item) => item.id === "0nXlteUZcpbZUbzi4N8cOez1Mls2")
      .length === 1
  );
  const userData = { userType: props.userType, id: props.id };
  const likeData = {
    noteId: props.id,
    downVotes: DisLiked,
    upVotes: Liked,
  };

  const likeHandler = () => {
    likeData.upVotes.push(userData);
  };

  const disLikeHandler = () => {
    if (isLiked)
      setLiked((prev) => prev.filter((item) => item.id !== userData.id));
    setIsDisliked((prev) => prev.push({ userData }));
  };
  return (
    <>
      <div className={`box ${props.className}`}>
        <h2>{props.courseName}</h2>
        <ul>
          {topics.map((topic, index) => (
            <li className="li-item" key={index}>
              {topic.charAt(0).toUpperCase() + topic.slice(1)}
            </li>
          ))}
        </ul>
        {props.fileLink && (
          <a
            href={props.fileLink}
            title="PDf file"
            target="_blank"
            rel="noreferrer"
          >
            View
          </a>
        )}
        <div className="icon-container">
          <div>
            <button className="pointer icon-btn" onClick={likeHandler}>
              {!isLiked ? (
                <ThumbUpOutlinedIcon style={{ color: props.hex }} />
              ) : (
                <ThumbUpIcon style={{ color: props.hex }} />
              )}
              
            </button>
            <p>{Liked.reduce((currentNumber, item) => {
                return currentNumber + (item.userType === "student" ? 1 : 5);
              }, 0)}</p>
            <button className="pointer icon-btn" onClick={disLikeHandler}>
              {!isDisliked ? (
                <ThumbDownAltOutlined style={{ color: props.hex }} />
              ) : (
                <ThumbDownIcon style={{ color: props.hex }} />
              )}
            </button>
            <p>{DisLiked.reduce((currentNumber, item) => {
                return currentNumber + (item.userType === "student" ? 1 : 5);
              }, 0)}</p>
          </div>
          <img
            src={`https://assets.codepen.io/2301174/${props.image}`}
            className="file-icon"
            alt=""
          />
        </div>
      </div>
    </>
  );
};
