export default function Button(props) {
  const { label } = props;
  return (
    <div className="d-grid pt-1">
      <button className="btn btn-success rounded-5 btn-lg" {...props}>
        {label}
      </button>
    </div>
  );
}
