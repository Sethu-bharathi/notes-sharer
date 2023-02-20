import React, { useState, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Configuration from "./configuration";
import "./notes.css";
import { toast } from "react-toastify";
import Folder from "../../Assets/folder.png";

const Editor = (props) => {
  const [editor, seteditor] = useState({});
  const [pin, setpin] = useState();
  const prompt = useRef();
  useEffect(() => {
    const editor = new EditorJS(Configuration());
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
        console.log(`Editor.js initialization failed because of ${reason}`);
      });
  }, []);

  const handleFormChange = (index, event) => {
    console.log(index, event.target.name, event.target.value);
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };
  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };
  const hide=()=>{
    prompt.current.style = "z-index:-100;display:none";
  }
  const show=()=>{
    prompt.current.style = "z-index:100;display:flex";
  }
  const addFields = () => {
    let newfield = { email: "" };
    setInputFields([...inputFields, newfield]);
  };
  const onSave = () => {
    editor
      .save()
      .then((outputData) => {
        console.log("Article data: ", outputData);
      })
      .catch((error) => {
        console.log("Saving failed: ", error);
      });
  };
  const [inputFields, setInputFields] = useState([{ email: "" }]);

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
        <button className="btn" onClick={show}>
          Save
        </button>
      </div>
      <div className="confirm" ref={prompt}>
        <div className="prompt">
          <span onClick={hide}>+</span>
          <form>
            <h3>Enter the pin for your Notes</h3>
            <input
              type="password"
              name="pin"
              placeholder="Pin"
              value={pin}
              onChange={(e) => {
                setpin(e.target.value);
              }}
            />
            <h3>List of emails you want to give access to </h3>
            {inputFields.map((input, index) => {
              return (
                <div key={index} className="email-holder">
                  <input
                    type="email"
                    name="email"
                    onChange={(event) => handleFormChange(index, event)}
                    placeholder="Email"
                    value={input.email}
                  />
                  <span className="minus" onClick={() => removeFields(index)}>
                    +
                  </span>
                </div>
              );
            })}
            <span className="plus" onClick={addFields}>
              +
            </span>
          </form>
          <button className="btn-submit" onClick={onSave}>
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default Editor;
