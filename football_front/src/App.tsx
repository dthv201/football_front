//app
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from './contexts/UserContext';
import WelcomePage from "./Pages/Welcome";
import RegisterPage from "./Pages/Register";
import LoginPage from "./Pages/Login";
import Profile from "./Pages/Profile";
import PostsFeed from "./Pages/PostsFeed";
import UpdateInfo from "./Pages/UpdateUserInfo";
import CreatePost from "./components/posts/CreatePost";
import UpdatePost from "./components/posts/UpdatePost";
import PostsComments from "./Pages/PostsComments";


function App() {
  return (
    <Router>
      <UserProvider>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
         <Route path="/register" element={<RegisterPage />} />
       <Route path="/login" element={<LoginPage />} /> 
       { <Route path="/profile" element={<Profile />} /> }
       { <Route path="/feed" element={<PostsFeed />} /> }
       { <Route path="/update" element={<UpdateInfo />} /> }
       { <Route path="/post/create" element={<CreatePost />} /> }
       { <Route path="/post/update/:id" element={<UpdatePost />} /> }
       <Route path="addComments/:postId" element={<PostsComments />} />

      </Routes>
    </UserProvider>
    </Router>
  );
}

export default App;
