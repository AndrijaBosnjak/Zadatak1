import { useState, useMemo } from "react";

import { isNotEmpty, isLettersOnly, isNumbersOnly, isFiveDigits } from "./validation.js";
import Input from "./Input.js";
import "./InputForm.css";

const InputFormNew = () => {
  const [isAdditionalFormOn, setIsAdditionalForm] = useState(false);
  const [formInputs, setFormInputs] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    nationality: "",
    postal: "",
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

  const isEnteredfirstNameIsValid = useMemo(() => isLettersOnly(formInputs.firstName), [formInputs.firstName]);
  const isEnteredLastNameIsValid = useMemo(() => isLettersOnly(formInputs.lastName), [formInputs.lastName]);
  const isEnteredPhoneIsValid = useMemo(() => isNumbersOnly(formInputs.phone), [formInputs.phone]);
  const isEnteredNationalityIsValid = useMemo(() => isLettersOnly(formInputs.nationality), [formInputs.nationality]);
  const isEnteredPostalCodeIsValid = useMemo(() => isFiveDigits(formInputs.postal), [formInputs.postal]);
  const isEnteredCompanyNameIsValid = useMemo(() => isLettersOnly(
    conditionalFormInputs.companyName), [conditionalFormInputs.companyName]
  );
  const isEnteredDateIncorporation = useMemo(() => isNotEmpty(
    conditionalFormInputs.dateIncorporation.toString())
  , [conditionalFormInputs.dateIncorporation]);

  const isFirstNameIsInvalid = useMemo(() => didEdit.firstName && !isEnteredfirstNameIsValid, [didEdit.firstName, isEnteredfirstNameIsValid]);
  const isLastNameIsInvalid = useMemo(() => didEdit.lastName && !isEnteredLastNameIsValid, [didEdit.lastName, isEnteredLastNameIsValid]);
  const isPhoneIsInvalid = useMemo(() => didEdit.phone && !isEnteredPhoneIsValid, [didEdit.phone, isEnteredPhoneIsValid]);
  const isNationalityIsInvalid = useMemo(() =>
    didEdit.nationality && !isEnteredNationalityIsValid, [didEdit.nationality, isEnteredNationalityIsValid]);
  const isPostalCodeIsInvalid = useMemo(() => didEdit.postal && !isEnteredPostalCodeIsValid, [didEdit.postal, isEnteredPostalCodeIsValid]);
  const isCompanyNameIsInvalid = useMemo(() =>
    didEdit.companyName && !isEnteredCompanyNameIsValid, [didEdit.companyName, isEnteredCompanyNameIsValid]);
  const isDateIncorporationIsInvalid = useMemo(() => 
    didEdit.dateIncorporation && !isEnteredDateIncorporation, [didEdit.dateIncorporation, isEnteredDateIncorporation]);

  let formIsValid = false;

  if (
    (isEnteredfirstNameIsValid &&
      isEnteredLastNameIsValid &&
      isEnteredPhoneIsValid &&
      isEnteredNationalityIsValid &&
      isEnteredPostalCodeIsValid) ||
    isEnteredCompanyNameIsValid ||
    isEnteredDateIncorporation
  ) {
    formIsValid = true;
  }

  const formReset = () => {
    setFormInputs({
      firstName: "",
      lastName: "",
      phone: "",
      nationality: "",
      postal: "",
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
  }  

  const onFormSubmit = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log(formInputs);
    console.log(conditionalFormInputs);

    setFormIsSubmitted(true);

    formReset();

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
    setIsAdditionalForm(false);
  };

  const onClickCheckbox = () => {
    setIsAdditionalForm(!isAdditionalFormOn);
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
            isFirstNameIsInvalid &&
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
            isLastNameIsInvalid &&
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
            isPhoneIsInvalid &&
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
            isNationalityIsInvalid &&
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
            isPostalCodeIsInvalid &&
            "Please enter a valid postal code, only numbers allowed (5 digits)."
          }
        />
        <div className="form-control">
          <label htmlFor="registerCompany">Register company</label>
          <input type="checkbox" id="checkbox" onClick={onClickCheckbox} />
          {isAdditionalFormOn && (
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
                  isCompanyNameIsInvalid &&
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
                  isDateIncorporationIsInvalid &&
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
