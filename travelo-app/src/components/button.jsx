export default function Button(props) {
  const { label, height } = props;
  return (
    <div className={`d-grid pt-1 ${height}`}>
      <button className="btn btn-success rounded-5 btn-lg" {...props}>
        {label}
      </button>
    </div>
  );
}
