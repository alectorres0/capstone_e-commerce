/*
PURPOSE OF DB: 
TO ADD USERS
TO BE ABLE TO LOGIN WITH USER INFORMATION
RETURN TOKEN
TO BE ABLE TO LOG OUT
TO HOLD CARTS THAT ARE TIED TO USERS
TO BE ABLE TO CLEAR CARTS
TO BE ABLE TO ADD TO CARTS
TO BE ABLE TO SUBTRACT FROM CARTS
TO BE ABLE TO UPDATE ITEMS IN CART
TO BE ABLE CHECK OUT 
*/


const pg = require('pg');
const client = new pg.Client('postgres://localhost/The_Best_Store');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

const createTables = async() =>{
const SQL = `
DROP TABLE IF EXISTS users;
CREATE TABLE users(
id UUID PRIMARY KEY,
email VARCHAR(255) UNIQUE NOT NULL,
username VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL,
firstname VARCHAR(255) NOT NULL,
lastname VARCHAR(255) NOT NULL,
city VARCHAR(255) NOT NULL,
street VARCHAR(255) NOT NULL,
zipcode VARCHAR(255) NOT NULL,
phone VARCHAR(255) NOT NULL
)

`
await client.query(SQL);
};

const createUser = async({email, username, password, firstname, lastname, city, street, zipcode, phone}) =>{
const SQL = `
INSERT INTO users(id, email, username, password, firstname, lastname, city, street, zipcode, phone)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
`;
const response = await client.query(SQL, [uuid.v4(), email, username, await bcrypt.hash(password,5),firstname,lastname,city,street,zipcode,phone]);
return response.rows[0];

}













module.exports = {
client,
createTables,
createUser

}