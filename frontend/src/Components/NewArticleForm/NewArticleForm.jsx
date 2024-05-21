import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import UniButton from '../UniButton/UniButton';
import './NewArticleForm.css';

export default function NewArticleForm() {

    const [category, setCategory]= useState("");
    const [title, setTitle] = useState("");
    const [img, setImg] = useState("");
    const [description, setDescription] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [contact, setContact] = useState("");
    let user = localStorage.getItem("user");
    let token = localStorage.getItem("token");
    const type = "submit"
    const label = "Invia"

    const addArticle = async(event)=>{
        event.preventDefault();

        try{
            let body = {
                category: category, 
                title: title,
                description: description,
                city: city.toUpperCase(),
                province: province.toUpperCase(),
                contact: contact,
                user: user,
            }
            console.log("body article = ", body);
            
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/articles/new`, 
                {
                    method:"POST",
                    body: JSON.stringify(body),
                    headers:{"Authorization":"Bearer " + token,"Content-type":"application/json;charset=UTF-8"}
                })
            
            if(response.ok){
                console.log("Fetch article succesful!");
                let json = await response.json();
                console.log("body article2 = ", json)
                alert("Il tuo articolo è stato inserito correttamente");
            }else{
                console.log("Fetch article failed!");
            }
        }catch(err){
            console.log(err);
            alert("Si è verificato un errore nell'inserimento del tuo articolo, non è quindi stato inserito.");
        }
    }

  return (
    <Container className='article-form-cnt d-flex flex-column align-items-center pt-5'>
        <h4>Inserisci il tuo articolo</h4>
        <Form onSubmit={(event)=>{addArticle(event)}}>
            <div className='d-flex justify-content-between'>
                <Form.Select id="category" className='me-2' onChange={(event)=>setCategory(event.target.value)}>
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
                <Form.Group className="mb-3">
                    <Form.Control
                        type="text" 
                        className='title text-center' 
                        placeholder='Titolo'
                        onChange={(event)=>setTitle(event.target.value)}
                        required
                    />
                </Form.Group>
            </div>
            <Form.Group className="mb-3">
                <Form.Control
                    type="file" 
                    className='title text-center' 
                    onChange={(event)=>setImg(event.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    as="textarea"
                    rows={5}
                    type='text'
                    className='text-center' 
                    placeholder='Descrizione'
                    onChange={(event)=>setDescription(event.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text" 
                    className='text-center' 
                    placeholder='Città'
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
                    type="text" 
                    className='text-center' 
                    placeholder='Contatto diretto (facoltativo)'
                    onChange={(event)=>setContact(event.target.value)}
                />
            </Form.Group>
            <UniButton type={type} label={label}/>  
        </Form>
        <div className="space-btm-form-art"></div>
    </Container>
  )
}
