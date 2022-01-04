import React from "react";
import { useParams } from "react-router";
import useFetch from "./useFetch";
import {Button,Container,Row} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router";
import {  Link } from "react-router-dom";
import axios from "axios";
export default function ArticleDetail(){
    const { id } = useParams();
    const navigate = useNavigate();
    const {data, isPending, error} = useFetch('http://localhost:8084/articles/api/'+id);
    const handleClick =() =>{
        const token = localStorage.getItem('token');
         fetch('http://localhost:8084/articles/api/'+id,{
            method: 'DELETE',
            headers : {
               
                'Authorization': 'Bearer '+token,
                }
        }).then(()=>{
            navigate("/ArticleList");
            toast.success("Article supprimé avec succés !", {
                position: toast.POSITION.TOP_CENTER
            });
        }).catch(rejected => {
            console.log(rejected);
        });
    }
    return (
        <Container fixed>
            <Row className="justify-content-center">
                {isPending  && <div>Loading ...</div>}
                {error && <div>{error}</div>}
                {data && <div>
                                <h1>{data[0].titre}</h1>
                                <h3>Ecrit par {data[0].ecrivain.name}</h3>
                                <div>{data[0].text}</div>
                                <Button variant="danger" onClick={handleClick}>Supprimer cet article</Button>
                                <Button variant="secondary"><Link to={`/ModifyArticle/${id}/${data[0].titre}/${data[0].text}/${data[0].description}/${data[0].category}`}>Modifier cet article</Link></Button>
                                <ToastContainer/>
                            </div>}
            </Row>
        </Container>
    );
}