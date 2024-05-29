import React, { useContext, useEffect, useState } from 'react';
import {MenuContext} from '../../Context/MenuContextProvider.jsx';
import {TokenContext} from '../../Context/TokenContextProvider.jsx';
import {UserContext} from '../../Context/UserContextProvider.jsx'
import { ImgContext } from '../../Context/ImgContextProvider.jsx';
import Row from 'react-bootstrap/esm/Row.js';
import Col from 'react-bootstrap/esm/Col.js';
import Container from 'react-bootstrap/esm/Container.js';
import Form from 'react-bootstrap/Form';
import UniButton from '../../Components/UniButton/UniButton.jsx';
import Image from 'react-bootstrap/Image';
import WallPost from '../../Components/WallPost/WallPost.jsx';
import './Home.css';


export default function Home() {

  const {user, setUser} = useContext(UserContext)
  const {token, setToken} = useContext(TokenContext);
  const {setMenu} = useContext(MenuContext);
  const {setAvatar} = useContext(ImgContext);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [inPost, setInPost] = useState(false);
  

  let params = new URLSearchParams(document.location.search);
  let accToken = params.get("accToken");
  let type = "submit";
  let label = "Invia";
  let now = new Date().toLocaleString();
  
  const fetchGetMe = async ()=>{
    try{
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/me`,
        {
          method:"GET",
          headers:{"Authorization":"Bearer " + token},
        })
        
        if(response.ok){
          let json = await response.json();
          console.log("User fetch successful!");
          console.log("home GoogleUser = ", json);
          localStorage.setItem("user", json._id);
          localStorage.setItem("avatar", json.image)
          setAvatar(json.image);
          setUser(json._id);
        }else{
          console.log(response);
          console.log("User fetch failed!");
        }
      }catch(err){
        console.error(err);
      }
    };
    
    const getPosts = async()=>{
      try{
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/wall/posts/${process.env.REACT_APP_WALL_ID}`, 
          {
            method:"GET",
            headers:{"Authorization":"Bearer " + token}
          }
        )

        if(response.ok){
          let json = await response.json();
          setPosts(json.posts);
          console.log("posts = ", json.posts);
          console.log("Fetch get Articles successful!");
        }else{
          console.log("Fetch get Articles failed!");
        }
      }catch(err){
        console.log(err);
      }
    };

    const sendPost = async(event)=>{
      event.preventDefault()
      
      try{

        let body = {
          author: user,
          msg: newPost,
          posted: now,
        }

        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/wall/attach/${process.env.REACT_APP_WALL_ID}`,
          {
            method:"POST",
            body: JSON.stringify(body),
            headers: {"Authorization":"Bearer " + token, "Content-Type":"application/json"}
          }
        )
        if(response.ok){
          console.log("Fetch send post successful!");
          setInPost(false);
          setNewPost("");
          getPosts();
        }else{
          console.log("Fetch send post failed!");

        }
      }catch(err){
        console.log(err);
      }
    }

    if(accToken){
      console.log("is accToken")
      fetchGetMe();
      localStorage.setItem("token", accToken);
      setToken(accToken);
      console.log("token home = ",  token);
    }else{
      setToken(localStorage.getItem("token"));
      setUser(localStorage.getItem("user"));
    };

    useEffect(()=>{
      getPosts();
    }, []);
    
    return (
      <Container fluid onClick={()=>setMenu(false)} >
        
        <Row>
          <Col xs={12} sm={2} className='order-1 order-sm-0 pt-4'>
            <div className='left-cnt h-100'>
              <h5 className='text-center'>I nostri partner:</h5>
              <div className="adv p-3">
                <img  style={{width:"100%"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKdI8sLvfJFGW5hGF8T6PfRcR17Sq3SJxT2UrapsgMMg&s" alt="radioblu" />
              </div>
              <div className="adv p-3">
                <img  style={{width:"100%"}} src="https://tse1.mm.bing.net/th?id=OIP.WHruC_nwCfpcd8lQDEXsmAHaDy&pid=Api" alt="idealgomme" />
              </div>
              <div className="adv p-3">
                <img style={{width:"100%"}} src="data:image/jpeg;base64,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" alt="skyline" />
              </div>
              <div className="adv p-3">
                <img  style={{width:"100%"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9WAXJDZSIjC5MqpQBNbTcem4EW_q1-4_OPQ&s" alt="marcauto" />
              </div>
              <div className="adv p-3">
                <img  style={{width:"100%"}} src="data:image/jpeg;base64,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" alt="miss-sushi" />
              </div>

            </div>
          </Col>
          <Col xs={12} sm={8} className={`order-0 order-sm-1 ${token ? "":"d-none"}`}>
            <div className='wall'></div>
            <div className='d-flex flex-column align-items-center pb-3'>
              <h2 className='wall-title text-center pt-3'>Il "Muretto" di Fabriano</h2>
              <img style={{height:"50px"}} src="https://tse4.mm.bing.net/th?id=OIP.yI-5NnPHpyUsjuyE1CjeCQAAAA&pid=Api" alt="stemma" />
              {!inPost && <button className='post-add mt-2' type='button' onClick={()=>setInPost(!inPost)} >Inserisci un Post</button>}
              {inPost && <button className='post-add mt-2' type='button' onClick={()=>setInPost(!inPost)} >Chiudi</button>}
              <div className={`py-3 ${inPost ? "":"d-none"}`} >
                <Form onSubmit={(event)=>sendPost(event)}>
                  <Form.Group className="post-form mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={newPost}
                      onChange={(event)=>setNewPost(event.target.value)}
                    />
                  </Form.Group>
                  <UniButton type={type} label={label} />
                </Form>
              </div>
            </div>
            <div className='d-flex flex-column-reverse'>
              {posts && posts.map((post, index)=>{
                console.log("single post map = ", post);
                return(
                  <WallPost key={index} postId={post} refresh={getPosts} setNewPost={setNewPost} />
                )
              })}
            </div>
          </Col>
          <Col xs={12} sm={2} className='right-col order-2 pt-4'>
          <div className='right-cnt h-100'>
              <h5 className='text-center'>I nostri sponsor:</h5>
              <div className="adv p-3">
                <img  style={{width:"100%"}} src="https://media-cdn.tripadvisor.com/media/photo-s/17/6f/30/45/logo.jpg" alt="ilNuraghe" />
              </div>
              <div className="adv p-3">
                <img  style={{width:"100%"}} src="https://tse2.mm.bing.net/th?id=OIP.afqWssO0yXTLSv7wW13SPwAAAA&pid=Api" alt="lott" />
              </div>
              <div className="adv p-3">
                <img style={{width:"100%"}} src="https://tse1.mm.bing.net/th?id=OIP.rI28NhJAzJu_xMAjEQV-zgHaHa&pid=Api" alt="skyline" />
              </div>
              <div className="adv p-3">
                <img  style={{width:"100%"}} src="https://www.valconca.info/natura_amica/uscite/images/fabriano/logofabriano.gif" alt="museo" />
              </div>
              <div className="adv p-3">
                <img  style={{width:"100%"}} src="https://tse1.mm.bing.net/th?id=OIP.5aFSU597WvghPSVMveKw9QAAAA&pid=Api" alt="cavalloPazzo" />
              </div>

            </div>
          </Col>
          <Col xs={12} sm={9} lg={8} className={`order-0 order-sm-1 ${token ? "d-none":""}`}>
            <div className='d-flex flex-column align-items-center pt-4'>
              <h1 className='text-center'>Fabriano “La Città Appenninica, dalla visione ai progetti”</h1>
              <p>Partner dell’iniziativa sono il Festival dell’Appennino Marchigiano, la Regione Marche, il Distretto dell’Appennino umbro-marchigiano e Symbola</p>
              <Image style={{maxWidth:"100%"}} src="https://res.cloudinary.com/dtqahxbwq/image/upload/v1716404487/user-img/Immagine_dbaozc.jpg" alt="fabriano" />
              <p>Fabriano – In occasione del Festival dell’Appennino Marchigiano, la Città Appenninica fa nuovamente tappa a Fabriano.</p>
              <p>Nel pomeriggio di giovedì 23 presso l’Oratorio della Carità alle ore 15,30 si terrà il convegno inaugurale “La Città Appenninica. Dalla visione ai progetti”, nel quale saranno presentate le idee progettuali per lo sviluppo sostenibile del territorio dei 35 Comuni del Distretto umbro-marchigiano.</p>
              <p>Dopo i convegni di Fabriano e Gubbio, tenutisi nel 2023, e la dichiarazione congiunta dei Sindaci delle due città, Daniela Ghergo e Filippo Mario Stirati, nei mesi scorsi si sono insediati ed hanno lavorato attraverso riunioni online quattro tavoli programmatici, a cui sono stati chiamati a partecipare Amministratori locali, esperti ed operatori del territorio.</p>
              <p>I tavoli hanno trattato i temi del settore primario, dello sviluppo imprenditoriale, della cultura e turismo, dei servizi territoriali e della governance. Sono stati coordinati rispettivamente da Fabio Renzi, segretario generale di Symbola, Letizia Urbani, direttore generale di Meccano spa, Giovanna Uccellani, assessore alla cultura del Comune di Gubbio, Pietro Marcolini, assessore alla progettualità del Comune di Fabriano</p>
              <p>Partner dell’iniziativa sono il Festival dell’Appennino Marchigiano, la Regione Marche, il Distretto dell’Appennino umbro-marchigiano e Symbola</p>
              <p>Nel convegno del 23 maggio, dopo i saluti istituzionali dell’assessore al turismo del Comune di Fabriano, Andrea Giombi, del presidente dell’associazione culturale per lo sviluppo dell’Appennino umbro-marchigiano Piero Chiorri, del sindaco di Gubbio Filippo Mario Stirati, del presidente dell’Unione montana Giancarlo Sagramola e del presidente del Consiglio regionale delle Marche Dino Latini, ci saranno gli interventi di Marco Marcatili, responsabile sviluppo di Nomisma, e di Fabio Renzi, segretario generale di Symbola – Fondazione per le Qualità italiane.</p>
              <p>Quindi, sarà la volta di Luca Santini, presidente di Federparchi e del Parco nazionale delle Foreste Casentinesi, e di Flavia Fagotto, esperta di Destination Management Marketing.</p>
              <p>I risultati dei tavoli programmatici saranno illustrati dai coordinatori che esporranno i diversi progetti selezionati. Modera i lavori dell’intero pomeriggio Rosella Bellucci, vicepresidente dell’Associazione culturale per lo sviluppo dell’Appennino umbro-marchigiano.</p>
              <p>Le conclusioni sono affidate al Sindaco di Fabriano Daniela Ghergo, Comune coordinatore pro-tempore del Distretto per lo sviluppo dell’Appennino umbro-marchigiano.</p>
            </div>
          </Col>
        </Row>
        <div className="bottom-spc-home"></div>
      </Container>
  )
}
