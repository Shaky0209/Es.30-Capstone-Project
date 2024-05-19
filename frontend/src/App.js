import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyNav from './Components/MyNav.jsx/MyNav.jsx';
import Home from './Pages/Home/Home.jsx';
import Register from './Pages/Register/Register.jsx';
import Login from './Pages/Login/Login.jsx';
import Friends from './Pages/Friends/Friends.jsx';
import Articles from './Pages/Articles/Articles.jsx';
import MyFooter from './Components/MyFooter/MyFooter.jsx';
import Profile from './Pages/Profile/Profile.jsx';
import NotFound from './Pages/NotFound/NotFound.jsx';
import MenuContextProvider from './Context/MenuContextProvider.jsx'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


export default function App() {

  return (
    <BrowserRouter>
      <MenuContextProvider>
        <MyNav/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/friends' element={<Friends/>} />
          <Route path='/articles' element={<Articles/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/*' element={<NotFound/>} />
        </Routes>
        <MyFooter/>
      </MenuContextProvider>
    </BrowserRouter>
  );
}