import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/pages/Home';
import City from './components/pages/City';
import Company from './components/pages/Company';
import Consortium from "./components/pages/Consortium";
import Issuer from "./components/pages/Issuer";
import Line from "./components/pages/Line";
import LineClass from "./components/pages/LineClass";
import User from "./components/pages/User";



function App() {
  return (
    <div className="App">
      <h1>CRUD Mobi Table </h1>
      <BrowserRouter>
        <Nav variant="tabs" defaultActiveKey="/home">
          <Nav.Item>
            <Nav.Link as={Link} to="/" >Página Inicial</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/cidade">Cidade</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/empresa">Empresa</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/consorcio">Consorcio</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/emissor">Emissor</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/linha">Linha</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/tlinha">Tipo de Linha</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/usuario">Usuário</Nav.Link>
          </Nav.Item>
        </Nav>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cidade' element={<City />} />
          <Route path='/empresa' element={<Company />} />
          <Route path='/consorcio' element={<Consortium />} />
          <Route path='/emissor' element={<Issuer />} />
          <Route path='/linha' element={<Line />} />
          <Route path='/tlinha' element={<LineClass />} />
          <Route path='/usuario' element={<User />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
