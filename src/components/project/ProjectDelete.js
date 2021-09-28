import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import api from "../../apis/api";

function ProjectDelete() {
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function deleteProject() {
      try {
        const response = await api.delete(`/project/${id}`);

        console.log(response.data);
        history.push("/projetos");
      } catch (err) {
        console.error(err);
      }
    }
    deleteProject();
  }, [id, history]);

  return <div>Deletando...</div>;
}

export default ProjectDelete;
