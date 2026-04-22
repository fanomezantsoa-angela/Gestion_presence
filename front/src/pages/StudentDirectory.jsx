import React, { useEffect, useState } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { studentService } from '../services/studentService';
import { useGestionApi } from '../api/useGestionApi';
import { groupService } from '../services/groupService';
import "../styles/PageShell.css";
const editSchema = Yup.object().shape({
  numeroStudent: Yup.number().typeError('Doit être un nombre').required('Requis'),
  groupe_id: Yup.string().required('Veuillez choisir un groupe'),
  firstname: Yup.string().required('Requis'),
  lastname: Yup.string().required('Requis'),
  email: Yup.string().email('Email invalide').required('Requis'),
});

const createSchema = Yup.object().shape({
  numeroStudent: Yup.number().typeError('Doit être un nombre').required('Requis'),
  groupe_id: Yup.string().required('Veuillez choisir un groupe'),
});


const EditRow = ({ student, groups, onSave, onCancel }) => {
  const formik = useFormik({
    initialValues: {
      numeroStudent: student.numeroStudent || '',
      groupe_id: student.group_id || '',
      firstname: student.firstname || '',
      lastname: student.lastname || '',
      email: student.email || '',
    },
    validationSchema: editSchema,
    onSubmit: (values) => onSave(student.student_id, values),
  });

  return (
    <tr>
     
      <td>
        <input
          name="numeroStudent"
          value={formik.values.numeroStudent}
          onChange={formik.handleChange}
        />
      </td>

   
      <td>
        <input
          name="firstname"
          value={formik.values.firstname}
          onChange={formik.handleChange}
        />
      </td>

    
      <td>
        <input
          name="lastname"
          value={formik.values.lastname}
          onChange={formik.handleChange}
        />
      </td>

  
      <td>
        <input
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
      </td>

      {/* Group */}
      <td>
        <select
          name="groupe_id"
          value={formik.values.groupe_id}
          onChange={formik.handleChange}
        >
          {groups.map(g => (
            <option key={g.id} value={g.id}>{g.groupe_name}</option>
          ))}
        </select>
      </td>

      <td>
        <button type="button" onClick={formik.submitForm} style={{ color: 'green' }}>OK</button>
        <button type="button" onClick={onCancel}>Annuler</button>
      </td>
    </tr>
  );
};

const StudentDirectory = () => {
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const { chargement, erreur, executer } = useGestionApi();

  const chargerStudents = () => {
    executer(studentService.getAll()).then(data => setStudents(data));
    executer(groupService.getAll()).then(data => setGroups(data));
  };

  useEffect(() => { chargerStudents(); }, []);

  const handleCreate = (values, { resetForm }) => {
    const payload = {
  numero: Number(values.numeroStudent), 
  groupe_id: Number(values.groupe_id),
  userId: Number(localStorage.getItem("user_id")), 
};
    executer(studentService.create(payload)).then(() => {
      resetForm();
      chargerStudents();
    });
  };

 const handleSaveUpdate = (id, values) => {
  const payload = {
    numero: Number(values.numeroStudent),   
    groupe_id: Number(values.groupe_id),
    email: values.email,
    firstname: values.firstname,
    lastname: values.lastname,
  };

  executer(studentService.update(id, payload)).then(() => {
    setEditingId(null);
    chargerStudents();
  });
};

  const handleDelete = (id) => {
    if (window.confirm("Supprimer cet étudiant ?")) {
      executer(studentService.delete(id)).then(() => chargerStudents());
    }
  };

  return (
    <div>
      <h2>Étudiants</h2>

      <Formik
        initialValues={{ numeroStudent: '', groupe_id: '' }}
        validationSchema={createSchema}
        onSubmit={handleCreate}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', gap: '10px', background: '#f9f9f9', padding: '15px' }}>
            <div>
              <Field name="numeroStudent" placeholder="N° Étudiant" />
              <ErrorMessage name="numeroStudent" component="div" style={{ color: 'red', fontSize: '12px' }} />
            </div>
            <div>
              <Field as="select" name="groupe_id">
                <option value="">-- Choisir un groupe --</option>
                {groups.map(g => (
                  <option key={g.id} value={g.id}>{g.groupe_name}</option>
                ))}
              </Field>
              <ErrorMessage name="groupe_id" component="div" style={{ color: 'red', fontSize: '12px' }} />
            </div>
            <button type="submit" disabled={chargement}>
              {chargement ? 'Ajout...' : "Ajouter l'étudiant"}
            </button>
          </form>
        )}
      </Formik>

      {erreur && <p style={{ color: 'red' }}>{erreur}</p>}

      <table border="1" width="100%" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#eee' }}>
            <th>N° Étudiant</th><th>Prénom</th><th>Nom</th>
            <th>Email</th><th>Groupe</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            editingId === s.student_id
              ? (
              
                <EditRow
                  key={s.student_id}
                  student={s}
                  groups={groups}
                  onSave={handleSaveUpdate}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <tr key={s.student_id}>
                  <td>{s.numeroStudent}</td>
                  <td>{s.firstname}</td>
                  <td>{s.lastname}</td>
                  <td>{s.email}</td>
                  <td>{groups.find(g => Number(g.id) === Number(s.group_id))?.groupe_name || 'N/A'}</td>
                  <td>
                    <button onClick={() => setEditingId(s.student_id)}>Modifier</button>
                    <button onClick={() => handleDelete(s.student_id)} style={{ color: 'red', marginLeft: '5px' }}>Supprimer</button>
                  </td>
                </tr>
              )
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDirectory;