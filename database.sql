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
    name VARCHAR NOT NULL,
    code VARCHAR UNIQUE,
    _id INT GENERATED ALWAYS AS IDENTITY,
    PRIMARY KEY (_id)
);

create TABLE country (
    country_name VARCHAR NOT NULL UNIQUE,
    country_id INT GENERATED ALWAYS AS IDENTITY,
    PRIMARY KEY (country_id)
);

create TABLE region (
    region_name VARCHAR NOT NULL UNIQUE,
    region_group INT NOT NULL,
    countryId INT NOT NULL,
    region_id INT GENERATED ALWAYS AS IDENTITY,
    PRIMARY KEY (region_id),
    CONSTRAINT fk_country
        FOREIGN KEY (countryId)
        REFERENCES country(country_id)
            ON DELETE CASCADE
            ON UPDATE NO ACTION
);

create TABLE town (
    town_name VARCHAR NOT NULL,
    town_id INT GENERATED ALWAYS AS IDENTITY,
    PRIMARY KEY (town_id),
    countryId INT NOT NULL,
    regionId INT,
    UNIQUE (town_name, countryId, regionId),
    CONSTRAINT fk_country
        FOREIGN KEY (countryId)
        REFERENCES country(country_id)
                ON DELETE CASCADE
                ON UPDATE NO ACTION,
    CONSTRAINT fk_region
        FOREIGN KEY (regionId)
        REFERENCES region(region_id)
                ON DELETE CASCADE
                ON UPDATE NO ACTION
);

create TABLE sportHall (
    sportHall_name VARCHAR,
    address VARCHAR,
    sportHall_id INT GENERATED ALWAYS AS IDENTITY,
    PRIMARY KEY (sportHall_id),
    townId INT NOT NULL,
    UNIQUE (sportHall_name, townId),
    CONSTRAINT fk_town
        FOREIGN KEY (townId)
        REFERENCES town(town_id)
                ON DELETE CASCADE
                ON UPDATE NO ACTION
);

create TABLE place (
    countryId INT,
    regionId INT,
    townId INT,
    sportHallId INT,
    place_id INT GENERATED ALWAYS AS IDENTITY,
    PRIMARY KEY (place_id),
    CONSTRAINT fk_country
        FOREIGN KEY (countryId)
        REFERENCES country(country_id)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION,
    CONSTRAINT fk_region
        FOREIGN KEY (regionId)
        REFERENCES region(region_id)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION,
    CONSTRAINT fk_town
        FOREIGN KEY (townId)
        REFERENCES town(town_id)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION,
    CONSTRAINT fk_sportHall
        FOREIGN KEY (sportHallId)
        REFERENCES sportHall(sportHall_id)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION
);

create TABLE appointment (
    title VARCHAR NOT NULL,
    startDate DATE NOT NULL,
    finishDate DATE NOT NULL,
    duration INT NOT NULL,
    placeId INT NOT NULL,
    organizationsParticipants VARCHAR NOT NULL,
    sportKindId INT NOT NULL,
    KPKV INT NOT NULL,
    haracter VARCHAR NOT NULL,
    participants VARCHAR NOT NULL,
    direction VARCHAR NOT NULL,
    status VARCHAR NOT NULL,
    organiser VARCHAR NOT NULL,
    appointment_id INT GENERATED ALWAYS AS IDENTITY,
    personId INT NOT NULL,
    PRIMARY KEY (appointment_id),
    CONSTRAINT fk_place
        FOREIGN KEY (placeId)
        REFERENCES place(place_id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION,
    CONSTRAINT fk_sportKind
        FOREIGN KEY (sportKindId)
        REFERENCES sportKind(_id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION,
    CONSTRAINT fk_person
        FOREIGN KEY (personId)
        REFERENCES person(_id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
);


