const sendButton = document.querySelector('#send-button');
const deleteButton = document.querySelector('#delete-button-all');
const inputNewTodo = document.querySelector('#input-todo-text');
const listToDos = document.querySelector('#list-for-render');
const checkTodos = document.querySelector('#check-all');
const groupButtons = document.querySelector('.group-buttons');
const KEYDOWN_ENTER = 'Enter';
const KEYDOWN_ESC = 'Escape';
let filterType = 'all-tasks';
const currentPage = 1;
const tasksOnPage = 5;
const DOUBLE_CLICK = 2;
let toDoList = [];

const sliceTodo = (array) => {
  const sliceArray = [];

  array.slice().forEach((element, index) => {
    if (index % tasksOnPage === 0) {
      sliceArray.push(array.slice(index, index + tasksOnPage));
    }
  });

  const lastSlice = array.slice(-(array.length % tasksOnPage) || array.length);
  if (lastSlice.length > 0 && lastSlice < tasksOnPage) {
    sliceArray.push(lastSlice);
  }

  return sliceArray;
};

const pagesCounter = (b) => {
  const pagesCount = Math.ceil(b.length / 5);
  return pagesCount;
};
const checkAllHandler = () => {
  checkTodos.checked = toDoList.length > 0 && toDoList.every((todo) => todo.isChecked);
};

const renderTaskCount = () => {
  const all = toDoList.length;
  const active = toDoList.filter((todo) => !todo.isChecked).length;
  const completed = toDoList.filter((todo) => todo.isChecked).length;
  const list = [all, active, completed];
  return list;
};
const renderTasksButton = () => {
  const all = renderTaskCount();
  groupButtons.children[0].innerText = `All (${all[0]})`;
  groupButtons.children[1].innerText = `Active (${all[1]})`;
  groupButtons.children[2].innerText = `Completed (${all[2]})`;
};
const tabButtonList = () => {
  let filterTodo = [];
  if (filterType === 'all-active-tasks') {
    filterTodo = toDoList.filter((todo) => !todo.isChecked);
    return filterTodo;
  }
  if (filterType === 'all-completed-tasks') {
    filterTodo = toDoList.filter((todo) => todo.isChecked);
    return filterTodo;
  }
  return toDoList;
};
const renderToDo = () => {
  const tabTodo = tabButtonList();
  let listItems = '';
  tabTodo.forEach((todo) => {
    listItems
      += `<li id="todo-list-item" data-id=${todo.id}> 
      <div id="todo-text">
      <input type="checkbox"${todo.isChecked ? 'checked' : ''}/>
      <input class = "edit-input" hidden value="${todo.text}"/>
      <span>${todo.text}</span>
      </div>
      <button>X</button> 
      </li>`;
  });
  renderTasksButton();
  checkAllHandler();
  listToDos.innerHTML = listItems;
  const b = sliceTodo(tabTodo);
  console.log(b);
  // const a = pagesCounter(tabTodo);
  // console.log(a);
};
const showCounterType = (event) => {
  filterType = event.target.id;
  renderToDo();
};

const addNewTodo = (event) => {
  if (inputNewTodo.value !== '') {
    const toDo = {
      id: Date.now(),
      text: inputNewTodo.value,
      isChecked: false,
    };
    toDoList.push(toDo);
    inputNewTodo.value = '';
    renderToDo();
    event.preventDefault();
  }
};

const saveDefaultTextOfTask = (event) => {
  const id = Number(event.target.parentElement.previousSibling.parentNode.dataset.id);
  toDoList.forEach((todo) => {
    if (todo.id === id && event.target.value) {
      todo.text = event.target.value;
    }
  });
};
const editTaskByBlur = (event) => {
  if (event.sourceCapabilities) {
    saveDefaultTextOfTask(event);
    renderToDo();
  }
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
    const idToDelete = Number(event.target.parentNode.dataset.id);
    toDoList = toDoList.filter((todo) => todo.id !== idToDelete);
    renderToDo();
  }
  if (event.target.type === 'checkbox') {
    const idToCheck = Number(event.target.parentElement.previousSibling.parentNode.dataset.id);
    toDoList.forEach((todo) => {
      if (todo.id === idToCheck) {
        todo.isChecked = event.target.checked;
      }
    });
    renderToDo();
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
checkTodos.addEventListener('click', checkAll);
listToDos.addEventListener('click', handleClick);
listToDos.addEventListener('keydown', editTaskByKeyDown);
listToDos.addEventListener('blur', editTaskByBlur, true);
groupButtons.addEventListener('click', showCounterType);
sendButton.addEventListener('click', addNewTodo);
deleteButton.addEventListener('click', deleteChecked);
