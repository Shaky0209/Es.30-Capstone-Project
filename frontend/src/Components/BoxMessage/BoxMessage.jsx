import React, { useContext, useEffect, useState } from 'react'
import { TokenContext } from '../../Context/TokenContextProvider';
import { UserContext } from '../../Context/UserContextProvider';
import Form from 'react-bootstrap/Form';
import UniButton from '../UniButton/UniButton';
import Alert from 'react-bootstrap/Alert';
import './BoxMessage.css';

export default function BoxMessage({author, msg, msgId, refresh, posted}) {
    const {token} = useContext(TokenContext);
    const {user} = useContext(UserContext);
    const [authorMsg, setAuthorMsg] = useState({});
    const [reply, setReply] = useState("");
    const [popMsg, setPopMsg] = useState(false);
    const [popDel, setPopDel] = useState(false);
    const [me, setMe] = useState({});

    const type = "submit";
    const label = "Invia";
    let now = new Date().toLocaleString();
    

    

    const getAuthor = async ()=>{
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/get/${author}`,
                {
                    method:"GET",
                    headers:{"Authorization":"Bearer " + token }
                }
            )

            if(response.ok){
                let json = await response.json();
                setAuthorMsg(json);
                console.log("authorMsg = ", json);
                console.log("Fetch get author successful!");
            }else{
                console.log("Fetch get author failed!");
            }

        }catch(err){ 
            console.log(err);
        }
    }

    const getMe = async()=>{
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/get/${user}`,
                {
                    method:"GET",
                    headers:{"Authorization":"Bearer " + token},
                }
            )

            if(response.ok){
                let json = await response.json();
                setMe(json);
                console.log("Fetch Me success!");
            }else{
                console.log("Fetch Me failed!");
            }

        }catch(err){
            console.log(err);
        }
    }

    const sendMessage= async(event)=>{
    
        event.preventDefault();

        let body = {
        author: user,
        msg: reply,
        posted: now,
        };

        console.log("body = ", body);

        try{
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/message/${authorMsg._id}`,
                {
                    method:"POST",
                    body: JSON.stringify(body),
                    headers:{"Authorization":"Bearer " + token, "Content-Type":"application/json"},
                }
            )

            if(response.ok){
                console.log("Fetch send message successfu!");
                setPopMsg(false);
                setReply("");
            }else{
                console.log("Fetch send message failed!");

            }
        }catch(err){
            console.log(err);
        }
    }

    const deleteMsg = async () =>{
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/message/delete/${msgId}/${user}`, 
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

    useEffect(()=>{
        getAuthor();
    }, []);

    useEffect(()=>{
        getMe();
    }, []);
     
    useEffect(()=>{
        console.log("Reoply = ", reply);
    }, [reply])

  return (
    <>
    <div className={`reply ${popMsg ? "" : "d-none"}`}>
        <div className="top-reply d-flex justify-content-end align-items-center">
            <p className="sender mb-0 ms-4 w-100"><b className='from me-2'>From:</b>{me.name} {me.surname}</p>
            <button
                className='reply-cls m-1'
                onClick={()=>{
                    setPopMsg(false);
                    setReply("")
                }}>
                    X
                </button>
        </div>
        <div className=' d-flex flex-column align-items-center'>
            <h5 className='pop-up-title ms-5 mt-2 w-100'>To: {authorMsg.name} {authorMsg.surname}</h5>
            <Form onSubmit={(event)=>sendMessage(event)} >
                <Form.Control
                    className='textarea mb-2'
                    value={reply}
                    onChange={(event)=>setReply(event.target.value)}
                    as="textarea"
                    placeholder="Ciao..."
                />
                <UniButton type={type} label={label} />
            </Form>
        </div>  
    </div>

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
        <div className='d-flex justify-content-center pt-3'>
            <button className='msg-btn' onClick={()=>deleteMsg()}>Si</button><button className='msg-btn' onClick={()=>setPopDel(false)}>No</button>
        </div>
    </div>

    <div className='msg-box mb-2'>
        <div className='top-msg d-flex align-items-center p-1'>
            <img
                style={{height:"30px"}}
                className='rounded-circle me-2'
                src={authorMsg.image ? authorMsg.image : "https://pluspng.com/img-png/png-user-icon-person-icon-png-people-person-user-icon-2240.png"} alt="AuthorImg"
            />
            <p className='msg-auth m-0'>{authorMsg.name} {authorMsg.surname}:</p>
        </div>
        <div className='py-2 px-1'>
            <p className='m-0'>{msg}</p>
            <div className='d-flex justify-content-between align-items-end pt-3'>
                <div>
                    <button className='msg-btn' onClick={()=>setPopMsg(true)}>Rispondi</button>
                    <button className='msg-btn' onClick={()=>setPopDel(true)}>Elimina</button>
                </div>
                <span className="posted me-2">Inviato: {posted}</span>
            </div>
        </div>
    </div>
    
    </>
  )
}
