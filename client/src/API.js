const baseURL = 'https://fakestoreapi.com';
const myURL = 'http://localhost:3000'

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

        const data = await response.json();
        console.log(JSON.stringify(data));
        return data;
    }   
    
    catch(err){
        console.error(err);
    }
}

export async function createCart({userid,token}){

try{
    const response = await fetch(`${myURL}/api/cart`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':token
        },
        body: JSON.stringify({
            userid: userid
        })
    })
    const data = await response.json();
    console.log("cart created " + JSON.stringify(data));
    return data
}

catch(err){

    console.error("error creating cart" + err);
}

}

export async function fetchCart({userid, token}){

    try{
        const response = await fetch(`${myURL}/api/cart/${userid}`,{
            headers: {
                'Authorization':token
            }
        })
        const data = await response.json();
        console.log("cart fetched " + JSON.stringify(data));
        return data
    }

    catch(err){

        console.error("error fetching cart" + err);
    }

}

export async function addToCart({cartid, products, token}){
    try{
        const response = await fetch(`${myURL}/api/cart/product`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':token
            },
            body: JSON.stringify({
                cartid: cartid,
                products:products
            })
        })
        const data = await response.json();
        console.log("added To cart" + JSON.stringify(data));
        return data
    }

    catch(err){

        console.error("error adding to cart" + err);
    }

}

export async function updateQuantity({cartid, productid, newQuantity, token}){
    try{
        const response = await fetch(`${myURL}/api/cart/quantity`,{
            method: 'PUT',
            headers: {
                'Content-Type':'application/json',
                'Authorization':token
            },
            body: JSON.stringify({
                cartid: cartid,
                productid: productid,
                newQuantity:newQuantity
            })
        })
        const data = await response.json();
        console.log(data);
        return data;
    }

    catch(err){
        console.error("error updating quantity" + err);
    }



}

export async function clearCart({cartid, token}){
    try{
        const response = await fetch(`${myURL}/api/cart/clear`,{
            method: 'PUT',
            headers: {
                'Content-Type':'application/json',
                'Authorization':token
            },
            body: JSON.stringify({
                cartid:cartid
            })
        })
        const data = await response.json();
        console.log(data);
        return data;
    }

    catch(err){

        console.error("error clearing cart" + err);
    }
}

export async function removeItem({cartid, productid, token}){
    try{
        const response = await fetch(`${myURL}/api/cart/remove`,{
            method: 'PUT',
            headers: {
                'Content-Type':'application/json',
                'Authorization':token
            },
            body: JSON.stringify({
                cartid: cartid,
                productid: productid
            })
        })
        const data = await response.json();
        console.log(data);
        return data;
    }

    catch(err){
        console.error("error removing item" + err)
    }
}