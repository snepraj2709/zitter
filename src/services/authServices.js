import axios from "axios";

// authAPI calls
export const LoginService = async ({ username, password }) =>
  await axios.post("/api/auth/login", {
    username: username,
    password: password,
  });

export const SignUpService = async ({
  username,
  password,
  firstName,
  lastName,
}) =>
  await axios.post("/api/auth/signup", {
    username: username,
    password: password,
    firstName: firstName,
    lastName: lastName,
  });
