import fs from "fs";
import inquirer from "inquirer";
import chalk from "chalk";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "todos.json");

const initFile = () => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
};

const loadTodos = () => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

const saveTodos = (todos) => {
  fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
};

// Return human readable date and time
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

// Show all available cli operations
const showMenu = () => {
  console.log(chalk.green.bold("\nToDo List CLI Cohort 3.0\n"));
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: chalk.yellow("What task would you like to do?"),
        choices: [
          chalk.green("Add ToDo"),
          chalk.cyan("Edit ToDo"),
          chalk.red("Delete ToDo"),
          chalk.blue("View ToDos"),
          chalk.gray("Exit"),
        ],
      },
    ])
    .then((answers) => {
      const action = answers.action.replace(/\x1B\[\d+m/g, "");
      switch (action) {
        case "Add ToDo":
          addTodo();
          break;
        case "Edit ToDo":
          editTodo();
          break;
        case "Delete ToDo":
          deleteTodo();
          break;
        case "View ToDos":
          viewTodos();
          break;
        case "Exit":
          console.log(chalk.gray("Goodbye!"));
          process.exit();
      }
    });
};

// Add a new todo
const addTodo = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "todo",
        message: chalk.gray("Enter the new ToDo:"),
      },
      {
        type: "list",
        name: "isImportant",
        message: chalk.gray("Set the new Todo is important:"),
        choices: ["Yes", "No"],
      },
      {
        type: "list",
        name: "isUrgent",
        message: chalk.gray("Set the new Todo is urgent:"),
        choices: ["Yes", "No"],
      },
      {
        type: "list",
        name: "status",
        message: chalk.gray("Set the new Todo status:"),
        choices: ["Completed", "Ongoing", "Plan"],
      },
      {
        type: "list",
        name: "deadline",
        message: chalk.gray("Set the new Todo deadline time:"),
        choices: [
          "1Hr",
          "2Hrs",
          "3Hrs",
          "1Day",
          "2Days",
          "3Days",
          "1Week",
          "2Weeks",
          "1Month",
          "2Months",
          "3Months",
          "1Year",
          "2Years",
          "3Years",
        ],
      },
    ])
    .then((answer) => {
      const todos = loadTodos();
      todos.push({
        task: answer.todo,
        isImportant: answer.isImportant,
        isUrgent: answer.isUrgent,
        status: answer.status,
        deadline: answer.deadline,
        createdAt: Date.now(),
      });
      saveTodos(todos);
      console.log(chalk.green("ToDo added!"));
      showMenu();
    });
};

// Edit an existing todo
const editTodo = () => {
  const todos = loadTodos();
  if (todos.length === 0) {
    console.log(chalk.red("No ToDos available."));
    showMenu();
    return;
  }

  // Map todos to choices for inquirer prompt
  const choices = todos.map((todo, index) => ({
    name: chalk.cyan(todo.task),
    value: index,
  }));

  // Prompt the user to select a ToDo to edit
  inquirer
    .prompt([
      {
        type: "list",
        name: "todoIndex",
        message: chalk.yellow("Select a ToDo to edit:"),
        choices,
      },
    ])
    .then((answer) => {
      const todoIndex = answer.todoIndex;
      const todo = todos[todoIndex];

      // Prompt the user to choose what to update
      inquirer
        .prompt([
          {
            type: "list",
            name: "updateType",
            message: chalk.yellow("What would you like to update?"),
            choices: ["Task", "Status", "Deadline", "IsImportant", "IsUrgent"],
          },
        ])
        .then((updateAnswer) => {
          const updateType = updateAnswer.updateType;

          // Switch case to handle the update based on user's choice
          switch (updateType) {
            case "Task":
              inquirer
                .prompt([
                  {
                    type: "input",
                    name: "updatedTask",
                    message: chalk.yellow("Enter the new task content:"),
                  },
                ])
                .then((taskAnswer) => {
                  todo.task = taskAnswer.updatedTask;
                  saveTodos(todos);
                  console.log(chalk.green("ToDo updated!"));
                  showMenu();
                });
              break;

            case "Status":
              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "status",
                    message: chalk.yellow("Select a new status:"),
                    choices: ["Completed", "Ongoing", "Plan"],
                  },
                ])
                .then((statusAnswer) => {
                  todo.status = statusAnswer.status;
                  saveTodos(todos);
                  console.log(chalk.green("ToDo updated!"));
                  showMenu();
                });
              break;

            case "Deadline":
              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "deadline",
                    message: chalk.yellow("Select a new deadline:"),
                    choices: [
                      "1Hr",
                      "2Hrs",
                      "3Hrs",
                      "1Day",
                      "2Days",
                      "3Days",
                      "1Week",
                      "2Weeks",
                      "1Month",
                      "2Months",
                      "3Months",
                      "1Year",
                      "2Years",
                      "3Years",
                    ],
                  },
                ])
                .then((deadlineAnswer) => {
                  todo.deadline = deadlineAnswer.deadline;
                  saveTodos(todos);
                  console.log(chalk.green("ToDo updated!"));
                  showMenu();
                });
              break;

            case "IsImportant":
              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "isImportant",
                    message: chalk.yellow("Is this ToDo important?"),
                    choices: ["Yes", "No"],
                  },
                ])
                .then((importantAnswer) => {
                  todo.isImportant = importantAnswer.isImportant === "Yes";
                  saveTodos(todos);
                  console.log(chalk.green("ToDo updated!"));
                  showMenu();
                });
              break;

            case "IsUrgent":
              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "isUrgent",
                    message: chalk.yellow("Is this ToDo urgent?"),
                    choices: ["Yes", "No"],
                  },
                ])
                .then((urgentAnswer) => {
                  todo.isUrgent = urgentAnswer.isUrgent === "Yes";
                  saveTodos(todos);
                  console.log(chalk.green("ToDo updated!"));
                  showMenu();
                });
              break;

            default:
              console.log(chalk.red("Invalid choice!"));
              showMenu();
              break;
          }
        });
    });
};

// Delete a todo
const deleteTodo = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "filterType",
        message: chalk.yellow("How would you like to filter ToDos?"),
        choices: ["All", "Status", "Deadline", "Todo"],
      },
    ])
    .then((answer) => {
      const filterType = answer.filterType;
      let todos = loadTodos();
      let filteredTodos = [];
      let choices = [];

      const filterTodos = () => {
        return new Promise((resolve) => {
          switch (filterType) {
            case "All":
              filteredTodos = todos;
              resolve();
              break;
            case "Status":
              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "status",
                    message: chalk.yellow("Select a status:"),
                    choices: ["Completed", "Ongoing", "Plan"],
                  },
                ])
                .then((statusAnswer) => {
                  const status = statusAnswer.status;
                  filteredTodos = todos.filter(
                    (todo) => todo.status === status
                  );
                  resolve();
                });
              break;
            case "Deadline":
              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "deadline",
                    message: chalk.yellow("Select a deadline:"),
                    choices: [
                      "1Hr",
                      "2Hrs",
                      "3Hrs",
                      "1Day",
                      "2Days",
                      "3Days",
                      "1Week",
                      "2Weeks",
                      "1Month",
                      "2Months",
                      "3Months",
                      "1Year",
                      "2Years",
                      "3Years",
                    ],
                  },
                ])
                .then((deadlineAnswer) => {
                  const deadline = deadlineAnswer.deadline;
                  filteredTodos = todos.filter(
                    (todo) => todo.deadline === deadline
                  );
                  resolve();
                });
              break;
            case "Todo":
              inquirer
                .prompt([
                  {
                    type: "input",
                    name: "todo",
                    message: chalk.yellow("Enter a todo task:"),
                  },
                ])
                .then((todoAnswer) => {
                  const todo = todoAnswer.todo;
                  filteredTodos = todos.filter((todoItem) =>
                    todoItem.task.includes(todo)
                  );
                  resolve();
                });
              break;
            default:
              resolve();
              break;
          }
        });
      };

      filterTodos().then(() => {
        if (filteredTodos.length === 0) {
          console.log(chalk.red("No ToDos match your filter criteria."));
          showMenu();
          return;
        }

        choices = filteredTodos.map((todo) => ({
          name: chalk.red(todo.task),
          value: todos.indexOf(todo), // Track the original index
        }));

        inquirer
          .prompt([
            {
              type: "list",
              name: "todoIndex",
              message: chalk.yellow("Select a ToDo to delete:"),
              choices,
            },
          ])
          .then((answer) => {
            const todoIndex = answer.todoIndex;

            todos.splice(todoIndex, 1); // Delete from original todos array
            saveTodos(todos);
            console.log(chalk.green("ToDo deleted!"));
            showMenu();
          });
      });
    });
};

// View all todos
const viewTodos = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "filterType",
        message: chalk.yellow("How would you like to filter ToDos?"),
        choices: ["All", "Status", "Deadline", "Todo"],
      },
    ])
    .then((answer) => {
      const filterType = answer.filterType;
      let todos;

      switch (filterType) {
        case "All":
          todos = loadTodos();
          break;
        case "Status":
          return inquirer
            .prompt([
              {
                type: "list",
                name: "status",
                message: chalk.yellow("Select a status:"),
                choices: ["Completed", "Ongoing", "Plan"],
              },
            ])
            .then((statusAnswer) => {
              const status = statusAnswer.status;
              todos = loadTodos().filter((todo) => todo.status === status);
              return todos;
            });
        case "Deadline":
          return inquirer
            .prompt([
              {
                type: "list",
                name: "deadline",
                message: chalk.yellow("Select a deadline:"),
                choices: [
                  "1Hr",
                  "2Hrs",
                  "3Hrs",
                  "1Day",
                  "2Days",
                  "3Days",
                  "1Week",
                  "2Weeks",
                  "1Month",
                  "2Months",
                  "3Months",
                  "1Year",
                  "2Years",
                  "3Years",
                ],
              },
            ])
            .then((deadlineAnswer) => {
              const deadline = deadlineAnswer.deadline;
              todos = loadTodos().filter((todo) => todo.deadline === deadline);
              return todos;
            });
        case "Todo":
          return inquirer
            .prompt([
              {
                type: "input",
                name: "todo",
                message: chalk.yellow("Enter a todo task:"),
              },
            ])
            .then((todoAnswer) => {
              const todo = todoAnswer.todo;
              todos = loadTodos().filter((todoItem) =>
                todoItem.task.includes(todo)
              );
              return todos;
            });
      }

      return Promise.resolve(todos);
    })
    .then((filteredTodos) => {
      console.log(chalk.blue("\nYour ToDo List:\n"));

      if (filteredTodos.length === 0) {
        console.log(chalk.black.bgYellow("No tasks available"));
      } else {
        const todosTable = filteredTodos.map((todo, index) => {
          return {
            No: index + 1,
            Todo: todo.task,
            isImportant: todo.isImportant ? "Yes" : "No",
            isUrgent: todo.isUrgent ? "Yes" : "No",
            Deadline: todo.deadline,
            Status: todo.status,
            CreatedAt: formatDate(todo.createdAt),
          };
        });

        console.table(todosTable);
      }

      showMenu();
    });
};

// Initialize the both
initFile();
showMenu();
