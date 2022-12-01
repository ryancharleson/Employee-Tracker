

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
VALUES ("Ryan", "Charleson", 1, null),
        ("James", "Bond", 2, 1),
        ("Joe", "Shmoe", 3, null),
        ("Billy", "Joel", 4, 3),
        ("Linkin", "Park", 5, null),
        ("Drake", "Aubrey", 6, 5),
        ("Green", "Day", 7, null),
        ("Fifty", "Scent", 8, 7);

