import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Hero from "./Hero";
import "./App.css";
import Navbar from "./Components/Navbar";
import Loginworker from "./Screens/Loginworker";
import Signupworker from "./Screens/signUp";
import Loader from "./Components/Loader";
import NewNote from "./Screens/NewNote";
import NoteSearch from "./Screens/NoteSearch";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatScreen from "./Screens/ChatScreen";
import UploadNote from "./Screens/uploadNote";
import AcceptNote from "./Screens/AcceptNote";
import RejectNote from "./Screens/RejectNote";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          {/* <Route path="/about">
            <About />
          </Route> */}
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Loginworker />} />
          <Route path="/signup" element={<Signupworker />} />
          <Route path="/new-note" element={<NewNote />} />
          <Route path="/Notes" element={<NoteSearch />} />
          <Route path="/Chat" element={<ChatScreen />}/>
          <Route path="/upload-note" element={<UploadNote />} />
          <Route path="/search-note" element={<NoteSearch />}/>
          <Route path="/note-accept" element={<AcceptNote />} />
          <Route path="/note-reject" element={<RejectNote />} />
         </Routes>
        <ToastContainer />
      </Router>
    </>
  );
}

export default App;
