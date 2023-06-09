let endpointUrl = "https://striveschool-api.herokuapp.com/api/product/"
let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdmNWJmY2I5YzBmNzAwMTQ0ODRmOTIiLCJpYXQiOjE2ODYwNjgyMjAsImV4cCI6MTY4NzI3NzgyMH0.e8OjUNPyNbtZn952cqRrt1KWyuuPWozTSAhxnPeXlIM";

let inputName = document.getElementById("inputname");
let inputDesc = document.getElementById("inputdesc");
let inputBrand = document.getElementById("inputbrand");
let inputImg = document.getElementById("inputimg");
let inputPrezzo = document.getElementById("inputprice");



let div = document.getElementById("root");


let params = new URLSearchParams(window.location.search);
let id = params.get("id");

async function showPost() {
    try {
        const editRes = await fetch(endpointUrl + id, {

            method: "GET",
            headers: {
                'Authorization': token, 'Content-Type': 'application/json'
            },

        });
        let data = await editRes.json();
        mostraProdotto(data);
     console.log(data);
    } catch (error) {
        console.log(error);
    }
}
showPost();

function mostraProdotto(element) {
    let card = document.createElement("card");
    card.classList.add("card")
    let img = document.createElement("img");
    img.classList.add("h-100")
    img.src = element.imageUrl;
    card.appendChild(img)



    // creo name
    let name = document.createElement("p");
    name.classList.add("fw-bold")
    name.textContent = "Nome: " + element.name;
    card.appendChild(name);

    // creo descrizione
    let description = document.createElement("p");
    description.classList.add("fw-bold")
    description.textContent = "Descrizione: " + element.description;
    card.appendChild(description);

    // creo il brand
    let brand = document.createElement("p");
    brand.classList.add("fw-bold")
    brand.textContent = "Brand: " + element.brand;
    card.appendChild(brand);

    //Aggiungi prezzo
    let prezzo = document.createElement("p");
    prezzo.textContent = ("Prezzo: " + element.price + " " + "Euro");
    prezzo.classList.add("fw-bold")
    card.appendChild(prezzo);




    div.appendChild(card)

}