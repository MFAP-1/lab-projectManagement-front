import { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import api from "../../apis/api";
import { authContext } from "../../contexts/authContext";

import TextInput from "../TextInput";
import SelectInput from "../SelectInput";

function TaskEdit() {
  const [state, setState] = useState({
    description: "",
    status: "A fazer",
    startDate: new Date().toISOString().split("T")[0],
    projectId: "",
  });

  const { id } = useParams();
  const history = useHistory();

  const { loggedInUser } = useContext(authContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/task/${id}`);

        setState({
          ...response.data,
          startDate: new Date(response.data.startDate)
            .toISOString()
            .split("T")[0],
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
      await api.patch(`/task/update/${id}`, {
        ...state,
        taskOwner: loggedInUser.user._id,
      });

      // console.log(response.data);
      history.push(`/projeto/${state.projectId}`);
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
        <button className="btn btn-primary">Atualizar a task</button>
      </div>
    </form>
  );
}

export default TaskEdit;
