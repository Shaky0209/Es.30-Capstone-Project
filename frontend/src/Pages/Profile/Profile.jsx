import React, { useContext, useEffect, useState } from 'react';
import { TokenContext } from '../../Context/TokenContextProvider.jsx';
import { UserContext } from '../../Context/UserContextProvider.jsx';
import { MenuContext } from '../../Context/MenuContextProvider.jsx';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { ImgContext } from '../../Context/ImgContextProvider.jsx';
import { MsgContext } from '../../Context/MsgContextProvider.jsx';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Form from 'react-bootstrap/esm/Form';
import Container from 'react-bootstrap/esm/Container';
import UniButton from '../../Components/UniButton/UniButton.jsx';
import BoxMessage from '../../Components/BoxMessage/BoxMessage.jsx';
import './Profile.css';


export default function Profile() {

  const {avatar, setAvatar} = useContext(ImgContext);
  const {token} = useContext(TokenContext);
  const {user} = useContext(UserContext);
  const {setMenu} = useContext(MenuContext);
  const {whatMsg, setWhatMsg} = useContext(MsgContext);

  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [birth, setBirth] = useState("");
  const [sex, setSex] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [description, setDescription] = useState("");
  const [msgBox, setMsgBox] = useState("");
  const [edit, setEdit] = useState(false);
  const [imgEdit, setImgEdit] = useState("");

  const navigate = useNavigate();
  const label = "Modifica";
  const type = "button";
  const label2 = "Invia";
  const type2 = "submit";

  const getUserProfile = async()=>{
    try{
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/get/${user}`,
        {
          method:"GET",
          headers:{"Authorization":"Bearer " + token}
        }
      )
      if(response.ok){

        let json = await response.json();

        setAvatar(json.image);
        setImg(json.image);
        setName(json.name);
        setSurname(json.surname);
        setEmail(json.email);
        setBirth(json.birth);
        setSex(json.sex);
        setCity(json.city);
        setProvince(json.province);
        setDescription(json.description);
        setMsgBox(json.msgBox);
        console.log("Fetch get me profile success!");
      }else{
        console.log("Fetch get me profile failed!");
        console.log(response)
      }

    }catch(err){
      console.error(err);
    }
  }

  const editImg = async(event)=>{
    event.preventDefault();

    let body = new FormData();
        body.append('image', imgEdit);

    try{
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/${user}/user-img`,
        {
          method:"PATCH",
          body: body,
          headers:{"Authorization":"Bearer " + token}
        }
      )

      if(response.ok){
        let json = await response.json();
        localStorage.setItem("avatar", json.image);
        setAvatar(json.image)
        console.log("avatar = ", json);
        console.log("Fetch edit image successful!");
        
        setEdit(false);
        getUserProfile();
      }else{
        console.log("Fetch edit image failed!");
        setEdit(false);
        alert("Errore: La tua immagine non è stata modificata!");
      }
    }catch(err){
      console.log(err)
    }
  };

  const msgRead = async()=>{
    try{

      let body = {countMsg: 0}

      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/count/msg/${user}`,
        {
          method:"PATCH",
          body: JSON.stringify(body),
          headers:{"Authorization":"Bearer " + token,"Content-Type":"application/json"},
        }
      )
      if(response.ok){
        console.log("Fetch msg read successful!");
        setWhatMsg(0);
        localStorage.setItem("getMsg", 0);
      }else{
        console.log("Fetch msg read failed!");
      }
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    getUserProfile();
  }, []);

  return (
    <Container
      fluid
      onClick={()=>{
        setMenu(false)
        msgRead()
      }}
      className='pt-3'
    >
      <Row>
        <Col xs={12} md={5} className=''>
          {/* Pop Up Edit  */}
          <div className={`pop-edit-profile ${edit ? "" : "d-none"}`}>
            <div className='pop-edit-top d-flex align-items-center'>
              <p className='pop-label-top text-center mb-0 w-100'>Modifica Immagine:</p>
              <button className="edit-cls me-1" onClick={()=>setEdit(false)} >X</button>
            </div>
            <div className='form-body d-flex flex-column justify-content-center align-items-center px-5 h-75'>
              <Form onSubmit={(event)=>editImg(event)} >
                <Form.Group className="mb-3">
                  <Form.Label className='edit-label text-center w-100'>Inserisci il file da aggiungere:</Form.Label>
                  <Form.Control type="file" onChange={(event)=>setImgEdit(event.target.files[0])} />
                </Form.Group>
                <UniButton type={type2} label={label2} />
              </Form>
            </div>
          </div>

          <div className='profile-cnt p-2 pb-4'>
            <div className='img-cnt'>
              {sex === "male" ? <img  style={{width:"100%"}} className='img' src={img ? img : "https://tse1.mm.bing.net/th?id=OIP.Xwquh7b39vo0RocyWVTvuQHaHH&pid=Api"} alt="img" /> : 
                  <img  style={{width:"100%"}} className='img' src={img ? img : "https://tse1.mm.bing.net/th?id=OIP.6UIGE50qpT7CH_CXfJuFNgAAAA&pid=Api"} alt="img" />}
              <button className='edit-profile-img' onClick={()=>setEdit(true)}>Edit</button>
            </div>
            <div className='py-3'>
              <p><b className='label pe-2'>Nome:</b> {name} {surname}</p>
              <p><b className='label pe-2'>Sesso:</b> {`${(sex==="male") ? "Maschio" : "Femmina"}`}</p>
              <p><b className='label pe-2'>Nato:</b> {birth}</p>
              <p><b className='label pe-2'>Provincia:</b> {province}</p>
              <p><b className='label pe-2'>Città</b> {city}</p>
              <p><b className='label pe-2'>e-mail:</b> {email}</p>
              <p><b className='label pe-2'>Descrizione:</b> {description}</p>
            </div>
            <UniButton label={label} type={type} fnc={()=>navigate("/profile/edit")} />
          </div>
        </Col>
        <Col xs={12} md={7} className='mt-5 mt-md-0'>
          <h4 className='text-center msgBox'><FontAwesomeIcon className='mail me-1' icon={faEnvelope} />Message Box:</h4>
          <Container fluid className={`${msgBox.length > 0 ? 'profile-cnt' : ''} d-flex flex-column-reverse p-2`}>
            {msgBox.length > 0 && msgBox.map((message)=>{
              console.log(message);
              const {author, msg, _id, posted} = message;
              return <BoxMessage author={author} msg={msg} msgId={_id} refresh={()=>getUserProfile()} posted={posted} />
            })}
          </Container>
        </Col>
        <div className="btm-space-profile"></div>
      </Row>
    </Container>
  );
}
