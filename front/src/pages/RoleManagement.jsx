import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { roleService } from '../services/roleService';
import { useGestionApi } from '../api/useGestionApi';
import "../styles/PageShell.css";
const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const { chargement, erreur, executer } = useGestionApi();

  const chargerRoles = () => {
    executer(roleService.getAll()).then(data => setRoles(data));
  };

  useEffect(() => {
    chargerRoles();
  }, []);


  const createFormik = useFormik({
    initialValues: {
      name: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Le nom est obligatoire")
    }),
    onSubmit: (values, { resetForm }) => {
      executer(roleService.create(values.name)).then(() => {
        resetForm();
        chargerRoles();
      });
    }
  });


  const editFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: roles.find(r => r.Id === editingId)?.name || ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Le nom est obligatoire")
    }),
    onSubmit: (values) => {
      executer(roleService.update(editingId, values.name)).then(() => {
        setEditingId(null);
        chargerRoles();
      });
    }
  });

  const handleDelete = (id) => {
    if (window.confirm("Supprimer ce rôle ?")) {
      executer(roleService.delete(id)).then(() => chargerRoles());
    }
  };

  return (
    <div>
      <h2>Gestion des Rôles</h2>

      {/* 🔹 Formulaire création */}
      <form onSubmit={createFormik.handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          name="name"
          value={createFormik.values.name}
          onChange={createFormik.handleChange}
          placeholder="Nouveau rôle"
        />
        {createFormik.errors.name && createFormik.touched.name && (
          <div style={{ color: 'red' }}>{createFormik.errors.name}</div>
        )}
        <button type="submit">Ajouter</button>
      </form>

      {erreur && <p style={{ color: 'red' }}>{erreur}</p>}

      <table border="1" width="100%" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th>ID</th>
            <th>Nom du rôle</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {roles.map(role => (
            <tr key={role.Id}>
              <td>{role.Id}</td>

              <td>
                {editingId === role.Id ? (
                  <form onSubmit={editFormik.handleSubmit}>
                    <input
                      name="name"
                      value={editFormik.values.name}
                      onChange={editFormik.handleChange}
                    />
                    {editFormik.errors.name && (
                      <div style={{ color: 'red' }}>
                        {editFormik.errors.name}
                      </div>
                    )}
                  </form>
                ) : (
                  role.name
                )}
              </td>

              <td>
                {editingId === role.Id ? (
                  <>
                    <button onClick={editFormik.handleSubmit} style={{ color: 'green', marginRight: '5px' }}>
                      Enregistrer
                    </button>
                    <button onClick={() => setEditingId(null)}>
                      Annuler
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setEditingId(role.Id)} style={{ marginRight: '5px' }}>
                      Modifier
                    </button>
                    <button onClick={() => handleDelete(role.Id)} style={{ color: 'red' }}>
                      Supprimer
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleManagement;