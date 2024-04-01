// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));


// Todo: create a function to generate a unique task id
function generateTaskId() {
localStorage.generateTaskId('nextID', JSON.stringify(nextID));
return nextId++;
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

cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
taskCard.append(cardHeader, cardBody)

const now = dayjs();
const doneDate = dayjs(dueDate);
const warningDate = dayjs(dueDate).subtract(3, 'day');

return taskCard; 
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
renderTaskList();


});
