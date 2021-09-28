import { useState, useContext } from "react";

import TextInput from "../TextInput";
import SelectInput from "../SelectInput";

import api from "../../apis/api";
import { authContext } from "../../contexts/authContext";

function TaskCreate(props) {
  const [state, setState] = useState({
    description: "",
    status: "A fazer",
    startDate: new Date().toISOString().split("T")[0],
  });

  const { loggedInUser } = useContext(authContext);

  function handleChange(event) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post(`/task`, {
        ...state,
        taskOwner: loggedInUser.user._id,
        projectId: props.projectId,
      });

      console.log(response.data);

      // Limpando o formulário após a criação
      setState({
        description: "",
        status: "A fazer",
        startDate: new Date(),
      });

      props.handleClose(false);
      props.setTaskCreated(true);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Descrição"
        id="taskFormDescription"
        name="description"
        onChange={handleChange}
        value={state.description}
      />

      <SelectInput
        label="Status"
        id="taskFormStatus"
        name="status"
        onChange={handleChange}
        value={state.status}
        items={["A fazer", "Fazendo", "Feito"]}
      />

      <TextInput
        label="Data Início"
        type="date"
        id="taskFormStartDate"
        name="startDate"
        onChange={handleChange}
        value={state.startDate}
      />

      <div className="mb-3">
        <button className="btn btn-primary">Criar tarefa</button>
      </div>
    </form>
  );
}

export default TaskCreate;
