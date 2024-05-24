import React, { useContext, useEffect, useState } from 'react'
import { TokenContext } from '../../Context/TokenContextProvider';
import { MenuContext } from '../../Context/MenuContextProvider';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import UniButton from '../../Components/UniButton/UniButton';

export default function ArticlesEdit() {

    const {token} = useContext(TokenContext);
    const {setMemu} = useContext(MenuContext)

    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");

    const params = new URLSearchParams(document.location.search);
    const _id = params.get("artId");

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
                console.log("Fetch get Article Edit successful!");
            }else{
                console.log("Fetch get Article Edit failed!");
            }
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        getArticleEdit();
    }, []);

  return (
    <Container onClick={()=>setMemu(false)} className='mb-5 pb-5'>
        <h3 className='text-center py-5'>Modifica Articolo:</h3>
        <Form onSubmit={()=>{}}>
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
                    onChange={setCategory}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    className='text-center'
                    value={title}
                    onChange={setTitle}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    className='text-center'
                    value={province}
                    onChange={setProvince}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    className='text-center'
                    value={city}
                    onChange={setCity}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    as="textarea"
                    rows={3}
                    className='text-center'
                    value={description}
                    onChange={setDescription}
                />
            </Form.Group>
            <UniButton type={type} label={label} />
        </Form>
    </Container>
  )
}
