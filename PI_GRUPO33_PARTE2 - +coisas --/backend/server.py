import socketio
import eventlet
import requests  # Para Slack

sio = socketio.Server(cors_allowed_origins='*')
app = socketio.WSGIApp(sio)

# Configurações (substitua com seu webhook)
SLACK_WEBHOOK_URL = "https://hooks.slack.com/services/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"
tasks = []

@sio.event
def add_comment(sid, data):
    task_id = data["taskId"]
    comment = data["comment"]
    task = next((t for t in tasks if t["id"] == task_id), None)
    if task:
        task.setdefault("comments", []).append(comment)
        sio.emit("comment_added", {"taskId": task_id, "comment": comment})

@sio.event
def connect(sid, environ):
    print(f"Cliente conectado: {sid}")
    sio.emit("tasks_updated", tasks)

@sio.event
def create_task(sid, task_data):
    new_task = {
        "comments": [],
        "id": len(tasks) + 1,
        "title": task_data["title"],
        "status": "todo",
        "drive_link": task_data.get("drive_link", "")  # Campo do Google Drive
    }
    tasks.append(new_task)
    sio.emit("task_created", new_task)
    notify_slack(f"✅ Nova tarefa: {new_task['title']}")  # Notificação no Slack

@sio.event
def delete_task(sid, task_id):
    global tasks
    task_index = next((i for i, t in enumerate(tasks) if t["id"] == task_id), None)
    if task_index is not None:
        deleted_task = tasks.pop(task_index)
        sio.emit("task_deleted", deleted_task)

def notify_slack(message):
    try:
        requests.post(SLACK_WEBHOOK_URL, json={"text": message})
    except Exception as e:
        print(f"Erro no Slack: {e}")

@sio.event
def update_task_status(sid, data):
    task = next((t for t in tasks if t["id"] == data["taskId"]), None)
    if task:
        task["status"] = data["newStatus"]
        sio.emit("task_updated", task)

if __name__ == "__main__":
    eventlet.wsgi.server(eventlet.listen(('localhost', 8000)), app)