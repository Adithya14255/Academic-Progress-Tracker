# Academic Progress Tracker

A comprehensive web application for tracking and managing academic progress across educational institutions.This app is designed for the admininstration to view overall progress at a glance

## 🚀 Features

### For Instructors
- Manage course content and materials
- Get approvals, and manage course hours
  
### For Administrators
- Oversee institution-wide academic performance
- Manage user accounts and permissions
- Generate comprehensive reports
- View and approve actions and materials

## 🔧 Technology Stack

### Frontend
- **Framework**: Angular 17 (Standalone Components)
- **Styling**: Custom CSS
- **State Management**: Angular Services

### Backend
- **API Server**: Flask (Python)
- **Database**: PostgreSQL

### DevOps
- **Containerization**: Docker & Docker Compose
- **Development**: Angular CLI, Visual Studio Code configurations

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or later)
- [Angular CLI](https://angular.io/cli) (v17.x)
- [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/)
- [Python](https://www.python.org/downloads/) (v3.9 or later)

## 🛠️ Installation & Setup

### Using Docker (Recommended)

1. Clone the repository:
   ```bash
   git clone https://github.com/Adithya14255/Academic-Progress-Tracker.git
   cd Academic-Progress-Tracker
   ```

2. Start the application using Docker Compose:
   ```bash
   docker-compose up
   ```

3. Access the application:
   - Frontend: http://localhost:4200
   - Backend API: http://localhost:5001

### Manual Setup

#### Frontend Setup

1. Navigate to the project directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ng serve
   ```

4. Access the application at http://localhost:4200

#### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure the database:
   - Compose up only the database and pgadmin (if needed)

5. Start the Flask server:
   ```bash
   flask run --port 5001
   ```

## 📊 Project Structure

```
frontend/
├── src/                      # Angular application source code
│   ├── app/                  # Application components
│   │   ├── admin/            # Admin dashboard components
│   │   └── ...
│   ├── assets/               # Static assets
├── backend/                  # Flask API server code
│   ├── app.py                  # Application modules
│   └── ...
├── docker-compose.yml        # Docker Compose configuration
└── README.md                 # This documentation
```


## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.
