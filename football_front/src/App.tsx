//app
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomePage from "./Pages/Welcome";
import RegisterPage from "./Pages/Register";
import LoginPage from "./Pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
         <Route path="/register" element={<RegisterPage />} />
       <Route path="/login" element={<LoginPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
