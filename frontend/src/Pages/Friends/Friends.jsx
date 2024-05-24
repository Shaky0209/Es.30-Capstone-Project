import React, { useContext, useEffect, useState } from "react";
import { MenuContext } from "../../Context/MenuContextProvider.jsx";
import { TokenContext } from "../../Context/TokenContextProvider.jsx";
import { UserContext } from "../../Context/UserContextProvider.jsx";
import UserCard from "../../Components/UserCard/UserCard.jsx";
import FriendsAvancedSrc from "../../Components/FriendsAvancedSrc/FriendsAvancedSrc.jsx";
import './Friends.css';

export default function Friends() {
  const [friends, setFriends] = useState([]);
  const [spin, setSpin] = useState(false);
  const {setMenu} = useContext(MenuContext);
  const {token, setToken} = useContext(TokenContext);
  const {setUser} = useContext(UserContext);
  

  const getFriends = async () => {
    setSpin(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/friends`,
        {
          method: "GET",
          headers:{"Authorization":"Bearer " + token}
        }
      );

      if (response.ok) {
        let json = await response.json();
        
        setFriends(json);
        setSpin(false)
        console.log("Fetch get friends sussessful!");
      } else {
        setSpin(false);
        console.log("Fetch get friends failed!");
        if(response.status === 401){
          localStorage.removeItem("token");
          localStorage.removeItem("user")
          setToken("")
          setUser("")
        }
      }
    } catch (err) {
      setSpin(false)
      console.error(err);
    }
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <div className="friends-page container-fluid" onClick={()=>setMenu(false)}>
      <div style={{height:"80vh"}} className={`d-flex justify-content-center align-items-center w-100 ${spin ? "":"d-none"}`}>
        <div className="spinner-border text-danger" role="status"></div>
      </div>
        
      <div className="row">
        <div className={`col-sm-4 col-md-3 col-xxl-2 px-5 px-sm-2 ${token ? "":"d-none"}`}>
          <div className="search-cnt">
            <FriendsAvancedSrc setFriends={setFriends} />
          </div>
        </div>
        <div className={`offset-1 offset-sm-0 col-10 col-sm-8 col-md-9 col-xxl-10 mt-5 ${token ? "":"d-none"}`}>
          <div className="row">
            {friends.map((friend) => {
              const { image, name, surname, birth, age, sex, city, province, description, msgBox, _id } = friend;
  
              return (
                <UserCard
                  key={_id}
                  id={_id}
                  image={image}
                  name={name}
                  surname={surname}
                  birth={birth}
                  age={age}
                  sex={sex}
                  city={city}
                  province={province}
                  description={description}
                  msgBox={msgBox}
                />
              );
            })}
          </div>
        </div>
        <div className={`col-12 ${token ? "d-none":""}`}>
            <div className="friends-unlgd-cnt d-flex justify-content-center align-items-center">
              <div className="my-alert d-flex align-items-center px-md-5">
                <h3 className="text-center">Per Accedere ai contenuti devi essere registrato ed effettuare il login.</h3>
              </div>
            </div>
        </div>
      </div>
      <div className="friends-btm-spc"></div>
    </div>
  );
}
