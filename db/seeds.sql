

INSERT INTO (name)
VALUES ("Audit"),
        ("Payroll"),
        ("Accounting"),
        ("Marketing");


INSERT INTO role (title, salary, deparment_id)
VALUES ("Junior Auditor", 50000, 100),
        ("Senior Auditor", 100000, 100),
        ("Payroll Clerk", 50000, 200),
        ("Payroll Manager", 100000, 200),
        ("Junior Acccountant", 50000, 300),
        ("Senior Accountant", 100000, 300),
        ("Marketing Analyst", 50000, 400),
        ("Marketing Manager", 100000, 400);

INSERT INTO employee (first_name, last_name, role_id, manager_id)