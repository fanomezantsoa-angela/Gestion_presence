const API_URL = "http://localhost:8080/api";

export const authService = {
  connexion: (identifiants) => {
    return fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(identifiants)
    }).then(res => {
      if (!res.ok) throw new Error("Incorrects");
      return res.json();
    });
  }
};