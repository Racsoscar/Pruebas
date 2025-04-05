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

  // Evento completar
  completeBtn.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  // Evento eliminar
  deleteBtn.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  // 🆕 Doble clic para editar texto y fecha
  li.addEventListener("dblclick", () => {
    const originalText = li.firstChild.nodeValue.trim();
    const input = document.createElement("input");
    input.type = "text";
    input.value = originalText;
    input.classList.add("edit-input");

    const dateInput = document.createElement("input");
    dateInput.type = "datetime-local";
    dateInput.classList.add("edit-date");
    dateInput.style.marginLeft = "10px";

    li.firstChild.remove();
    li.insertBefore(input, buttonContainer);
    li.insertBefore(dateInput, buttonContainer);
    input.focus();

    function saveEdit() {
      const newText = input.value.trim();
      const newDate = dateInput.value;

      if (newText !== "") {
        li.firstChild.remove();
        li.insertBefore(document.createTextNode(newText), buttonContainer);
        saveTasks();

        // Reprogramar recordatorio si hay nueva fecha
        if (newDate) {
          const delay = new Date(newDate).getTime() - Date.now();
          if (delay > 0) {
            setTimeout(() => {
              alert(`🔔 ¡Hora de cumplir la tarea: "${newText}"!`);
            }, delay);
          }
        }
      } else {
        li.remove();
        saveTasks();
      }
    }

    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") saveEdit();
    });

    input.addEventListener("blur", saveEdit);
    dateInput.addEventListener("blur", saveEdit);
  });

  buttonContainer.appendChild(completeBtn);
  buttonContainer.appendChild(deleteBtn);
  li.appendChild(buttonContainer);
  taskList.appendChild(li);
}

// Agregar nueva tarea
function addTask() {
  const taskText = taskInput.value.trim();
  const wantsReminder = document.getElementById("reminder-check").checked;
  const reminderDate = document.getElementById("reminder-date").value;

  if (taskText === "") {
    alert("Por favor escribe una tarea.");
    return;
  }

  createTask(taskText, false);

  // Recordatorio nuevo
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

  taskInput.value = "";
  document.getElementById("reminder-check").checked = false;
  document.getElementById("reminder-date").value = "";
  document.getElementById("reminder-date").disabled = true;

  saveTasks();
}

// Habilitar/deshabilitar input de fecha
document.getElementById("reminder-check").addEventListener("change", function () {
  document.getElementById("reminder-date").disabled = !this.checked;
});

// Eventos
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// Cargar tareas guardadas
loadTasks();


