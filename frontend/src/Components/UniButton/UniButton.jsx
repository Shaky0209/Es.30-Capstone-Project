import React from 'react';
import Container from 'react-bootstrap/Container';
import './UniButton.css';

export default function UniButton({label, type}) {
  return (
    <Container fluid className='d-flex justify-content-center'>
        <button type={type} className='btn-style' >{label}</button>
    </Container>
    )
}
