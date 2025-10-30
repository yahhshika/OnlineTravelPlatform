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



---

## Repository structure (top-level)
├── controllers/ # route controllers <br/>
├── init/ # initialization scripts or seeders (if any) <br/>
├── models/ # Mongoose schemas/models <br/>
├── public/ # static assets (css, js, images) <br/>
├── routes/ # Express route definitions <br/>
├── utils/ # utility modules/helpers <br/>
├── views/ # EJS templates <br/>
├── LisintingSchema.js # listing schema file (additional schema) <br/>
├── app.js # application entrypoint <br/>
├── cloudConfig.js # cloud / storage configuration <br/>
├── package.json # project dependencies & scripts <br/>
└── .gitignore <br/>


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







