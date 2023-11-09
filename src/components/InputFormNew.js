import { useState } from "react";

import { isNotEmpty, isLettersOnly, isNumbersOnly, isFiveDigits } from "./Validation.js";
import Input from "./Input.js";
import "./InputForm.css";

const InputFormNew = () => {
  const [checkbox, setCheckbox] = useState(false);
  const [formInputs, setFormInputs] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    nationality: "",
    postal: "",
    // companyName: "",
    // dateIncorporation: "",
  });

  const [conditionalFormInputs, setConditionalFormInputs] = useState({
    companyName: "",
    dateIncorporation: "",
  });

  const [didEdit, setDidEdit] = useState({
    firstName: false,
    lastName: false,
    phone: false,
    nationality: false,
    postal: false,
    companyName: false,
    dateIncorporation: false,
  });

  const [formIsSubmitted, setFormIsSubmitted] = useState(false);

  const enteredFirstNameIsValid = isLettersOnly(formInputs.firstName);
  const enteredLastNameIsValid = isLettersOnly(formInputs.lastName);
  const enteredPhoneIsValid = isNumbersOnly(formInputs.phone);
  const enteredNationalityIsValid = isLettersOnly(formInputs.nationality);
  const enteredPostalCodeIsValid = isFiveDigits(formInputs.postal);
  const enteredCompanyNameIsValid = isLettersOnly(
    conditionalFormInputs.companyName
  );
  const enteredDateIncorporation = isNotEmpty(
    conditionalFormInputs.dateIncorporation.toString()
  );

  const firstNameIsInvalid = didEdit.firstName && !enteredFirstNameIsValid;
  const lastNameIsInvalid = didEdit.lastName && !enteredLastNameIsValid;
  const phoneIsInvalid = didEdit.phone && !enteredPhoneIsValid;
  const nationalityIsInvalid =
    didEdit.nationality && !enteredNationalityIsValid;
  const postalCodeIsInvalid = didEdit.postal && !enteredPostalCodeIsValid;
  const companyNameIsInvalid =
    didEdit.companyName && !enteredCompanyNameIsValid;
  const dateIncorporationIsInvalid =
    didEdit.dateIncorporation && !enteredDateIncorporation;

  let formIsValid = false;

  if (
    (enteredFirstNameIsValid &&
      enteredLastNameIsValid &&
      enteredPhoneIsValid &&
      enteredNationalityIsValid &&
      enteredPostalCodeIsValid) ||
    enteredCompanyNameIsValid ||
    enteredDateIncorporation
  ) {
    formIsValid = true;
  }

  const onFormSubmit = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log(formInputs);
    console.log(conditionalFormInputs);

    setFormIsSubmitted(true);

    setFormInputs({
      firstName: "",
      lastName: "",
      phone: "",
      nationality: "",
      postal: "",
      // companyName: "",
      // dateIncorporation: "",
    });

    setConditionalFormInputs({
      companyName: "",
      dateIncorporation: "",
    });

    setDidEdit({
      firstName: false,
      lastName: false,
      phone: false,
      nationality: false,
      postal: false,
      companyName: false,
      dateIncorporation: false,
    });
  };

  const onChangeInput = (event) => {
    const { id, value } = event.target;
    setFormInputs((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [id]: false,
    }));
  };

  const onChangeConditionalInput = (event) => {
    const { id, value } = event.target;
    setConditionalFormInputs((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [id]: false,
    }));
  };

  const onBlurInput = (id) => {
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [id]: true,
    }));
  };

  const onClearInputs = () => {
    setFormInputs({
      firstName: "",
      lastName: "",
      phone: "",
      nationality: "",
      postal: "",
      // companyName: "",
      // dateIncorporation: "",
    });

    setConditionalFormInputs({
      companyName: "",
      dateIncorporation: "",
    });

    setDidEdit({
      firstName: false,
      lastName: false,
      phone: false,
      nationality: false,
      postal: false,
      companyName: false,
      dateIncorporation: false,
    });
    setCheckbox(false);
  };

  const onClickCheckbox = () => {
    setCheckbox(!checkbox);
  };

  return (
    <form onSubmit={onFormSubmit}>
      {formIsSubmitted && <h3 className="h3">Success!!</h3>}
      <div className="control-group">
        <Input
          label="First Name"
          id="firstName"
          type="text"
          name="firstName"
          placeholder="enter Your first name"
          onBlur={() => onBlurInput("firstName")}
          onChange={onChangeInput}
          value={formInputs.firstName}
          error={
            firstNameIsInvalid &&
            "No numbers or special characters allowed, enter at least 1 character."
          }
        />
        <Input
          label="Last Name"
          id="lastName"
          type="text"
          name="lastName"
          placeholder="enter Your last name"
          onBlur={() => onBlurInput("lastName")}
          onChange={onChangeInput}
          value={formInputs.lastName}
          error={
            lastNameIsInvalid &&
            "No numbers or special characters allowed, enter at least 1 character."
          }
        />
        <Input
          label="Phone number"
          id="phone"
          type="text"
          name="phone"
          placeholder="enter phone number"
          onBlur={() => onBlurInput("phone")}
          onChange={onChangeInput}
          value={formInputs.phone}
          error={
            phoneIsInvalid &&
            "Please enter a valid phone number, only numbers allowed."
          }
        />
        <Input
          label="Nationality"
          id="nationality"
          type="text"
          name="nationality"
          placeholder="enter nationality"
          onBlur={() => onBlurInput("nationality")}
          onChange={onChangeInput}
          value={formInputs.nationality}
          error={
            nationalityIsInvalid &&
            "No numbers or special characters allowed, enter at least 1 character."
          }
        />
        <Input
          label="Postal code"
          id="postal"
          type="text"
          name="postal"
          placeholder="enter 5 digits number"
          onBlur={() => onBlurInput("postal")}
          onChange={onChangeInput}
          value={formInputs.postal}
          error={
            postalCodeIsInvalid &&
            "Please enter a valid postal code, only numbers allowed (5 digits)."
          }
        />
        <div className="form-control">
          <label htmlFor="registerCompany">Register company</label>
          <input type="checkbox" id="checkbox" onClick={onClickCheckbox} />
          {checkbox && (
            <>
              <Input
                label="Company name"
                id="companyName"
                type="text"
                name="companyName"
                placeholder="company name"
                onBlur={() => onBlurInput("companyName")}
                onChange={onChangeConditionalInput}
                value={conditionalFormInputs.companyName}
                error={
                  companyNameIsInvalid &&
                  "No numbers or special characters allowed, enter at least 1 character."
                }
              />
              <Input
                label="Date of Incorporation"
                id="dateIncorporation"
                type="date"
                name="dateIncorporation"
                placeholder="enter date"
                onBlur={() => onBlurInput("dateIncorporation")}
                onChange={onChangeConditionalInput}
                value={conditionalFormInputs.dateIncorporation}
                error={
                  dateIncorporationIsInvalid &&
                  "Please enter a valid date, date must be selected!"
                }
              />
            </>
          )}
        </div>
        <div className="form-actions">
          <button type="reset" onClick={onClearInputs}>
            RESET
          </button>
        </div>
        <div className="form-actions">
          <button type="submit">SEND</button>
        </div>
      </div>
    </form>
  );
};

export default InputFormNew;
