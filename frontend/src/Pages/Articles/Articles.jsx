import React, { useContext, useEffect, useState } from 'react';
import { MenuContext } from '../../Context/MenuContextProvider';
import { Container, Row, Col, Form } from 'react-bootstrap';
import './Articles.css';

export default function Articles() {

  const {setMenu} = useContext(MenuContext);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");

  useEffect(()=>{
    if(category.length > 0){
      console.log("category = ", category)
    }
  }, [category]);

  return (
    <Container fluid onClick={()=>setMenu(false)}>
      <Form>
        <Container fluid className='d-flex mb-4 w-100'>
          <div className='form-slc d-flex flex-column align-items-center'>
            <Form.Label className='mb-0' htmlFor="category">Categoria:</Form.Label>
            <Form.Select id="category" onChange={(event)=>setCategory(event.target.value)} size='sm'>
              <option value=""></option>
              <option value="car">Auto</option>
              <option value="motorcycle">Moto</option>
              <option value="electronics">Elettronica</option>
              <option value="informatics">Informatica</option>
              <option value="telephony">Telefonia</option>
              <option value="Sport">Sport</option>
              <option value="properties">Immobili</option>
              <option value="housewares">Casalinghi</option>
              <option value="work">Lavoro</option>
            </Form.Select>
          </div>
          <Container fluid className='d-flex flex-column align-items-center'>
            <Form.Label htmlFor="title-src" className='mb-0' >Ricerca nei titoli:</Form.Label>
            <Form.Control
              onChange={(event)=>setTitle(event.target.value)}
              type="text"
              id="title-src"
              size='sm'
            />
          </Container>
        </Container>
      </Form>
      <Container>
        <Row>
          <div style={{height:"100vh"}}></div>
        </Row>
      </Container>
    </Container>
  )
}