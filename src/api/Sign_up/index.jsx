async function signUpApi(data) {
  try {
    const res = await fetch(
      'https://api.noroff.dev/api/v1/holidaze/auth/register',
      data,
    );
    const resData = await res.json();
    return resData;
  } catch (error) {
    return error;
  }
}

export default signUpApi;
