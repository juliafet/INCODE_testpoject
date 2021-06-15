DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS schedules;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    surname VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL

);

CREATE TABLE IF NOT EXISTS schedules (
    id SERIAL PRIMARY KEY UNIQUE,
    username VARCHAR(255) NOT NULL,
    day INT NOT NULL CHECK (day >= 1 AND day <= 7),
    start_at TIME NOT NULL,
    end_at TIME NOT NULL
);

--FOR RESEARCHING
    --data typ of bcrypt hash
    --FOREIGHN KEYS

