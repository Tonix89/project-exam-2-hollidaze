export const token = () => {
  try {
    return localStorage.getItem('holiToken');
  } catch {
    return null;
  }
};
