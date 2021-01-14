const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3000,

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
        "View all employees by department",
        "View all employees by role",
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

      case "View all employees by department":
        viewByDep();
        break;

      case "View all employees by role":
        viewByRole();
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
  inquirer
    .prompt({
      name: "artist",
      type: "input",
      message: "What artist would you like to search for?"
    })
    .then(function(answer) {
      var query = "SELECT position, song, year FROM top5000 WHERE ?";
      connection.query(query, { artist: answer.artist }, function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
        }
        runSearch();
      });
    });
}