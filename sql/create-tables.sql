DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS schedules;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email CHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL

);

CREATE TABLE IF NOT EXISTS schedules (
    id SERIAL PRIMARY KEY,
    user_id INT,
    day INT NOT NULL CHECK (day >= 1 AND day <= 7),
    start_at TIME NOT NULL,
    end_at TIME NOT NULL,
    CONSTRAINT fk_id
        FOREIGN KEY(user_id)
        REFERENCES users(id)
);

--FOR RESEARCHING
    --data typ of bcrypt hash
    --FOREIGHN KEYS

