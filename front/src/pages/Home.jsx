import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PageShell.css';

const Home = () => {
  const rolesBruts = localStorage.getItem("userRoles");
  const roles = rolesBruts ? JSON.parse(rolesBruts) : [];
  
  const estGestionnaire = roles.includes("ROLE_MANAGER");
  const estEtudiant = roles.includes("ROLE_STUDENT");

  const deconnexion = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="page-shell">
      <section className="page-shell__hero">
        <h1>Accueil</h1>
        <p>Accès rapide aux principales zones de gestion.</p>
      </section>

      <div className="page-card page-actions">
        {estGestionnaire && (
          <>
            <Link to="/admin/utilisateurs">Utilisateurs</Link><br/>
            <Link to="/groupes">Groupes</Link><br/>
            <Link to="/etudiants">Etudiants</Link><br/>
          </>
        )}

        {(estEtudiant || estGestionnaire) && (
            <Link to="/ma-presence">Présence</Link>
        )}
      </div>
    </div>
  );
};

export default Home;