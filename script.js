const projectList = [];
const todoList = [];

const Project = (function () {
  let todoList = [];
  function createNewProject(title, category) {
    const project = {
      title,
      category,
      todoList,
      addToProjectList() {
        projectList.push(this);
      },
    };
    project.addToProjectList();
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
      project,
      addtToTodoList() {
        todoList.push(this);
      },
    };
    todo.addtToTodoList();
    return todo;
  }
  return { createNewTodo };
})();

const project1 = Project.createNewProject("Study", "school");
console.log(project1);
console.log(projectList.length);

const todo1 = Todo.createNewTodo(
  "New to do",
  "this is a new thing to do",
  "Today",
  "high",
  projectList[0]
);
console.log(todo1);
