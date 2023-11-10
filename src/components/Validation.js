export function isEmail(value) {
  return value.includes("@");
}

export function isNotEmpty(value) {
  return value.trim().length > 0;
}

export function isLettersOnly(value) {
  return (
    !/[!@#$%^&*(),.?":{}|<>]/g.test(value) &&
    !(/\d+/g.test(value)) &&
    value.trim().length > 0
  );
}

export function isNumbersOnly(value) {
  return /\d+/g.test(value) &&
  value.trim().length > 0
}

export function isFiveDigits(value) {
  return /\d+/g.test(value) && value.trim().length === 5 
}

// /\d+/g.test(value) && value.trim().length === 5 

// value.trim() !== ""