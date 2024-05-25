import React, { useContext, useEffect, useState } from 'react'
import { TokenContext } from '../../Context/TokenContextProvider';

export default function WallPost({postId}) {

    const {token} = useContext(TokenContext);
    const [post, setPost] = useState("");
    const [authorData, setAuthorData] = useState("");
    const getPost = async()=>{
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/wall/post/${postId}`,
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

    const {author, msg, posted, _id} = post;
    console.log("author = ", author);
    const getAuthorData = async()=>{
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/author/${author}`,
                {
                    method:"GET",
                    headers:{"Authorization":"Bearer " + token}
                }
            )

            if(response.ok){
                console.log("authorData = ", response);
                let json = await response.json();
                console.log("authorData = ", json);
                // setAuthorData(json);
                console.log("Fetch get author data successful!");
            }else{
                console.log("Fetch get author data failed!");
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

  return (
    <div>
        <p>{author}</p>
        <p>{msg}</p>
        <p>{_id}</p>
        <p>{posted}</p>
    </div>
  )
}
