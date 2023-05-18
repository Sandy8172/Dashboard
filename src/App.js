import "./App.css";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import MainDash from "./components/mainDash/MainDash";
import SignIn from "./components/signIn&signUp/SignIn";
import SignUp from "./components/signIn&signUp/SignUp";
function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<><MainDash /> <Footer /></>} />      
    </Routes>
  );
}

export default App;
