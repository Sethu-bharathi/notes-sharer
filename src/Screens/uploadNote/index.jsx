
import { useState } from "react";
import "./uploadNote.css";
const temp = {
  subjectName: "",
  materialType: "",
  description: "",
  topicsIncluded: "",
  uId: "HSLKu9AN3XWczoVFIql7FnLYAPy2",
};

export default function UploadNote() {
  const [subjectName, setsubjectName] = useState("");
  const [subjectCode, setsubjectCode] = useState("");
  const [materialType, setmaterialType] = useState("");
  const [topicsIncluded, settopicsIncluded] = useState("");
  const [description, setdescription] = useState("");

  function uploadNote(event) {
    event.preventDefault();
    console.log(subjectName,subjectCode);
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
        value={materialType}
        onChange={(e) => setmaterialType(e.target.value)}
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
            <input type="text"
              placeholder="Topics included"
              value={topicsIncluded}
              onChange={(e) => {
                settopicsIncluded(e.target.value);
              }}/>
            <input type="file" id="file" />
            <label htmlFor="file">choose a file</label>
          </div>
        </div>
        <button onClick ={uploadNote} className="submit-btn">Submit</button>
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
