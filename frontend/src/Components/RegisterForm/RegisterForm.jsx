import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import UniButton from '../../Components/UniButton/UniButton';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../../Context/TokenContextProvider.jsx';
import './RegisterForm.css';

export default function RegisterForm() {

    const [img, setImg] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [birth, setBirth] = useState("");
    const [sex, setSex] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [description, setDescription] = useState("");

    const {token} = useContext(TokenContext);

    const label = "Registrati!";
    const type = "submit"
    const navigate = useNavigate();

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

    const userRegistry = async (event)=>{
        event.preventDefault();
        
        console.log("data == ", new Date(birth).getDate());

        if(password.length >= 8 && password === rePassword){
            console.log("Fetch");
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
                
                const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/register`,
                    {
                        method:"POST",
                        body: JSON.stringify(body),
                        headers:{"Content-type":"application/json;charset=UTF-8"}
                    }
                )
                
                if(response.status === 600){
                    alert("Attenzione! Questo indirizzo e-mail è già registrato nel database!");
                }else if(response.ok){
                    let json = await response.json();
                    console.log("register response = ", json);
                    if(img){
                        updateUserImg(json._id);
                    }
                    console.log("Register fetch successful!");
                    alert("Registrazione avvenuta con successo! Verrai reindirizzato alla Home Page!")
                    navigate("/");
                }else{
                    console.log(response);
                }
            }catch(err){
                console.log("Register fetch failed!", err);
            }
        }else{
            alert("I campi relativi alla password devono coincidere e contenere una stringa lunga almeno 8 caratteri.")
        }
    }

  return (
    <Container fluid className="form-size">
        <Form onSubmit={userRegistry}>
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
                    placeholder="Nome"
                    onChange={(event)=>setName(event.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    className='text-center' 
                    placeholder="Cognome"
                    onChange={(event)=>setSurname(event.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text" 
                    className='text-center' 
                    placeholder="e-mail"
                    onChange={(event)=>setEmail(event.target.value)}
                    required
                />
            </Form.Group>
            <Form.Label className='text-center w-100'>Inserisci la tua data di nascita</Form.Label>
            <Form.Group className="mb-3">
                <Form.Control
                    type="date" 
                    className='text-center' 
                    placeholder="Data di nascita"
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
                    placeholder="Città"
                    onChange={(event)=>setCity(event.target.value.toUpperCase())}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text" 
                    className='text-center' 
                    placeholder="Provincia"
                    onChange={(event)=>setProvince(event.target.value.toUpperCase())}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="password"
                    className='text-center' 
                    placeholder="Password"
                    onChange={(event)=>setPassword(event.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="password"
                    className='text-center' 
                    placeholder="Ripeti Password"
                    onChange={(event)=>setRePassword(event.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder='Dicci qualcosa su di te, hobbies, interessi, oppure la tua frase preferita...'
                    onChange={(event)=>setDescription(event.target.value)}
                    required
                />
            </Form.Group>
            <UniButton type={type} label={label}/>
        </Form>
    </Container>
  )
}
