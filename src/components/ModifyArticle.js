import { useState } from 'react';
import {Form,Row,Col,Button,Container} from 'react-bootstrap';
import {categor} from '../ressources/categories';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router';


export default function ModifyArticle(){
    const {id, titre, text, description,category} = useParams();
   
    const [newtitre, setNewtitre] = useState(titre);
    const [newcategorie, setNewcategorie] = useState(category);
    const [newdescription, setNewdescription]= useState(description);
    const [newtext, setNewtext] = useState(text);
    
    
    const handleSubmit = (e) => {
        e.preventDefault();//desactiver le auto refraiche de la page
        
        const article = {idArticle : id ,titre : newtitre, text :newtext, description :newdescription, category :newcategorie};
        console.log(article);
        const token = localStorage.getItem('token');
        fetch(`http://localhost:8084/articles/api`,{
            method:'PUT',
            headers : {'Authorization': 'Bearer '+token,
                        "Content-Type":"application/json"},
            body: JSON.stringify(article)
        }).then(()=>{
              toast.success("Article modifié avec succés !", {
                position: toast.POSITION.TOP_CENTER
              });
              
        })
        .catch((error)=>{
            console.log(error);
        });
        
    }
    return (
        <Container fixed>
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="formGroupTitre">
                        <Form.Label>Titre : </Form.Label>
                        <Form.Control type="text" placeholder={newtitre} value={newtitre} onChange={(e)=> setNewtitre(e.target.value)} required/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formGroupCategorie">
                        <Form.Label>Catégorie : </Form.Label><br/>
                        <Form.Select value={newcategorie} onChange={(e) => setNewcategorie(e.target.value)} required>
                            <option>Choisir une catégorie :</option>
                            {categor.map(cat =><option value={cat}>{cat}</option>)}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="formGroupDescription">
                        <Form.Label>Description : </Form.Label>
                        <Form.Control as="textarea" placeholder={newdescription} style={{ height: '80px' }} value={newdescription} onChange={(e) => setNewdescription(e.target.value)} required/>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="formGroupText">
                        <Form.Label>Contenu : </Form.Label>
                        <Form.Control as="textarea" placeholder={newtext} style={{ height: '400px' }} value={newtext} onChange={(e) => setNewtext(e.target.value)} required/>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Button type="submit">Modifier cet article</Button>
            </Row>
            <ToastContainer  />
        </Form>
        </Container>  
    );
}