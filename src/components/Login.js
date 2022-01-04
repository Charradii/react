import { Container,Stack,Typography,TextField,Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from "react-router";
export function Login(){
    const [username,setUsername]=useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    function handleSubmit(e){
        e.preventDefault();
        const user = {username,password};
        console.log(user);
        fetch(`http://localhost:8082/users/login`,{
            method: 'POST',
            headers : {
                'Access-Control-Allow-Origin':'http://localhost:3000',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(user)
        }).then(response => {console.log(response);
            if(response.status==200){
                localStorage.setItem('token',response.headers.get("Authorization"))
                
                console.log("Utilisateur trouvé");
                console.log(response.headers.get("Authorization"));
                navigate("/ArticleList");
            }else {
                console.log("utilisateur introuvable")
                localStorage.setItem('token',null)
            }
        })
      .catch((error)=>{
        console.log(error);
    });
    }
    return (
    <>
        <Container maxWidth="sm" width='20%' fixed justifyContent="center" style={{ border :'1px',
        position: 'absolute', 
        left: '50%', 
        top: '40%',
        transform: 'translate(-50%, -50%)'
    }}>
        <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
                
                <Typography sx={{ fontSize: 25 }} color="text.primary" align="center" gutterBottom>Se connecter
                </Typography>
                <TextField id="outlined-basic" label="Nom d'utilisateur :" variant="outlined" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                <TextField type="password" label="Mot de passe :" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <Button variant="contained" color="success" type="submit">Se connecter</Button>
                <Typography sx={{ fontSize: 11 }} color="text.primary" align="center" gutterBottom><a href="#">Réinitialiser le mot de passe ?</a></Typography>
               
            </Stack>
        </form> 
        </Container>
    </>
    );
}