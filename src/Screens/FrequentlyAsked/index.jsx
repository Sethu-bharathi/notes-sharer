import { useState, useEffect } from "react";
import { redirect } from "react-router-dom";

export default function FrequntlyAskedQuestions() {
  const [fileList, setFileList] = useState([]);
  const [status, setStatus] = useState(false);
  const [isFileAvailable, setIsFileAvailable] = useState(true);
  const [existingQuestions, setExistingQuestions] = useState(undefined);
  const [FqaAvailable, setFqaAvailable] = useState(undefined);
  const handleFileChange = (e) => {
    console.log(e.target.files);
    setFileList(e.target.files);
  };

  const checkAvailable = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/get-faq-and-papers", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subjectName,
          subjectCode,
          type:
            materialType === "End semester Questions"
              ? "semester"
              : "midsemester",
        }),
      });
      if (!response.ok) {
        if (response.status === 400) {
          setExistingQuestions(0);
          setIsFileAvailable(false);
          throw new Error("Data not found");
        }
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      const files = data.responseData;
      setExistingQuestions(files.files.length);
      if (data.faqLink) {
        setFqaAvailable(data.faqLink);
      }
      setIsFileAvailable(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  const files = fileList ? [...fileList] : [];
  const [subjectName, setsubjectName] = useState("");
  const [subjectCode, setsubjectCode] = useState("");
  const [materialType, setmaterialType] = useState("");
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

  function generateFaq(event) {
    if (!userData) {
      if (!getUserData()) return alert("Login to generate FAQ's");
    }
    event.preventDefault();
    const formData = new FormData();

    const bodyJson = {
      subjectCode,
      subjectName,
      type:
        materialType === "End semester Questions" ? "semester" : "midsemester",
    };
    formData.append("data", JSON.stringify(bodyJson));
    files.forEach((file, i) => {
      formData.append(`file`, file, file.name);
    });
    setStatus(true);
    fetch("http://127.0.0.1:5000/generate-faq", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) return response.json();
        else {
          throw new Error("Something went wrong");
        }
      })
      .then((result) => {
        openInNewTab(result.faqLink);
        console.log(result);
      })
      .catch((error) => {
        alert(error);
      });
    setStatus(false);
  }
  const openInNewTab = (url) => {
    console.log(url);
    window.open(url, "_blank", "noreferrer");
  };

  return (
    <div className="form-container">
      <form>
        <div>
          <div>
            <input
              required
              type="text"
              value={subjectCode}
              onChange={(e) => {
                setsubjectCode(e.target.value);
              }}
              placeholder="Subject Code"
            />
            <input
              required
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
              <option>Internal Questions</option>
              <option>End semester Questions</option>
            </select>
          </div>
          {!isFileAvailable && <p>{existingQuestions} Question papers found</p>}
          {FqaAvailable && (
            <button
              onClick={(e) => openInNewTab(FqaAvailable)}
              className="submit-btn"
            >
              Generate
            </button>
          )}
          {!isFileAvailable && (
            <div>
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                multiple
                required
                accept=".docx"
                title="choose the question Papers"
              />
              <label htmlFor="file">
                choose additional<br></br> question Papers
              </label>
            </div>
          )}
        </div>

        {!isFileAvailable ? (
          <>
            <ul>
              {files.map((file, i) => (
                <li key={i}>{file.name}</li>
              ))}
            </ul>
            <button onClick={generateFaq} className="submit-btn">
              Submit
            </button>
          </>
        ) : (
          <button onClick={checkAvailable} className="submit-btn">
            Check for existing questions
          </button>
        )}
      </form>

      <div className="drops">
        <div className="drop drop-1"></div>
        <div className="drop drop-2"></div>
        <div className="drop drop-3"></div>
        <div className="drop drop-4">
          <p>Upload questions</p>
        </div>
      </div>
    </div>
  );
}
