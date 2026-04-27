# Système de Gestion de Présence — MIAGE M1 2026

Application web full-stack de gestion des présences étudiantes, développée dans le cadre du master MIAGE M1 2026.

**Auteurs** : Fanomezantsoa Angela

---

## Description

Cette application permet de gérer les présences des étudiants à l'université. Elle offre :

- La gestion des **utilisateurs**, **rôles**, **étudiants** et **groupes**
- La gestion des **séances de cours** (titre, enseignant, horaires)
- Un **agenda** interactif basé sur FullCalendar
- La génération de **feuilles de présence** mensuelles par étudiant
- L'import/export de calendriers au format **iCal**
- Une **authentification** sécurisée (Spring Security + BCrypt)

---

## Architecture

```
miage_m1_2026/
├── back/    # API REST — Spring Boot 4 / Java 21
└── front/   # Interface — React 19 / Vite
```

### Backend

- **Framework** : Spring Boot 4.0.2
- **Langage** : Java 21
- **Base de données** : H2 (fichier local, profil par défaut) / PostgreSQL (production)
- **Sécurité** : Spring Security, BCryptPasswordEncoder
- **ORM** : Spring Data JPA / Hibernate
- **Validation** : Spring Validation (Bean Validation)
- **Tests** : JUnit 5, Testcontainers

### Frontend

- **Framework** : React 19
- **Bundler** : Vite
- **Routage** : React Router DOM v7
- **Formulaires** : Formik + Yup
- **Calendrier** : FullCalendar (daygrid, timegrid, interaction)
- **iCal** : ical.js

---

## Prérequis

- Java 21+
- Maven (ou utiliser `./mvnw`)
- Node.js 18+ et npm

---

## Installation et lancement

### Backend

```bash
cd back
./mvnw spring-boot:run
```

Le serveur démarre sur `http://localhost:8080`.

La console H2 est disponible sur `http://localhost:8080/h2-console`  
(URL JDBC : `jdbc:h2:file:./data/presence_management`).

#### Changer de profil de base de données

Le profil actif est défini dans `back/src/main/resources/application.properties`.  
Deux profils sont disponibles :

| Profil        | Base de données             |
|---------------|-----------------------------|
| `AngelaLille` | H2 fichier local (défaut)   |
| `KantoLille`  | H2 fichier local            |
| `default`     | PostgreSQL `localhost:5432` |

Pour PostgreSQL, configurer les variables dans `application-default.properties`.

### Frontend

```bash
cd front
npm install
npm run dev
```

L'interface est disponible sur `http://localhost:5173`.

---

## API REST

Toutes les routes sont préfixées par `/api/`.

| Ressource    | Préfixe           |
|--------------|-------------------|
| Auth         | `/api/auth`       |
| Utilisateurs | `/api/user`       |
| Étudiants    | `/api/student`    |
| Groupes      | `/api/group`      |
| Rôles        | `/api/role`       |
| Séances      | `/api/session`    |
| Calendriers  | `/api/calendar`   |

Exemple — séances :

| Méthode | Route                            | Description                   |
|---------|----------------------------------|-------------------------------|
| POST    | `/api/session/create`            | Créer une séance              |
| PUT     | `/api/session/Edit/{id}`         | Modifier une séance           |
| DELETE  | `/api/session/delete/{id}`       | Supprimer une séance          |
| GET     | `/api/session/All`               | Lister toutes les séances     |
| GET     | `/api/session/sessionMonth/{id}` | Feuille de présence mensuelle |

---

## Pages de l'application

| Route                 | Page                      |
|-----------------------|---------------------------|
| `/login`              | Connexion                 |
| `/`                   | Accueil                   |
| `/admin/utilisateurs` | Gestion des utilisateurs  |
| `/roles`              | Gestion des rôles         |
| `/student`            | Annuaire des étudiants    |
| `/group`              | Gestion des groupes       |
| `/session`            | Gestion des séances       |
| `/agenda`             | Agenda (FullCalendar)     |
| `/feuille-presence`   | Feuille de présence       |

---

## Tests

```bash
cd back
./mvnw test
```

Les tests d'intégration utilisent Testcontainers (PostgreSQL requis via Docker).

---

## Modèle de données

```
User ──< Role
 │
Student ──> Group ──> Calendar ──< Session
```

- Un **User** possède un ou plusieurs **rôles**
- Un **Student** est lié à un **User** et appartient à un **Group**
- Chaque **Group** possède un **Calendar**
- Un **Calendar** contient plusieurs **Session** (séances de cours)

