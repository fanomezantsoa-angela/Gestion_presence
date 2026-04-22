const API_URL = "http://localhost:8080/api/Calendar";

const handleResponse = (res) => {
  return res.text().then(text => {
    if (!res.ok) throw new Error(text || "Erreur serveur");
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  });
};

export const calendarService = {
  getAll: () => {
    return fetch(`${API_URL}/calendars`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
    .then(res => {
      if (!res.ok) throw new Error("Erreur lors de la récupération des agendas");
      return res.json();
    });
  },

  create: (data) => {
    return fetch(`${API_URL}/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', 
      body: JSON.stringify({
        name: data.name,
        group_id: Number(data.group_id) 
      })
    }).then(res => {
       if (res.status === 500) {
         console.error("Error");
       }
       return res.text();
    });
  },

  importSessions: (calendarId, sessionsArray) => {
    return fetch(`${API_URL}/${calendarId}/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(sessionsArray)
    }).then(res => {
      if (!res.ok) throw new Error("Erreur lors de l'enregistrement");
      return res.text().then(text => {
        try {
          return JSON.parse(text); 
        } catch {
          return text; 
        }
      });
    });
  }
};