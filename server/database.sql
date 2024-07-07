CREATE DATABASE postgres;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100),
    password VARCHAR(100),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    bio VARCHAR(500),
    cocktails_created VARCHAR(255)[],
    cocktail_saved VARCHAR(255)[]
);

CREATE TABLE cocktails (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    created_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    category VARCHAR(50),
    ingredients VARCHAR(50)[],
    instructions VARCHAR(255)[],
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- INSERT INTO users(email, password, firstname, lastname, bio) VALUES ('a@a.com', 'a', 'Amy', 'Smith', 'Hi this is my bio! I love drinking');