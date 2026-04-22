import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { authService } from '../services/authService';
import { useGestionApi } from '../api/useGestionApi';
import '../styles/LoginPage.css';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Email invalide').required('Requis'),
  password: Yup.string().required('Requis')
});

const LoginPage = () => {
  const { chargement, erreur, executer } = useGestionApi();

  const handleLogin = (values) => {
    executer(authService.connexion(values)).then(data => {
      localStorage.setItem("sessionId", data.sessionId);
      localStorage.setItem("userRoles", JSON.stringify(data.roles));
      localStorage.setItem("user_id", data.userId);
      // alert("Bienvenue " + data.email);
      // if (data.roles.includes("ROLE_GESTIONNAIRE")) {
      //   window.location.href = "/admin/utilisateurs"; 
      // } else {
      //   window.location.href = "/ma-presence"; 
      // }
      window.location.href = "/home";
    }).catch(err => {
      console.log("Erreur de login:", err);
    });
  };

  return (
    <div className="login-page">
      <div className="login-page__hero">
        <div className="login-page__badge">Gestion de présence</div>
        <h2>Connexion</h2>
        <p>
          Accédez à votre espace pour gérer les utilisateurs, les sessions et les présences.
        </p>
      </div>

      <div className="login-card">
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
        >
          <Form className="login-form">
            <div className="login-form__field">
              <label htmlFor="email">Adresse email</label>
              <Field id="email" name="email" type="email" placeholder="exemple@domaine.com" />
              <ErrorMessage name="email" component="div" className="login-form__error" />
            </div>

            <div className="login-form__field">
              <label htmlFor="password">Mot de passe</label>
              <Field id="password" name="password" type="password" placeholder="Votre mot de passe" />
              <ErrorMessage name="password" component="div" className="login-form__error" />
            </div>

            {erreur && <p className="login-form__server-error">{erreur}</p>}

            <button type="submit" className="login-form__submit" disabled={chargement}>
              {chargement ? 'Connexion...' : 'Se connecter'}
            </button>

            <p className="login-form__footer">
              Pas encore de compte ?{' '}
              <Link className="login-form__link" to="/admin/utilisateurs">
                Créer un utilisateur
              </Link>
            </p>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;