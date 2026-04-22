const API_URL = "http://localhost:8080/api/session";

export const sessionService = {
  getAll: () => {
    return fetch(`${API_URL}/All`).then(res => res.json());
  },

  create: (data) => {
    return fetch(`${API_URL}/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  },

  update: (id, data) => {
    return fetch(`${API_URL}/edit/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  },

  delete: (id) => {
    return fetch(`${API_URL}/delete/${id}`, { method: 'DELETE' });
  }
};