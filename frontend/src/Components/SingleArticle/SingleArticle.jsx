import React, { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../Context/TokenContextProvider";
import { UserContext } from "../../Context/UserContextProvider";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import UniButton from "../UniButton/UniButton";
import "./SingleArticle.css";

export default function SingleArticle({id, img, category, title, description, city, province, contact, userId, posted, refresh}) {

  const { token } = useContext(TokenContext);
  const { user } = useContext(UserContext);
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [popMsg, setPopMsg] = useState(false);
  const [popDel, setPopDel] = useState(false);
  const [edit, setEdit] = useState(false);
  const [imgEdit, setImgEdit] = useState("");

  const type = "submit";
  const label = "Invia";
  const navigate = useNavigate();
  let now = new Date().toLocaleString();

  const getAuthor = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/get/${userId}`,
        {
          method: "GET",
          headers: {"Authorization": "Bearer " + token },
        }
      );

      if (response.ok) {
        let json = await response.json();
        setAuthor(json);
        console.log("Fetch single article, get author successful!");
      } else {
        console.log("Fetch single article, get author failed!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessage = async(event)=>{
    
    event.preventDefault();

    let body = {
      author: user,
      msg: message,
      posted: now,
    }

    try{
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/message/${userId}`,
        {
          method:"POST",
          body: JSON.stringify(body),
          headers: {"Authorization":"Bearer " + token, "Content-Type":"application/json"},
        }
      )

      if(response.ok){
        let json = await response.json();
        console.log(json);
        console.log("Fetch post message successful!");
      }else{
        console.log("Fetch post message failed!");
      }

    }catch(err){
      console.log(err);
    }

    setMessage("");
    setPopMsg(false);
  };

  const deleteArticle = async()=>{
    try{
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/articles/delete/${id}`,
        {
          method:"DELETE",
          headers:{"Authorization":"Bearer " + token}
        }
      )
      if(response.ok){
        setPopDel(false);
        refresh();
        console.log("Fetch delete article successful!");
      }else{
        console.log("Fetch delete article failed!");
      }
    }catch(err){
      console.log(err);
    }
  }

  const editImg = async(event)=>{
    event.preventDefault();

    let body = new FormData();
    body.append('img', imgEdit);
    
    try{
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/articles/new/img/${id}`,
            {
                method:"PATCH",
                body: body,
                headers:{"Authorization":"Bearer " + token},
            }
        );

        if(response.ok){
          console.log("Edit article image successful!");
          setEdit(false);
          alert("Modifica Immagine Riuscita!")
          refresh();
        }else{
          console.log("Edit article image failed!");
        }
    }catch(err){
        console.log(err);
    }
};

  useEffect(() => {
    getAuthor();
  }, []);

  return (
    <Col xs={10} sm={5} md={4} lg={3} xl={2} className="my-1 px-1">
      <div className="card-art d-flex flex-column justify-content-between p-1 h-100">
        <div>
          <div className="art-img-cont">
            <img style={{ width: "100%" }} src={`${img || "https://www.slgstore.it/media/catalog/product/placeholder/default/167492439-no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image.jpg"}`} alt="img"/>
            {(user === userId) && <button type="button" className="art-img-edit" onClick={()=>setEdit(true)}>Edit</button>}
          </div>
          <p className="article-row mb-0">
            <b className="orangered">Category:</b> {category}
          </p>
          <p className="article-row mb-0">
            <b className="orangered">Title:</b> {title}
          </p>
          <p className="article-row mt-2 mb-0">
            <b className="orangered">Description:</b> {description}
          </p>
          <p className="article-row mt-2 mb-0">
            <b className="orangered">City:</b> {city}
          </p>
          <p className="article-row mb-0">
            <b className="orangered">Provincia:</b> {province}
          </p>
          <p className="article-row mb-0">
            <b className="orangered">Contatto:</b> {contact}
          </p>
          <p className="article-row little mb-0">
            <b className="little orangered">Postato:</b> {posted}
          </p>
          <p className="article-row little mb-0">
            <b className="little orangered">Autore:</b> {author.name}{" "}
            {author.surname}
          </p>
          <p className="article-row little mb-0">
            <b className="little orangered">Obj_id:</b> {id}
          </p>
        </div>
        <div>
          
          {!(user === userId) && <button className="card-btn" onClick={()=>setPopMsg(true)}>Contatta</button>}
          {user === userId && <button className="card-btn"onClick={()=>navigate(`/articles/edit/?artId=${id}`)}>Modifica</button>}
          {user === userId && <button className="card-btn" onClick={()=>setPopDel(true)}>Elimina</button>}
        </div>
      </div>
      {/* Pop-Up - Send Message  */}
      <div className={`pop-up-contact px-0 ${popMsg ? "" : "d-none"}`}>
        <div className="pop-up-top d-flex justify-content-end align-items-center">
          <p className="msgTo text-center m-0 w-100"><b className="me-2">To:</b>{author.name} {author.surname}</p>
          <button
            className="pop-up-cls me-1"
            onClick={() => {
              setPopMsg(false);
              setMessage("");
            }}>
            X
          </button>
        </div>
        <div className="d-flex flex-column align-items-center">
          <h5 className="pop-up-title text-center">Scrivi il tuo messaggio:</h5>
          <Form onSubmit={(event) => sendMessage(event)}>
            <Form.Control
              className="textarea mb-2"
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
              as="textarea"
              placeholder="Ciao..."
            />
            <UniButton type={type} label={label} />
          </Form>
        </div>
      </div>
      {/* Pop-Up - Delete */}
      <div className={`delete ${popDel ? "":"d-none"}`}>
        <div className="top-del d-flex justify-content-end align-items-center">
            <p className="msg-del text-center mb-0 ms-4 w-100">Cancella Articolo:</p>
            <button className='reply-cls m-1' onClick={()=>setPopDel(false)}>X</button>
        </div>
        <div className='del-body d-flex justify-content-center align-items-center m-0 px-3'>
            <Alert variant="danger" className='alert-background'>
                <h4 className='sure'>Sei sicuro di voler cancellare questo articolo?</h4>
            </Alert>
        </div>
        <div className='btm-del d-flex justify-content-center pt-3'>
            <button className='msg-btn' onClick={()=>deleteArticle()}>Si</button>
            <button className='msg-btn' onClick={()=>setPopDel(false)}>No</button>
        </div>
      </div>
      {/* Pop-Up Edit Image */}
      <div className={`pop-edit ${edit ? "" : "d-none"}`}>
        <div className='pop-edit-top d-flex align-items-center'>
          <p className='pop-label-top text-center mb-0 w-100'>Modifica Immagine:</p>
          <button className="edit-cls me-1" onClick={()=>setEdit(false)} >X</button>
        </div>
        <div className='form-body d-flex flex-column justify-content-center align-items-center px-5 h-75'>
          <Form onSubmit={(event)=>editImg(event)} >
            <Form.Group className="mb-3">
              <Form.Label className='edit-label text-center w-100'>Inserisci il file da aggiungere:</Form.Label>
              <Form.Control type="file" onChange={(event)=>setImgEdit(event.target.files[0])} />
            </Form.Group>
            <UniButton type={type} label={label} />
          </Form>
        </div>
      </div>
    </Col>
  );
}
