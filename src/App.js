import icon from './assets/icon.png';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link
  } from "react-router-dom";
import ArticleList from "./components/ArticleList";
import React , { Component } from "react";
import ArticleDetail from "./components/ArticleDetail";
import SaveArticle from "./components/SaveArticle";
import NotFound from "./components/NotFound";
import ModifyArticle from "./components/ModifyArticle";
import {Navbar,Container,Nav,Dropdown} from 'react-bootstrap';
import { Login } from './components/Login';
import SearchTitre from './components/SearchTitre';
import SearchName from './components/SearchName';

export default class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                <Navbar bg="dark" variant="dark">
                    <Container>
                    <Navbar.Brand href="/ArticleList">
                        <img
                        alt="Mag logo"
                        src={icon}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        />{' '}
                        Magazine
                    </Navbar.Brand>
                    
                    <Nav className="me-auto">
                    <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        Search
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="/searchTitre">par titre</Dropdown.Item>
                        <Dropdown.Item href="/searchName">par nom ecrivain</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                        <Nav.Link href="/ArticleList">Liste des articles</Nav.Link>
                        <Nav.Link href="/saveArticle">Ajouter un article</Nav.Link>
                    </Nav>
                    </Container>
                </Navbar>
                    <Routes>
                        <Route exact path='/login' element={< Login />}></Route>
                        <Route exact path='/ArticleList' element={< ArticleList />}></Route>
                        <Route path="/Articles/:id" element={<ArticleDetail />}></Route>
                        <Route exact path='/saveArticle' element={<SaveArticle/>}></Route>
                        <Route exact path='/*' element={<NotFound/>}></Route>
                        <Route exact path='/ModifyArticle/:id/:titre/:text/:description/:category' element={<ModifyArticle/>}></Route>
                        <Route exact path='/searchTitre' element={<SearchTitre/>}></Route>
                        <Route exact path='/searchName' element={<SearchName/>}></Route>
                    </Routes>
                </div>
                
            </Router>
        );
    }
}

    