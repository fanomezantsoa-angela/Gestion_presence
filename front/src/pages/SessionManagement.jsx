import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { sessionService } from '../services/sessionService';
import { useGestionApi } from '../api/useGestionApi';
import "../styles/PageShell.css";
const SessionManagement = () => {
  const [sessions, setSessions] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const { chargement, erreur, executer } = useGestionApi();

  const chargerSessions = () => {
    executer(sessionService.getAll()).then(data => setSessions(data));
  };

  useEffect(() => {
    chargerSessions();
  }, []);

  //  Validation commune
  const validationSchema = Yup.object({
    date: Yup.string().required("Date obligatoire"),
    start_time: Yup.string().required("Heure début obligatoire"),
    end_time: Yup.string()
      .required("Heure fin obligatoire")
      .test("is-after", "La fin doit être après le début", function(value) {
        return value > this.parent.start_time;
      }),
    course_title: Yup.string().required("Titre obligatoire"),
    teacher: Yup.string().required("Enseignant obligatoire"),
  });

  //  Formik création
  const createFormik = useFormik({
    initialValues: {
      date: '',
      start_time: '',
      end_time: '',
      course_title: '',
      teacher: ''
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      executer(sessionService.create(values)).then(() => {
        resetForm();
        chargerSessions();
      });
    }
  });


  const editFormik = useFormik({
    enableReinitialize: true,
    initialValues: sessions.find(s => s.id_session === editingId) || {
      date: '',
      start_time: '',
      end_time: '',
      course_title: '',
      teacher: ''
    },
    validationSchema,
    onSubmit: (values) => {
      executer(sessionService.update(editingId, values)).then(() => {
        setEditingId(null);
        chargerSessions();
      });
    }
  });

  const handleStartEdit = (session) => {
    setEditingId(session.id_session);
  };

  const handleDelete = (id) => {
    if (window.confirm("Supprimer cette session ?")) {
      executer(sessionService.delete(id)).then(chargerSessions);
    }
  };

  return (
    <div>
      <h2>Gestion des Sessions de Cours</h2>

   
      <form onSubmit={createFormik.handleSubmit} style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px', background: '#f9f9f9', padding: '15px' }}>
        
        <input type="date" name="date" value={createFormik.values.date} onChange={createFormik.handleChange} />
        <input type="time" name="start_time" value={createFormik.values.start_time} onChange={createFormik.handleChange} />
        <input type="time" name="end_time" value={createFormik.values.end_time} onChange={createFormik.handleChange} />
        <input name="course_title" placeholder="Titre du cours" value={createFormik.values.course_title} onChange={createFormik.handleChange} />
        <input name="teacher" placeholder="Enseignant" value={createFormik.values.teacher} onChange={createFormik.handleChange} />

        <button type="submit" disabled={chargement}>Créer</button>

        {/* erreurs */}
        <div style={{ width: '100%' }}>
          {Object.values(createFormik.errors).map((err, i) => (
            <div key={i} style={{ color: 'red' }}>{err}</div>
          ))}
        </div>
      </form>

      {erreur && <p style={{ color: 'red' }}>{erreur}</p>}


      <table border="1" width="100%" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#eee' }}>
            <th>Date</th>
            <th>Début</th>
            <th>Fin</th>
            <th>Cours</th>
            <th>Enseignant</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {sessions.map(s => (
            <tr key={s.id_session}>
              {editingId === s.id_session ? (
                <>
                  <td><input type="date" name="date" value={editFormik.values.date} onChange={editFormik.handleChange} /></td>
                  <td><input type="time" name="start_time" value={editFormik.values.start_time?.substring(0,5)} onChange={editFormik.handleChange} /></td>
                  <td><input type="time" name="end_time" value={editFormik.values.end_time?.substring(0,5)} onChange={editFormik.handleChange} /></td>
                  <td><input name="course_title" value={editFormik.values.course_title} onChange={editFormik.handleChange} /></td>
                  <td><input name="teacher" value={editFormik.values.teacher} onChange={editFormik.handleChange} /></td>
                  <td>
                    <button onClick={editFormik.handleSubmit} style={{ color: 'green' }}>OK</button>
                    <button onClick={() => setEditingId(null)}>Annuler</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{s.date}</td>
                  <td>{s.start_time}</td>
                  <td>{s.end_time}</td>
                  <td>{s.course_title}</td>
                  <td>{s.teacher}</td>
                  <td>
                    <button onClick={() => handleStartEdit(s)}>Modifier</button>
                    <button onClick={() => handleDelete(s.id_session)} style={{ color: 'red', marginLeft: '5px' }}>
                      Supprimer
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SessionManagement;