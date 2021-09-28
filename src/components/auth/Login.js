import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import TextInput from "../TextInput";
import { authContext } from "../../contexts/authContext";

function Login() {
  const [state, setState] = useState({ email: "", password: "" });
  // Equivalente ao props.history
  const history = useHistory();

  // authContext é o Context definido no arquivo authContext.js e ao ser passado pro Hook useContext, ele retorna o conteúdo da prop 'value' do Provider
  const { loggedInUser, setLoggedInUser } = useContext(authContext);

  useEffect(() => {
    // Caso o usuário já esteja logado, redirecione para página principal
    if (loggedInUser.token) {
      history.push("/projetos");
    }
  }, [loggedInUser, history]);

  function handleChange(event) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/login",
        state
      );

      setLoggedInUser({ ...response.data });
      localStorage.setItem("loggedInUser", JSON.stringify(response.data));

      // No sucesso do Login, redireciona o usuário pra rota da lista de projetos
      history.push("/projetos");
    } catch (err) {
      // Response é um objeto do Axios que contém o objeto de erro com as informações enviadas pelo servidor
      console.error(err.response);
    }
  }

  return (
    <div>
      <h1>Entre na sua conta</h1>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="E-mail"
          name="email"
          id="signupFormEmail"
          type="email"
          required
          onChange={handleChange}
          value={state.email}
        />

        <TextInput
          label="Senha"
          name="password"
          id="signupFormPassword"
          type="password"
          required
          onChange={handleChange}
          value={state.password}
        />

        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
