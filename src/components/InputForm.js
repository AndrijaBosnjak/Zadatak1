import { useState } from "react";

import "./InputForm.css";

const isNotValidName = (value) =>
  value.trim() === "" ||
  /[!@#$%^&*(),.?":{}|<>]/g.test(value) ||
  /\d+/g.test(value);
const isNotValidPhone = (value) => value.trim() === "" || /\D/.test(value);
const isNotValidPostal = (value) =>
  value.trim().length !== 5 || /\D/.test(value);

const InputForm = () => {

  const [formInputs, setFormInputs] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    nationality: "",
    postal: "",
  });

  const [formValidation, setFormValidation] = useState({
    firstNameInputValid: true,
    lastNameInputValid: true,
    phoneInputValid: true,
    nationalityInputValid: true,
    postalInputValid: true,
  })

  const [formSubmit, setFormSubmit] = useState(false);

  const onChangeInput = (event) => {
    const { id, value } = event.target;
    setFormInputs((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    console.log(formInputs);
    //first name
    if ( isNotValidName(formInputs.firstName)  ) {
      setFormValidation((prevState) => ({
        ...prevState, 
        firstNameInputValid:false
      }))
    } else {
      setFormValidation((prevState) => ({
        ...prevState, 
        firstNameInputValid:true}));
    };
   //last name 
    if ( isNotValidName(formInputs.lastName)  ) {
      setFormValidation((prevState) => ({
        ...prevState, 
        lastNameInputValid:false
      }))
    } else {
      setFormValidation((prevState) => ({
        ...prevState, 
        lastNameInputValid:true}));
    };
    //phone
    if ( isNotValidPhone(formInputs.phone)  ) {
      setFormValidation((prevState) => ({
        ...prevState, 
        phoneInputValid:false
      }))
    } else {
      setFormValidation((prevState) => ({
        ...prevState, 
        phoneInputValid:true}));
    };
    //nationality
    if ( isNotValidName(formInputs.nationality)  ) {
      setFormValidation((prevState) => ({
        ...prevState, 
        nationalityInputValid:false
      }))
    } else {
      setFormValidation((prevState) => ({
        ...prevState, 
        nationalityNameInputValid:true}));
    };
    //postal
    if ( isNotValidPostal(formInputs.postal)  ) {
      setFormValidation((prevState) => ({
        ...prevState, 
        postalInputValid:false
      }))
    } else {
      setFormValidation((prevState) => ({
        ...prevState, 
        postalNameInputValid:true}));
    };

    setFormInputs({
      firstName: "",
      lastName: "",
      phone: "",
      nationality: "",
      postal: "",
    });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div className="control-group">
        <div className="form-control">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            placeholder="enter Your first name"
            onChange={onChangeInput}
            value={formInputs.firstName}
          />
        {!formValidation.firstNameInputValid &&<p>Ne valja ti input</p>}  
        </div>
        <div className="form-control">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            placeholder="enter Your last name"
            onChange={onChangeInput}
            value={formInputs.lastName}
          />
          {!formValidation.lastNameInputValid &&<p>Ne valja ti input</p>} 
        </div>

        <div className="form-control">
          <label htmlFor="name">Phone number</label>
          <input
            type="text"
            id="phone"
            placeholder="enter phone number"
            onChange={onChangeInput}
            value={formInputs.phone}
          />
          {!formValidation.phoneInputValid &&<p>Ne valja ti input</p>} 
        </div>
        <div className="form-control">
          <label htmlFor="name">Narodnost</label>
          <input
            type="text"
            id="nationality"
            placeholder="enter nationality"
            onChange={onChangeInput}
            value={formInputs.nationality}
          />
          {!formValidation.nationalityInputValid &&<p>Ne valja ti input</p>}
        </div>
        <div className="form-control">
          <label htmlFor="name">Postal code</label>
          <input
            type="text"
            id="postal"
            placeholder="enter 5 digits number"
            onChange={onChangeInput}
            value={formInputs.postal}
          />
          {!formValidation.postalInputValid &&<p>Ne valja ti input</p>}
        </div>
        <div className="form-actions">
          <button type="button">RESET</button>
        </div>
        <div className="form-actions">
          <button type="submit">SEND</button>
        </div>
      </div>
    </form>
  );
};

export default InputForm;
