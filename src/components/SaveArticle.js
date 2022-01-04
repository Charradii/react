import { useState } from 'react';
import {Form,Row,Col,Button,Container} from 'react-bootstrap';
import {categor} from '../ressources/categories';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SaveArticle(){
    
    const [titre, setTitre] = useState('');
    const [categorie, setCategorie] = useState('');
    const [description, setDescription]= useState('');
    const [text, setText] = useState('');
    
    
    const handleSubmit = (e) => {
        e.preventDefault();//desactiver le auto refraiche de la page
        const token = localStorage.getItem('token');
        const article = {titre,text,description,categorie};
        fetch('http://localhost:8084/articles/api',{
            method: 'POST',
            headers : {
                'Authorization': 'Bearer '+token,
                "Content-Type":"application/json"},
            body: JSON.stringify(article)
        }).then(()=>{
            
              toast.success("Article ajouté avec succés !", {
                position: toast.POSITION.TOP_CENTER
              });
              
        })
        
    }
    return (
        <Container fixed>
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="formGroupTitre">
                        <Form.Label>Titre : </Form.Label>
                        <Form.Control type="text" placeholder="Saisir le titre" value={titre} onChange={(e)=> setTitre(e.target.value)} required/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="formGroupCategorie">
                        <Form.Label>Catégorie : </Form.Label><br/>
                        <Form.Select value={categorie} onChange={(e) => setCategorie(e.target.value)} required>
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
                        <Form.Control as="textarea" placeholder="Saisir une description" style={{ height: '80px' }} value={description} onChange={(e) => setDescription(e.target.value)} required/>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="formGroupText">
                        <Form.Label>Contenu : </Form.Label>
                        <Form.Control as="textarea" placeholder="Saisir le contenu" style={{ height: '400px' }} value={text} onChange={(e) => setText(e.target.value)} required/>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Button type="submit">Ajouter cet article</Button>
            </Row>
            <ToastContainer  />
        </Form>
    </Container>
    );
}