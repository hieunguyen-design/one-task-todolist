/**
 * IMPORTS
 */
import "./styles.css";
import { compareAsc, parseISO } from "date-fns";
import logo from "./assets/Group 7.png";
/**
 * FUNCTIONS
 */
const Store = (function () {
  const projectList = [];
  const allTodos = [];
  const completeList = [];

  return { projectList, allTodos, completeList };
})();
const Project = (function () {
  function createNewProject(title, category) {
    let todoList = [];
    const project = {
      title,
      category,
      // color,
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

const Todo = (function () {
  function createNewTodo(title, description, dueDate, priority, project) {
    const todo = {
      title,
      description,
      dueDate,
      priority,
      isDone: false,
      projectTitle: project.title,
      setDone() {
        this.isDone = true;
        Store.completeList.push(this);
        const index = Store.allTodos.indexOf(this);
        if (index !== -1) {
          Store.allTodos.splice(index, 1);
        }
      },
      delete() {
        const storeIndex = Store.allTodos.indexOf(this);
        if (storeIndex !== -1) {
          Store.allTodos.splice(storeIndex, 1);
        }
        const projectIndex = project.todoList.indexOf(this);
        if (projectIndex !== -1) {
          project.todoList.splice(projectIndex, 1);
        }
        const completedIndex = Store.completeList.indexOf(this);
        if (completedIndex !== -1) {
          Store.completeList.splice(completedIndex, 1);
        }
      },
    };
    Store.allTodos.push(todo);
    project.addTodo(todo);
    return todo;
  }
  return { createNewTodo };
})();

/**
 * DOM
 */

window.addEventListener("load", loadContent);
const header = document.getElementById("header");
const content = document.getElementById("content");
const leftPanel = document.createElement("div");
const rightPanel = document.createElement("div");
leftPanel.id = "left-panel";
rightPanel.id = "right-panel";

function loadContent() {
  loadHeader();
  loadFromLocalStorage();
  initializeDefaultsIfEmpty();
  loadData();
}
function loadHeader() {
  const icon = document.createElement("img");

  icon.src = logo;
  header.appendChild(icon);
}
function loadData() {
  content.innerHTML = "";
  leftPanel.innerHTML = "";
  rightPanel.innerHTML = "";
  content.append(leftPanel, rightPanel);
  leftPanel.appendChild(displayProjectList());
  createNewProject();
  createNewTodo();
}
function displayProjectList() {
  const projectList = Store.projectList;
  //DOM
  let projectListForDisplay = document.createElement("div");
  let defaultDisplay = document.createElement("h2");
  defaultDisplay.classList.add("project-card");
  defaultDisplay.textContent = "Default";
  defaultDisplay.classList.add("current-project");

  //default list showed initially
  displayTodoList(Store.allTodos.concat(Store.completeList));
  // console.log(Store.allTodos);
  //onclick
  defaultDisplay.addEventListener("click", () => {
    //show all todos
    let currentProject = document.querySelector(".current-project");
    if (currentProject) {
      currentProject.classList.remove("current-project");
    }
    defaultDisplay.classList.add("current-project");
    //show todo list and completed list
    displayTodoList(Store.allTodos.concat(Store.completeList));
    // displayTodoList(Store.allTodos, "Pending Tasks");
    // displayTodoList(Store.completeList, "Completed Tasks");
  });
  leftPanel.appendChild(projectListForDisplay);
  projectListForDisplay.appendChild(defaultDisplay);
  projectListForDisplay.id = "projects-list";

  projectList.forEach((project) => {
    let projectTitle = document.createElement("h2");
    projectTitle.textContent = project.title;
    projectTitle.classList.add("project-card");
    projectListForDisplay.appendChild(projectTitle);
    //onclick
    projectTitle.addEventListener("click", () => {
      // console.log(project.todoList);
      displayTodoList(project.todoList);
      let currentProject = document.querySelector(".current-project");
      if (currentProject) {
        currentProject.classList.remove("current-project");
      }
      projectTitle.classList.add("current-project");
    });
  });
  return projectListForDisplay;
}
44;

function displayTodoList(todoList) {
  rightPanel.innerHTML = ``;

  todoList.forEach((todo) => {
    let todoCard = document.createElement("div");
    let todoHeader = document.createElement("div");
    let todoSymbol = document.createElement("div");
    let todoTitle = document.createElement("h2");
    let todoMinMax = document.createElement("button");
    let todoInfor = document.createElement("div");
    let todoDesciption = document.createElement("div");
    let todoDuedate = document.createElement("div");
    // let todoIsDone = document.createElement("div");
    let todoMakeDone = document.createElement("button");
    let todoEdit = document.createElement("button");
    let todoDelete = document.createElement("button");
    /**
     * card
     *    todoHeader
     *      symbol
     *      title
     *      minmax
     *    todoinfor
     *      desciption
     *      duedate
     *      MakeDone
     */

    todoTitle.innerHTML = `${todo.title}`;
    todoDesciption.textContent = todo.description;
    todoDuedate.textContent = todo.dueDate;
    todoSymbol = setSymbol(todo);

    todoCard.classList.add("todo-card");
    todoMinMax.classList.add("todo-min-max");
    todoInfor.classList.add("todo-infor");
    todoMakeDone.classList.add("todo-make-done");
    todoHeader.classList.add("todo-header");
    todoDesciption.classList.add("todo-description");
    todoEdit.classList.add("todo-edit");
    todoDelete.classList.add("todo-delete");

    todoCard.append(todoHeader, todoDesciption, todoInfor);
    todoHeader.append(todoSymbol, todoTitle, todoEdit, todoMinMax, todoDelete);

    if (!todo.isDone) todoInfor.append(todoDuedate, todoMakeDone);
    else todoInfor.appendChild(todoDuedate);
    todoMakeDone.addEventListener("click", () => {
      todo.setDone();
      saveToLocalStorage();
      loadData();
    });
    todoMinMax.innerHTML = `<span class="material-symbols-outlined">
    collapse_content    </span>`;
    todoMinMax.addEventListener("click", (e) => {
      todoCard.classList.toggle("collapsed");
      const icon = todoMinMax.querySelector("span");
      icon.textContent = todoCard.classList.contains("collapsed")
        ? "expand_content"
        : "collapse_content";
    });
    todoDelete.innerHTML = `<span class="material-symbols-outlined">
    delete    </span>`;
    todoDelete.addEventListener("click", () => {
      todo.delete();
      loadData();
    });
    todoEdit.innerHTML = `<span class="material-symbols-outlined">
    edit  </span>`;
    todoEdit.addEventListener("click", () => {
      //change icon
      makeTodoEditable(todo, todoCard, todoTitle, todoDesciption, todoDuedate);
    });
    rightPanel.appendChild(todoCard);
  });
}

function setSymbol(todo) {
  let symbol = document.createElement("div");
  if (todo.isDone) {
    // return "✅";
    symbol.textContent = `✔︎`;
    symbol.classList.add("todo-done");
  } else {
    switch (todo.priority) {
      case "High":
        // return "🔴";
        symbol.textContent = `!!!`;
        symbol.classList.add("todo-high");
        break;
      case "Medium":
        // return "🟠";
        symbol.textContent = `!!`;
        symbol.classList.add("todo-medium");
        break;
      case "Low":
        // return "🟡";
        symbol.textContent = `!`;
        symbol.classList.add("todo-low");
        break;
      default:
        return "";
    }
  }
  return symbol;
}

// New Project
function createNewProject() {
  let createBtn = document.createElement("button");
  createBtn.id = "project-btn";
  createBtn.textContent = "+ Add Project";
  leftPanel.appendChild(createBtn);
  createBtn.addEventListener("click", () => {
    //display project modal
    let projectModal = document.createElement("dialog");
    projectModal.id = "project-modal";
    projectModal.innerHTML = `
    <form method="dialog">
        <h2>Create New Project</h2>
        <label for="title">Project Title:</label>
        <input type="text" id="title" name="title" required />

        <label for="category">Category:</label>
        <input type="text" id="category" name="category" required />

        <button type="submit">Save Changes</button>
        <button
          type="button"
          onclick="document.getElementById('project-modal').close()"
          "
        >
          Cancel
        </button>
      </form>
      `;
    document.body.appendChild(projectModal);
    projectModal.showModal();
    projectModal.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();
      const title = projectModal.querySelector("#title").value;
      const category = projectModal.querySelector("#category").value;
      Project.createNewProject(title, category);
      saveToLocalStorage();
      projectModal.close();
      projectModal.remove();
      loadData(); // Re-render
    });
  });
}

// todo1.setDone();
// console.log(Store.completeList);
function createNewTodo() {
  let createBtn = document.body
    .querySelector("#header")
    .querySelector("#todo-btn");
  if (createBtn) {
    // console.log(createBtn);
    document.body.querySelector("#header").removeChild(createBtn);
  }
  createBtn = document.createElement("div");
  createBtn.id = "todo-btn";
  createBtn.innerHTML = `
  <button><h2>+</h2></button>
  <p>Add New Todo</hp>
  `;
  document.querySelector("#header").appendChild(createBtn);
  createBtn.addEventListener("click", () => {
    let todoModal = document.createElement("dialog");
    todoModal.id = "todo-modal";
    todoModal.innerHTML = `
    <form method="dialog">
        <h2>Create Todo</h2>
        <label for="title">Title:</label>
        <input type="text" id="title" name="title" required />

        <label for="desciption">Description</label>
        <input type="text" id="description" name="desciption" required />

        <label for="dueDate">Due Date:</label>
        <input type="date" id="dueDate" name="dueDate" required />

        <label for="project">Select Project:</label>
        <select id="project" name="project" required>
        <!-- Project options will go here -->
        </select>

        <label for="priority">Priority:</label>
        <select id="priority" name="priority" required>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
    
        <button type="submit">Save Changes</button>
        <button
          type="button"
          onclick="document.getElementById('todo-modal').close()"
        >
          Cancel
        </button>
      </form>
    `;
    const projectSelect = todoModal.querySelector("#project");
    Store.projectList.forEach((project) => {
      const option = document.createElement("option");
      option.value = project.title;
      option.textContent = project.title;
      projectSelect.appendChild(option);
    });

    document.body.appendChild(todoModal);
    todoModal.showModal();
    todoModal.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();
      console.log(todoModal.querySelector("#title").value);
      console.log(todoModal.querySelector("#description").value);
      console.log(todoModal.querySelector("#dueDate").value);
      console.log(todoModal.querySelector("#project"));
      console.log(todoModal.querySelector("#priority").value);

      const title = todoModal.querySelector("#title").value;
      const description = todoModal.querySelector("#description").value;
      const dueDate = todoModal.querySelector("#dueDate").value;
      const projectTitle = todoModal.querySelector("#project").value;
      const priority = todoModal.querySelector("#priority").value;
      const project = Store.projectList.find((p) => p.title === projectTitle);
      if (project) {
        Todo.createNewTodo(title, description, dueDate, priority, project);
        saveToLocalStorage();
      }
      todoModal.close();
      todoModal.remove();
      loadData();
    });
  });
}
//Local Storage
function saveToLocalStorage() {
  const data = {
    projects: Store.projectList,
    todos: Store.allTodos,
    completed: Store.completeList,
  };
  localStorage.setItem("todoAppData", JSON.stringify(data));
}
function loadFromLocalStorage() {
  const saved = localStorage.getItem("todoAppData");
  if (!saved) return;

  const parsed = JSON.parse(saved);
  Store.projectList.length = 0;
  Store.allTodos.length = 0;
  Store.completeList.length = 0;

  parsed.projects.forEach((p) => {
    const project = Project.createNewProject(p.title, p.category);
  });

  parsed.todos.forEach((t) => {
    const project = Store.projectList.find((p) => p.title === t.projectTitle);
    if (project) {
      Todo.createNewTodo(
        t.title,
        t.description,
        t.dueDate,
        t.priority,
        project
      );
    }
  });

  parsed.completed.forEach((t) => {
    const project = Store.projectList.find((p) => p.title === t.projectTitle);
    if (project) {
      const todo = Todo.createNewTodo(
        t.title,
        t.description,
        t.dueDate,
        t.priority,
        project
      );
      todo.setDone();
    }
  });
}
function initializeDefaultsIfEmpty() {
  if (
    Store.projectList.length === 0 &&
    Store.allTodos.length === 0 &&
    Store.completeList.length === 0
  ) {
    // 🧠 Project 1: Getting Started
    const gettingStarted = Project.createNewProject("Getting Started", "Guide");
    Todo.createNewTodo(
      "Welcome to One Task!",
      "This is your personal task manager. Let's explore it together!",
      new Date().toISOString().split("T")[0],
      "Low",
      gettingStarted
    );
    Todo.createNewTodo(
      "Create your first project",
      "Click '+ Add Project' on the left to start organizing tasks.",
      new Date().toISOString().split("T")[0],
      "Medium",
      gettingStarted
    );

    // 🛠 Project 2: Personal
    const personal = Project.createNewProject("Personal", "Daily Life");
    Todo.createNewTodo(
      "Water the plants",
      "Keep your greens happy 🌿",
      "2025-07-20",
      "Low",
      personal
    );

    // 🏫 Project 3: School
    const school = Project.createNewProject("School", "Study Plan");
    Todo.createNewTodo(
      "Finish reading chapter 3",
      "For your upcoming quiz on Monday.",
      "2025-07-21",
      "High",
      school
    );

    // ✅ Optional completed item to show functionality
    const work = Project.createNewProject("Work", "Career");
    const doneTask = Todo.createNewTodo(
      "Set up your task manager",
      "You're doing great so far!",
      "2025-07-15",
      "Medium",
      work
    );
    doneTask.setDone();

    saveToLocalStorage(); // Save defaults
  }
}
function makeTodoEditable(
  todo,
  todoCard,
  todoTitle,
  todoDesciption,
  todoDuedate
) {
  // Replace title with input
  const titleInput = document.createElement("input");
  titleInput.value = todo.title;
  titleInput.classList.add("todo-inline-edit");

  // Replace description with input
  const descInput = document.createElement("input");
  descInput.value = todo.description;
  descInput.classList.add("todo-inline-edit");
  descInput.classList.add("todo-des");

  // Replace dueDate with input
  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.value = todo.dueDate;
  dateInput.classList.add("todo-inline-edit");

  // Replace existing elements
  todoTitle.replaceWith(titleInput);
  todoDesciption.replaceWith(descInput);
  todoDuedate.replaceWith(dateInput);

  // Get the todo-header container
  const todoHeader = todoCard.querySelector(".todo-header");

  // Find and remove the edit button
  const editBtn = todoHeader.querySelector(".todo-edit");
  if (editBtn) editBtn.remove();

  // Create a Save button
  const saveBtn = document.createElement("button");
  saveBtn.innerHTML = `<span class="material-symbols-outlined">
  save
  </span>`;
  saveBtn.classList.add("todo-save");

  // Insert save button where edit button was
  todoHeader.insertBefore(saveBtn, todoHeader.querySelector(".todo-min-max"));

  saveBtn.addEventListener("click", () => {
    // Save updated values back to todo object
    todo.title = titleInput.value;
    todo.description = descInput.value;
    todo.dueDate = dateInput.value;

    saveToLocalStorage();
    // Recreate static display elements
    const newTitle = document.createElement("h2");
    newTitle.textContent = todo.title;

    const newDesc = document.createElement("div");
    newDesc.classList.add("todo-description");
    newDesc.textContent = todo.description;

    const newDate = document.createElement("div");
    newDate.textContent = todo.dueDate;

    // Replace inputs with display elements
    titleInput.replaceWith(newTitle);
    descInput.replaceWith(newDesc);
    dateInput.replaceWith(newDate);

    // Recreate Edit button
    const newEditBtn = document.createElement("button");
    newEditBtn.classList.add("todo-edit");
    newEditBtn.textContent = "✏️";

    newEditBtn.addEventListener("click", () => {
      makeTodoEditable(todo, todoCard, newTitle, newDesc, newDate);
    });

    // Replace Save with new Edit
    todoHeader.replaceChild(newEditBtn, saveBtn);
    loadData(); // Re-render
  });
}
