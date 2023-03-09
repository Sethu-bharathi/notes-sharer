import { useState,useEffect } from "react";
import "./reusableNotes.css";


const ResuableNote = (props) => {
    const [isSent, setisSent] = useState(false);
    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const params={
          noteId:urlParams.get('noteid'),
          voterId:urlParams.get('voterid'),
          userId:urlParams.get('userid')
      }
      fetch("http://127.0.0.1:5000/note-"+props.url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        })
          .then((res) => {
            if (!res.ok) {
              throw Error(res.statusText);
            } else {
              res.json();
              setisSent(true)
            }
          }).catch(e=>{
              alert("You arleardy Verified this note\n For furthur assistance constct Admin")
          })
    }, [props.url]);
    return (
      <div className="accept-container">
        <h1>Thank You for verifing this content</h1>
        {!isSent ? (
          <h2>Wait a minute ⏱ we will store this data</h2>
        ) : (
          <h4>
            You have succesfully helped many students.You may leave this page
          </h4>
        )}
      </div>
    );
  };

  export default ResuableNote