# Online Travel Platform

## Project overview
**Online Travel Platform** is a server-rendered web application (Node.js / Express) that provides travel listing and booking functionality. The project includes server-side routes, controllers, models, views (EJS), and static assets to support listing search/filtering, user authentication/authorization and role-based workflows.

This README documents how to set up and run the project locally, explains the folder structure, and highlights the main features.

---

## Key features
- Search and filter travel listings by keyword, location, category and price range  
- User authentication and role-based authorization (separate user and admin workflows)  
- Persistent storage using a MongoDB database  
- Image / cloud configuration support (cloud config file included)  
- Server-side rendered views using EJS

---

## Tech stack
- Node.js, Express  
- MongoDB (via Mongoose)  
- EJS templating for server-side views  
- CSS for styling  
- JavaScript for backend logic and frontend interactions

Languages detected in the repository: JavaScript, EJS, CSS. :contentReference[oaicite:1]{index=1}

---

## Repository structure (top-level)
├── controllers/ # route controllers
├── init/ # initialization scripts or seeders (if any)
├── models/ # Mongoose schemas/models
├── public/ # static assets (css, js, images)
├── routes/ # Express route definitions
├── utils/ # utility modules/helpers
├── views/ # EJS templates
├── LisintingSchema.js # listing schema file (additional schema)
├── app.js # application entrypoint
├── cloudConfig.js # cloud / storage configuration
├── package.json # project dependencies & scripts
└── .gitignore


(You can inspect the repository root and top-level file list on GitHub.) :contentReference[oaicite:2]{index=2}

---

## Prerequisites
- Node.js (v14+ recommended)  
- npm (Node package manager)  
- MongoDB (local or hosted instance such as MongoDB Atlas)  
- Any cloud provider credentials required by `cloudConfig.js` (see notes below). :contentReference[oaicite:3]{index=3}


-------------
## Setup and Run (Local)

Follow these steps to set up and run the project on your local machine:

---

### 1. Clone the repository
```bash
git clone https://github.com/yahhshika/OnlineTravelPlatform.git
cd OnlineTravelPlatform
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create Environment Variables
```bash
MONGO_URI=your_mongodb_connection_string
PORT=5000
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret
SESSION_SECRET=your_session_secret
```

### 4. Run the application
```bash
node app.js
```

### 5. Open in browser
http://localhost:8080

## You’re now ready to use Online Travel Platform locally!


---

This version includes:
- Section dividers (`---`) for clarity  
- Syntax highlighting for commands  
- Proper subheadings (`###`) that render beautifully on GitHub  







