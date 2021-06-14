DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS schedules;

CREATE TABLE IF NOT EXISTS users (
    id unique key (ID),
    surname VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
)

CREATE TABLE IF NOT EXISTS schedules (
    id SERIAL PRIMARY KEY UNIQUE,
    username VARCHAR(255) NOT NULL,
    day INT NOT NULL CHECK (day >= 1 AND day <= 7),
    start_at TIME NOT NULL,
    end_at TIME NOT NULL
)