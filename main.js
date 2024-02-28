(() => {
  const KEYDOWN_ENTER = 'Enter';
  const KEYDOWN_ESC = 'Escape';
  const TASKS_ON_PAGE = 5;
  const DOUBLE_CLICK = 2;

  const sendButton = document.querySelector('#send-button');
  const deleteButton = document.querySelector('#delete-button-all');
  const inputNewTodo = document.querySelector('#input-todo-text');
  const listToDos = document.querySelector('#list-for-render');
  const checkTodos = document.querySelector('#check-all');
  const groupButtons = document.querySelector('.group-buttons');
  const paginationPages = document.querySelector('.render-pagination');

  let currentPage = 1;
  let filterType = 'all-tasks';
  let toDoList = [];

  const sliceTodo = (sliceTabTodo) => {
    const end = currentPage * TASKS_ON_PAGE;
    const start = end - TASKS_ON_PAGE;
    return sliceTabTodo.slice(start, end);
  };

  const countPages = (countTabTodo) => {
    let paginationButtons = '';
    const pagesCount = Math.ceil(countTabTodo.length / TASKS_ON_PAGE);
    for (let i = 1; i <= pagesCount; i += 1) {
      paginationButtons += `<button ${i === currentPage ? 'class = "active"' : ''}>${i}</button>`;
    }
    paginationPages.innerHTML = paginationButtons;
  };

  const checkAllHandler = () => {
    checkTodos.checked = toDoList.length > 0 && toDoList.every((todo) => todo.isChecked);
  };

  const renderTodoCount = () => {
    const all = toDoList.length;
    const active = toDoList.filter((todo) => !todo.isChecked).length;
    const completed = toDoList.filter((todo) => todo.isChecked).length;
    const list = [all, active, completed];
    return list;
  };
  const renderTodoButton = () => {
    const all = renderTodoCount();
    groupButtons.children[0].textContent = `All (${all[0]})`;
    groupButtons.children[1].textContent = `Active (${all[1]})`;
    groupButtons.children[2].textContent = `Completed (${all[2]})`;
  };
  const tabButtonListFilter = () => {
    if (filterType === 'all-active-tasks') {
      return toDoList.filter((todo) => !todo.isChecked);
    }
    if (filterType === 'all-completed-tasks') {
      return toDoList.filter((todo) => todo.isChecked);
    }
    return toDoList;
  };

  const showActiveTab = () => {
    groupButtons.children[0].classList.remove('active');
    groupButtons.children[1].classList.remove('active');
    groupButtons.children[2].classList.remove('active');
    if (filterType === 'all-tasks') {
      groupButtons.children[0].classList.add('active');
    }
    if (filterType === 'all-active-tasks') {
      groupButtons.children[1].classList.add('active');
    }
    if (filterType === 'all-completed-tasks') {
      groupButtons.children[2].classList.add('active');
    }
  };
  const renderToDo = () => {
    const filteredTodo = tabButtonListFilter();
    let listItems = '';
    const currentTodo = sliceTodo(filteredTodo);
    currentTodo.forEach((todo) => {
      listItems += `
      <li id="todo-list-item" data-id=${todo.id}>
        <div id="todo-text">
        <input type="checkbox"${todo.isChecked ? 'checked' : ''}/>
        <input class="edit-input" hidden value="${todo.text}"/>
        <span>${todo.text}</span>
        </div>
        <button>X</button> 
      </li>
      `;
    });
    countPages(filteredTodo);
    renderTodoButton();
    checkAllHandler();
    showActiveTab();
    listToDos.innerHTML = listItems;
  };
  const returnPreviousPage = () => {
    const newTodolist = tabButtonListFilter();
    const allPages = Math.ceil(newTodolist.length / TASKS_ON_PAGE);
    if (currentPage > allPages) {
      currentPage = allPages;
    }
  };
  const showCounterType = (event) => {
    filterType = event.target.id;
    currentPage = 1;
    returnPreviousPage();
    renderToDo();
  };

  const clickPaginationButton = (event) => {
    currentPage = Number(event.target.innerText);
    event.target.classList.add('active');
    renderToDo();
  };

  const validation = (inputValue, previousText) => {
    inputValue = inputValue.trim().replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, ' ').replace(/[^\w\s\u0400-\u04FF]/gi, '');
    if (inputValue !== '') {
      return inputValue;
    }
    return previousText;
  };
  const addNewTodo = () => {
    const textTOdo = inputNewTodo.value;
    const sanitizedTodoText = validation(textTOdo, '');
    if (sanitizedTodoText !== '') {
      const toDo = {
        id: Date.now(),
        text: sanitizedTodoText,
        isChecked: false,
      };
      toDoList.push(toDo);
      inputNewTodo.value = '';
      filterType = 'all-tasks';
      currentPage = Math.ceil(toDoList.length / TASKS_ON_PAGE);
      renderToDo();
    }
  };

  const saveDefaultTextOfTask = (event) => {
    const id = Number(event.target.parentElement.previousSibling.parentNode.dataset.id);
    toDoList.forEach((todo) => {
      if (todo.id === id && event.target.value) {
        todo.text = validation(event.target.value, todo.text);
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
      returnPreviousPage();
      renderToDo();
    }
    if (event.target.type === 'checkbox') {
      const idToCheck = Number(event.target.parentElement.previousSibling.parentNode.dataset.id);
      toDoList.forEach((todo) => {
        if (todo.id === idToCheck) {
          todo.isChecked = event.target.checked;
        }
      });
      returnPreviousPage();
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
    filterType = 'all-tasks';
    returnPreviousPage();
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
  paginationPages.addEventListener('click', clickPaginationButton);
})();
