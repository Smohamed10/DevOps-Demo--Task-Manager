// frontend/src/api.js
export const fetchTasks = async () => {
  const res = await fetch("/api/tasks"); // just relative path
  const data = await res.json();
  return data;
};
