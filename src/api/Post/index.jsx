async function postApi(url, data) {
  try {
    const res = await fetch(url, data);
    const resData = await res.json();
    return resData;
  } catch (error) {
    return error;
  }
}

export default postApi;
