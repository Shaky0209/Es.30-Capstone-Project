import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUserGroup, faUser} from "@fortawesome/free-solid-svg-icons";
import { MenuContext } from "../../Context/MenuContextProvider";
import { TokenContext } from "../../Context/TokenContextProvider";
import { UserContext } from "../../Context/UserContextProvider";
import { PiArticleMediumBold } from "react-icons/pi";
import "./MyNav.css";

export default function MyNav() {
  
  const navigate = useNavigate();
  const [slcHome, setSlcHome] = useState(true);
  const [slcFriends, setSlcFriends] = useState(false);
  const [slcMarket, setSlcMarket] = useState(false);
  const [userImg, setUserImg] = useState(null);
  const { menu, setMenu } = useContext(MenuContext);
  
  const path = window.location.pathname;
  const {token, setToken} = useContext(TokenContext);
  const {user, setUser} = useContext(UserContext);
  let params = new URLSearchParams(document.location.pathname);  

  console.log("navbar user = ", user);

  const getUserImg = async()=>{
    try{
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/get/${user}`, 
        {
          method:"GET",
          headers:{"Authorization":"Bearer " + token,},
        }
      )

      if(response.ok){
        let json = await response.json();
        console.log("getImg = ", json);
        setUserImg(json?.image);
      }else{
        setUserImg(null);
      }
    }catch(err){
      console.log(err);
    }
    
  };

  useEffect(()=>{
    setToken(localStorage.getItem("token"));
    setUser(localStorage.getItem("user"));
  }, [])
  
  useEffect(()=>{
    switch(path !== ""){
      case path === "/":
        setSlcHome(true);
        setSlcFriends(false);
        setSlcMarket(false);
        break;
      case path ==="/friends":
        setSlcHome(false);
        setSlcFriends(true);
        setSlcMarket(false);
        break;
      case path ==="/market":
        setSlcHome(false);
        setSlcFriends(false);
        setSlcMarket(true);
        break;
      default:
        setSlcHome(false);
        setSlcFriends(false);
        setSlcMarket(false);      
    }
  }, [path]);

  useEffect(()=>{
    getUserImg();
  }, [token]);

  console.log("Nav Token = ", token);
  console.log("Nav User = ", user);

  console.log("user img = ", userImg);

  return (
    <Container fluid className="p-0">
      <div className="fixed-bar">
        <Row className="nav display-flex justify-content-between px-0 mx-0">
          <Col className="nav-col-bkg d-flex px-0">
            <div className="brand-container">
              <p className="brand mb-0 mt-1 px-2">FabrianoSocial.it</p>
            </div>
          </Col>
          <Col className="nav-col-bkg d-flex px-0">
            <div className="d-flex justify-content-evenly align-items-end w-100">
              <div>
                <button
                  type="button"
                  onClick={() => {
                    navigate("/");
                    setMenu(false);
                  }}
                  className="nav-btn">
                  <FontAwesomeIcon icon={faHouse} />
                </button>
                <div className={`select ${slcHome ? "active" : ""}`}></div>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    navigate("/friends");
                    setMenu(false);
                  }}
                  className="nav-btn">
                  <FontAwesomeIcon icon={faUserGroup} />
                </button>
                <div className={`select ${slcFriends ? "active" : ""}`}></div>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    navigate("/articles");
                    setMenu(false);
                  }}
                  className="nav-btn">
                  <PiArticleMediumBold />
                </button>
                <div className={`select ${slcMarket ? "active" : ""}`}></div>
              </div>
            </div>
          </Col>
          <Col className="rel-container nav-col-bkg px-0">
            <div className="d-flex justify-content-end pt-1">
              {!token && <button
                type="button"
                onClick={() => setMenu(!menu)}
                className="acc-btn me-2">
                <FontAwesomeIcon icon={faUser} />
              </button>}
              {token && <button
                type="button"
                onClick={() => setMenu(!menu)}
                style={{backgroundImage:`url(${(userImg && userImg) ? userImg : "https://pluspng.com/img-png/png-user-icon-person-icon-png-people-person-user-icon-2240.png"})`, backgroundSize:"cover", backgroundPosition:"center"}}
                className="user-btn mx-1"
              >              
              </button>}
              <div className={`drop-menu d-flex flex-column align-items-center ${menu ? "" : "d-none"}`}>
                {!token &&<Link to="/register" onClick={() => {setMenu(false);}} className="drop-link py-1">
                  Registrati
                </Link>}
                {!token && <Link to="/login" onClick={() => {setMenu(false);}} className="drop-link py-1">
                  Login
                </Link>}
                {token && <Link to="/profile" className="drop-link py-1">
                    Profilo
                </Link>}
                {token && <Link
                    to="/"
                    onClick={()=>{
                      setMenu(false);
                      setUserImg(null);
                      setToken(false);
                      setUser(false);
                      localStorage.removeItem("token", "");
                      localStorage.removeItem("user", "");
                      }}
                    className="drop-link py-1">
                    Esci
                </Link>}
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="navbar-space"></div>
    </Container> 
  );
}
