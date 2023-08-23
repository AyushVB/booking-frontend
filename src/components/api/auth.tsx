const api_url = "https://booking-system-5ufq.onrender.com/api/";
const register = async (name: string, email: string, password: string) => {
  const url = api_url + "user/register";

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
      password_confirmation: password,
      tc: true,
    }),
  };

  const response = await fetch(url, requestOptions);

  const body = await response.json();

  return body;
};

const login = async (email: string, password: string) => {
  const url = api_url + "user/login";

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  };

  const response = await fetch(url, requestOptions);

  const body = await response.json();

  return body;
};
const changePassword = async (password: string) => {
  const url = api_url + "user/changepassword";
  const jwt = "Bearer " + localStorage.getItem("token");
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: jwt },
    body: JSON.stringify({
      password: password,
    }),
  };
  const response = await fetch(url, requestOptions);

  const body = await response.json();

  return body;
};
const loggedUser = async () => {
  const url = api_url + "user/loggeduser";
  const jwt = "Bearer " + localStorage.getItem("token");
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: jwt },
  };
  const response = await fetch(url, requestOptions);

  const body = await response.json();

  return body;
};
const sentResetPasswordEmail = async (email: string) => {
  const url = api_url + "user/sent-reset-password-email";
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
    }),
  };
  const response = await fetch(url, requestOptions);

  const body = await response.json();

  return body;
};
const resetPassword = async (password: string, id: string, token: string) => {
  const url = api_url + "user/sent-reset-password-email";

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      password: password,
    }),
  };
  const response = await fetch(url, requestOptions);

  const body = await response.json();

  return body;
};
export {
  login,
  register,
  changePassword,
  loggedUser,
  sentResetPasswordEmail,
  resetPassword,
};
