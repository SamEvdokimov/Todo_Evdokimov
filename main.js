/* eslint-disable no-param-reassign */
const sendButton = document.querySelector('#send-button');
const input = document.querySelector('#input');
const list = document.querySelector('#list-for-render');
const checkTodos = document.querySelector('#check-all');
let toDoList = [];

const renderToDo = () => {
  let listItems = '';
  toDoList.forEach((todo) => {
    if (todo.text !== '') {
      listItems += `<li id="todo-list-item" data-id=${todo.id}> <input type="checkbox"${todo.isChecked ? 'checked' : ''}/><span>${todo.text}</span> <button>Удалить</button> </li>`;
    }
  });
  list.innerHTML = listItems;
};

const addNewTodo = (event) => {
  const toDo = {
    id: Date.now(),
    text: input.value,
    isChecked: false,
  };
  toDoList.push(toDo);
  input.value = '';
  renderToDo();
  event.preventDefault();
};
const handleClick = ((event) => {
  if (event.target.type === 'checkbox') {
    const li = event.target.closest('li');

    const textElement = li.querySelector('span');

    if (event.target.checked) {
      textElement.style.textDecoration = 'line-through';
    } else {
      textElement.style.textDecoration = 'none';
    }
  }
  if (event.target.type === 'submit') {
    const idToDelete = parseInt(event.target.parentNode.dataset.id, 10);
    toDoList = toDoList.filter((todo) => todo.id !== idToDelete);
    renderToDo();
  }
});
const checkAll = (event) => {
  toDoList.forEach((todo) => {
    todo.isChecked = event.target.checked;
  });
  renderToDo();
  const textElements = document.querySelectorAll('#list-for-render span');
  textElements.forEach((textElement, index) => {
    if (toDoList[index].isChecked) {
      textElement.style.textDecoration = 'line-through';
    } else {
      textElement.style.textDecoration = 'none';
    }
  });
  /*  setTimeout(() => {
    renderToDo();
  }, 600); */
};

checkTodos.addEventListener('click', checkAll);
list.addEventListener('click', handleClick);
sendButton.addEventListener('click', addNewTodo);
