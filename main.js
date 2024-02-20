const sendButton = document.querySelector('#send-button');
const deleteButton = document.querySelector('#delete-button-all');
const inputNewTodo = document.querySelector('#input-todo-text');
const listToDos = document.querySelector('#list-for-render');
const checkTodos = document.querySelector('#check-all');
const KEYDOWN_ENTER = 'Enter';
const KEYDOWN_ESC = 'Escape';
const DOUBLE_CLICK = 2;
let toDoList = [];

const renderToDo = () => {
  let listItems = '';
  toDoList.forEach((todo) => {
    if (todo.text !== '') {
      listItems
      += `<li id="todo-list-item" data-id=${todo.id}> 
      <input type="checkbox"${todo.isChecked ? 'checked' : ''}/>
      <input hidden value="${todo.text}"/>
      <span>${todo.text}</span>
      <button>Удалить</button> 
      </li>`;
    }
  });
  listToDos.innerHTML = listItems;
};

const addNewTodo = (event) => {
  const toDo = {
    id: Date.now(),
    text: inputNewTodo.value,
    isChecked: false,
  };
  toDoList.push(toDo);
  inputNewTodo.value = '';
  renderToDo();
  event.preventDefault();
};
const saveDefaultTextOfTask = (event) => {
  const id = parseInt(event.target.parentElement.dataset.id, 10);
  toDoList.forEach((todo) => {
    if (todo.id === id) {
      todo.text = event.target.value;
    }
  });
};
const editTaskByBlur = (event) => {
  saveDefaultTextOfTask(event);
  renderToDo();
};

const editTaskByKeyDown = (event) => {
  if (event.key === KEYDOWN_ENTER) {
    saveDefaultTextOfTask(event);
    renderToDo();
  }
  if (event.key === KEYDOWN_ESC) {
    renderToDo();
  }
};

const keyDownAddNewTodo = (event) => {
  if (event.key === KEYDOWN_ENTER) {
    addNewTodo(event);
  }
};

const handleClick = ((event) => {
  if (event.target.type === 'submit') {
    const idToDelete = parseInt(event.target.parentNode.dataset.id, 10);
    toDoList = toDoList.filter((todo) => todo.id !== idToDelete);
    renderToDo();
  }
  if (event.target.type === 'checkbox') {
    const idToCheck = parseInt(event.target.parentNode.dataset.id, 10);
    toDoList.forEach((todo) => {
      if (todo.id === idToCheck) {
        todo.isChecked = event.target.checked;
      }
    });
  }
  if (event.target.tagName === 'SPAN' && event.detail === DOUBLE_CLICK) {
    const previousSibling = event.target.previousElementSibling;
    previousSibling.hidden = false;
    event.target.hidden = true;
    previousSibling.focus();
  }
});
const checkAll = (event) => {
  toDoList.forEach((todo) => {
    todo.isChecked = event.target.checked;
  });
  renderToDo();
};
const deleteChecked = () => {
  toDoList = toDoList.filter((todo) => !todo.isChecked);
  renderToDo();
};

inputNewTodo.addEventListener('keydown', keyDownAddNewTodo);
deleteButton.addEventListener('click', deleteChecked);
checkTodos.addEventListener('click', checkAll);
listToDos.addEventListener('click', handleClick);
listToDos.addEventListener('keydown', editTaskByKeyDown);
listToDos.addEventListener('blur', editTaskByBlur, true);
sendButton.addEventListener('click', addNewTodo);
