import React, { useContext, useEffect } from 'react';
import { MenuContext } from '../../Context/MenuContextProvider';
import './Home.css';

export default function Home() {

  const {setMenu} = useContext(MenuContext);
  let token = localStorage.getItem("token");
  let user = localStorage.getItem("user");
  console.log("token = ", token);
  console.log("user = ", user);
  let params = new URLSearchParams(document.location.search);
  let accToken = params.get("accToken");

 

  const fetchGetMe = async ()=>{
    console.log("getGoogleUser accToken = ", accToken);
    try{
      console.log("GoogleUser fetch!")
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/me`,
        {
          method:"GET",
          headers:{"Authorization":"Bearer " + accToken},
        })
  
        if(response.ok){
          let json = await response.json();
          console.log("User fetch successful!");
          console.log("home GoogleUser = ", json);
        }else{
          console.log(response);
          console.log("User fetch failed!");
        }
    }catch(err){
      console.error(err);
    }
  }
  
  if(accToken){
    fetchGetMe();
  }

 

  return (
    <div onClick={()=>setMenu(false)} className='d-flex justify-content-center align-items-center vh-100'>
      <h1 className='pb-0'>Home Page</h1>
    </div>
  )
}
