INSERT INTO role (role, code)
    VALUES
     ('superAdmin', 'June1974'),
     ('admin', 'November1974'),
     ('committeeLeader', 'May1974'),
     ('departmentLeader', 'April194'),
     ('sectionLeader', 'March1974'),
     ('responsePerson', 'February1974'),
     ('appointmentManager', 'January1974'),
     ('teamManager', 'December1973');


INSERT INTO user (email, password, role) VALUES
     (santre8@gmail.com, 'test1', 'June1974');


INSERT INTO public."user"(
	id, email, password, role)
	VALUES (2, 'homoantropos@gmail.com', 'test1', 'superAdmin');
