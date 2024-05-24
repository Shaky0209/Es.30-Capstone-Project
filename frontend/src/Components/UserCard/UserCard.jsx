import React, { useContext, useState } from 'react';
import { UserContext } from '../../Context/UserContextProvider.jsx';
import { TokenContext } from '../../Context/TokenContextProvider.jsx';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import UniButton from '../UniButton/UniButton';
import './UserCard.css';

export default function UserCard({image, name, surname, sex, birth, age, city, province, description, id }) {
  
  let {user} = useContext(UserContext);
  let {token} = useContext(TokenContext);
  let now = new Date().toLocaleString();

  const [popMsg, setPopMsg] = useState(false);
  const [message, setMessage] = useState("");
  const label = "invia";
  const type = "submit";

  const sendMessage = async(event)=>{
    
    event.preventDefault();

    let body = {
      author: user,
      msg: message,
      posted: now,
    }

    try{
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/message/${id}`,
        {
          method:"POST",
          body: JSON.stringify(body),
          headers: {"Authorization":"Bearer " + token, "Content-Type":"application/json"},
        }
      )

      if(response.ok){
        let json = await response.json();
        console.log(json);
        console.log("Fetch post message successful!");
      }else{
        console.log("Fetch post message failed!");
      }

    }catch(err){
      console.log(err);
    }

    setMessage("");
    setPopMsg(false);
  };

  return (
    <>
    <div className={`pop-up-contact px-0 ${popMsg ? "" : "d-none"}`}>
      <div className='pop-up-top d-flex justify-content-end align-items-center'>
        <p className='msgTo text-center m-0 w-100'><b className='me-2'>To:</b>{name} {surname}</p>
        <button
          className='pop-up-cls me-1'
          onClick={()=>{
            setPopMsg(false);
            setMessage("");
          }}>
            X
        </button>
      </div>
      <div className='d-flex flex-column align-items-center'>
        <h5 className='pop-up-title text-center'>Scrivi il tuo messaggio:</h5>
        <Form onSubmit={(event)=>sendMessage(event)} >
          <Form.Control
              className='textarea mb-2'
              value={message}
              onChange={(event)=>{setMessage(event.target.value)}}
              as="textarea"
              placeholder="Ciao..."
              
            />
            <UniButton type={type} label={label} />
          </Form>
      </div>
    </div>
    <Col  xxl={2} lg={3} md={4} xs={6} className='p-1'>
        <div className='card d-flex justify-content-between flex-column p-2 h-100'>
          <div className='d-flex flex-column justify-content-between h-100'>
            <div>
              {sex === "male" ? <img  style={{width:"100%"}} src={image ? image : "https://tse1.mm.bing.net/th?id=OIP.Xwquh7b39vo0RocyWVTvuQHaHH&pid=Api"} alt="img" /> : 
              <img  style={{width:"100%"}} src={image ? image : "https://tse1.mm.bing.net/th?id=OIP.6UIGE50qpT7CH_CXfJuFNgAAAA&pid=Api"} alt="img" />}        
            </div>
            <div>
              <p className='p-user m-0'><b>Nome:</b> {name} {surname}</p>
              <p className='p-user m-0'><b>Sesso:</b> {(sex === "male") ? "Maschio" : "Femmina"}</p>
              <p className='p-user m-0'><b>Età: </b>{age}</p>
              <p className='p-user m-0'><b>Nato/a: </b>{birth}</p>
              <p className='p-user m-0'><b>Città:</b> {city}</p>
              <p className='p-user m-0'><b>Provincia: </b> {province}</p>
              <p className='p-user m-0'><b>Qualcosa su di me:</b> {description}</p>
            </div>
          </div> 
          <div className='d-flex'>
            {(user === id) && <button className="user-card-btn">Modifica</button>}
            {(user !== id) && <button className='user-card-btn' onClick={()=>setPopMsg(true)} >Contatta</button>}
          </div>
        </div>
    </Col>
    </>
  )
}
