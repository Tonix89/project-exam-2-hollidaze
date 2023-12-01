async function delApi(url, data) {
  try {
    const res = await fetch(url, data);
    return res;
  } catch (error) {
    return error;
  }
}

export default delApi;
