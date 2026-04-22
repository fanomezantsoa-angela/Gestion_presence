import { Outlet, Link, useNavigate } from "react-router-dom";
import "../styles/Layout.css"; 
import logo from "../assets/images/logo.png";

const Layout = () => {
  const navigate = useNavigate();
  const roles = JSON.parse(localStorage.getItem("userRoles") || "[]");
  const estGestionnaire = roles.includes("ROLE_MANAGER");

  const deconnexion = () => {
    localStorage.clear();
    navigate("/login");
  };

  console.log('estGestionnaire', estGestionnaire)

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo"><img src={logo} alt="logo" /></div>
        <button className="logout-btn" onClick={deconnexion}>Déconnexion</button>
      </header>

      <div className="main-wrapper">
        <nav className="sidebar">
          <ul className="nav-list">
            <li className="nav-item">
              <Link className="nav-link" to="/home">Accueil</Link>
            </li>
            
            {estGestionnaire ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/utilisateurs">Utilisateurs</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/roles">Rôles</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/student">Etudiants</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/group">Groupes</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/session">Session</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/agenda">Agenda</Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/feuille-presence">Ma Présence</Link>
              </li>
            )}
          </ul>
        </nav>

        <main className="content-body">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;