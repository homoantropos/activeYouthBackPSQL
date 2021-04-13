create TABLE person(
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    _id INT GENERATED ALWAYS AS IDENTITY,
    PRIMARY KEY (_id)
);

create TABLE activity(
    title VARCHAR NOT NULL,
    author VARCHAR NOT NULL,
    content TEXT NOT NULL,
    date DATE NOT NULL,
    kindofactivity VARCHAR NOT NULL,
    _id INT GENERATED ALWAYS AS IDENTITY,
    PRIMARY KEY (_id),
    person_id INT NOT NULL,
    CONSTRAINT fk_person
        FOREIGN KEY (person_id)
            REFERENCES person(_id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
);

create TABLE sportKind (
    name VARCHAR NOT NULL UNIQUE,
    _id INT GENERATED ALWAYS AS IDENTITY
);


create TABLE appointment (
    title VARCHAR NOT NULL,
    startDate DATE NOT NULL,
    finishDate DATE NOT NULL,
    duration NUMERIC,
    place Place;
    organizationsParticipants VARCHAR NOT NULL,
    sportKind_id,
    KPKV: number;
    character: string;
    participants: string;
    direction: string;
    status: string;
    organiser: string;
    _id?: string;
    _userId?: string;
);

