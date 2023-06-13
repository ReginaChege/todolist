const todoItem = document.getElementById('todo-item');
const todoText = todoItem.textContent;
console.log(todoText);
fetch('https://dummyjson.com/todos')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error)); 

const addTaskForm = document.getElementById('addTaskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const tasks = [];
function createTaskObject(task) {
  return {
    id: Date.now(),
    task,
    completed: false
  };
}
function addTask(event) {
  event.preventDefault();
  const task = taskInput.value.trim();
  if (task !== '') {
    const newTask = createTaskObject(task);
    tasks.push(newTask);
    renderTasks();
    taskInput.value = '';
  }
}
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.className = 'task' + (task.completed ? ' completed' : '');
    taskItem.innerHTML = `
      <span>${task.task}</span>
      <button class="complete-btn">Done</button>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    `;
    const completeBtn = taskItem.querySelector('.complete-btn');
    completeBtn.addEventListener('click', () => completeTask(task.id));
    const editBtn = taskItem.querySelector('.edit-btn');
    editBtn.addEventListener('click', () => editTask(task.id));
    const deleteBtn = taskItem.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => deleteTask(task.id));
    taskList.appendChild(taskItem);
  });
}
function completeTask(taskId) {
  const task = tasks.find(task => task.id === taskId);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
}
function editTask(taskId) {
  const task = tasks.find(task => task.id === taskId);
  if (task) {
    const newTask = prompt('Enter a new task:', task.task);
    if (newTask !== null) {
      task.task = newTask.trim();
      renderTasks();
    }
  }
}
function deleteTask(taskId) {
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    renderTasks();
  }
}
addTaskForm.addEventListener('submit', addTask);
// Initial render of tasks
renderTasks();