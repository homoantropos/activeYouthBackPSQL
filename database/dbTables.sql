create TABLE user(
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    person_id INT GENERATED ALWAYS AS IDENTITY,
    PRIMARY KEY (person_id)
);

create TABLE activity(
    title VARCHAR NOT NULL,
    author VARCHAR NOT NULL,
    content TEXT NOT NULL,
    date DATE NOT NULL,
    kindofactivity VARCHAR NOT NULL,
    activity_id INT GENERATED ALWAYS AS IDENTITY,
    PRIMARY KEY (activity_id),
    person_id INT NOT NULL,
    CONSTRAINT fk_person
        FOREIGN KEY (person_id)
            REFERENCES user(person_id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
);

create TABLE sportKind (
    name VARCHAR NOT NULL,
    code VARCHAR UNIQUE,
    sportkind_id INT GENERATED ALWAYS AS IDENTITY,
    PRIMARY KEY (sportkind_id)
);

create TABLE country (
    country_name VARCHAR NOT NULL UNIQUE,
    country_id INT GENERATED ALWAYS AS IDENTITY,
    PRIMARY KEY (country_id)
);

create TABLE region (
    region_name VARCHAR NOT NULL UNIQUE,
    region_group INT NOT NULL,
    country_id INT NOT NULL,
    region_id INT GENERATED ALWAYS AS IDENTITY,
    PRIMARY KEY (region_id),
    CONSTRAINT fk_country
        FOREIGN KEY (country_id)
        REFERENCES country(country_id)
            ON DELETE CASCADE
            ON UPDATE NO ACTION
);

create TABLE town (
    town_name VARCHAR NOT NULL,
    town_id INT GENERATED ALWAYS AS IDENTITY,
    PRIMARY KEY (town_id),
    country_id INT NOT NULL,
    region_id INT,
    UNIQUE (town_name, country_id, region_id),
    CONSTRAINT fk_country
        FOREIGN KEY (country_id)
        REFERENCES country(country_id)
                ON DELETE CASCADE
                ON UPDATE NO ACTION,
    CONSTRAINT fk_region
        FOREIGN KEY (region_id)
        REFERENCES region(region_id)
                ON DELETE CASCADE
                ON UPDATE NO ACTION
);

create TABLE sportHall (
    sportHall_name VARCHAR,
    address VARCHAR,
    sportHall_id INT GENERATED ALWAYS AS IDENTITY,
    PRIMARY KEY (sportHall_id),
    town_id INT NOT NULL,
    UNIQUE (sportHall_name, town_id),
    CONSTRAINT fk_town
        FOREIGN KEY (town_id)
        REFERENCES town(town_id)
                ON DELETE CASCADE
                ON UPDATE NO ACTION
);

create TABLE appointment (
    title VARCHAR NOT NULL,
    startDate DATE NOT NULL,
    finishDate DATE NOT NULL,
    duration INT NOT NULL,
    country_id INT NOT NULL,
    region_id INT NOT NULL,
    town_id INT NOT NULL,
    sportHall_id INT NOT NULL,
    organizationsParticipants VARCHAR NOT NULL,
    sportKind_id INT NOT NULL,
    kpkv INT NOT NULL,
    haracter VARCHAR NOT NULL,
    participants VARCHAR NOT NULL,
    direction VARCHAR NOT NULL,
    status VARCHAR NOT NULL,
    organiser VARCHAR NOT NULL,
    appointment_id INT GENERATED ALWAYS AS IDENTITY,
    person_id INT NOT NULL,
    PRIMARY KEY (appointment_id),
    CONSTRAINT fk_country
        FOREIGN KEY (country_id)
        REFERENCES country(country_id)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION,
    CONSTRAINT fk_region
        FOREIGN KEY (region_id)
        REFERENCES region(region_id)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION,
    CONSTRAINT fk_town
        FOREIGN KEY (town_id)
        REFERENCES town(town_id)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION,
    CONSTRAINT fk_sportHall
        FOREIGN KEY (sportHall_id)
        REFERENCES sportHall(sportHall_id)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION,
    CONSTRAINT fk_sportKind
        FOREIGN KEY (sportKind_id)
        REFERENCES sportKind(sportKind_id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION,
    CONSTRAINT fk_person
        FOREIGN KEY (person_id)
        REFERENCES user(person_id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
);

create TABLE report (
    report_id INT GENERATED ALWAYS AS IDENTITY,

    countries_plan INT NOT NULL,
    regions_plan INT NOT NULL,
    educationEntity_plan INT NOT NULL,
    sportsmen_plan INT NOT NULL,
    coaches_plan INT NOT NULL,
    referees_plan INT NOT NULL,
    others_plan INT NOT NULL,
    total_plan INT NOT NULL,
    person_per_day_plan INT NOT NULL,

    countries_fact INT,
    regions_fact INT,
    educationEntity_fact INT,
    sportsmen_fact INT,
    coaches_fact INT,
    referees_fact INT,
    others_fact INT,
    total_fact INT,
    person_per_day_fact INT,

    appointment_id INT NOT NULL,
    PRIMARY KEY (report_id),
    CONSTRAINT fk_appointment
        FOREIGN KEY (appointment_id)
        REFERENCES appointment(appointment_id)
            ON DELETE CASCADE
            ON UPDATE NO ACTION
);
