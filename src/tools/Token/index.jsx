export const getToken = () => {
  try {
    return localStorage.getItem("holiToken");
  } catch {
    return null;
  }
};
