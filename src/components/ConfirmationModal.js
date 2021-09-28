import Modal from "react-bootstrap/Modal";

function ConfirmationModal(props) {
  return (
    <Modal centered show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>AVISO</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Tem certeza que deseja prosseguir? Essa ação é irreversível.
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={props.handleClose}>
          Voltar
        </button>
        <button className="btn btn-danger" onClick={props.handleConfirmation}>
          Deletar
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationModal;
