const sendButton = document.querySelector('#send-button');
const input = document.querySelector('#input');
const toDos = [];

const addNewTodo = (event) => {
  const toDo = {
    id: Date.now(),
    text: input.value,
    isChecked: false,
  };
  toDos.push(toDo);

  toDos.forEach(function(task) {
    console.log(task);
  });

  event.preventDefault();
};
sendButton.addEventListener('click', addNewTodo);
