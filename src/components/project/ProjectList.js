import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import api from "../../apis/api";

import LoadingSpinner from "../LoadingSpinner";

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  // O useEffect recebe uma função callback e um array, e toda vez que qualquer elemento da array sofra qualquer tipo de alteração, a função callback é executada. Caso a array esteja vazia, o useEffect executa sua callback uma vez assim que o componente é renderizado, substituindo o componentDidMount
  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const response = await api.get("/project"); // api é a instância pré-configurada do Axios que injeta automaticamente o token de autenticação definida no arquivo apis/api.js
        setProjects([...response.data]);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <table className="table table-hover">
          <thead className="table-primary">
            <tr>
              <th>Nome</th>
              <th>Data Início</th>
              <th>Responsável</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((projectObj) => {
              return (
                <tr
                  style={{ cursor: "pointer" }}
                  key={projectObj._id}
                  onClick={() => {
                    history.push(`/projeto/${projectObj._id}`);
                  }}
                >
                  <td>{projectObj.name}</td>
                  <td>
                    {
                      new Date(projectObj.startDate)
                        .toLocaleString()
                        .split(",")[0]
                    }
                  </td>
                  <td>{projectObj.projectOwner.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProjectList;
