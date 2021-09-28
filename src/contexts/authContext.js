import { useState, createContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

const authContext = createContext({ user: {}, token: "" });

function AuthContextComponent(props) {
  const [loggedInUser, setLoggedInUser] = useState({ user: {}, token: "" });

  const history = useHistory();

  useEffect(() => {
    // Primeiro verifica se já existe um usuário logado no localStorage
    const storedUserJson = localStorage.getItem("loggedInUser");

    // Converte o JSON armazenado de volta para objeto. Verifica se JSON não está vazio, caso esteja vazio, passa um JSON contendo somente uma string vazia para o parse
    const storedUser = JSON.parse(storedUserJson || '""');

    // Caso o objeto esteja preenchido, seta o state pra ser igual ao objeto
    if (storedUser.token) {
      setLoggedInUser({ ...storedUser });
    }
  }, []);

  function logout() {
    // Zerando o localStorage e o Context para fazer o logout (saída de sessão) do usuário
    localStorage.removeItem("loggedInUser");
    setLoggedInUser({ user: {}, token: "" });
    history.push("/login");
  }

  return (
    <authContext.Provider value={{ loggedInUser, setLoggedInUser, logout }}>
      {props.children}
    </authContext.Provider>
  );
}

export { AuthContextComponent, authContext };
