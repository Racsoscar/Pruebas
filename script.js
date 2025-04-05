// Selección de elementos
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// Función para agregar tarea
function addTask() {
    const taskText = taskInput.value.trim();
    const wantsReminder = document.getElementById("reminder-check").checked;
    const reminderDate = document.getElementById("reminder-date").value;
  
    if (taskText === "") {
      alert("Por favor escribe una tarea.");
      return;
    }
  
    const li = document.createElement("li");
    li.textContent = taskText;
  
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
    });
  
    deleteBtn.addEventListener("click", () => {
      li.remove();
    });
  
    buttonContainer.appendChild(completeBtn);
    buttonContainer.appendChild(deleteBtn);
    li.appendChild(buttonContainer);
    taskList.appendChild(li);
  
    // Recordatorio
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
  }
// Habilitar o deshabilitar campo de fecha
document.getElementById("reminder-check").addEventListener("change", function () {
    document.getElementById("reminder-date").disabled = !this.checked;
  });
    

// Evento para botón de agregar
addTaskBtn.addEventListener("click", addTask);

// Evento para presionar Enter
taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});
