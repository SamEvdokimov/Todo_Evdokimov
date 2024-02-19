/* eslint-disable no-param-reassign */
const sendButton = document.querySelector('#send-button');
const deleteButton = document.querySelector('#delete-button-all');
const inputNewTodo = document.querySelector('#input-todo-text');
const listToDos = document.querySelector('#list-for-render');
const checkTodos = document.querySelector('#check-all');
const KEYDOWN_ENTER = 'Enter';
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
    event.target.previousElementSibling.hidden = false;
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

const keyDown = (event) => {
  if (event.key === KEYDOWN_ENTER) {
    addNewTodo(event);
  }
};

inputNewTodo.addEventListener('keydown', keyDown);
deleteButton.addEventListener('click', deleteChecked);
checkTodos.addEventListener('click', checkAll);
listToDos.addEventListener('click', handleClick);
sendButton.addEventListener('click', addNewTodo);
