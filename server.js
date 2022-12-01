

const inquirer = require('inquirer');
const mysql = require('mysql2');

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
    inquirer.prompt([
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
            name: 'name',
            message: 'Name your new department',
        }
    ])

    .then(async answer => {
        const data = await db.promise().query('INSERT INTO department set ?', answer)
        console.log('Sucessfully added ' + answer.addDepartment + ' to your department list');
        askQuestions()
    })
};



newRole = async() => {
    const departments = await db.promise().query('select id as value, name as name from department')
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Input name of role you are adding',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'List desired salary for new role',
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'Which department is your new role going to be in?',
            choices: departments[0]
        }
    ])
        .then(async answer => {
            const data = await db.promise().query('INSERT INTO role set ?', answer)
            console.log('Successfully added ' + answer.newRole + ' to Roles');
            askQuestions()
        })
};



newEmployee = async() => {
    const roles = await db.promise().query('select id as value, title as name from role');
    const employee = await db.promise().query('select id as value, first_name as name from employee');
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'List employee first name',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'List employee last name',
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'List employee role',
            choices: roles[0]
        },
        {
            type: 'list', 
            name: 'manager_id',
            message: 'List manager of new employee',
            choices: employee[0]
        }
    ])

        .then(async answer => {
            const data = await db.promise().query('INSERT INTO employee set ?', answer)
            console.log('Successfully added ' + answer.firstName + answer.lastName + ' to employee list');
            askQuestions()
        })
};



changeRole = async() => {
    const employee = await db.promise().query('select id as value, first_name as name from employee');
    const roles = await db.promise().query('select id as value, title as name from role');

    inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'Which employee are you updating?',
            choices: employee[0]
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Which role are you updating?',
            choices: roles[0]
        }
    
    ])

    .then(async answer => {
        const data = await db.promise().query('UPDATE employee set role_id = ? where id = ?', [answer.role_id, answer.id])
        askQuestions()
    });
};

askQuestions()