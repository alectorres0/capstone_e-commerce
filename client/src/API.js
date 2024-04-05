const baseURL = 'https://fakestoreapi.com';


export async function getMens() {
    try{
const response = await fetch(`${baseURL}/products/category/men's%20clothing`);
const data = await response.json();
console.log(data);
return data
    }

    catch(err){
        console.error(err);
    }
}

export async function getWomens() {
    try{
const response = await fetch(`${baseURL}/products/category/women's%20clothing`);
const data = await response.json();
console.log(data);
return data
    }

    catch(err){
        console.error(err);
    }
}

export async function getElectronics() {
    try{
const response = await fetch(`${baseURL}/products/category/electronics`);
const data = await response.json();
console.log(data);
return data
    }

    catch(err){
        console.error(err);
    }
}

export async function getJewelery() {
    try{
const response = await fetch(`${baseURL}/products/category/jewelery`);
const data = await response.json();
console.log(data);
return data
    }

    catch(err){
        console.error(err);
    }
}

export async function getItem(id){

    try{
        const response = await fetch (`${baseURL}/products/${id}`);
        const data = await response.json();
        return data;
    }

    catch(err){
        console.error(err);

    }
}

export async function addUser(user){

    try{
        const response = await fetch('http://localhost:3000/api/register',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    email: user.email,
                    username: user.username,
                    password: user.password,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        city: user.city,
                        street: user.street,
                        zipcode: user.zipcode,
                    phone: user.phone
                }
            )
        })

        const data = await response.json();
        return data;
    }

    catch(err){
        console.error(err);
    }
}

export async function userLogin(user){

    try{
        const response = await fetch('http://localhost:3000/api/auth/login',{
            headers: {
                'Content-Type': 'application/json',
              },
            method: 'POST',
            body: JSON.stringify({
                username: user.username,
                password: user.password
            })

        })

        const data = await response.text();
        console.log(data);
        return data;
    }   
    
    catch(err){
        console.error(err);
    }
}