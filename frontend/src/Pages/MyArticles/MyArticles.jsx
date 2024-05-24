import React, { useContext, useEffect, useState } from 'react'
import { TokenContext } from '../../Context/TokenContextProvider';
import { UserContext } from '../../Context/UserContextProvider';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import SingleArticle from '../../Components/SingleArticle/SingleArticle';

export default function MyArticles() {

    const {token} = useContext(TokenContext);
    const {user} = useContext(UserContext);
    const [articles, setArticles] = useState([]);

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
    <Container>
        <Row>
            {articles.map((article)=>{

                const {img, category, title, description, city, province, contact, user, createdAt, _id}= article;

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
                        />
            })}
        </Row>
    </Container>
  )
}
