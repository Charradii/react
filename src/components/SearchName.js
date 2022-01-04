import { useEffect,useState } from "react";
import { Container,Card,Typography,TextField,Button } from '@mui/material';
import {  Link } from "react-router-dom";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import axios from "axios";
export default function SearchName() {
    const [titre,setTitre]=useState('');
    const [listArticle,setListArticle]=useState([]);
    const [theItems,setTheItems]=useState();
    function handleSubmit(e){
        e.preventDefault();
        console.log(titre);
        if(titre==''){

        }else{
            const token = localStorage.getItem('token');
           axios.get('http://localhost:8084/articles/api/getName/'+titre,{
                headers: {
                    'Authorization': 'Bearer '+token,
                    'accept-language': 'application/json',
                    'content-type': 'application/json'
                }
                }).then(res =>{
                const articles = res.data;
                setListArticle(articles);
                console.log(listArticle)
                
                setTheItems( 
                   
                listArticle.map(article =>
                <Card variant="outlined" sx={{ minWidth: 275, m:0.5,borderColor: 'primary.main',borderRadius: 0, width:'25%',height:'10%' }} className="d-inline-block align-top">
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {article.category}
                        </Typography>
                        <Typography variant="h5" component="div">
                        {article.titre}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Par {article.ecrivain.name}
                        </Typography>
                        <Typography variant="body2">
                        {article.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                    <Button size="small"><Link to={`/Articles/${article.idArticle}`}>Consulter</Link></Button>
                    </CardActions>
                </Card>
                )
            
                    )
             },
                )}
    }
    
    return(<>
            <Container maxWidth="sm" width='20%' fixed justifyContent="center" style={{ border :'1px',
                position: 'absolute', 
                left: '50%', 
                top: '15%',
                transform: 'translate(-50%, -50%)'
            }}>
            <form onSubmit={handleSubmit}>
                <Typography sx={{ fontSize: 25 }} color="text.primary" align="center" gutterBottom>Recherche par Nom Ecrivain
                </Typography>
                <TextField sx={{ width:400 }}id="outlined-basic" label="Nom ecrivain :" variant="outlined" value={titre} onChange={(e)=>setTitre(e.target.value)}/>
                <Button sx={{ height:50 }}variant="contained" color="success" type="submit">Rechercher</Button>
            </form>
            </Container>
            
            <Container maxWidth="sm" width='50%' fixed justifyContent="center" style={{ position: 'absolute', left: '35%', border :'1px',top: '23%',}}>
                {theItems}
               
            </Container>
                
        </>
    );
}