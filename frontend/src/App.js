import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyNav from "./Components/MyNav.jsx/MyNav.jsx";
import Home from "./Pages/Home/Home.jsx";
import Register from "./Pages/Register/Register.jsx";
import Login from "./Pages/Login/Login.jsx";
import Friends from "./Pages/Friends/Friends.jsx";
import Articles from "./Pages/Articles/Articles.jsx";
import ArticlesEdit from "./Pages/ArticlesEdit/ArticlesEdit.jsx";
import MyArticles from "./Pages/MyArticles/MyArticles.jsx";
import MyFooter from "./Components/MyFooter/MyFooter.jsx";
import Profile from "./Pages/Profile/Profile.jsx";
import NewArticle from "./Pages/NewArticle/NewArticle.jsx";
import ProfileEdit from "./Pages/ProfileEdit/ProfileEdit.jsx";
import NotFound from "./Pages/NotFound/NotFound.jsx";
import MenuContextProvider from "./Context/MenuContextProvider.jsx";
import TokenContextProvider from "./Context/TokenContextProvider.jsx";
import UserContextProvider from "./Context/UserContextProvider.jsx";
import ImgContextProvider from "./Context/ImgContextProvider.jsx";
import StatusContextProvider from "./Context/StatusContextProvider.jsx";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <BrowserRouter>
      <TokenContextProvider>
        <UserContextProvider>
          <MenuContextProvider>
            <ImgContextProvider>
              <StatusContextProvider>
                <MyNav />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/friends" element={<Friends />} />
                  <Route path="/articles" element={<Articles />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/articles/new" element={<NewArticle />} />
                  <Route path="/my/articles" element={<MyArticles />} />
                  <Route path="/articles/edit/" element={<ArticlesEdit />} />
                  <Route path="/profile/edit/" element={<ProfileEdit />} />
                  <Route path="/*" element={<NotFound />} />
                </Routes>
                <MyFooter />
              </StatusContextProvider>
            </ImgContextProvider>
          </MenuContextProvider>
        </UserContextProvider>
      </TokenContextProvider>
    </BrowserRouter>
  );
}
