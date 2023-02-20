import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthWrapper from "../../Components/AuthWrapper";
import "./Loginworker.css";

function Loginworker() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate=useNavigate();
  const login = () => {
    console.log(email);
    // fetch("http://localhost:2000/worker/signin", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email,
    //     password,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     localStorage.setItem('workerdata',JSON.stringify({
    //       ...data.user
    //     }));
    //   }).catch((err)=>alert('Something went wrong'));
  };

  return (
    <AuthWrapper>
        <h3 style={{ margin: "0 0 20px 0px" }}>Find New Notes</h3>
        <h4 style={{ margin: "0 0 40px 0" }}>Write some notes</h4>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <button
          className="buttn"
          onClick={login}
          style={{ position: "relative", left: 0, bottom: "35px" }}
        >
          Submit
        </button>
        <div
        onClick={e=>{navigate("/signup")}}
          style={{
            fontSize: "16px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Don't have an account?
        </div>
        </AuthWrapper>     
  );
}
export default Loginworker;
