import React, { useContext, useEffect } from 'react';
import {MenuContext} from '../../Context/MenuContextProvider.jsx';
import {TokenContext} from '../../Context/TokenContextProvider.jsx';
import {UserContext} from '../../Context/UserContextProvider.jsx'
import './Home.css';

export default function Home() {
  const {user, setUser} = useContext(UserContext)
  const {token, setToken} = useContext(TokenContext);
  const {setMenu} = useContext(MenuContext);
  let params = new URLSearchParams(document.location.search);
  let accToken = params.get("accToken");
  
  const fetchGetMe = async ()=>{
    
    try{
      console.log("GoogleUser fetch!")
      console.log("token fetch me = " , token)
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/me`,
        {
          method:"GET",
          headers:{"Authorization":"Bearer " + token,"Content-type":"application/json;charset=UTF-8"},
        })
        
        if(response.ok){
          let json = await response.json();
          console.log("User fetch successful!");
          console.log("home GoogleUser = ", json);
          localStorage.setItem("user", json._id);
          setUser(json._id);
        }else{
          console.log(response);
          console.log("User fetch failed!");
        }
      }catch(err){
        console.error(err);
      }
    }
    
    
    if(accToken){
      console.log("is accToken")
      fetchGetMe();
      localStorage.setItem("token", accToken);
      setToken(accToken);
      console.log("token home = ",  token);
    }else{
      setToken(localStorage.getItem("token"));
      setUser(localStorage.getItem("user"));
    }
    
    
    console.log("token = ", token);
    console.log("user = ", user);
    
    return (
      <div onClick={()=>setMenu(false)} className='d-flex justify-content-center align-items-center vh-100'>
      <h1 className='pb-0'>Home Page</h1>
    </div>
  )
}
