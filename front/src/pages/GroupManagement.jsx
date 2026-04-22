import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { groupService } from '../services/groupService';
import { useGestionApi } from '../api/useGestionApi';
import "../styles/PageShell.css";
const GroupManagement = () => {
  const [groups, setGroups] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const { chargement, erreur, executer } = useGestionApi();

  const chargerGroupes = () => {
    executer(groupService.getAll()).then(data => setGroups(data));
  };

  useEffect(() => {
    chargerGroupes();
  }, []);


  const validationSchema = Yup.object({
    groupe_name: Yup.string().required("Nom du groupe obligatoire")
  });

  
  const createFormik = useFormik({
    initialValues: {
      groupe_name: ""
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      executer(groupService.create(values.groupe_name)).then(() => {
        resetForm();
        chargerGroupes();
      });
    }
  });

  // 🔹 Formik édition
  const editFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      groupe_name: groups.find(g => g.id === editingId)?.groupe_name || ""
    },
    validationSchema,
    onSubmit: (values) => {
      executer(groupService.update(editingId, values.groupe_name)).then(() => {
        setEditingId(null);
        chargerGroupes();
      });
    }
  });

  const handleStartEdit = (group) => {
    setEditingId(group.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Supprimer ce groupe ?")) {
      executer(groupService.delete(id)).then(chargerGroupes);
    }
  };

  return (
    <div>
      <h2>Gestion des Groupes</h2>

      {/*  FORMULAIRE CREATION */}
      <form onSubmit={createFormik.handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          name="groupe_name"
          placeholder="Nom du groupe"
          value={createFormik.values.groupe_name}
          onChange={createFormik.handleChange}
        />

        {createFormik.errors.groupe_name && createFormik.touched.groupe_name && (
          <div style={{ color: 'red' }}>{createFormik.errors.groupe_name}</div>
        )}

        <button type="submit" disabled={chargement}>
          Créer
        </button>
      </form>

      {erreur && <p style={{ color: 'red' }}>{erreur}</p>}

      {/*  TABLEAU */}
      <table border="1" width="100%" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th>ID</th>
            <th>Nom du Groupe</th>
            <th>Nombre d'étudiants</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {groups.map(g => (
            <tr key={g.id}>
              <td>{g.id}</td>

              <td>
                {editingId === g.id ? (
                  <input
                    name="groupe_name"
                    value={editFormik.values.groupe_name}
                    onChange={editFormik.handleChange}
                  />
                ) : (
                  g.groupe_name
                )}
              </td>

              <td>{g.students ? g.students.length : 0}</td>

              <td>
                {editingId === g.id ? (
                  <>
                    <button onClick={editFormik.handleSubmit} style={{ color: 'green' }}>
                      OK
                    </button>
                    <button onClick={() => setEditingId(null)} style={{ marginLeft: '5px' }}>
                      Annuler
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleStartEdit(g)}>
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(g.id)}
                      style={{ color: 'red', marginLeft: '5px' }}
                    >
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

export default GroupManagement;