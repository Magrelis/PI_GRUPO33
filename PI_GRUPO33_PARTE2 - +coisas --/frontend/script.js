const socket = io("http://localhost:8000");
const createTaskBtn = document.getElementById("createTask");
const driveLink = document.getElementById("driveLink");
const taskInput = document.getElementById("taskInput");

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
        taskElement.draggable = true;
        taskElement.dataset.taskId = task.id;
        taskElement.style.position = "relative";

        taskElement.innerHTML = "";

        const titleEl = document.createElement("p");
        titleEl.textContent = task.title;
        taskElement.appendChild(titleEl);

        // Botão de deletar
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "×";
        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            socket.emit("delete_task", task.id);
        });
        taskElement.appendChild(deleteBtn);

        // Link do Google Drive
        if (task.drive_link) {
            const driveLink = document.createElement("a");
            driveLink.href = task.drive_link;
            driveLink.textContent = "📎 Anexo";
            driveLink.target = "_blank";
            driveLink.style.marginLeft = "10px";
            taskElement.appendChild(driveLink);
        }

        // Comentários
        const commentsDiv = document.createElement("div");
        commentsDiv.className = "comments";

        if (task.comments && task.comments.length > 0) {
            task.comments.forEach((comment, index) => {
                const commentDiv = document.createElement("div");
                commentDiv.className = "comment-item";

                const commentP = document.createElement("p");
                commentP.textContent = "💬 " + comment;

                const deleteCommentBtn = document.createElement("button");
                deleteCommentBtn.textContent = "×";
                deleteCommentBtn.className = "comment-delete-btn";
                deleteCommentBtn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    socket.emit("delete_comment", { taskId: task.id, commentIndex: index });
                });

                commentDiv.appendChild(commentP);
                commentDiv.appendChild(deleteCommentBtn);
                commentsDiv.appendChild(commentDiv);
            });
        }
        taskElement.appendChild(commentsDiv);

        const commentForm = document.createElement("form");
        commentForm.className = "comment-form";
        commentForm.innerHTML = `
            <input type="text" placeholder="Add a comment" class="comment-input" required>
            <button type="submit">Post</button>
        `;
        commentForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const input = commentForm.querySelector(".comment-input");
            const comment = input.value.trim();
            if (comment) {
                socket.emit("add_comment", {
                    taskId: task.id,
                    comment: comment
                });
                input.value = "";
            }
        });
        taskElement.appendChild(commentForm);

        column.appendChild(taskElement);
    }
}

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

// Eventos do Socket.IO
socket.on("comment_added", ({ taskId, comment }) => {
    const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
    if (taskElement) {
        const commentsDiv = taskElement.querySelector(".comments");
        if (commentsDiv) {
            const commentDiv = document.createElement("div");
            commentDiv.className = "comment-item";

            const commentP = document.createElement("p");
            commentP.textContent = "💬 " + comment;

            const deleteCommentBtn = document.createElement("button");
            deleteCommentBtn.textContent = "×";
            deleteCommentBtn.className = "comment-delete-btn";
            deleteCommentBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                socket.emit("delete_comment", { taskId, commentIndex: Array.from(commentsDiv.children).indexOf(commentDiv) });
            });

            commentDiv.appendChild(commentP);
            commentDiv.appendChild(deleteCommentBtn);

            commentsDiv.appendChild(commentDiv);
        }
    }
});

socket.on("comment_deleted", ({ taskId, commentIndex }) => {
    const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
    if (taskElement) {
        const commentsDiv = taskElement.querySelector(".comments");
        if (commentsDiv) {
            const commentItems = commentsDiv.querySelectorAll(".comment-item");
            if (commentItems[commentIndex]) {
                commentItems[commentIndex].remove();
            }
        }
    }
});

socket.on("task_created", (newTask) => renderTask(newTask));

socket.on("task_deleted", (deletedTask) => {
    const taskElement = document.querySelector(`[data-task-id="${deletedTask.id}"]`);
    if (taskElement) taskElement.remove();
});

socket.on("task_updated", (updatedTask) => {
    const taskElement = document.querySelector(`[data-task-id="${updatedTask.id}"]`);
    if (taskElement) {
        const newColumn = document.querySelector(`#${updatedTask.status} .task-list`);
        newColumn.appendChild(taskElement);
    }
});

socket.on("tasks_updated", (allTasks) => {
    document.querySelectorAll(".task-list").forEach(el => el.innerHTML = "");
    allTasks.forEach(renderTask);
});