/**
 * FUNCTIONS
 */
const Store = (function () {
  const projectList = [];
  const allTodos = [];

  function getDefaultProject() {
    return projectList[0];
  }

  return { projectList, allTodos, getDefaultProject };
})();
/**
 * Description placeholder
 *
 * @type {{ createNewProject: (title: any, category: any) => { title: any; category: any; todoList: {}; addTodo(todo: any): void; }; }}
 */
const Project = (function () {
  function createNewProject(title, category) {
    let todoList = [];
    const project = {
      title,
      category,
      todoList,
      addTodo(todo) {
        this.todoList.push(todo);
      },
    };
    Store.projectList.push(project);
    return project;
  }
  return { createNewProject };
})();

/**
 * Description placeholder
 *
 * @type {{ createNewTodo: (title: any, description: any, dueDate: any, priority: any, project: any) => { title: any; description: any; dueDate: any; priority: any; isDone: boolean; projectTitle: any; }; }}
 */
const Todo = (function () {
  function createNewTodo(title, description, dueDate, priority, project) {
    const todo = {
      title,
      description,
      dueDate,
      priority,
      isDone: false,
      projectTitle: project.title,
    };
    Store.allTodos.push(todo);
    project.addTodo(todo);
    return todo;
  }
  return { createNewTodo };
})();

/**
 * Description placeholder
 *
 * @type {{ title: any; category: any; todoList: {}; addTodo(todo: any): void; }}
 */
const project1 = Project.createNewProject("Work", "Task");
/**
 * Description placeholder
 *
 * @type {{ title: any; category: any; todoList: {}; addTodo(todo: any): void; }}
 */
const project2 = Project.createNewProject("School", "Homework");
/**
 * Description placeholder
 *
 * @type {{ title: any; category: any; todoList: {}; addTodo(todo: any): void; }}
 */
const project3 = Project.createNewProject("Personal", "Chores");

/**
 * Description placeholder
 *
 * @type {{ title: any; description: any; dueDate: any; priority: any; isDone: boolean; projectTitle: any; }}
 */
const todo1 = Todo.createNewTodo(
  "Finish report",
  "Complete Q2 report for finance",
  "2025-07-15",
  "High",
  project1
);

/**
 * Description placeholder
 *
 * @type {{ title: any; description: any; dueDate: any; priority: any; isDone: boolean; projectTitle: any; }}
 */
const todo2 = Todo.createNewTodo(
  "Math Assignment",
  "Solve chapter 5 problems",
  "2025-07-20",
  "Medium",
  project2
);

/**
 * Description placeholder
 *
 * @type {{ title: any; description: any; dueDate: any; priority: any; isDone: boolean; projectTitle: any; }}
 */
const todo3 = Todo.createNewTodo(
  "Clean kitchen",
  "Deep clean the entire kitchen area",
  "2025-07-10",
  "Low",
  project3
);

/**
 * Description placeholder
 *
 * @type {{ title: any; description: any; dueDate: any; priority: any; isDone: boolean; projectTitle: any; }}
 */
const todo4 = Todo.createNewTodo(
  "Update resume",
  "Add latest job experience",
  "2025-07-18",
  "High",
  project1
);

/**
 * Description placeholder
 *
 * @type {{ title: any; description: any; dueDate: any; priority: any; isDone: boolean; projectTitle: any; }}
 */
const todo5 = Todo.createNewTodo(
  "Science project",
  "Prepare slides and script",
  "2025-07-19",
  "Medium",
  project2
);

/**
 * DOM
 */
const header = document.getElementById("header");
/**
 * Description placeholder
 *
 * @type {*}
 */
const content = document.getElementById("content");
/**
 * Description placeholder
 *
 * @type {*}
 */
const leftPanel = document.createElement("div");
/**
 * Description placeholder
 *
 * @type {*}
 */
const rightPanel = document.createElement("div");
/**
 * Description placeholder
 *
 * @type {*}
 */
let todoCardList = document.createElement("div");

todoCardList.id = "todoCardList";

function loadHeader() {
  const icon = document.createElement("h1");
  icon.innerHTML = `One Task`;
  header.appendChild(icon);
}
/**
 * Description placeholder
 *
 * @returns {*}
 */
function loadProjectList() {
  const pList = document.createElement("div");
  pList.id = "projects-list";
  const defaultDisplay = document.createElement("div");
  defaultDisplay.innerHTML = `<h3 class="project-card">Default</h3>`;
  defaultDisplay.classList.add("project-name");
  pList.appendChild(defaultDisplay);
  Store.projectList.forEach((project) => {
    // console.log(`Project name: ${project.title}`);
    const projectCard = document.createElement("div");
    projectCard.classList.add("projectCard");
    projectCard.innerHTML = `
    <h3 class='project-card'>${project.title}</h3>
    `;
    projectCard.addEventListener("click", () => {
      loadTodoList(project);
    });
    pList.appendChild(projectCard);
  });
  return pList;
}

//Load todo list of a project
/**
 * Description placeholder
 *
 * @param {*} project
 */
function loadTodoList(project) {
  console.log("project clicked");
  console.log(project);
  todoCardList.innerHTML = ``;
  project.todoList.forEach((todo) => {
    let todoCard = showTodoCard(todo);
    todoCardList.appendChild(todoCard);
  });
}
//Load todo card of a todo
/**
 * Description placeholder
 *
 * @param {*} todo
 * @returns {*}
 */
function showTodoCard(todo) {
  const todoCard = document.createElement("div");
  todoCard.classList.add("todoCard");
  todoCard.innerHTML = `
  <h3>${todo.title}</h3>
  <p>${todo.description}</p>
  `;
  return todoCard;
}

/**
 * Description placeholder
 *
 * @returns {*}
 */
function createNewProject() {
  const modal = document.createElement("dialog");
  modal.id = "newProjectModal";
  modal.classList.add("modal");

  return modal;
}

function loadContent() {
  const prList = loadProjectList();
  rightPanel.appendChild(todoCardList);
  loadDefaultTodoList();
  const actionBtn = document.createElement("div");
  leftPanel.id = "leftPanel";
  rightPanel.id = "rightPanel";
  actionBtn.id = "newProject";
  const newProjectBtn = document.createElement("button");
  newProjectBtn.innerHTML = `New Project`;
  // newProjectBtn.setAttribute("class:btn btn-newProject");
  actionBtn.appendChild(newProjectBtn);
  actionBtn.addEventListener("click", () => {
    const secondChild = actionBtn.children[1];
    console.log(secondChild);
    if (secondChild) {
      actionBtn.removeChild(secondChild);
    }
    content.appendChild(createNewProject());
  });
  leftPanel.append(prList, actionBtn);
  content.append(leftPanel, rightPanel);
}

/** Description placeholder */
function loadData() {
  loadHeader();
  loadContent();
}

window.addEventListener("load", loadData);
