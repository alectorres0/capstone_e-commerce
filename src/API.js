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