import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../Context/UserContextProvider';
import { TokenContext } from '../../Context/TokenContextProvider';
import { MenuContext } from '../../Context/MenuContextProvider';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import UniButton from '../../Components/UniButton/UniButton';
import { useNavigate } from 'react-router-dom';

export default function ArticlesEdit() {

    const {token} = useContext(TokenContext);
    const {user} = useContext(UserContext);
    const {setMenu} = useContext(MenuContext)

    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [contact, setContact] = useState("");

    const params = new URLSearchParams(document.location.search);
    const _id = params.get("artId");
    const navitate = useNavigate();

    const label = "Invia Modifica";
    const type = "submit";

    const getArticleEdit = async()=>{
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/articles/get/${_id}`,
                {
                    method:"GET",
                    headers:{"Authorization":"Bearer " + token}
                }
            )
            if(response.ok){
                let json = await response.json();
                console.log("ArticleEdit = ", json);
                setCategory(json.category);
                setTitle(json.title);
                setDescription(json.description);
                setProvince(json.province);
                setCity(json.city);
                setContact(json.contact);
                console.log("Fetch get Article Edit successful!");
            }else{
                console.log("Fetch get Article Edit failed!");
            }
        }catch(err){
            console.log(err);
        }
    }

    const editArticle = async(event)=>{
        event.preventDefault()

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
        
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/articles/edit/${_id}`, 
                {
                    method:"PUT",
                    body: JSON.stringify(body),
                    headers: {"Authorization":"Bearer " + token, "Content-Type":"application/json"},
                }
            )
            if(response.ok){
                console.log("Fetch edit article successful!");
                alert("Il tuo articolo è stato modificato correttamente, verrai reindirizzato alla pagina articoli.")
                navitate("/articles")
            }else{
                console.log("Fetch edit article failed!");
                alert("Si è verificato un errore durante la modifica, Il tuo articolo non è stato modificato.")
            }
        }catch(err){
            console.log(err);
        }
    }

    
    useEffect(()=>{
        getArticleEdit();
    }, []);

    useEffect(()=>{
        console.log(province);
    }, [province]);

  return (
    <Container onClick={()=>setMenu(false)} className='mb-5 pb-5'>
        <h3 className='text-center py-5'>Modifica Articolo:</h3>
        <Form onSubmit={(event)=>editArticle(event)}>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    className='text-center'
                    value={_id}
                    readOnly
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    className='text-center'
                    value={category}
                    readOnly
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    className='text-center'
                    value={title}
                    onChange={(event)=>setTitle(event.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    className='text-center'
                    value={province}
                    onChange={(event)=>setProvince(event.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    className='text-center'
                    value={city}
                    onChange={(event)=>setCity(event.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    className='text-center'
                    value={contact}
                    onChange={(event)=>setContact(event.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    as="textarea"
                    rows={3}
                    className='text-center'
                    value={description}
                    onChange={(event)=>setDescription(event.target.value)}
                />
            </Form.Group>
            <UniButton type={type} label={label} />
        </Form>
    </Container>
  )
}
