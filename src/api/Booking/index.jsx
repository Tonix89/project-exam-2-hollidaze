async function getBookingApi(url, token) {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const resData = await res.json();
    return resData;
  } catch (error) {
    return error;
  }
}

export default getBookingApi;
