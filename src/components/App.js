import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { AuthContextComponent } from "../contexts/authContext";

import Navbar from "./Navbar";

import Signup from "./auth/Signup";
import Login from "./auth/Login";
import PrivateRoute from "./auth/PrivateRoute";

import ProjectList from "./project/ProjectList";
import ProjectDetail from "./project/ProjectDetail";
import ProjectDelete from "./project/ProjectDelete";

function App() {
  return (
    <BrowserRouter>
      <AuthContextComponent>
        <Navbar />
        <div className="container mt-5">
          {/* ATENÇÃO: essas rotas NÃO tem relação com as rotas do backend, portanto os nomes podem ser diferentes */}
          <Route path="/cadastro-usuario" component={Signup} />
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/projetos" component={ProjectList} />
          <Switch>
            <PrivateRoute
              exact
              path="/projeto/deletar/:id"
              component={ProjectDelete}
            />
            <PrivateRoute exact path="/projeto/:id" component={ProjectDetail} />
          </Switch>
        </div>
      </AuthContextComponent>
    </BrowserRouter>
  );
}

export default App;
