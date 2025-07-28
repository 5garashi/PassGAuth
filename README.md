# PassGAuth

**PassGAuth** is a single-page React application that implements secure password-based authentication and Google OAuth login using **Appwrite**. The app also integrates **Recharts** for data visualization.

## 🚀 Features

- 🔐 Password-based authentication
- 🌐 Google OAuth login
- 📊 Login statistics visualization with Recharts
- 🧠 Built with React + Vite
- ☁️ Backend powered by Appwrite

## 📁 Tech Stack

- **Frontend:** React, Vite
- **Authentication:** Appwrite (Password + Google OAuth)
- **Charting:** Recharts
- **Architecture:** SPA (Single Page Application)

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/PassGAuth.git
cd PassGAuth
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add your Appwrite settings:

```env
VITE_APPWRITE_ENDPOINT=https://[your-appwrite-endpoint]
VITE_APPWRITE_PROJECT_ID=[your-project-id]
VITE_APPWRITE_DATABASE_ID=[your-database-id]
VITE_APPWRITE_COLLECTION_ID=[your-collection-id]
```

### 4. Start development server

```bash
npm run dev
```

The app will be running at `http://localhost:5173`.

### 5. Build for production

```bash
npm run build
```

## 📊 Sample Features

- View login history by user
- Track login count and timestamp
- Display visual charts of authentication trends

## 🛡️ Environment Requirements

- Node.js >= 18.x
- Appwrite backend instance (Cloud or Self-hosted)

## 📝 License

MIT

---

Developed by 5garashi.com 
