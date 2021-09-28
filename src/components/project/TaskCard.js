import { useState } from "react";
import { useHistory } from "react-router-dom";

import api from "../../apis/api";

import ConfirmationModal from "../ConfirmationModal";

function TaskCard(props) {
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  function handleModalClose() {
    setShowModal(false);
  }

  function handleModalOpen() {
    setShowModal(true);
  }

  async function handleModalConfirmation() {
    try {
      console.log(props.taskObj._id);
      const response = await api.delete(`/task/${props.taskObj._id}`);
      console.log(response.data);
      // history.push("/projetos");
      history.push(`/projeto/${props.taskObj.projectId}`);
      props.setTaskCreated(true);
    } catch (err) {
      console.error(err);
    }
  }

  function handleUpdateTask() {
    history.push(`/task/update/${props.taskObj._id}`);
  }

  return (
    <div
      className="border rounded p-2 shadow-sm bg-light m-2"
      key={props.taskObj._id}
    >
      <p className="mb-0">{props.taskObj.description}</p>
      <button onClick={() => handleUpdateTask()}>Update</button>
      <button onClick={() => handleModalOpen()}>Delete</button>
      <br />
      <small style={{ fontSize: "10px" }} className="text-muted fst-italic">
        {new Date(props.taskObj.startDate).toLocaleString()}
      </small>

      <ConfirmationModal
        show={showModal}
        handleClose={handleModalClose}
        handleConfirmation={handleModalConfirmation}
      />
    </div>
  );
}

export default TaskCard;
