import clsx from "clsx";
import "../styles/input/input.css";

function Input(props) {
  const { label, id, error, register, name, type } = props;

  return (
    <div className="mb-4">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <input
        className={clsx(`form-control ${error ? "is-invalid" : ""}`)}
        {...(register
          ? register(name, {
              valueAsNumber: type === "number" ? true : false,
            })
          : {})}
        {...props}
      />
      {error && (
        <label className="label">
          <span className="invalid-feedback">{error}</span>
        </label>
      )}
    </div>
  );
}

function TextArea(props) {
  const { label, id, error, register, name } = props;

  return (
    <div className="mb-4">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <textarea
        className={clsx(`form-control ${error ? "is-invalid" : ""}`)}
        {...(register ? register(name) : {})}
        {...props}
      />
      {error && (
        <label className="label">
          <span className="invalid-feedback">{error}</span>
        </label>
      )}
    </div>
  );
}

function Select(props) {
  const { label, placeholder, id, error, options, register, name } = props;

  return (
    <div className="mb-4">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <select
        className={clsx(`form-control ${error ? "is-invalid" : ""}`)}
        defaultValue=""
        {...(register ? register(name) : {})}
        {...props}
      >
        <option disabled value="">
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && (
        <label className="label">
          <span className="invalid-feedback">{error}</span>
        </label>
      )}
    </div>
  );
}

function Checkbox(props) {
  const { label, id, error, register, name } = props;

  return (
    <div className="mb-4">
      <div className="form-label">
        <input
          type="checkbox"
          className={clsx("form-check-input", { "is-invalid": error })}
          id={id}
          {...(register ? register(name) : {})}
          {...props}
        />
        <label className="form-check-label ms-2" htmlFor={id}>
          {label}
        </label>
      </div>
      {error && (
        <div className="label">
          <span className="invalid-feedback">{error}</span>
        </div>
      )}
    </div>
  );
}

export { Input, TextArea, Select, Checkbox };
