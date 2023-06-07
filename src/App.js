import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/signIn&signUp/SignIn";
import SignUp from "./components/signIn&signUp/SignUp";
import Sidebar from "./components/sidebar/Sidebar";
import WebSockets from "./socket/WebSockets";
import { useSelector } from "react-redux";

function App() {
  // const data = useSelector((state) => state.data.socketData);
  // console.log(data);
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/home"
        element={
          <>
            <Sidebar />
            {/* <WebSockets /> */}
          </>
        }
      />
    </Routes>
  );
}

export default App;
