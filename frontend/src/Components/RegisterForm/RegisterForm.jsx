import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import UniButton from '../../Components/UniButton/UniButton';
import { useNavigate } from 'react-router-dom';
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

    const label = "Registrati!";
    const type = "submit"
    const navigate = useNavigate();

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
                    city: city,
                    province: province,
                    password: password,
                    description: description,
                }
                console.log(body)
                let url = process.env.REACT_APP_SERVER_URL;
                console.log(url);
                const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/register`,
                    {
                        method:"POST",
                        body: JSON.stringify(body),
                        headers:{"Content-type":"application/json;charset=UTF-8"}
                    }
                )
                if(response.ok){
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
                onChange={(event)=>setImg(event.target.value)}
                // required
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
                onChange={(event)=>setCity(event.target.value)}
                required
            />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Control
                type="text" 
                className='text-center' 
                placeholder="Provincia"
                onChange={(event)=>setProvince(event.target.value)}
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
