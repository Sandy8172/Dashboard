import "./App.css";
import Footer from "./components/footer/Footer";
import MainDash from "./components/mainDash/MainDash";
import SignIn from "./components/signIn&signUp/SignIn";
import SignUp from "./components/signIn&signUp/SignUp";
function App() {
  return (
    <div>
      <SignIn/>
      <SignUp />
      <MainDash />
      <Footer />
    </div>
  );
}

export default App;
