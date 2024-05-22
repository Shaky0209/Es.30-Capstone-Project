import React from 'react';
import Container from 'react-bootstrap/Container';
import './UniButton.css';

export default function UniButton({label, type, fnc}) {
  return (
    <Container fluid className='d-flex justify-content-center'>
        {!fnc && <button type={type} className='btn-style'>{label}</button>}
        {fnc && <button type={type} className='btn-style' onClick={()=>fnc()} >{label}</button>}
    </Container>
    )
}
