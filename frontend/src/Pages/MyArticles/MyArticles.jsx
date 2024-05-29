import React, { useContext, useEffect, useState } from 'react'
import { TokenContext } from '../../Context/TokenContextProvider';
import { UserContext } from '../../Context/UserContextProvider';
import { MenuContext } from '../../Context/MenuContextProvider';
import Row from 'react-bootstrap/esm/Row';
import Container from 'react-bootstrap/esm/Container';
import SingleArticle from '../../Components/SingleArticle/SingleArticle';
import './MyArticles.css';

export default function MyArticles() {

    const {token} = useContext(TokenContext);
    const {user} = useContext(UserContext);
    const [articles, setArticles] = useState([]);
    const [noArticles, setNoArticles] = useState(false)
    const {setMenu} = useContext(MenuContext);

    const getMyArticles = async()=>{
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/articles/my/${user}`,
                {
                    method:"GET",
                    headers:{"Authorization":"Bearer " + token}
                }
            )
            if(response.ok){
                let json = await response.json();
                console.log("articles = ", json);
                if(json.length < 1){
                    setNoArticles(false);
                }else{
                    setNoArticles(true);
                }
                    
                setArticles(json);
                console.log("Fetch get my articles successful!");
            }else{
                console.log("Fetch get my articles failed!");
            }
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getMyArticles();
    }, []);
  return (
    <Container onClick={()=>setMenu(false)}>
        <div className={`no-articles d-flex justify-content-center align-items-center ${noArticles ? "d-none":""}`}>
            <h3>Non hai articoli pubblicati in questo momento.</h3>
        </div>
        <Row>
            {articles.map((article)=>{

                const {img, category, title, description, city, province, contact, user, createdAt, _id, }= article;

                return <SingleArticle
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
                            refresh={()=>getMyArticles()}
                        />
            })}
        </Row>
        <div className='bottom-spc-myArticles'></div>
    </Container>
  )
}
