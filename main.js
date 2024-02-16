const sendButton = document.querySelector('#send-button');
const input = document.querySelector('#input');
const list = document.querySelector('#list-for-render');

console.log(list.innerHTML);
const toDoList = [];

const addNewTodo = (event) => {
  const toDo = {
    id: Date.now(),
    text: input.value,
    isChecked: false,
  };
  toDoList.push(toDo);

  toDoList.forEach((task) => {
    console.log(task);
  });

  event.preventDefault();
};
sendButton.addEventListener('click', addNewTodo);

/*
document.addEventListener('click', (e) => console.log(e));
*/
