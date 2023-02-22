import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Main from "./main";
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

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          {/* <Route path="/about">
            <About />
          </Route> */}
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Loginworker />} />
          <Route path="/signup" element={<Signupworker />} />
          <Route path="/new-note" element={<NewNote />} />
          <Route path="/Notes" element={<NoteSearch />} />
          <Route path="/Chat" element={<ChatScreen />}/>
          <Route path="/upload-note" element={<UploadNote />} />
          <Route path="/search-note" element={<NoteSearch />}/>
         </Routes>
        <ToastContainer />
      </Router>
    </>
  );
}

export default App;
