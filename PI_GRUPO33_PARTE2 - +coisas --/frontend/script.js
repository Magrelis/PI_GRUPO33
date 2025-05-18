const socket = io("http://localhost:8000");
const taskInput = document.getElementById("taskInput");
const driveLink = document.getElementById("driveLink");
const createTaskBtn = document.getElementById("createTask");

// Zoom (simulação)
document.getElementById("startZoom").addEventListener("click", () => {
    window.open("https://zoom.us/start/123456789", "_blank");
});

// Renderizar tarefas com Google Drive
function renderTask(task) {
    const column = document.querySelector(`#${task.status} .task-list`);
    if (column) {
        const taskElement = document.createElement("div");
        taskElement.className = "task";
        taskElement.textContent = task.title;
        taskElement.draggable = true;
        taskElement.dataset.taskId = task.id;

        // Botão de deletar
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "×";
        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            socket.emit("delete_task", task.id);
        });

        // Link do Google Drive
        if (task.drive_link) {
            const driveLink = document.createElement("a");
            driveLink.href = task.drive_link;
            driveLink.textContent = "📎 Anexo";
            driveLink.target = "_blank";
            driveLink.style.marginLeft = "10px";
            taskElement.appendChild(driveLink);
        }

        taskElement.appendChild(deleteBtn);
        column.appendChild(taskElement);
    }
}

// Eventos do Socket.IO
socket.on("task_created", (newTask) => renderTask(newTask));

socket.on("tasks_updated", (allTasks) => {
    document.querySelectorAll(".task-list").forEach(el => el.innerHTML = "");
    allTasks.forEach(renderTask);
});

socket.on("task_updated", (updatedTask) => {
    const taskElement = document.querySelector(`[data-task-id="${updatedTask.id}"]`);
    if (taskElement) {
        const newColumn = document.querySelector(`#${updatedTask.status} .task-list`);
        newColumn.appendChild(taskElement);
    }
});

socket.on("task_deleted", (deletedTask) => {
    const taskElement = document.querySelector(`[data-task-id="${deletedTask.id}"]`);
    if (taskElement) taskElement.remove();
});

// Criar tarefa
createTaskBtn.addEventListener("click", () => {
    const title = taskInput.value.trim();
    if (title) {
        socket.emit("create_task", {
            title: title,
            drive_link: driveLink.value.trim() // Envia o link do Drive
        });
        taskInput.value = "";
        driveLink.value = "";
    }
});

// Drag-and-drop
document.addEventListener("dragstart", (e) => {
    if (e.target.classList.contains("task")) {
        e.target.classList.add("dragging");
        const taskId = e.target.dataset.taskId;
        e.dataTransfer.setData("taskId", taskId);
    }
});

document.querySelectorAll(".column").forEach(column => {
    column.addEventListener("dragover", (e) => e.preventDefault());
    column.addEventListener("dragleave", () => column.style.backgroundColor = "#fff");
    column.addEventListener("drop", (e) => {
        e.preventDefault();
        column.style.backgroundColor = "#fff";
        const taskId = e.dataTransfer.getData("taskId");
        const newStatus = column.id;
        socket.emit("update_task_status", { taskId: parseInt(taskId), newStatus });
    });
});