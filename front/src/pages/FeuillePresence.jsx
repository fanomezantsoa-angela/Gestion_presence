import React, { useState, useEffect } from 'react';
import "../styles/PageShell.css";
const FeuillePresence = () => {
  const studentId = localStorage.getItem('user_id');

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(!!(studentId && studentId !== "undefined"));

  useEffect(() => {
    console.log("Chargement de la feuille de présence pour studentId:", studentId);
    if (!studentId || studentId === "undefined") {
      return;
    }


    fetch(`http://localhost:8080/api/session/sessionMonth/${studentId}`)
      .then(res => {
        if (!res.ok) throw new Error("Erreur serveur " + res.status);
        return res.text(); 
      })
      .then(text => {
        if (!text) {
          setSessions([]);
        } else {
          try {
            const data = JSON.parse(text);
            setSessions(data);
          } catch (e) {
            console.error("JSON invalide :", e);
          }
        }
      })
      .catch(err => console.error("Erreur chargement feuille:", err))
      .finally(() => {
        setLoading(false);
      });
  }, [studentId]);

  const calculerDuree = (start, end) => {
    if (!start || !end) return "0h";
    const s = start.split(':');
    const e = end.split(':');
    const diff = (new Date(0,0,0, e[0], e[1]) - new Date(0,0,0, s[0], s[1])) / 1000 / 60 / 60;
    return diff.toFixed(1) + "h";
  };

  const calculerTotalHeures = () => {
    return sessions.reduce((total, s) => {
      const h = parseFloat(calculerDuree(s.startTime, s.endTime));
      return total + h;
    }, 0).toFixed(1);
  };

  const cellStyle = { border: '1px solid #000', padding: '8px' };

  if (loading) return <p style={{ padding: '20px' }}>Chargement de la feuille de présence...</p>;
  
  if (!studentId || studentId === "undefined") {
    return <p style={{color: 'red', padding: '20px'}}>Erreur : Utilisateur non identifié.</p>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', color: '#333' }}>
      <h2 style={{ textAlign: 'center', textDecoration: 'underline' }}>Feuille de présence - Apprentissage</h2>
      
      <div style={{ border: '1px solid black', marginBottom: '20px', padding: '10px' }}>
        <p><strong>Nom :</strong> {sessions[0]?.studentLastName || '...'}  |  <strong>Prénom :</strong> {sessions[0]?.studentFirstName || '...'}</p>
        <p><strong>Formation :</strong> Master 1 MIAGE FA  |  <strong>Mois :</strong> Mars 2026</p>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={cellStyle}>Date</th>
            <th style={cellStyle}>Module</th>
            <th style={cellStyle}>Horaire</th>
            <th style={cellStyle}>Nb H.</th>
            <th style={cellStyle}>Prés.</th>
            <th style={cellStyle}>Enseignant</th>
          </tr>
        </thead>
        <tbody>
          {sessions.length > 0 ? (
            sessions.map((s) => (
              <tr key={s.idSession}>
                <td style={cellStyle}>{new Date(s.date).toLocaleDateString('fr-FR')}</td>
                <td style={cellStyle}>{s.courseTitle}</td>
                <td style={cellStyle}>{s.startTime?.substring(0,5)} - {s.endTime?.substring(0,5)}</td>
                <td style={cellStyle}>{calculerDuree(s.startTime, s.endTime)}</td>
                <td style={cellStyle}>P</td>
                <td style={cellStyle}>{s.teacher}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="6" style={cellStyle}>Aucune session trouvée.</td></tr>
          )}
        </tbody>
      </table>

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <p><strong>Total heures :</strong> {calculerTotalHeures()}h</p>
        <button onClick={() => window.print()} style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#3788d8', color: 'white', border: 'none', borderRadius: '4px' }}>
          Imprimer la feuille (PDF)
        </button>
      </div>
    </div>
  );
};

export default FeuillePresence;