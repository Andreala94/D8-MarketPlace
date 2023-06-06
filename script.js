let endpointUrl = "https://striveschool-api.herokuapp.com/api/product/"
let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdmNWJmY2I5YzBmNzAwMTQ0ODRmOTIiLCJpYXQiOjE2ODYwNjgyMjAsImV4cCI6MTY4NzI3NzgyMH0.e8OjUNPyNbtZn952cqRrt1KWyuuPWozTSAhxnPeXlIM"
let inputName = document.getElementById("inputname");
let inputDesc = document.getElementById("inputdesc");
let inputBrand = document.getElementById("inputbrand");
let inputImg = document.getElementById("inputimg");
let inputPrezzo = document.getElementById("inputprice");

async function endpoint(){
try{
    let res = await fetch( endpointUrl );
        headers: {
        Authorization: token
        }
    let json = await res.json()
} catch (error){
    console.log("qui c'è un errore:" + error);
}}

async function getproduct() {
    let request = await fetch(endpointUrl,
{ method: 'POST', headers: { 'Authorization': token, 'Content-Type': 'application/json' }, 
body: JSON.stringify({ "name": inputName.value, "description": inputDesc.value, "brand": inputBrand.value, "imageUrl": inputImg.value , "price": inputPrezzo.value}) });
let data = await request.json();
console.log(data);
// "name":"Andrea" , "description": "Altro", "brand": "nike", "imageUrl":"https://contents.mediadecathlon.com/p2170501/k$e1c12f03390", "price": "10"

}

getproduct();

function createPostTemplate (){
    // Creo la card
    let card = document.createElement("card")
    card.classList.add("card")
    
    //inserisco l'immagine nella card
    let img = document.createElement("img");
    img.classList.add("img-fluid");
    img.src = inputImg.value;
    card.appendChild(img)
    // creo name
    let name = document.createElement("p");
    name.classList.add("fw-bold")
    name.textContent = inputName.value;
    card.appendChild(name);
    // creo descrizione
    let desc = document.createElement("p");
    desc.classList.add("fw-bold")
    desc.textContent = inputDesc.value;
    card.appendChild(desc);
    // creo il brand
    let brand = document.createElement("p");
    brand.classList.add("fw-bold")
    brand.textContent = inputBrand.value;
    card.appendChild(brand);
    //Aggiungi prezzo
    let prezzo = document.createElement("p");
    prezzo.textContent = (inputPrezzo + " " + "Euro");
    prezzo.classList.add("fw-bold")
    card.appendChild(prezzo);
    // Aggiungi un bottone
    let bottone = document.createElement("button");
    bottone.textContent = "Acquista";
    bottone.classList.add("bg-primary", "rounded-3", "text-light", "mt-auto");
    card.appendChild(bottone);
   

}