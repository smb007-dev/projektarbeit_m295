# Task API Backend

Dieses Projekt ist eine REST-API zur Verwaltung von Aufgaben (Tasks), implementiert mit Node.js und Express.

---

# Setup-Anleitung

## Voraussetzungen

* Node.js (empfohlen: Version 18 oder höher)
* npm (wird mit Node installiert)

---

## Installation

1. Repository klonen oder Projekt herunterladen

```bash
git clone <repository-url>
cd task-api
```

2. Abhängigkeiten installieren

```bash
npm install
```
---

## Anwendung starten

```bash
node app.js
```

oder mit Nodemon:

```bash
npx nodemon app.js
```

Server läuft dann unter:

```
http://localhost:3000
```

---

# Authentifizierung

Die API verwendet eine einfache Token-basierte Authentifizierung.

## Login

```http
POST /login
```

```json
{
  "username": "admin",
  "password": "1234"
}
```

👉 Antwort:

```json
{
  "token": "token-1"
}
```

## Verwendung des Tokens

Bei geschützten Endpunkten im Header:

```http
Authorization: Bearer <token>
```

---

# API Endpunkte

## Tasks (geschützt)

* `GET /tasks`
* `POST /tasks`
* `GET /tasks/:id`
* `PUT /tasks/:id`
* `DELETE /tasks/:id`
* `POST /tasks/:id/done`

---

# OpenAPI Dokumentation

Die API-Dokumentation ist über Swagger verfügbar.

## Öffnen im Browser:

```
http://localhost:3000/swagger-ui
```

Voraussetzung:

* Server muss laufen

---

# Linting

Falls ESLint konfiguriert ist:

```bash
npx eslint .
```