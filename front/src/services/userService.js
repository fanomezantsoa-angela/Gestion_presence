const API_URL = "http://localhost:8080/api";

const gererReponse = (res) => {
  return res.text().then(texte => {
    if (!res.ok) {
      throw new Error(texte || "Erreur serveur");
    }
    try {
      return JSON.parse(texte); 
    } catch {
      return texte; 
    }
  });
};

export const userService = {
  enregistrer: async (donnees) => {
    const res = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(donnees)
    });
    return gererReponse(res);
  },

  assignerRole: (email, role) => {
    return fetch(`${API_URL}/role/assign-role`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, roleName: role })
    }).then(gererReponse);
  },

  getAll: () => {
    return fetch(`${API_URL}/users/All`).then(gererReponse);
  },

  modifier: (id, donnees) => {
    return fetch(`${API_URL}/users/Edit/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', 
      body: JSON.stringify(donnees)
    }).then(gererReponse);
  },

  supprimer: (id) => {
    return fetch(`${API_URL}/users/delete/${id}`, {
      method: 'DELETE',
      credentials: 'include' 
    }).then(gererReponse);
  }
};