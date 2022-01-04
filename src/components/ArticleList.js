import React from "react";
import axios from "axios";
import {  Link } from "react-router-dom";
import { Card } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
export default class ArticleList extends React.Component {

  state = {
    ListArticles :[]
  }
  componentDidMount(){
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8084/articles/api/all',{
      headers: {
        'Authorization': 'Bearer '+token,
        'accept-language': 'application/json',
        'content-type': 'application/json'
      }
    }).then(res =>{
      const articles = res.data;
      this.setState({ListArticles : articles});
    })
  }
  render(){
    return (
      <>
      <Container fixed>
      {this.state.ListArticles.map(article =>
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
      )}
      </Container>
      </>  
      
    )
  }
}

