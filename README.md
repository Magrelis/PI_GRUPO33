# PI_GRUPO33  
**PROJETO INTEGRADOR: DESENVOLVIMENTO DE SISTEMAS ORIENTADO A DISPOSITIVOS MÓVEIS E BASEADOS NA WEB**

---

# TaskFlow 📝🚀

**TaskFlow** is a task management app for remote teams. It helps teams organize, prioritize, and track their work easily on both mobile and web.

---

## 📌 Objective

* Provide a simple and intuitive interface for task creation and assignment.
* Enable integration with popular tools (such as Slack, Google Drive, and Zoom).
* Offer real-time progress reports.
* Ensure cross-platform accessibility (mobile and web).

---

## 🛠️ Technologies Used

**Frontend:**
- HTML5
- CSS3
- JavaScript (Vanilla)

**Backend:**
- Python 3.11
- Socket.IO
- Eventlet

**Integrations:**
- **WebSocket** for real-time client-server communication  
- **Slack Webhook** for task notifications

---

## ✅ Features Demonstrated

- **Kanban interface** with four columns:  
  `To Do`, `Doing`, `Finished ✅`, and `Canceled ❌`

- **Create Tasks**  
  With fields for **title** and optional **Google Drive link**

- **Update Task Status**  
  Drag and drop tasks between columns

- **Task Comments**  
Add and remove comments on individual tasks to improve collaboration and context sharing

- **Real-Time Updates**  
  Via WebSocket connection between client and server

- **Slack Notifications**  
  Automatic Slack messages when new tasks are created

---

## 🚀 How to Run

Follow these steps to run TaskFlow locally:


#### 1. Clone the repository
```
gh repo clone Magrelis/PI_GRUPO33
```

#### 2. Create and activate a virtual environment
```
cd PI_GRUPO33/taskflow

python3.11 -m venv venv

source venv/bin/activate       # On Windows use: venv\Scripts\activate
```

#### 3. Navigate to the backend folder and install backend dependencies
```
cd backend 

pip install -r requirements.txt
```

#### 4. Run the server
```
python server.py
```

#### 5. In a new terminal, navigate to the frontend folder and open index.html in your browser
```
cd ../frontend

open index.html           # macOS
xdg-open index.html       # Linux
start index.html          # Windows
```

## 👥 Contributors

- Caio Moreira Santos Oliveira  
- Davi Anastacio Santos 
- Gabriel Passos de Melo Silva   
- João Antonio Dalpiva