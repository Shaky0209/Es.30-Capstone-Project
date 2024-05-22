import React, { useContext, useEffect, useState } from 'react';
import { TokenContext } from '../../Context/TokenContextProvider.jsx';
import { UserContext } from '../../Context/UserContextProvider.jsx';
import { MenuContext } from '../../Context/MenuContextProvider.jsx';
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import UniButton from '../../Components/UniButton/UniButton.jsx';
import BoxMessage from '../../Components/BoxMessage/BoxMessage.jsx';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './Profile.css';


export default function Profile() {

  const {token} = useContext(TokenContext);
  const {user} = useContext(UserContext);
  const {setMenu} = useContext(MenuContext);

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

  const label = "Modifica";
  const type = "button";

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

  useEffect(()=>{
    getUserProfile();
  }, []);

  return (
    <Container fluid onClick={()=>setMenu(false)}>
      <Row>
        <Col xs={10} sm={5} className='offset-1 offset-sm-0'>
          <div className='profile-cnt p-2 pb-4'>
            {sex === "male" ? <img  style={{width:"100%"}} className='img' src={img ? img : "https://tse1.mm.bing.net/th?id=OIP.Xwquh7b39vo0RocyWVTvuQHaHH&pid=Api"} alt="img" /> : 
                <img  style={{width:"100%"}} className='img' src={img ? img : "https://tse1.mm.bing.net/th?id=OIP.6UIGE50qpT7CH_CXfJuFNgAAAA&pid=Api"} alt="img" />}
            <p><b className='label pe-2'>Nome:</b> {name} {surname}</p>
            <p><b className='label pe-2'>Sesso:</b> {`${(sex==="male") ? "Maschio" : "Femmina"}`}</p>
            <p><b className='label pe-2'>Nato:</b> {birth}</p>
            <p><b className='label pe-2'>Provincia:</b> {province}</p>
            <p><b className='label pe-2'>Città</b> {city}</p>
            <p><b className='label pe-2'>e-mail:</b> {email}</p>
            <p><b className='label pe-2'>Descrizione:</b> {description}</p>
            <UniButton label={label} type={type}  />
          </div>
        </Col>
        <Col xs={10} sm={7} className='offset-1 offset-sm-0'>
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
