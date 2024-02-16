const sendButton = document.querySelector('#send-button');
const input = document.querySelector('#input');
const list = document.querySelector('#list-for-render');
const toDoList = [];

const renderToDo = () => {
  let listItems = '';
  toDoList.forEach((todo) => {
    if (todo.text !== '') {
      listItems += `<li> <input type="checkbox"${todo.isChecked ? 'checked' : ''}/><span>${todo.text}</span> <button>Удалить</button> </li>`;
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
  console.log(event);
}
);

list.addEventListener('click', handleClick);
sendButton.addEventListener('click', addNewTodo);
