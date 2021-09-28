function TaskCard(props) {
  return (
    <div
      className="border rounded p-2 shadow-sm bg-light m-2"
      key={props.taskObj._id}
    >
      <p className="mb-0">{props.taskObj.description}</p>
      <small style={{ fontSize: "10px" }} className="text-muted fst-italic">
        {new Date(props.taskObj.startDate).toLocaleString()}
      </small>
    </div>
  );
}

export default TaskCard;
