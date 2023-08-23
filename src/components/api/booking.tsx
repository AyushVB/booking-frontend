const api_url = "https://booking-system-5ufq.onrender.com/api/";
const reservationOfSeat = async (seatNo: number) => {
  const url = api_url + "booking/reserve-seat";
  const jwt = "Bearer " + localStorage.getItem("token");
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: jwt },
    body: JSON.stringify({
      seatNo: seatNo,
    }),
  };
  const response = await fetch(url, requestOptions);

  const body = await response.json();

  return body;
};
const confirmationOfSeat = async (email: string) => {
  const id = localStorage.getItem("seat-id");

  const token = localStorage.getItem("token1");
  const url = api_url + "booking/confirm-seat/" + id + "/" + token;
  const jwt = "Bearer " + localStorage.getItem("token");
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: jwt },
    body: JSON.stringify({
      email: email,
    }),
  };
  const response = await fetch(url, requestOptions);

  const body = await response.json();

  return body;
};
const reserveSeat = async () => {
  const url = api_url + "booking/reserve";
  const jwt = "Bearer " + localStorage.getItem("token");
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: jwt },
  };
  const response = await fetch(url, requestOptions);

  const body = await response.json();

  return body;
};
const reserveById = async () => {
  const url = api_url + "booking/reserve-id";
  const jwt = "Bearer " + localStorage.getItem("token");
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: jwt },
  };
  const response = await fetch(url, requestOptions);

  const body = await response.json();

  return body;
};
export { reservationOfSeat, confirmationOfSeat, reserveSeat, reserveById };
