import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import department from "../../Assets/Departments";
import AuthWrapper from "../../Components/AuthWrapper";
import "./signupworker.css";
import Checkbox from "@mui/material/Checkbox";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import FormControlLabel from "@mui/material/FormControlLabel";
import {useDispatch} from "react-redux";
import { authSliceActions } from "../../store/auth-slice";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function Signupworker() {
  const dispatch=useDispatch();
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [departmentChosen, setdepartmentChosen] = useState("Department");
  const [email, setemail] = useState("");
  const [isStudent, setisStudent] = useState(false);
  const navigate = useNavigate();

  const signUp = () => {
    if (isStudent) {
      console.log({
        studentName: name,
        studentEmail: email,
        studentPassword: password,
        studentDepartment: departmentChosen,
      });
      fetch("http://127.0.0.1:5000/signup-student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentName: name,
          studentEmail: email,
          studentPassword: password,
          studentDepartment: departmentChosen,
        }),
      })
        .then((res) => {
          if (res.status !== 200) {
            console.log(res);
            throw Error(res.statusText);
          } else {
            return res.json();
          }
        })
        .then((data) => {
          localStorage.setItem("userData", JSON.stringify(data));
          dispatch(authSliceActions.checkAgain())
          navigate("/");
        })
        .catch((e) => {
          alert(e);
        });
    } else {
      fetch("http://127.0.0.1:5000/signup-teacher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teacherName: name,
          teacherEmail: email,
          teacherPassword: password,
          teacherDepartment: departmentChosen,
        }),
      })
        .then((res) => {
          if (res.status !== 200) {
            console.log(res);
            throw Error(res.statusText);
          } else {
            return res.json();
          }
        })
        .then((data) => {
          localStorage.setItem("userData", JSON.stringify(data));
          dispatch(authSliceActions.checkAgain())
          navigate("/");
        });
    }
  };

  return (
    <div className="signupPadding">
      <AuthWrapper>
        <h2 style={{ margin: "0 0 20px 10px" }}>Find New Notes</h2>
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
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <select
          value={departmentChosen}
          onChange={(e) => setdepartmentChosen(e.target.value)}
        >
          <option value="" disabled>
            Depatment
          </option>
          {department.map((dept) => (
            <option key={dept.key}>{dept.name}</option>
          ))}
        </select>
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
          onClick={signUp}
          style={{ position: "relative", left: 0, bottom: "35px" }}
        >
          Submit
        </button>

        <div
          onClick={(e) => navigate("/login")}
          style={{
            fontSize: "16px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Already have an account?
        </div>
      </AuthWrapper>
    </div>
  );
}

export default Signupworker;
