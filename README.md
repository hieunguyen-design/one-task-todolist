# 📝 One Task - Simple Todo List App

A lightweight and intuitive task management app built with **JavaScript**, **HTML**, and **CSS**. Organize your tasks into projects and track your progress effortlessly!

---

👉 [Click here to view the app](https://hieunguyen-design.github.io/todo-list/)

---

## 🚀 Features

- ✅ Add, edit, and delete todos
- 🗂 Organize todos by projects
- 🎯 Mark tasks as complete
- 📅 Due date selector
- 💾 Data stored using localStorage (auto-saved)
- 📦 No frameworks, just vanilla JavaScript

---

## 🧠 Getting Started

### 1. Clone the repository

```bash
git clonehttps://github.com/hieunguyen-design/todo-list.git
cd todo-list
```

---

## 📁 File Structure

todo-list/
├── dist/
├── node_modules/
├── src/
│ ├── assets
│ │ └── Group 7.svg
│ ├── index.js
│ ├── template.html
│ └── style.css
├── eslint.config.mjs
├── package-lock.json
├── README.md
├── package.json
└── webpack.config.js

---

## 🛠️ Technologies Used

- JavaScript (ES6)
- HTML5
- CSS3

---

## 🧱 Architecture

### `Project` Module

Handles creation and storage of projects.

```js
const project1 = Project.createNewProject("Work", "Task");
```

### `Todo` Module

Handles creation and storage of todos.

```js
const todo1 = Todo.createNewTodo(
  "Finish report",
  "Complete Q2 financial report",
  "2025-07-31",
  "High",
  project1
);
```

---

## 📌 Notes

- Todos are automatically added to a default list and the selected project.

- Each todo can be accessed globally or by its associated project.

- Designed for extendability: you can add UI integration, localStorage, or filters.
