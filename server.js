

const inquirer = require('inquirer');
const mysql = require('mysql2');
const { allowedNodeEnvironmentFlags } = require('process');
const { finished } = require('stream');

//Connecting prompts in server.js to the team database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'BubbIeRap04!',
        database: 'team_db'
    },
    console.log(`You have successfully connected to the team_db.`)
);




//Using inquierer to prompt user on what they would like to view in team database.
const askQuestions = () => {
    inquirer.createPromptModule([
       {
        type: 'list',
        name: 'select',
        message: 'Welcome! What would you like to view?',
        choices: ['Select All Employee Departments',
                  'Select All Roles',
                  'Select All Employees',
                  'Add New Department',
                  'Add New Employee Role',
                  'Add New Employee',
                  'Change An Employee Role',
                  'Finish']
       } 
    ])



    //Switch statement based on user input will call different functions.
    .then((answers) => {
        switch (answers.select) {
            case 'Select All Employee Departments':
                allDepartments();
                break
            case 'Select All Roles':
                allRoles();
                break
            case 'Select All Employees':
                allEmployees();
                break
            case 'Add New Department':
                addDepartment();
                break
            case 'Add New Employee Role':
                newRole();
                break
            case 'Add New Employee':
                newEmployee();
                break
            case 'Change An Employee Role':
                changeRole();
                break
            case 'Finish':
                process.exit
                break
        }
    })
};