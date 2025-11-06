
export async function getCurrentUser() {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!token) throw new Error("No hay token guardado.");

  const response = await fetch("http://localhost:8080/api/v1/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: No se pudo obtener el usuario`);
  }

  return await response.json();
}

export async function updateUser(id, updatedData) {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const response = await fetch(`http://localhost:8080/api/v1/users/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: No se pudo actualizar el usuario`);
  }

  return await response.json();
}