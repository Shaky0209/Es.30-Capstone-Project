import React from 'react'
import { Container } from 'react-bootstrap';
import LoginForm from '../../Components/LoginForm/LoginForm';
import './Login.css';

export default function Login() {

  
  return (
    <Container fluid className='body d-flex flex-column justify-content-center align-items-center'>
      <h2>Inserisci i tuoi dati di accesso</h2>
      <LoginForm/>
    </Container>
  )
}
