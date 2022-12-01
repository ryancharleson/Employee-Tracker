

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


// allDepartments will show all current departments from department table.
allDepartments = async () => {
    const data = await db.promise().query('select * from department')
    console.table(data[0])
    askQuestions()
}


// allRoles will show all roles in role table.
allRoles = async () => {
    const data = await db.promise().query('select title, salary, department.name from role left join department on role.department_id=department.id')
    console.table(data[0])
    askQuestions()
}


// allEmployees will show all employees including fn, ln, title, salary, department, and if they are manager/assigned to a manager.
allEmployees = async () => {
    const data = await db.promise().query('select employee.first_name, employee.last_name, role.title, role.salary, department.name, manager.first_name as manager from employee left join role on role.id=employee.role_id left join department on department.id=role.department_id left join employee manager on employee.manager_id=manager.id')
    console.table(data[0])
    askQuestions()
}


// addDepartment will add a new department to list of departments in table.
addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Name your new department',
        }
    ])

    .then(async answer => {
        const data = await db.promise().query('INSERT INTO department set ?', answer)
        console.log('Sucessfully added ' + answer.addDepartment + ' to your department list');
        askQuestions()
    })
};



