//app
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomePage from "./Pages/Welcome";
import RegisterPage from "./Pages/Register";
import LoginPage from "./Pages/Login";
import Profile from "./Pages/Profile";
import PostsFeed from "./Pages/PostsFeed";
import UpdateInfo from "./Pages/UpdateUserInfo";
import CreatePost from "./components/posts/CreatePost";
import UpdatePost from "./components/posts/UpdatePost";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
         <Route path="/register" element={<RegisterPage />} />
       <Route path="/login" element={<LoginPage />} /> 
       { <Route path="/profile" element={<Profile />} /> }
       { <Route path="/feed" element={<PostsFeed />} /> }
       { <Route path="/update" element={<UpdateInfo />} /> }
       { <Route path="/post/create" element={<CreatePost />} /> }
       { <Route path="/post/update/:id" element={<UpdatePost />} /> }
      </Routes>
    </Router>
  );
}

export default App;
