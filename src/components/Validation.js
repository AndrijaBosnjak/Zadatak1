export function isEmail(value) {
  return value.includes("@");
}

export function isNotEmpty(value) {
  return value.trim() !== "";
}

export function isLettersOnly(value) {
  return (
    !/[!@#$%^&*(),.?":{}|<>]/g.test(value) &&
    !(/\d+/g.test(value)) &&
    value.trim() !== ""
  );
}

export function isNumbersOnly(value) {
  return /\d+/g.test(value) &&
  value.trim() !== ""
}

export function isFiveDigits(value) {
  return /\d+/g.test(value) && value.trim().length === 5 
}

// const isNotValidName = (value) =>
//   value.trim() === "" ||
//   /[!@#$%^&*(),.?":{}|<>]/g.test(value) ||
//   /\d+/g.test(value);
// const isNotValidPhone = (value) => value.trim() === "" || /\D/.test(value);
// const isNotValidPostal = (value) =>
//   value.trim().length !== 5 || /\D/.test(value);
