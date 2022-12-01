

INSERT INTO department (name)
VALUES ("Audit"),
        ("Payroll"),
        ("Accounting"),
        ("Marketing");


INSERT INTO role (title, salary, department_id)
VALUES ("Junior Auditor", 50000, 1),
        ("Senior Auditor", 100000, 1),
        ("Payroll Clerk", 50000, 2),
        ("Payroll Manager", 100000, 2),
        ("Junior Acccountant", 50000, 3),
        ("Senior Accountant", 100000, 3),
        ("Marketing Analyst", 50000, 4),
        ("Marketing Manager", 100000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ryan", "Charleson", 1, null),
        ("James", "Bond", 2, 1),
        ("Joe", "Shmoe", 3, null),
        ("Billy", "Joel", 4, 3),
        ("Linkin", "Park", 5, null),
        ("Drake", "Aubrey", 6, 5),
        ("Green", "Day", 7, null),
        ("Fifty", "Scent", 8, 7);

