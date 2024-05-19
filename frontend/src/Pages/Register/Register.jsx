import React from 'react';
import { Container } from 'react-bootstrap';
import RegisterForm from '../../Components/RegisterForm/RegisterForm';

export default function Register() {
  
  return (
    <Container fluid className='d-flex flex-column align-items-center pt-3 px-0 pb-5'>
      <RegisterForm/>
    </Container>
    )
}
