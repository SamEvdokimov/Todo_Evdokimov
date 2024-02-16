const sendButton = document.querySelector('#send-button');
const input = document.querySelector('#input');
const list = document.querySelector('#list-for-render');
const toDoList = [];

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
  if (event.target.type === 'button') console.log('button');
}
);

list.addEventListener('click', handleClick);
sendButton.addEventListener('click', addNewTodo);
