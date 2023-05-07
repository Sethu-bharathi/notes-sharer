import React, { useState, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Configuration from "./configuration";
import "./notes.css";
import { toast } from "react-toastify";
import Folder from "../../Assets/folder.png";
import { useSelector } from "react-redux";

const Editor = () => {
  const userData = useSelector((state) => state.auth);
  const [editor, seteditor] = useState({});
  const [fileName, setFileName] = useState("");
  const [uid, setUid] = useState("");
  const prompt = useRef();
  const [noteData, setNoteData] = useState({
    time: 1676021988860,
    blocks: [
      {
        id: "VYjeIi9njD",
        type: "header",
        data: {
          text: "Heading Goes here",
          level: 2,
        },
      },
    ],
    version: "2.26.5",
  });

  const [existingNotes, setexistingNotes] = useState([]);
  const [isFirst, setIsFirst] = useState(true);
  const destroyEditor = () => {
    editor.destroy();
  };
  useEffect(() => {
    if (!isFirst) {
      destroyEditor();
    }
    setIsFirst(false);
    const editor = new EditorJS(Configuration(noteData));
    seteditor(editor);

    editor.isReady
      .then(() => {
        toast("Editor is ready to use!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((reason) => {
        alert(`Editor.js initialization failed because of ${reason}`);
      });
  }, [noteData]);

  useEffect(() => {
    if (userData.isStudent) {
      setUid(userData.userData.student.localId);
    } else {
      setUid(userData.userData.teacher.localId);
    }

    setTimeout(() => {
      fetch("http://127.0.0.1:5000//get-private-notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uId: uid ? uid : "OPHrpIATWfat57q4sdmSYve1crC3",
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Cannot be saved");
          }
        })
        .then((data) => {
          setexistingNotes(data.notes);
        })
        .catch((error) => {
          console.log("Saving failed: ", error);
        });
    }, 500);
  }, []);

  const hide = () => {
    prompt.current.style = "z-index:-100;display:none";
  };
  const show = () => {
    prompt.current.style = "z-index:100;display:flex";
  };

  const onSave = () => {
    editor.save().then((outputData) => {
      fetch("http://127.0.0.1:5000/create-private-note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: { noteContent: outputData },
          uId: uid,
        }),
      })
        .then((response) => {
          if (response.ok) {
            alert("Saved succesfully");
          } else {
            throw new Error("Cannot be saved");
          }
        })
        .catch((error) => {
          console.log("Saving failed: ", error);
        });
    });
  };

  const displayNotes = (data) => {
    console.log(data);
    setNoteData(data);
  };
  return (
    <>
      <div className="white">
        <div className="flex-row">
          <img src={Folder} alt="Note" srcSet="" height={30} width={30} />
          <h1 className="heading">New Note</h1>
        </div>
        <div className="editor-div">
          <div id="editorjs" />
        </div>
        <button className="btn" onClick={onSave}>
          Save
        </button>
      </div>
      <div className="confirm" ref={prompt}>
        <div className="prompt">
          <span onClick={hide}>+</span>
          <form>
            <h3> File name</h3>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          </form>
          <button className="btn-submit" onClick={onSave}>
            Save
          </button>
        </div>
      </div>
      <br />
      <div className="flex-row">
        {existingNotes &&
          existingNotes.map((note, index) => {
            return (
              <div
                className="private-notes"
                key={index}
                onClick={displayNotes.bind(null, note.data.noteContent)}
              >
                {note.data.noteContent.blocks[0].data.text}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Editor;
