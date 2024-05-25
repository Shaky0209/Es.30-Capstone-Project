import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import UniButton from '../../Components/UniButton/UniButton';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

export default function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const label = "Login";
    const type = "submit";

    const logFnc = async(event)=>{
        event.preventDefault();

        let body = {
            email: email, 
            password: password,
        }

        try{
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/login`, 
            {
                method:"POST",
                body: JSON.stringify(body),
                headers:{"Content-type":"application/json;charset=UTF-8"}
            });

            if(response.ok){
                let json = await response.json();
                console.log("Login = ", json);
                console.log("json user = ", json.user._id);
                localStorage.setItem("token", json.token);
                localStorage.setItem("user", json.user._id);
                navigate("/");
                console.log("Login succesful!");
            }else{
                console.log("Access Denied!");
                alert("I dati inseriti non sono corretti!");
            }
            
        }catch(err){
            console.log(err);
        }
    };
    
    const googleLogIn = (event)=>{   
        event.preventDefault();
        const link = process.env.REACT_APP_URL_G_LOGIN;
        window.open(link, "_self");
    }

    return (
        <Container fluid className='form-size'>
            <Form onSubmit={logFnc}>
                <div className='login-form-container'>
                    <Form.Group className="mb-3">
                        <Form.Control 
                            type="text"
                            className='text-center'
                            placeholder="e-mail"
                            onChange={(event)=>{setEmail(event.target.value)}}
                            required
                        />
                    </Form.Group><Form.Group className="mb-3">
                        <Form.Control 
                            type="password"
                            className='text-center'
                            placeholder="Password"
                            onChange={(event)=>{setPassword(event.target.value)}}
                            required
                        />
                    </Form.Group>
                    <UniButton type={type} label={label} />
                    <p className='text-center mt-3'>Oppure...</p>
                    <div className='d-flex justify-content-center'>
                        <Button variant='warning' onClick={(event)=>googleLogIn(event)} className='d-flex flex-column align-items-center'>
                            <Image style={{height:"35px"}} src='https://cdn.imgbin.com/23/7/2/imgbin-google-logo-google-search-icon-google-google-logo-hEJMjnfCV4MA1gDtjaWTv5kc1.jpg'></Image>
                            Accedi con Google!
                        </Button>
                    </div>
                </div>
            </Form>
        </Container>
    );
}
