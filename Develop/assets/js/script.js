// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem('tasks'));
let nextId = JSON.parse(localStorage.getItem('nextId'));

// Todo: create a function to generate a unique task id
function generateTaskId() {
  
  if (nextId === null) {
    nextId = 1;
    // otherwise, increment it by 1
  } else {
    nextId++;
  }
  // save nextId to localStorage
  localStorage.setItem('nextId', JSON.stringify(nextId));
  return nextId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  // create card elements
  const taskCard = $('<div>')
    .addClass('card w-75 task-card draggable my-3')
    .attr('data-task-id', task.id);
  const cardHeader = $('<div>').addClass('card-header h4').text(task.title);
  const cardBody = $('<div>').addClass('card-body');
  const cardDescription = $('<p>').addClass('card-text').text(task.description);
  const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
  const cardDeleteBtn = $('<button>')
    .addClass('btn btn-danger delete')
    .text('Delete')
    .attr('data-task-id', task.id);
  cardDeleteBtn.on('click', handleDeleteTask);

  // append card elements
  cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
  taskCard.append(cardHeader, cardBody);
// Get today's date and the task's due date
const today = new Date();
const dueDate = new Date(task.dueDate);

// Calculate the difference in days between today and the due date
const timeDiff = dueDate.getTime() - today.getTime();
const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

// Add background color based on days remaining
if (daysDiff < 0) {
  // Task is overdue
  taskCard.addClass('bg-danger text-white');
} else if (daysDiff <= 3) {
  // Task is due soon (within 3 days)
  taskCard.addClass('bg-warning text-dark');
} else {
  // Task is not due soon
  taskCard.addClass('text-black');
}

  return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  
  if (!taskList) {
    taskList = [];
  }
  // empty task 
  const todoList = $('#todo-cards');
  todoList.empty();

  const inProgressList = $('#in-progress-cards');
  inProgressList.empty();

  const doneList = $('#done-cards');
  doneList.empty();

  for (let task of taskList) {
    if (task.status === 'to-do') {
      todoList.append(createTaskCard(task));
    } else if (task.status === 'in-progress') {
      inProgressList.append(createTaskCard(task));
    } else if (task.status === 'done') {
      doneList.append(createTaskCard(task));
    }
  }
  
  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
    
    helper: function (e) {
      const original = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');
      return original.clone().css({
        maxWidth: original.outerWidth(),
      });
    },
  });
}

/// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();
  const task = {
    id: generateTaskId(),
    title: $('#taskTitle').val(),
    description: $('#taskDescription').val(),
    dueDate: $('#taskDueDate').val(),
    status: 'to-do',
  };
  
  taskList.push(task);
  localStorage.setItem('tasks', JSON.stringify(taskList));
  renderTaskList();
  $('#taskTitle').val('');
  $('#taskDescription').val('');
  $('#taskDueDate').val('');
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  event.preventDefault();
  const taskId = $(this).attr('data-task-id');
  taskList = taskList.filter((task) => task.id !== parseInt(taskId));
  localStorage.setItem('tasks', JSON.stringify(taskList));
  renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  
  const taskId = ui.draggable[0].dataset.taskId;
  const newStatus = event.target.id;

  for (let task of taskList) {
    
    if (task.id === parseInt(taskId)) {
      task.status = newStatus;
    }
  }
  
  localStorage.setItem('tasks', JSON.stringify(taskList));
  renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  
  renderTaskList();
  
  $('#taskForm').on('submit', handleAddTask);
  
  $('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
  });
  // date picker
  $('#taskDueDate').datepicker({
    changeMonth: true,
    changeYear: true,
  });
});