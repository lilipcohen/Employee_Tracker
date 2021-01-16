const mysql = require("mysql");
const inquirer = require("inquirer");
const { title } = require("process");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
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
        "Add position",
        "Update employee's position",
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
          
      case "Add position":
        addPosition();
        break;

      case "Update employee's position":
        updatePosition();
        break;
          
      case "exit":
        connection.end();
        break;
      }
    });
}

function viewAllEmployees() {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}

function viewDep() {
  var query = "SELECT * FROM department";
  connection.query(query, function(err, res) {
    if (err) throw err;
      console.table(res);
    runSearch();
  });
}

function viewPositions() {
  var query = "SELECT * FROM position";
  connection.query(query, function(err, res) {
    if (err) throw err;
      console.table(res);
    runSearch();
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "Enter employee's id number: "
      },
      {
        name: "firstName",
        type: "input",
        message: "Enter employee's first name: "
      },
      {
        name: "lastName",
        type: "input",
        message: "Enter employee's last name: "
      },
      {
        name: "positionID",
        type: "input",
        message: "Enter employee's position id: "
      },
      {
        name: "managerID",
        type: "input",
        message: "Enter employee's manager id: "
      },
    ])
    .then(function(answer) {
      var query = "INSERT INTO employee SET ?";
        connection.query(query, { id: answer.id, first_name: answer.firstName, last_name: answer.lastName, position_id: answer.positionID, manager_id: answer.managerID }, function(err, res) {
        if (err) throw err;
        runSearch();
      });
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "Enter the department id number: "
      },
      {
        name: "depName",
        type: "input",
        message: "Enter the department name: "
      }
    ])
    .then(function(answer) {
      var query = "INSERT INTO department SET ?";
        connection.query(query, { id: answer.id, dep_name: answer.depName}, function(err, res) {
        if (err) throw err;
        runSearch();
      });
    });
}

function addPosition() {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "Enter the department id number: "
      },
      {
        name: "title",
        type: "input",
        message: "Enter the position title: "
        },
      {
        name: "salary",
        type: "input",
        message: "Enter the position salary: "
        },
      {
        name: "departmentID",
        type: "input",
        message: "Enter the department id: "
      }
    ])
    .then(function(answer) {
      var query = "INSERT INTO position SET ?";
        connection.query(query, { id: answer.id, title: answer.title, salary: answer.salary, department_id: answer.departmentID}, function(err, res) {
        if (err) throw err;
        runSearch();
      });
    });
}

function updatePosition() {
    inquirer
    .prompt(
    {
      name: "positionID",
      type: "input",
      message: "What is the id of the position you wish to change?"
    },
    {
        name: "position_change",
        type: "input",
        message: "Enter the position you wish to change to: "
    })
    .then(function (answer) {
    const query = "UPDATE position SET ? WHERE ?";
        connection.query(query, [{ title: answer.position_change },{id: answer.positionID }],
    function(err, res) {
      if (err) throw err;
    }
    )
    runSearch();
    }
)}