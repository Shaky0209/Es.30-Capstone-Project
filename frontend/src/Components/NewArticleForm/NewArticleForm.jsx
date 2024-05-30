import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../../Context/TokenContextProvider';
import { UserContext } from '../../Context/UserContextProvider';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import UniButton from '../UniButton/UniButton';
import './NewArticleForm.css';

export default function NewArticleForm() {

    const {user} = useContext(UserContext);
    const {token} = useContext(TokenContext);
    const [category, setCategory]= useState("");
    const [title, setTitle] = useState("");
    const [img, setImg] = useState("");
    const [description, setDescription] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [contact, setContact] = useState("");
    const navigate = useNavigate();
    const type = "button";
    const label = "Invia";

    const updateArtImg = async(id)=>{
        try{
            let body = new FormData();
            body.append('img', img);
            
        
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/articles/new/img/${id}`,
                {
                    method:"PATCH",
                    body: body,
                    headers:{"Authorization":"Bearer " + token},
                }
            );

            if(response.ok){
                console.log("Fetch updateArtImg successful!");
            }else{
                console.log("Fetch updateArtImg failed!");
            }
            setImg("");
        }catch(err){
            console.log(err);
            setImg("");
        }
    }
  
    const addArticle = async(event)=>{
        // event.preventDefault();

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
            
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/articles/new`, 
                {
                    method:"POST",
                    body: JSON.stringify(body),
                    headers:{"Authorization":"Bearer " + token,"Content-type":"application/json"}
                })
            
            if(response.ok){
                console.log("Fetch article succesful!");
                let json = await response.json();
                console.log("body article2 = ", json)
                if(img){
                    updateArtImg(json._id);
                }
                alert("Il tuo articolo è stato inserito correttamente, verrai reindirizzato alla pagina articoli");
                navigate("/articles");
            }else{
                console.log("Fetch article failed!");
                alert("Si è verificato un errore nell'inserimento del tuo articolo, non è quindi stato inserito.");
            }
        }catch(err){
            console.log(err);
        }
    }

    

  return (
    <Container className='article-form-cnt d-flex flex-column align-items-center pt-5'>
        <h4>Inserisci il tuo articolo</h4>
        <Form>
            <div className='d-flex justify-content-between'>
                <Form.Select id="category" className='me-2' onChange={(event)=>setCategory(event.target.value)} required>
                    <option value={null}></option>
                    <option value="Auto">Auto</option>
                    <option value="Moto">Moto</option>
                    <option value="Elettronica">Elettronica</option>
                    <option value="Informatica">Informatica</option>
                    <option value="Telefonia">Telefonia</option>
                    <option value="Sport">Sport</option>
                    <option value="Immobili">Immobili</option>
                    <option value="Casalinghi">Casalinghi</option>
                    <option value="Lavoro">Lavoro</option>
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
                    onChange={(event)=>setImg(event.target.files[0])}
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
            <UniButton type={type} label={label} fnc={addArticle}/>  
        </Form>
        <div className="space-btm-form-art"></div>
    </Container>
  )
}
