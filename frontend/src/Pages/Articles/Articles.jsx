import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuContext } from '../../Context/MenuContextProvider';
import { TokenContext } from '../../Context/TokenContextProvider';
import { UserContext } from '../../Context/UserContextProvider';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import SingleArticle from '../../Components/SingleArticle/SingleArticle';

import './Articles.css';

export default function Articles() {
  
  const {setMenu} = useContext(MenuContext);
  const {token, setToken} = useContext(TokenContext);
  const {user, setUser} = useContext(UserContext);
  const [categoryType, setCategoryType] = useState("");
  const [title, setTitle] = useState("");
  const [articles, setArticles] = useState([]);
  
  const navigate = useNavigate();
  
  const getArticles = async()=>{
    try{
      console.log("Token Articles = ", token);
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/articles/all`, 
        {
          method:"GET",
          headers:{"Authorization":"Bearer " + token}
        })

        if(response.ok){
          let json = await response.json();
          setArticles(json);
          console.log("articles = ", json)
          console.log("Fetch get all articles successful!");
        }else{
          console.log("Fetch get all articles failed!");
          if(response.status === 401){
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setToken("");
            setUser("");
          }
        }
      }catch(err){
        console.log(err);
    }
  }

  const getCategory = async() =>{
    try{
    let body = {category: categoryType}
    console.log("body category = ", body);
    console.log("token == ", token);

      console.log(`${process.env.REACT_APP_SERVER_URL}/articles/category`);
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/articles/category`,
        {
          method:"POST",
          body: JSON.stringify(body),
          headers:{"Authorization":"Bearer " + token,"Content-Type":"application/json"}
        }
      )

      if(response.ok){
        let json = await response.json();
        console.log("category res = ", json)
        setArticles(json);
        console.log("Fetch get category successful!");
      }else{
        console.log("Fetch get category failed!");
      }

    }catch(err){
      console.log(err);
    }
  }
  
  useEffect(()=>{
    getArticles();
  }, [])

  useEffect(()=>{
    if(categoryType.length > 0){
      getCategory();
    }else{
      getArticles();
    }
  },[categoryType]);


  return (
    <>
    <Container fluid onClick={()=>setMenu(false)} className={`${token ? "" : "d-none"}`}>
      <Form>
        <Container fluid className='d-flex mb-4 w-100'>
          <div className='form-slc d-flex flex-column align-items-center'>
            <Form.Label className='mb-0' htmlFor="category">Categoria:</Form.Label>
            <Form.Select id="category" onChange={(event)=>setCategoryType(event.target.value)} size='sm'>
              <option value=""></option>
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
          <button className='article-add-btn mt-2' onClick={()=>navigate("/articles/new")} >Aggiungi Articolo</button>
        </Container>
      </Form>
      <Container fluid className='offset-1 offset-md-0'>
        <Row>
          {articles.map((article)=>{

            const{_id, img, category, title, description, city, province, contact, user, createdAt} = article;

            return(
                <SingleArticle
                  key={_id}
                  img={img}
                  category={category}
                  title={title}
                  description={description}
                  city={city}
                  province={province}
                  contact={contact}
                  userId={user}
                  id={_id}
                  posted={createdAt}
                />
            )
          })}
          <div style={{height:"150px"}}></div>
        </Row>
      </Container>
    </Container>
    <Container>
      <Row>
        <Col xs={12} className={`${token ? "d-none":""}`}>
          <div className="friends-unlgd-cnt d-flex justify-content-center align-items-center">
            <div className="my-alert d-flex align-items-center px-md-5">
              <h3 className="text-center">Per Accedere ai contenuti devi essere registrato ed effettuare il login.</h3>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
    <div className="article-btm-spc"></div>
    </>
  )
}