import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/signIn&signUp/SignIn";
import SignUp from "./components/signIn&signUp/SignUp";
import Sidebar from "./components/sidebar/Sidebar";
import WebSockets from "./components/WebSockets";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/home"
        element={
          <>
            <Sidebar />
            <WebSockets />
          </>
        }
      />
    </Routes>
  );
}

export default App;
