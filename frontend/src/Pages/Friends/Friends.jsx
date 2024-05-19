import React, { useContext, useEffect, useState } from "react";
import { MenuContext } from "../../Context/MenuContextProvider.jsx";
import UserCard from "../../Components/UserCard/UserCard.jsx";
import FriendsAvancedSrc from "../../Components/FriendsAvancedSrc/FriendsAvancedSrc.jsx";
import './Friends.css';

export default function Friends() {
  const [friends, setFriends] = useState([]);
  const [spin, setSpin] = useState(false);
  const {setMenu} = useContext(MenuContext)

  const getFriends = async () => {
    setSpin(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/user/friends`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        console.log("Fetch get friends sussessful!");
        let json = await response.json();
        console.log("friends = ", json);
        setFriends(json);
        setSpin(false)
      } else {
        setSpin(false);
        console.log("Fetch get friends failed!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <div className="container-fluid" onClick={()=>setMenu(false)}>
      <div style={{height:"80vh"}} className={`d-flex justify-content-center align-items-center w-100 ${spin ? "":"d-none"}`}>
        <div className="spinner-border text-danger" role="status"></div>
      </div>
        
      <div className="row">
        <div className="col-sm-4 col-md-3 col-xxl-2 px-5 px-sm-2">
          <div className="search-cnt">
            <FriendsAvancedSrc/>
          </div>
        </div>
        <div className="offset-1 offset-sm-0 col-10 col-sm-8 col-md-9 col-xxl-10 mt-5">
          <div className="row">
          {friends.map((friend) => {
            const { image, name, surname, birth, age, sex, city, province, description, _id } = friend;

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
              />
            );
          })}
          </div>
        </div>
      </div>
      <div className="friends-btm-spc"></div>
    </div>
  );
}
