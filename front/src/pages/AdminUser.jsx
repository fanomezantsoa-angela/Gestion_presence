import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { userService } from '../services/userService';
import { useGestionApi } from '../api/useGestionApi'; 
import { useState, useEffect } from 'react';
import '../styles/PageShell.css';

const userSchema = Yup.object().shape({
  firstname: Yup.string().required('Prénom requis'),
  lastname: Yup.string().required('Nom requis'),
  email: Yup.string().email('Email invalide').required('Email requis'),
  roleName: Yup.string().required('Il faut choisir un rôle')
});

const AdminUser = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ firstName: '', lastName: '', email: '', roleName: '' });
  const { chargement, erreur, executer } = useGestionApi();

  const chargerUsers = () => {
    executer(userService.getAll()).then(data => {
      setUtilisateurs(data);
    });
  };

  useEffect(() => {
    chargerUsers();
  }, []);

  const handleCreerUser = (values, { resetForm }) => {
    executer(userService.enregistrer(values)).then(() => {
      executer(userService.assignerRole(values.email, values.roleName)).then(() => {
        alert("Un étudiant créé");
        resetForm();
        chargerUsers();
      });
    });
  };

  const handleStartEdit = (user) => {
    setEditingId(user.usedId); 
    setEditData({ 
      firstname: user.firstName,
      lastname: user.lastName, 
      email: user.email,
      roleName: user.roles && user.roles.length > 0 ? user.roles[0].replace('ROLE_', '').toLowerCase() : 'student'
    });
  };

  const handleSaveUpdate = (id) => {
    executer(userService.modifier(id, editData)).then(() => {
      return executer(userService.assignerRole(editData.email, editData.roleName));
    }).then(() => {
      setEditingId(null);
      chargerUsers();
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Supprimer cet utilisateur ?")) {
      executer(userService.supprimer(id)).then(() => {
        chargerUsers();
      });
    }
  };

  console.log('editDataeditDataeditData', editData)
  
  return (
    <div className="page-shell">
      <section className="page-shell__hero">
        <h2>Créer un Utilisateur</h2>
        <p>Ajoutez, modifiez et supprimez les comptes avec une interface plus lisible.</p>
      </section>

      {erreur && <p className="page-error">Erreur: {erreur}</p>}

      <Formik
        initialValues={{ firstname: '', lastname: '', email: '', roleName: 'student' }}
        validationSchema={userSchema}
        onSubmit={handleCreerUser}
      >
        <Form className="page-card page-actions" style={{ marginBottom: '0' }}>
          <Field className="page-field" name="firstname" placeholder="Prénom" />
          <Field className="page-field" name="lastname" placeholder="Nom" />
          <Field className="page-field" name="email" placeholder="Email" />
          <Field className="page-field" as="select" name="roleName">
            <option value="student">Étudiant</option>
            <option value="manager">Gestionnaire</option>
          </Field>
          <button className="page-button" type="submit" disabled={chargement}>Créer utilisateur</button>
        </Form>
      </Formik>

      <div className="page-table-wrap">
        <table className="page-table">
          <thead>
          <tr>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôles</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {utilisateurs.map(u => (
            <tr key={u.usedId}>
              {editingId === u.usedId ? (
                <>
                  <td><input className="page-field" value={editData.firstname} onChange={e => setEditData({...editData, firstname: e.target.value})} /></td>
                  <td><input className="page-field" value={editData.lastname} onChange={e => setEditData({...editData, lastname: e.target.value})} /></td>
                  <td><input className="page-field" value={editData.email} onChange={e => setEditData({...editData, email: e.target.value})} /></td>
                  <td>
                    <select className="page-field" value={editData.roleName} onChange={e => setEditData({...editData, roleName: e.target.value})}>
                      <option value="student">Étudiant</option>
                      <option value="manager">Gestionnaire</option>
                    </select>
                  </td>
                  <td>
                    <button className="page-button page-button--success" onClick={() => handleSaveUpdate(u.usedId)}>OK</button>
                    <button className="page-button page-button--secondary" onClick={() => setEditingId(null)}>Annuler</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{u.firstName}</td>
                  <td>{u.lastName}</td>
                  <td>{u.email}</td>
                  <td>
                    {u.roles && u.roles.length > 0 
                      ? u.roles[u.roles.length - 1].replace('ROLE_', '')
                      : 'Aucun'}
                  </td>
                  <td>
                    <button className="page-button page-button--secondary" onClick={() => handleStartEdit(u)}>Modifier</button>
                    <button className="page-button page-button--danger" onClick={() => handleDelete(u.usedId)} style={{ marginLeft: '5px' }}>Supprimer</button>
                  </td>
                </>
              )}
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUser;