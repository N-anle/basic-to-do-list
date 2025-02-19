document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    
    // Base URL for your Flask backend
    const API_URL = "https://todolist-backend-h33r.onrender.com";

    // Fetch and display all tasks on page load
    function fetchTasks() {
        fetch(`${API_URL}/`)
            .then((response) => response.json())
            .then((tasks) => {
                taskList.innerHTML = ""; // Clear the list
                tasks.forEach((task) => {
                    addTaskToDOM(task);
                });
            })
            .catch((error) => console.error("Error fetching tasks:", error));
    }

    // Add a task to the DOM
    function addTaskToDOM(task) {
        const li = document.createElement("li");
        li.dataset.id = task.id; // Store the task ID for later use

        const taskText = document.createElement("span");
        taskText.textContent = task.task;

        // Create a div to wrap the buttons
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("side-by-side-buttons");

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        // Append buttons to the container
        buttonContainer.appendChild(editBtn);
        buttonContainer.appendChild(deleteBtn);

        // Append elements to the list item
        li.appendChild(taskText);
        li.appendChild(buttonContainer); // Append button container to li

        // Add event listeners for Edit and Delete buttons
        editBtn.addEventListener("click", () => editTask(task.id, task.task));
        deleteBtn.addEventListener("click", () => deleteTask(task.id));

        taskList.appendChild(li);
    }

    // Add a new task
    addTaskBtn.addEventListener("click", () => {
        const taskName = taskInput.value.trim();
        if (!taskName) {
            alert("Please enter a task!");
            return;
        }

        fetch(`${API_URL}/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ task: taskName }),
        })
            .then((response) => response.json())
            .then(() => {
                taskInput.value = ""; // Clear the input field
                fetchTasks(); // Refresh the task list
            })
            .catch((error) => console.error("Error adding task:", error));
    });

    // Edit a task
    function editTask(id, currentTask) {
        const newTask = prompt("Edit your task:", currentTask);
        if (!newTask || newTask.trim() === "") {
            alert("Task cannot be empty!");
            return;
        }

        fetch(`${API_URL}/`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id, task: newTask }),
        })
            .then((response) => response.json())
            .then(() => fetchTasks()) // Refresh the task list
            .catch((error) => console.error("Error editing task:", error));
    }

    // Delete a task
    function deleteTask(id) {
        if (!confirm("Are you sure you want to delete this task?")) {
            return;
        }

        fetch(`${API_URL}/`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id }),
        })
            .then((response) => response.json())
            .then(() => fetchTasks()) // Refresh the task list
            .catch((error) => console.error("Error deleting task:", error));
    }

    // Add keypress event for the input field
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addTaskBtn.click();
        }
    });

    // Initial fetch of tasks
    fetchTasks();
});
