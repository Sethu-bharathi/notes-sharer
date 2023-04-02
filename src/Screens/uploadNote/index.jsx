import { useState, useEffect } from "react";
import "./uploadNote.css";

export default function UploadNote() {
  const [subjectName, setsubjectName] = useState("");
  const [subjectCode, setsubjectCode] = useState("");
  const [materialType, setmaterialType] = useState("Note");
  const [topicsIncluded, settopicsIncluded] = useState("");
  const [description, setdescription] = useState("");
  const [selectedFile, setselectedFile] = useState("");
  const [userData, setUserData] = useState({});
  const getUserData = () => {
    if (localStorage.getItem("userData")) {
      setUserData(JSON.parse(localStorage.getItem("userData")));
      return true;
    }
    return false;
  };
  useEffect(() => {
    getUserData();
  }, []);
  function uploadNote(event) {
    let key;
    if (!userData) {
      if (!getUserData()) return alert("Login to upload Notes");
    }
    event.preventDefault();
    key = Object.keys(userData.data)[0];
    const formData = new FormData();

    const bodyJson = {
      subjectCode,
      subjectName,
      materialType,
      description,
      topicsIncluded: topicsIncluded.split(","),
      uId: userData.data[key].localId,
      userType: key,
    };
    console.log(bodyJson);
    formData.append("file", selectedFile);
    formData.append("data", JSON.stringify(bodyJson));
    fetch("http://127.0.0.1:5000/upload-note", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  return (
    <div className="form-container">
      <form>
        <div>
          <div>
            <input
              type="text"
              value={subjectCode}
              onChange={(e) => {
                setsubjectCode(e.target.value);
              }}
              placeholder="Subject Code"
            />
            <input
              type="text"
              value={subjectName}
              onChange={(e) => {
                setsubjectName(e.target.value);
              }}
              placeholder="Subject Name"
            />
            <select
              onChange={(e) => {
                console.log(e.target.value);
                setmaterialType(e.target.value);
              }}
            >
              <option>Note</option>
              <option>Question papers</option>
              <option>practice problems</option>
              <option>E-book</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              placeholder="description"
              value={description}
              onChange={(e) => {
                setdescription(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Topics included"
              value={topicsIncluded}
              onChange={(e) => {
                settopicsIncluded(e.target.value);
              }}
            />
            <input
              type="file"
              id="file"
              onChange={(e) => {
                setselectedFile(e.target.files[0]);
              }}
            />
            <label htmlFor="file">choose a file</label>
          </div>
        </div>
        <button onClick={uploadNote} className="submit-btn">
          Submit
        </button>
      </form>

      <div className="drops">
        <div className="drop drop-1"></div>
        <div className="drop drop-2"></div>
        <div className="drop drop-3"></div>
        <div className="drop drop-4">
          <p>Upload a Note</p>
        </div>
      </div>
    </div>
  );
}
