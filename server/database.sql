CREATE DATABASE postgres;

CREATE TABLE cocktail (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    createdBy VARCHAR(255),
    -- createdTimeStamp 
    category VARCHAR(50),
    ingredients VARCHAR(50)[],
    instructions VARCHAR(255)[]
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100),
    password VARCHAR(100),
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    bio VARCHAR(500),
    cocktailsCreated VARCHAR(255)[],
    cocktailsSaved VARCHAR(255)[]
);

-- INSERT INTO users(email, password, firstName, lastName, bio) VALUES ('a@a.com', 'a', 'Amy', 'Smith', 'Hi this is my bio! I love drinking');