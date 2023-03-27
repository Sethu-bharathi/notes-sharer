import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
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
import ChatMain from "./features/ChatMain/Main";
import { useDispatch, useSelector } from "react-redux";
import { db } from "./app/firebase";
import {
  setCurrentUser,
  CurrentUserSelector,
} from "./features/Users/CurrentUserSlice";
import { updateUsers } from "./features/Users/UsersSlice";
import FrequntlyAskedQuestions from "./Screens/FrequentlyAsked";
import Layout from "./Components/Layout";
import { checkAuth } from "./utils/protected";
import Error from "./Screens/Error";

function App() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth);
  console.log(userData);
  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem("useData")) ?? {
      data: {
        student: {
          displayName: "",
          email: "1905113cse@cit.edu.in",
          expiresIn: "3600",
          idToken:
            "eyJhbGciOiJSUzI1NiIsImtpZCI6IjU4ODI0YTI2ZjFlY2Q1NjEyN2U4OWY1YzkwYTg4MDYxMTJhYmU5OWMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbm90ZS1zaGFyaW5nLTk2ZjRlIiwiYXVkIjoibm90ZS1zaGFyaW5nLTk2ZjRlIiwiYXV0aF90aW1lIjoxNjc4MzgyMzc1LCJ1c2VyX2lkIjoiT1BIcnBJQVRXZmF0NTdxNHNkbVNZdmUxY3JDMyIsInN1YiI6Ik9QSHJwSUFUV2ZhdDU3cTRzZG1TWXZlMWNyQzMiLCJpYXQiOjE2NzgzODIzNzUsImV4cCI6MTY3ODM4NTk3NSwiZW1haWwiOiIxOTA1MTEzY3NlQGNpdC5lZHUuaW4iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiMTkwNTExM2NzZUBjaXQuZWR1LmluIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.ZN4rxlkl1THIsRWGOmLz5KDsZj0Mq6viiBE995Jzqv5tUc-pWzwy-cQ2fYYgDUrI9bOzRjHhc9lo1jozuGy56B5aIpWqQcrLK6CjBnBVmyIt-EgFedEFWVb4QnwTwdy2TnuNjK9CPzGaSzyw73jIzspzhWagxRqm-Fx_k_lbGOP5b47Di5iq4SMX6g03_JT2Etg70HqtzvcXwhNAglakJ4yk1m1ksbmHoNy9kEKSWAMvxt3vj3ZUBPjkBwc_Ib8ExEDYzKHB03Wb0c3MTwU9F25LLh1l-bBNjhNgK7Uuw1EROr8VYpVaJR1eOsJXDhHrxoYC16d4QGPkY-SGd8L4Ag",
          kind: "identitytoolkit#VerifyPasswordResponse",
          localId: "OPHrpIATWfat57q4sdmSYve1crC3",
          refreshToken:
            "APJWN8cwrWP9pxsf1a83sR93-Zgw6HfJ3C627ck-gGieAOtyaq5ObIfjYVVeEhAfScrimDfzsGXR2aJey1MSKBrIRwcqjz2YS0H1pYmtc8MMZ8WP1JGcN5wwyYtjZFt_4bXBY_hXKZAd5y_eF1q7M4cS2fruV2h2qcOhNBE4QEIfmISnoOv7Tjd8qut5sVorGWmBfuwENan_rTNMdhX-ESMvR4qoGNP-sw",
          registered: true,
        },
      },
    };
    if (authUser) {
      //If User Logged In...
      const {
        displayName,
        email,
        localId: uid,
      } = authUser.data?.student ?? authUser.data?.teacher;
      const photoURL =
        "data:image/jpeg;base64,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";
      dispatch(setCurrentUser({ displayName, email, uid, photoURL }));
    } else {
      //If User Logges Out...
      dispatch(setCurrentUser(null));
    }

    return () => {};
  }, [dispatch]);

  const currentUser = useSelector(CurrentUserSelector);

  useEffect(() => {
    //This is how to get info from firebase
    db.collection("users").onSnapshot((snapshot) => {
      dispatch(updateUsers(snapshot.docs.map((doc) => ({ ...doc.data() }))));
    });
  }, []);

  // Dark Mode

  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    if (window.localStorage.getItem("darkMode")) {
      setDarkMode(eval(window.localStorage.getItem("darkMode")));
    } else {
      setDarkMode(false);
    }
  }, []);

  function switchDarkMode() {
    window.localStorage.setItem("darkMode", !darkMode);
    setDarkMode(!darkMode);
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Error />,
      children: [
        { path: "", element: <Hero /> },
        { path: "/new-note", element: <NewNote />, loader: checkAuth },
        { path: "/Notes", element: <NoteSearch />, loader: checkAuth },
        {
          path: "/faq",
          element: <FrequntlyAskedQuestions />,
          loader: checkAuth,
        },
        { path: "/Chat", element: <ChatScreen />, loader: checkAuth },
        { path: "/upload-note", element: <UploadNote />, loader: checkAuth },
        { path: "/search-note", element: <NoteSearch />, loader: checkAuth },
        { path: "/note-accept", element: <AcceptNote /> },
        { path: "/note-reject", element: <RejectNote /> },
        {
          path: "/chat-forum",
          element: (
            <ChatMain
              darkMode={darkMode}
              switchDarkMode={switchDarkMode}
              match={{ params: { GroupId: "Group" } }}
            />
          ),
          loader: checkAuth,
        },
        {
          path: "/chat-forum/:GroupId",
          loader: checkAuth,
          element: (
            <ChatMain darkMode={darkMode} switchDarkMode={switchDarkMode} />
          ),
        },
        { path: "/login", element: <Loginworker /> },
        { path: "/signup", element: <Signupworker /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
