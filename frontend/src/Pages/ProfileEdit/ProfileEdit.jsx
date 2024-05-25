import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../../Context/TokenContextProvider';
import { UserContext } from '../../Context/UserContextProvider.jsx';
import Container from 'react-bootstrap/esm/Container';
import Form from'react-bootstrap/Form';
import UniButton from '../../Components/UniButton/UniButton';
import './ProfileEdit.css';



export default function ProfileEdit() {

    const {token} = useContext(TokenContext);
    const {user} = useContext(UserContext);
    const [img, setImg] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [birth, setBirth] = useState("");
    const [sex, setSex] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [password, setPassword] = useState("");
    const [description, setDescription] = useState("");
    
    const navigate = useNavigate();
    const type = "submit";
    const label = "Modifica";

    const updateUserImg = async(id)=>{

        let body = new FormData();
        body.append('image', img);
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/${id}/user-img`,
                {
                    method:"PATCH",
                    body: body,
                    headers:{"Authorization":"Bearer " + token},
                }
            );

            if(response.ok){
                let json = await response.json();
                console.log("Resp Update = ", json )
                console.log("Fetch ImgUpdate successful!");
            }else{
                console.log("Fetch ImgUpdate failed!");
            }
        }catch(err){
            console.log(err);
        }
    };

    const editProfile = async (event)=>{
        event.preventDefault();
        
            try{
                let day = new Date(birth).getDate();
                let month = new Date(birth).getMonth() + 1;
                let year = new Date(birth).getFullYear();
                let toDay = new Date().getFullYear();

                let body = {
                    name: name, 
                    surname: surname,
                    email: email,
                    birth: `${day}/${month}/${year}`,
                    age: `${toDay - year}`,
                    sex: sex,
                    city: city.toUpperCase(),
                    province: province.toUpperCase(),
                    password: password,
                    description: description,
                }

                console.log(body)
                
                const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/edit/${user}`,
                    {
                        method:"PUT",
                        body: JSON.stringify(body),
                        headers:{"Authorization":"Bearer " + token, "Content-type":"application/json;charset=UTF-8"}
                    }
                )
                
                if(response.ok){
                    let json = await response.json();
                    console.log("register response = ", json);
                    if(img){
                        updateUserImg(json._id);
                    }
                    console.log("Edit fetch successful!");
                    alert("Modifica effettuata! Verrai reindirizzato alla Pagina Profilo!")
                    navigate("/profile");
                }else{
                    console.log(response);
                }
            }catch(err){
                console.log("Edit fetch failed!", err);
            }
    }

    const updateProfile = async()=>{
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/get/${user}`,
                {
                    method:"GET",
                    headers:{"Autorization":"Bearer " + token}
                }
            )

            if(response.ok){
                let json = await response.json();
                setImg(json.img);
                setName(json.name);
                setSurname(json.surname);
                setEmail(json.email);
                setBirth(json.birth)
                setSex(json.sex);
                setCity(json.city);
                setProvince(json.province);
                setPassword(json.password);
                setDescription(json.description);
            }
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        updateProfile();
    }, []);

  return (
    <Container fluid className="form-size mt-5">
        <Form onSubmit={(event)=>editProfile(event)}>
            <Form.Group className="mb-3">
                <Form.Label className='text-center w-100'>Inserisci l'immagine principale del tuo profilo</Form.Label> 
                <Form.Control 
                    type="file"
                    name='Image'
                    className='text-center'
                    onChange={(event)=>setImg(event.target.files[0])}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control 
                    type="text"
                    className='text-center'
                    value={name}
                    onChange={(event)=>setName(event.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    className='text-center' 
                    value={surname}
                    onChange={(event)=>setSurname(event.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text" 
                    className='text-center' 
                    value={email}
                    onChange={(event)=>setEmail(event.target.value)}
                    required
                />
            </Form.Group>
            <Form.Label className='text-center w-100'>Inserisci la tua data di nascita</Form.Label>
            <Form.Group className="mb-3">
                <Form.Control
                    type="date" 
                    className='text-center' 
                    value={birth}
                    onChange={(event)=>setBirth(event.target.value)}
                    required
                />
            </Form.Group>
            
            <div className="d-flex justify-content-center mb-3">
                <Form.Check type="radio" id="sex" className='me-2'>
                    <Form.Check.Input
                        type="radio"
                        name="sex"
                        value={"male"}
                        onChange={(event)=>setSex(event.target.value)}
                        isValid
                        required
                    />
                    <Form.Check.Label style={{color:"black"}}>Maschio</Form.Check.Label>
                </Form.Check>

                <Form.Check type="radio" id="sex">
                    <Form.Check.Input
                        type="radio"
                        name="sex"
                        value={"female"}
                        onChange={(event)=>setSex(event.target.value)}
                        isValid
                        required
                    />
                    <Form.Check.Label style={{color:"black"}}>Femmina</Form.Check.Label>
                </Form.Check>
            </div>

            <Form.Group className="mb-3">
                <Form.Control
                    type="text" 
                    className='text-center' 
                    value={city}
                    onChange={(event)=>setCity(event.target.value.toUpperCase())}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text" 
                    className='text-center' 
                    value={province}
                    onChange={(event)=>setProvince(event.target.value.toUpperCase())}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={description}
                    onChange={(event)=>setDescription(event.target.value)}
                    required
                />
            </Form.Group>
            <UniButton type={type} label={label}/>
        </Form>
        <div className="btm-spc-form-edit"></div>
    </Container>
  )
}
