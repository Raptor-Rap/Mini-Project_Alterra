import Spinner from "react-bootstrap/Spinner";

export function Loading() {
  return (
    <div className="text-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
