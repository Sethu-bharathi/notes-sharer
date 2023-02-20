import { React, useState } from "react";
import "./login.css";
export default function Login(params) {
  return (
    <div className="main-container">
      <div className="cover">
        <div className="book">
          <label htmlFor="page-1" className="book__page book__page--1">
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/193203/1111.jpg"
              alt="Notebook"
            />
          </label>

          <label htmlFor="page-2" className="book__page book__page--4">
            <div className="page__content"></div>
          </label>

          {/* <input type="radio" name="page" id="page-1" />

          <input type="radio" name="page" id="page-2" /> */}
          <label className="book__page book__page--2">
            <div className="book__page-front">
              <LoginCard />
            </div>
            <div className="book__page-back"></div>
          </label>
        </div>
      </div>
    </div>
  );
}

const LoginCard = () => {
  const [email, setemail] = useState();
  const [password, setpassword] = useState("");
  return (
    <form className="auth-container">
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setemail(e.target.value)}
      />
      <input
        type="Password"
        placeholder="Password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      />
      <select name="" id="">
        <option value="Chemical"></option>
      </select>
    </form>
  );
};
