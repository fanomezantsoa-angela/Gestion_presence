const API_URL = "http://localhost:8080/api/role";

export const roleService = {
  getAll: () => {
    return fetch(`${API_URL}/All`).then(res => res.json());
  },

  create: (name) => {
    return fetch(`${API_URL}/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rolename: name })
    });
  },

  update: (id, name) => {
    return fetch(`${API_URL}/Edit/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rolename: name })
    });
  },

  delete: (id) => {
    return fetch(`${API_URL}/delete/${id}`, { method: 'DELETE' });
  }
};