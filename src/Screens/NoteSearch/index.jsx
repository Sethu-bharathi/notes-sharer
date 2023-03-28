import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./Notesearch.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { ThumbDownAltOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";

export default function NoteSearch() {
  const [userType, setuserType] = useState("student");
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.data["teacher"]) {
      setuserType("teacher");
    }
    fetch("http://127.0.0.1:5000/get-all-notes")
      .then((res) => res.json())
      .then((data) => {
        setGlobalData(data.notes);
        setNoteData(data.notes);
      })
      .catch((e) => {
        toast(e);
      });
  }, []);

  const [noteData, setNoteData] = useState([]);
  const [globalData, setGlobalData] = useState([]);
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
  function sortByLike() {
    const sortedProducts = noteData.sort((note1, note2) =>
      note1.upVotes.length < note2.upVotes.length
        ? -1
        : note1.upVotes.length > note2.upVotes.length
        ? 1
        : 0
    );
    setNoteData(sortedProducts);
  }
  function searchName(searchText) {
    console.log("searched", searchText, globalData);
    if (searchText.trim().length === 0) {
      setNoteData(globalData);
    }
    const newState = globalData.filter(
      (notes) => notes.subjectName.toUpperCase().indexOf(searchText.toUpperCase()) > -1
    );
    console.log(newState);
    setNoteData(newState);
  }
  return (
    <div className="view-port">
      <div className="filters-container">
        <input
          type="text"
          name="search"
          id="search"
          onChange={(e) => searchName(e.target.value)}
          placeholder="Search"
        />
        <button className="sort-button" onClick={sortByLike}>
          Sort by like
        </button>
      </div>
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
        return item.id !== userData.id;
      });
    }
    likeData.downVotes.push({ ...userData });
    updateNotes();
    setLiked(likeData.upVotes);
    setDisLiked(likeData.downVotes);
  };

  const updateNotes = () => {
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
