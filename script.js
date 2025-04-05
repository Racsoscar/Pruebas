// Elementos del DOM
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// Guardar tareas en localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#task-list li").forEach((li) => {
    tasks.push({
      text: li.childNodes[0].nodeValue.trim(),
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Cargar tareas desde localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    createTask(task.text, task.completed);
  });
}

// Crear tarea visualmente y agregarla a la lista
function createTask(taskText, isCompleted) {
  const li = document.createElement("li");
  li.textContent = taskText;

  if (isCompleted) {
    li.classList.add("completed");
  }

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("task-buttons");

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✔";
  completeBtn.classList.add("complete-btn");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑";
  deleteBtn.classList.add("delete-btn");

  completeBtn.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  deleteBtn.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  buttonContainer.appendChild(completeBtn);
  buttonContainer.appendChild(deleteBtn);
  li.appendChild(buttonContainer);
  taskList.appendChild(li);
}

// Agregar nueva tarea desde el input
function addTask() {
  const taskText = taskInput.value.trim();
  const wantsReminder = document.getElementById("reminder-check").checked;
  const reminderDate = document.getElementById("reminder-date").value;

  if (taskText === "") {
    alert("Por favor escribe una tarea.");
    return;
  }

  createTask(taskText, false);

  // Recordatorio (opcional)
  if (wantsReminder && reminderDate) {
    const reminderTime = new Date(reminderDate).getTime();
    const now = new Date().getTime();
    const delay = reminderTime - now;

    if (delay > 0) {
      setTimeout(() => {
        alert(`🔔 ¡Hora de cumplir la tarea: "${taskText}"!`);
      }, delay);
    } else {
      alert("La fecha del recordatorio debe ser futura.");
    }
  }

  // Limpiar campos
  taskInput.value = "";
  document.getElementById("reminder-check").checked = false;
  document.getElementById("reminder-date").value = "";
  document.getElementById("reminder-date").disabled = true;

  saveTasks();
}

// Habilitar campo de fecha si se marca recordatorio
document.getElementById("reminder-check").addEventListener("change", function () {
  document.getElementById("reminder-date").disabled = !this.checked;
});

// Eventos para agregar tareas
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// Cargar tareas guardadas al abrir la app
loadTasks();

