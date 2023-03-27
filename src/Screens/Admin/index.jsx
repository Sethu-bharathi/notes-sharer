import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { ThumbDownAltOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";
import styles from "./admin.module.css";
import { redirect } from "react-router-dom";

export default function Admin() {
  const [userType, setuserType] = useState("student");
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.data["teacher"]) {
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

const RequestHandler = async (type, id) => {
  const response = await fetch("http://127.0.0.1:5000/update-note-admin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      noteId: id,
      type,
    }),
  });
  if (response.ok) {
    alert("Note deleted");
    redirect("/admin");
  } else {
    alert("Something went wrong");
  }
};
const Card = (props) => {
  const data = useSelector((state) => state.auth);
  const userId = data.userData[props.userType].localId;
  const userData = { userType: props.userType, id: userId };
  const topics = props.topicsIncluded;
  const [Liked, setLiked] = useState(props.liked);
  const [DisLiked, setDisLiked] = useState(props.disliked);
  const [isLiked, setIsLiked] = useState(
    props.liked.filter((item) => item.id === userId).length > 0
  );
  const [isDisliked, setIsDisliked] = useState(
    props.disliked.filter((item) => item.id === userId).length > 0 && !isLiked
  );

  console.log(props, isLiked, isDisliked);
  const likeData = {
    noteId: props.id,
    downVotes: [...DisLiked],
    upVotes: [...Liked],
  };

  const likeHandler = () => {
    if (isLiked) return alert("Notebook already Liked");
    setIsLiked(true);
    likeData.upVotes.push({ ...userData });
    if (isDisliked) {
      setIsDisliked(false);
      setDisLiked((prev) => prev.filter((item) => item.id !== userData.id));
      likeData.downVotes = likeData.downVotes.filter((item) => {
        return item.id !== userData.id;
      });
    }
    updateNotes();
    setLiked(likeData.upVotes);
  };

  const disLikeHandler = () => {
    if (isDisliked) return alert("Notebook already DisLiked");
    setIsDisliked(true);
    if (isLiked) {
      setIsLiked(false);
      likeData.upVotes = likeData.upVotes.filter((item) => {
        console.log(item.id !== userId);
        return item.id !== userData.id;
      });
    }
    likeData.downVotes.push({ ...userData });
    updateNotes();
    setLiked(likeData.upVotes);
    setDisLiked(likeData.downVotes);
  };

  const updateNotes = () => {
    console.log(likeData);
    fetch("http://127.0.0.1:5000/update-votes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(likeData),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        alert("Something went Wrong");
      });
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
            className={styles.btn}
            href={props.fileLink}
            title="PDf file"
            target="_blank"
            rel="noreferrer"
          >
            View
          </a>
        )}
        <button
          className={styles.btn}
          onClick={RequestHandler.bind(null, "accept", props.id)}
        >
          Accept
        </button>
        <button
          className={styles.btn}
          onClick={RequestHandler.bind(null, "reject", props.id)}
        >
          Delete
        </button>
        <div className="icon-container">
          <div>
            <button className="pointer icon-btn" onClick={likeHandler}>
              {!isLiked ? (
                <ThumbUpOutlinedIcon style={{ color: props.hex }} />
              ) : (
                <ThumbUpIcon style={{ color: props.hex }} />
              )}
            </button>
            <p>
              {Liked.reduce((currentNumber, item) => {
                return currentNumber + (item.userType === "student" ? 1 : 5);
              }, 0)}
            </p>
            <button className="pointer icon-btn" onClick={disLikeHandler}>
              {!isDisliked ? (
                <ThumbDownAltOutlined style={{ color: props.hex }} />
              ) : (
                <ThumbDownIcon style={{ color: props.hex }} />
              )}
            </button>
            <p>
              {DisLiked.reduce((currentNumber, item) => {
                return currentNumber + (item.userType === "student" ? 1 : 5);
              }, 0)}
            </p>
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
