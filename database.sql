create TABLE person(
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    person_id INT GENERATED ALWAYS AS IDENTITY,
    PRIMARY KEY (_id)
);
// TODO - замінити назву _id на person_id таким чином:
ALTER TABLE person
    RENAME COLUMN _id TO person_id;

create TABLE activity(
    title VARCHAR NOT NULL,
    author VARCHAR NOT NULL,
    content TEXT NOT NULL,
    date DATE NOT NULL,
    kindofactivity VARCHAR NOT NULL,
    activity_id INT GENERATED ALWAYS AS IDENTITY,
    PRIMARY KEY (_id),
    person_id INT NOT NULL,
    CONSTRAINT fk_person
        FOREIGN KEY (person_id)
            REFERENCES person(_id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
);
// TODO - замінити назву _id на activity_id таким чином:
ALTER TABLE activity
    RENAME COLUMN _id TO activity_id;

create TABLE sportKind (
    name VARCHAR NOT NULL,
    code VARCHAR UNIQUE,
    sportkind_id INT GENERATED ALWAYS AS IDENTITY,
    PRIMARY KEY (sportkind_id)
);
// TODO - замінити назву _id на sportkind_id таким чином:
ALTER TABLE sportKind
    RENAME COLUMN _id TO sportkind_id;

create TABLE country (
    country_name VARCHAR NOT NULL UNIQUE,
    country_id INT GENERATED ALWAYS AS IDENTITY,
    PRIMARY KEY (country_id)
);
// TODO - замінити назву _id на activity_id таким чином:
ALTER TABLE country
    RENAME COLUMN _id TO country_id;

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
/* TODO - замінити назву name на region_name таким чином:*/
ALTER TABLE region
    RENAME COLUMN name TO region_name;
/* TODO - замінити назву _id на region_id таким чином:*/
ALTER TABLE region
    RENAME COLUMN _id TO region_id;
/* TODO - замінити назву countryId на country_id таким чином:*/
ALTER TABLE region
    RENAME COLUMN countryId TO country_id;
/* TODO - замінити назву regionsgroup на region_group таким чином:*/
ALTER TABLE region
    RENAME COLUMN regionsgroup TO region_group;

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
/* TODO - замінити назву countryId на country_id таким чином:*/
ALTER TABLE town
    RENAME COLUMN countryId TO country_id;
/* TODO - замінити назву regionId на region_id таким чином:*/
ALTER TABLE town
    RENAME COLUMN regionId TO region_id;
/* TODO - замінити назву ключів countryId, regionId в UNIQUE*/

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
/* TODO - замінити назву townId на town_id таким чином:*/
ALTER TABLE sportHall
    RENAME COLUMN townId TO town_id;
/* TODO - замінити назву townId на town_id в ключі UNIQUE*/

create TABLE place (
    country_id INT,
    region_id INT,
    town_id INT,
    sportHall_id INT,
    place_id INT GENERATED ALWAYS AS IDENTITY,
    PRIMARY KEY (place_id),
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
                ON UPDATE NO ACTION
);

create TABLE appointment (
    title VARCHAR NOT NULL,
    startDate DATE NOT NULL,
    finishDate DATE NOT NULL,
    duration INT NOT NULL,
    place_id INT NOT NULL,
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
    CONSTRAINT fk_place
        FOREIGN KEY (place_id)
        REFERENCES place(place_id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION,
    CONSTRAINT fk_sportKind
        FOREIGN KEY (sportKind_id)
        REFERENCES sportKind(sportKind_id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION,
    CONSTRAINT fk_person
        FOREIGN KEY (person_id)
        REFERENCES person(person_id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
);


