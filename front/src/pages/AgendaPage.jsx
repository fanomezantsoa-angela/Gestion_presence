import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ICAL from 'ical.js';

import { calendarService } from '../services/calendarService';
import { sessionService } from '../services/sessionService';
import { groupService } from '../services/groupService';
import { useGestionApi } from '../api/useGestionApi';
import '../styles/PageShell.css';

const AgendaPage = () => {
  const [agendas, setAgendas] = useState([]);
  const [groups, setGroups] = useState([]);
  const [events, setEvents] = useState([]);

  const [newCal, setNewCal] = useState({ name: '', group_id: '' });
  const [selectedCalendarId, setSelectedCalendarId] = useState('');

  const { chargement, erreur, executer } = useGestionApi();

  const chargerDonneesDeBase = () => {
    executer(calendarService.getAll()).then(data => setAgendas(data || []));
    executer(groupService.getAll()).then(data => setGroups(data || []));
  };

  useEffect(() => {
    chargerDonneesDeBase();
  }, []);

  console.log('localStoragelocalStorage', localStorage);

  const chargerSessions = (calendarId) => {
    if (!calendarId) {
      setEvents([]);
      return;
    }

    const agendaTrouve = agendas.find(a => String(a.id) === String(calendarId));

    if (agendaTrouve && agendaTrouve.sessions) {
      const formatted = agendaTrouve.sessions.map((s) => ({
        id: s.id_session, 
        title: `${s.course_title} (${s.teacher})`,
        start: `${s.date}T${s.start_time}`,
        end: `${s.date}T${s.end_time}`,
        backgroundColor: '#3788d8'
      }));
      
      setEvents(formatted);
    } else {
      setEvents([]);
    }
  };

  const handleCreateCalendar = () => {
    if (!newCal.name || !newCal.group_id) return alert("Remplissez tous les champs");
    executer(calendarService.create(newCal)).then(() => {
      setNewCal({ name: '', group_id: '' });
      chargerDonneesDeBase();
      alert("Agenda créé avec succès !");
    });
  };

  const handleImportICS = (e) => {
    const file = e.target.files[0];
    if (!file || !selectedCalendarId) return alert("Veuillez d'abord choisir un agenda !");
  
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const jcalData = ICAL.parse(event.target.result);
        const comp = new ICAL.Component(jcalData);
        const vevents = comp.getAllSubcomponents('vevent');
  
        const tableauSessions = vevents.map(vevent => {
          const icalEvent = new ICAL.Event(vevent);
          const start = icalEvent.startDate;
          const end = icalEvent.endDate;
  
          return {
            date: `${start.year}-${String(start.month).padStart(2, '0')}-${String(start.day).padStart(2, '0')}`,
            start_time: `${String(start.hour).padStart(2, '0')}:${String(start.minute).padStart(2, '0')}`,
            end_time: `${String(end.hour).padStart(2, '0')}:${String(end.minute).padStart(2, '0')}`,
            course_title: icalEvent.summary,
            teacher: icalEvent.description || "Inconnu"
          };
        });
  
        console.log("Envoi des sessions au serveur...", tableauSessions);
  
        executer(calendarService.importSessions(selectedCalendarId, tableauSessions))
        .then((reponse) => {
          alert("Importation réussie !");

          const nouveauxEvenements = tableauSessions.map((s, index) => ({
            id: `new-${index}`,
            title: `${s.course_title} (${s.teacher})`,
            start: `${s.date}T${s.start_time}`,
            end: `${s.date}T${s.end_time}`,
            backgroundColor: '#28a745' 
          }));

          setEvents(nouveauxEvenements);
        })
        .catch(err => {
          console.error("Erreur API:", err);
          alert("Erreur enregistrement : " + err.message);
        });
  
      } catch (err) {
        console.error("Erreur Parsing:", err);
        alert("Erreur fichier ICS- format");
      }
    };
    reader.readAsText(file);
  };

  console.log('agendasagendas', agendas)

  return (
    <div className="page-shell">
     

      <div className="page-card">
        <h3>1. Créer un nouvel Agenda</h3>
        <div className="page-actions" style={{ marginTop: '0.75rem' }}>
          <input 
            className="page-field"
            placeholder="Nom de l'agenda (ex: Semestre 1)" 
            value={newCal.name}
            onChange={e => setNewCal({...newCal, name: e.target.value})}
          />
          <select 
            className="page-field"
            value={newCal.group_id} 
            onChange={e => setNewCal({...newCal, group_id: e.target.value})}
          >
            <option value="">-- Lier à un groupe --</option>
            {groups.map(g => (
              <option key={g.id} value={g.id}>{g.groupe_name}</option>
            ))}
          </select>
          <button className="page-button" onClick={handleCreateCalendar} disabled={chargement}>Créer l'Agenda</button>
        </div>
      </div>

      <div className="page-card page-actions" style={{ justifyContent: 'space-between' }}>
        <div>
          <h3>2. Sélectionner un Agenda à afficher</h3>
          <select 
            className="page-field"
            value={selectedCalendarId} 
            onChange={e => {
              setSelectedCalendarId(e.target.value);
              chargerSessions(e.target.value);
            }}
          >
            <option value="">-- Choisir un agenda --</option>
            {agendas.map(cal => (
              <option key={cal.id} value={cal.id}>
                {cal.name_calendar} (ID: {cal.id})
              </option>
            ))}
          </select>
        </div>

        {selectedCalendarId && (
          <div className="page-card" style={{ padding: '0.9rem 1rem' }}>
            <label><strong>Importer ICS dans cet agenda : </strong></label>
            <input className="page-field" type="file" accept=".ics" onChange={handleImportICS} disabled={chargement} />
          </div>
        )}
      </div>

      {erreur && <p className="page-error">{erreur}</p>}

      <div className="page-card">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          locale="fr"
          events={events}
          slotMinTime="08:00:00"
          slotMaxTime="19:00:00"
          height="650px"
          allDaySlot={false}
        />
      </div>
    </div>
  );
};

export default AgendaPage;