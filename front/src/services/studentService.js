const API_URL = "http://localhost:8080/api/student";

export const studentService = {
    getAll: () => {
        return fetch(`${API_URL}/All`, { 
            credentials: 'include' 
        }).then(res => res.json());
    },
    
      create: async (data) => {
    const res = await fetch(`${API_URL}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        throw new Error("Erreur création étudiant");
    }

    return res;
},

    update: (id, data) => {
        return fetch(`${API_URL}/Edit/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
        });
    },

    delete: (id) => {
        return fetch(`${API_URL}/delete/${id}`, { method: 'DELETE' });
    }
};