import React, { useContext, useEffect, useState } from 'react'
import { TokenContext } from '../../Context/TokenContextProvider.jsx';
import { UserContext } from '../../Context/UserContextProvider.jsx';
import Form from 'react-bootstrap/esm/Form';
import Col from 'react-bootstrap/esm/Col';
import Alert from 'react-bootstrap/Alert';
import UniButton from '../UniButton/UniButton.jsx';
import './WallPost.css';

export default function WallPost({postId, refresh}) {

    const {token} = useContext(TokenContext);
    const {user} = useContext(UserContext);
    const [post, setPost] = useState("");
    const [authorData, setAuthorData] = useState("");
    const [message, setMessage] = useState("");
    const [popMsg, setPopMsg] = useState("");
    const [sendMsg, setSendMsg] = useState("");
    const [popEdit, setPopEdit] = useState(false);
    const [popDel, setPopDel] = useState(false);

    const type = "submit";
    const label = "Invia";

    let now = new Date().toLocaleString();


    const getPost = async()=>{
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/posts/post/${postId}`,
                {
                    method:"GET",
                    headers:{"Authorization":"Bearer " + token}
                }
            )

            if(response.ok){
                let json = await response.json();
                setPost(json);
                console.log("post = ", json);
                console.log("Fetch get post successful!");
            }else{
                console.log("Fetch get post failed!");
            }

        }catch(err){
            console.log(err);
        }
    }

    const {author, msg, posted} = post;
    console.log("author = ", author);
    const getAuthorData = async()=>{
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/get/${author}`,
                {
                    method:"GET",
                    headers:{"Authorization":"Bearer " + token}
                }
            )

            if(response.ok){
                console.log("authorData = ", response);
                let json = await response.json();
                console.log("authorData = ", json);
                setAuthorData(json);
                console.log("Fetch get author data successful!");
            }else{
                console.log("Fetch get author data failed!");
            }
            
        }catch(err){
            console.log(err);
        }
    }

    const sendMessage = async(event)=>{
        event.preventDefault();
        try{

            let body = {
                author: user,
                msg: message,
                posted: now,
            }

            console.log("body = ", body)

            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/message/${author}`,
                {
                    method:"POST",
                    body: JSON.stringify(body),
                    headers:{"Autorization":"Bearer " + token, "Content-Type":"application/json"}
                }
            )
            
            if(response.ok){
                console.log("Fetch post msg successful!");
                setPopMsg(false);
            }else{
                console.log("Fetch post msg failed!");
                alert("Si è verificato un errore durante l'invio del messaggio.");
            }

        }catch(err){
            console.log(err);
        }

    }

    const getSinglePost = async()=>{
        try{
          const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/posts/post/${postId}`,
            {
              method:"GET",
              headers:{"Authorization":"Bearer " + token}
            }
          )

          if(response.ok){
            let json = await response.json();
            console.log("getsinglepost = ", json);
            setSendMsg(json.msg)
            console.log("Fetch get signle post successful!");
          }else{
            console.log("Fetch get signle post failed!");
          }
        }catch(err){
          console.log(err);
        }
      }

      const sendEditMsg = async(event)=>{
        event.preventDefault();

        try{

            let body = {
                msg: sendMsg,
            }

            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/posts/edit/${postId}`,
                {
                    method:"PATCH",
                    body: JSON.stringify(body),
                    headers:{"Authorization":"Bearer " + token, "Content-Type":"application/json"}
                }
            )

            if(response.ok){
                let json = await response.json();
                console.log("json response send edit = " , json);
                setPopEdit(false);
                getPost();
                console.log("Fetch send edit msg successful!");
                
            }else{
                console.log("Fetch send edit msg failed!");
            }

        }catch(err){
            console.log(err);
        }
      }

      const deletePost = async () =>{
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/posts/delete/${postId}/${process.env.REACT_APP_WALL_ID}`, 
                {
                    method:"DELETE",
                    headers:{"Authorization":"Bearer " + token}
                },
            )

            if(response.ok){
                console.log("Fetch delete successful!");
                setPopDel(false)
                refresh();
            }else{
                console.log("Fetch delete failed!");
                alert("C'è stato un errore durante la cancellazione del tuo messaggio, per tanto non verrà eliminato!");
            }
        }catch(err){
            console.log(err);
        }
    }

    const {} = authorData;
    useEffect(()=>{
        getPost();
    }, []);

    useEffect(()=>{
        if(author){
            getAuthorData();
        };
    }, [author]);

    useEffect(()=>{
        console.log("use effect")
        getSinglePost()
    }, []);


    const { name, surname, image, _id } = authorData;
    return (
        <Col md={12}>
            <div className='post-cnt ms-3 mb-2'>
                <div className='top-post d-flex align-items-center'>
                    <img className='author-img' src={image} alt="authorImg" />
                    <p className='name ms-3'>{name} {surname}:</p>
                </div>
                <div className='post-body p-3 pb-0'>
                    <div className='pb-3'>
                        <p className='paragraph'>{msg}</p>
                    </div>
                    <p className='post-time'><b className='post-label'>Inviato:</b> {posted}</p>
                    <div className='p-3 ps-0'>
                        {!(user === _id) && <button className='post-btn' onClick={()=>setPopMsg(true)}>Rispondi</button>}
                        {(user === _id) && <button className='post-btn me-1' onClick={()=>setPopEdit(true)}>Modifica</button>}
                        {(user === _id) && <button className='post-btn' onClick={()=>setPopDel(true)} >Elimina</button>}
                    </div>
                </div>
            </div>
            {/* Pop-up Contact  */}
            <div style={{border:"1px solid orangered"}} className={`pop-up-contact px-0 ${popMsg ? "" : "d-none"}`}>
                <div style={{backgroundColor:"orange", borderRadius:"5px"}} className="pop-up-top d-flex justify-content-end align-items-center">
                    <p style={{textShadow:"2px 2px orangered"}} className="msgTo text-center m-0 w-100"><b className="me-2">To:</b>{name} {surname}</p>
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
            {/* Pop Up edit  */}
            <div className={`pop-up-edit ${popEdit ? "":"d-none"}`}>
                <div className='pop-up-edit-top d-flex align-items-center'>
                    <p className='top-title text-center w-100 m-0'>Modifica Post:</p>
                    <button className='btn-cls-edit me-1' onClick={()=>setPopEdit(false)}>X</button>
                </div>
                <div className='pop-up-edit-body px-3 pt-4'>
                    <Form onSubmit={(event)=>sendEditMsg(event)}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                type="text"
                                as="textarea"
                                rows={10}
                                value={sendMsg}
                                onChange={(event)=>setSendMsg(event.target.value)}
                            />
                        </Form.Group>
                        <UniButton type="submit" label={label} />
                    </Form>
                </div>
            </div>
            {/* Pop Up delete  */}
            <div className={`delete ${popDel ? "" : "d-none"}`}>
                <div className="top-del d-flex justify-content-end align-items-center">
                    <p className="msg-del text-center mb-0 ms-4 w-100">Cancella Messaggio:</p>
                    <button className='reply-cls m-1' onClick={()=>setPopDel(false)}>X</button>
                </div>
                <div className='del-body d-flex justify-content-center align-items-center m-0 px-3'>
                    <Alert variant="danger" className='alert-background'>
                        <h4 className='sure'>Sei sicuro di voler cancellare il messaggio?</h4>
                    </Alert>
                </div>
                <div className='btm-del d-flex justify-content-center pt-3'>
                    <button className='msg-btn' onClick={()=>deletePost()}>Si</button>
                    <button className='msg-btn' onClick={()=>setPopDel(false)}>No</button>
                </div>
            </div>
        </Col>
    )
}
