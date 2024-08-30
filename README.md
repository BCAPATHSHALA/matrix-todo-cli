# MATRIX TODOS CLI (NPM PACKAGE)

`matrix-todos-cli` is a command-line interface tool for managing your to-do list efficiently. With this package, you can easily add, edit, delete, and view to-do items, as well as filter them based on various criteria.

<p align="center">
  <img src="https://res.cloudinary.com/dq3pru6ji/image/upload/v1725024488/OWN%20IMAGES/MATRIX-TODOS-CLI-TOOL_ybhmlx.png" alt="MATRIX-TODOS-CLI-TOOL">
</p>

## Features

- **Add a New ToDo**: Add a new to-do item with details such as importance, urgency, status, and deadline.
- **Edit an Existing ToDo**: Modify the details of an existing to-do item.
- **Delete a ToDo**: Remove a to-do item based on different filter criteria.
- **View All ToDos**: Display all to-do items with filtering options.
- **Filter ToDos**: Filter to-do items by status, deadline, task content, importance, and urgency.
- **Beautiful Console Output**: View your to-do list in a well-formatted table.

## Installation

To use `matrix-todo-cli`, you need to install it via npm:

```bash
npm install matrix-todos-cli
```

## Usage

In your main file (e.g., `index.js`), you can use the package as follows:

```js
import { showMenu, initFile } from "matrix-todos-cli";

// Initialize the file
initFile();

// Show the main menu
showMenu();
```

## Menu Options

When you run the CLI, you will see a menu with the following options:

1. `Add ToDo:` Adds a new to-do item.
2. `Edit ToDo:` Edits an existing to-do item.
3. `Delete ToDo:` Deletes a to-do item.
4. `View ToDos:` Views all to-do items.
5. `Exit:` Exits the application.

## Filtering ToDos

When deleting or viewing to-dos, you can filter by:

1. `All:` View or delete all to-do items.
2. `Status:` Filter by status (Completed, Ongoing, Plan).
3. `Deadline:` Filter by deadline (e.g., 1Hr, 1Day, 1Month).
4. `Todo:` Filter by task content.

## Social Media

Connect with me on social media:
[GitHub](https://github.com/BCAPATHSHALA)
[LinkedIn](https://www.linkedin.com/in/manojoffcialmj/)
[Twitter](https://twitter.com/manojofficialmj)

Feel free to reach out if you have any questions or suggestions!

## Video

[![YouTube Video](https://img.youtube.com/vi/bOPKJykezAg/0.jpg)](https://www.youtube.com/watch?v=bOPKJykezAg)