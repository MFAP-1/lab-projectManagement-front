import { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import api from "../../apis/api";
import { authContext } from "../../contexts/authContext";

import TextInput from "../TextInput";

function ProjectEdit() {
  const [state, setState] = useState({
    name: "",
    description: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    budget: 0,
  });

  const { id } = useParams();
  const history = useHistory();

  const { loggedInUser } = useContext(authContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/project/${id}`);

        setState({
          ...response.data,
          startDate: new Date(response.data.startDate)
            .toISOString()
            .split("T")[0],
          endDate: new Date(response.data.endDate).toISOString().split("T")[0],
        });
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await api.patch(`/project/${id}`, {
        ...state,
        projectOwner: loggedInUser.user._id,
      });

      // console.log(response.data);
      history.push("/projetos");
    } catch (err) {
      console.error(err);
    }
  }

  function handleChange(event) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Name"
        id="projectFormName"
        name="name"
        onChange={handleChange}
        value={state.name}
      />
      <TextInput
        label="Descrição"
        id="projectFormDescription"
        name="description"
        onChange={handleChange}
        value={state.description}
      />

      <TextInput
        label="Data Início"
        type="date"
        id="projectFormStartDate"
        name="startDate"
        onChange={handleChange}
        value={state.startDate}
      />
      <TextInput
        label="Data de Fim"
        type="date"
        id="projectFormEndDate"
        name="endDate"
        onChange={handleChange}
        value={state.endDate}
      />
      <TextInput
        label="Budget"
        id="taskFormBudget"
        name="budget"
        onChange={handleChange}
        value={state.budget}
      />

      <div className="mb-3">
        <button className="btn btn-primary">Atualizar o projeto</button>
      </div>
    </form>
  );
}

export default ProjectEdit;
