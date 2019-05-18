import validator from "validator";

const minLength = 8;

export const validateSignUp = data => {
  const email = validateEmail(data.email);
  const username = validateUsername(data.username);
  const password = validatePassword(data.password);
  const password2 = validatePassword2(data.password, data.password2);

  return {
    email,
    username,
    password,
    password2
  }
};

export const validateEmail = email => {
  let errors = [];
  email = typeof email === "string" ? email : "";
  if (validator.isEmpty(email)) {
    errors = [...errors, "Email is required"];
  } else if (!validator.isEmail(email)) {
    errors = [...errors, "Email is invalid"];
  }

  return {
    errors,
    isValid: errors.length === 0 ? true : false
  };
};

export const validateUsername = username => {
  let errors = [];
  username = typeof username === "string" ? username : "";
  if (validator.isEmpty(username)) {
    errors = [...errors, "Username is required"];
  } else if (!validator.isAlphanumeric(username)) {
    errors = [...errors, "Username must be alphanumeric"];
  } else if (username.length < minLength) {
    errors = [
      ...errors,
      `Username must be at least ${minLength} characters long`
    ];
  }

  return {
    errors,
    isValid: errors.length === 0 ? true : false
  };
};

export const validatePassword = password => {
  let errors = [];
  password = typeof password === "string" ? password : "";
  if (validator.isEmpty(password)) {
    errors = [...errors, "Password is required"];
  } else if (password.length < minLength) {
    errors = [
      ...errors,
      `Password must be at least ${minLength} characters long`
    ];
  }

  return {
    errors,
    isValid: errors.length === 0 ? true : false
  };
};

export const validatePassword2 = (password, password2) => {
  let errors = [];

  if (!validator.equals(password, password2)) {
    errors.push("Passwords must match");
  }

  return {
    errors,
    isValid: errors.length === 0 ? true : false
  };
};

export const validateEmailname = emailname => {
  let errors = [];
  emailname = typeof emailname === "string" ? emailname : "";

  if (validator.isEmail(emailname)) {
    return {
      errors,
      isValid: true
    };
  }

  if (validator.isEmpty(emailname)) {
    errors = [...errors, "Username is invaild"];
  } else if (
    !validator.isAlphanumeric(emailname) ||
    emailname.length < minLength
  ) {
    errors = [...errors, "Username is invaild"];
  }

  return {
    errors,
    isValid: errors.length === 0 ? true : false
  };
};
