const {client,createTables,createUser} = require('./db');

const express = require('express');
const app = express();
app.use(express.json());



const init = async() =>{
const port = process.env.PORT || 3000;
await client.connect();
console.log('connected to database');

await createTables();
console.log('tables created');

await createUser({email: 'julie@email.com', username: 'julie', password:'password', firstname: 'julie', lastname: 'torres', city:'losangeles', street: '4th', zipcode: '675893', phone:'909909909'});
console.log('tables seeded')
app.listen(port, ()=>console.log(`listening on port ${port}`));

}

init();