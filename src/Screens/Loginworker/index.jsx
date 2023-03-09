import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthWrapper from "../../Components/AuthWrapper";
import "./Loginworker.css";
import Checkbox from "@mui/material/Checkbox";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import FormControlLabel from "@mui/material/FormControlLabel";
import { toast } from "react-toastify";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function Loginworker() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isStudent, setisStudent] = useState(false);
  const navigate = useNavigate();

  function getToast(message) {
    toast(message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
      theme: "dark",
    });
  }
  const login = () => {
    if (isStudent) {
      fetch("http://127.0.0.1:5000/login-student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentEmail: email,
          studentPassword: password,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw Error(res.statusText);
          } else {
            return res.json();
          }
        })
        .then((data) => {
          localStorage.setItem("userData", JSON.stringify(data));
          navigate("/");
        })
        .catch((e) => {
          getToast("Something went Wrong");
        });
    } else {
      fetch("http://127.0.0.1:5000/login-teacher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teacherEmail: email,
          teacherPassword: password,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw Error(res.statusText);
          } else {
            return res.json();
          }
        })
        .then((data) => {
          localStorage.setItem("userData", JSON.stringify(data));
          navigate("/");
        })
        .catch((e) => {
          toast(e + " Check your details");
        });
    }
  };

  return (
    <AuthWrapper>
      <h4 style={{ margin: "0 0 20px 0px" }}>Find New Notes</h4>
      <h3 style={{ margin: "0 0 40px 0" }}>Write some notes</h3>
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
      <FormControlLabel
        value="start"
        control={
          <Checkbox
            sx={{
              color: "#F65143",
              "&.Mui-checked": {
                color: "#F65143",
              },
            }}
            onChange={(e) => setisStudent((prev) => !prev)}
            {...label}
            icon={<AssignmentIndOutlinedIcon sx={{ fontSize: "25px" }} />}
            checkedIcon={<AssignmentIndIcon sx={{ fontSize: "25px" }} />}
          />
        }
        label="Are you a student?"
        labelPlacement="start"
        sx={{ color: "white" }}
      />
      <button
        className="buttn"
        onClick={login}
        style={{ position: "relative", left: 0, bottom: "35px" }}
      >
        Submit
      </button>
      <div
        onClick={(e) => {
          navigate("/signup");
        }}
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
