export default function Button(props) {
  const { label } = props;
  return (
    <button className="btn btn-success rounded-5 btn-lg" {...props}>
      {label}
    </button>
  );
}
