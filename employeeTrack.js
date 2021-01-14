const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "TheFlashwashere87!",
  database: "employee_trackerDB"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "View all departments",
        "View all positions",
        "Add employee",
        "Add department",
        "Add role",
        "Update employee role",
        "exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View all employees":
        viewAllEmployees();
        break;

      case "View all departments":
        viewDep();
        break;

      case "View all positions":
        viewPositions();
        break;

      case "Add employee":
        addEmployee();
        break;
          
      case "Add department":
        addDepartment();
        break;
          
      case "Add role":
        addRole();
        break;

      case "Update employee role":
        updateRole();
        break;
          
      case "exit":
        connection.end();
        break;
      }
    });
}

function viewAllEmployees() {
  console.log("Selecting all employees...\n");
  connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;
    console.log(res);
    runSearch();
  });
}

function viewDep() {
  var query = "SELECT * FROM department";
  connection.query(query, function(err, res) {
    if (err) throw err;
      console.log(res);
    runSearch();
  });
}

function viewPositions() {
  var query = "SELECT * FROM position";
  connection.query(query, function(err, res) {
    if (err) throw err;
      console.log(res);
    runSearch();
  });
}