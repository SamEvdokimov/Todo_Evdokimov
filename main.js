const sendButton = document.querySelector('#send-button');
const input = document.querySelector('#input');
const list = document.querySelector('#list-for-render');
const toDoList = [];

const addNewTodo = (event) => {
  const toDo = {
    id: Date.now(),
    text: input.value,
    isChecked: false,
  };
  toDoList.push(toDo);
  input.value = '';
  let listItems = '';
  toDoList.forEach((todo) => {
    if (todo.text !== '') {
      listItems += `<li> <input type="checkbox"${todo.isChecked ? 'checked' : ''}/><span>${todo.text}</span> <button>Удалить</button> </li>`;
    }
  });
  list.innerHTML = listItems;
  event.preventDefault();
};

sendButton.addEventListener('click', addNewTodo);

/* searchField.addEventListener('keypress', function (e) {
var key = e.which || e.keyCode;
if (key === 13) { // код клавиши Enter
sendButton.click();
}
}); */
