import { useState, useContext } from "react";

import TextInput from "../TextInput";

import api from "../../apis/api";
import { authContext } from "../../contexts/authContext";

function ProjectCreate(props) {
  const [state, setState] = useState({
    name: "",
    description: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    budget: 0,
  });

  const { loggedInUser } = useContext(authContext);

  function handleChange(event) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await api.post(`/project`, {
        ...state,
        projectOwner: loggedInUser.user._id,
      });

      // console.log(response.data);

      // Limpando o formulário após a criação
      setState({
        name: "",
        description: "",
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date().toISOString().split("T")[0],
        budget: 0,
      });

      props.handleClose(false);
      props.setProjectCreated(true);
    } catch (err) {
      console.error(err);
    }
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
        <button className="btn btn-primary">Criar projeto</button>
      </div>
    </form>
  );
}

export default ProjectCreate;
