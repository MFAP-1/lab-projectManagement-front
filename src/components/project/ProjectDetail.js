import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import api from "../../apis/api"; // Instância do Axios pré-configurada

import LoadingSpinner from "../LoadingSpinner";
import ConfirmationModal from "../ConfirmationModal";
import TaskCard from "./TaskCard";
import TaskCreate from "./TaskCreate";

function ProjectDetail() {
  const [projectDetails, setProjectDetails] = useState({
    name: "",
    description: "",
    startDate: null,
    endDate: null,
    budget: 0,
    projectOwner: { name: "" },
    tasks: [],
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [taskCreated, setTaskCreated] = useState(false);

  // Equivalente ao props.match.params.id
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await api.get(`/project/${id}`);

        setProjectDetails({ ...response.data });
        setLoading(false);

        if (taskCreated) {
          setTaskCreated(false);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [id, taskCreated]);

  function handleModalClose() {
    setShowModal(false);
  }

  function handleModalOpen() {
    setShowModal(true);
  }

  function handleModalConfirmation() {
    history.push(`/projeto/deletar/${id}`);
  }

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        // O <> é um Fragment, um componente do React especial que não renderiza nada na tela
        <>
          <h3>{projectDetails.name}</h3>
          <div className="w-100 my-3 d-flex justify-content-end">
            <button className="btn btn-sm btn-warning me-2">Editar</button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleModalOpen()} // Ao clicar no botão deletar, perguntamos ao usuário se ele tem certeza
            >
              Deletar
            </button>
          </div>
          <p>
            <strong>Descrição do projeto: </strong>
            {projectDetails.description}
          </p>
          <p>
            <strong>Data início: </strong>
            {new Date(projectDetails.startDate).toLocaleString().split(",")[0]}
          </p>
          <p>
            <strong>Data fim: </strong>
            {new Date(projectDetails.endDate).toLocaleString().split(",")[0]}
          </p>
          <p>
            <strong>Orçamento: </strong>
            {projectDetails.budget.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
          <p>
            <strong>Responsável: </strong>
            {projectDetails.projectOwner.name}
          </p>
        </>
      )}

      <ConfirmationModal
        show={showModal}
        handleClose={handleModalClose}
        handleConfirmation={handleModalConfirmation}
      />

      <div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary"
        >
          Nova tarefa
        </button>
      </div>

      {showForm ? (
        <div className="col-5">
          <TaskCreate
            projectId={id}
            handleClose={setShowForm}
            setTaskCreated={setTaskCreated}
          />
        </div>
      ) : null}

      <div className="row">
        <div className="col-4">
          <h3>A fazer</h3>

          <div className="d-flex flex-column">
            {projectDetails.tasks
              .filter((taskObj) => taskObj.status === "A fazer")
              .map((taskObj) => (
                <TaskCard taskObj={taskObj} />
              ))}
          </div>
        </div>
        <div className="col-4">
          <h3>Fazendo</h3>
          <div className="d-flex flex-direction-column">
            {projectDetails.tasks
              .filter((taskObj) => taskObj.status === "Fazendo")
              .map((taskObj) => (
                <TaskCard taskObj={taskObj} />
              ))}
          </div>
        </div>
        <div className="col-4">
          <h3>Feito</h3>
          <div className="d-flex flex-direction-column">
            {projectDetails.tasks
              .filter((taskObj) => taskObj.status === "Feito")
              .map((taskObj) => (
                <TaskCard taskObj={taskObj} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
