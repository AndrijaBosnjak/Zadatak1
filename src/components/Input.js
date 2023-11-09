import "./InputForm.css";

function Input({ label, id, error, ...props }) {
    return (
      <>
        <div className="form-control">
          <label htmlFor={id}>{label}</label>
          <input type="text" id={id} {...props} />
        </div>
        <div>
          {error && <p className="error-text">{error}</p>}
        </div>
      </>
    );
  }
  
  export default Input;
  
  