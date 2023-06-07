let endpointUrl = "https://striveschool-api.herokuapp.com/api/product/"
let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdmNWJmY2I5YzBmNzAwMTQ0ODRmOTIiLCJpYXQiOjE2ODYwNjgyMjAsImV4cCI6MTY4NzI3NzgyMH0.e8OjUNPyNbtZn952cqRrt1KWyuuPWozTSAhxnPeXlIM"
let inputName = document.getElementById("inputname");
let inputDesc = document.getElementById("inputdesc");
let inputBrand = document.getElementById("inputbrand");
let inputImg = document.getElementById("inputimg");
let inputPrezzo = document.getElementById("inputprice");
let btnNewPost = document.getElementById("creapost");
let listaProdotti = document.getElementById("lista");




async function getproduct() {
    let request = await fetch(endpointUrl,
        {
            method: 'GET',
            headers: { 'Authorization': token, 'Content-Type': 'application/json' },

        });
    let data = await request.json();
    console.log(data);

    data.forEach(element => {
        createPostTemplate(element);
    });

}
// carico tutti i prodotti non appena viene caricata la pagina
getproduct();

async function deleteproduct(idprodotto) {

    let request = await fetch(endpointUrl + idprodotto,
        {
            method: 'DELETE',
            headers: { 'Authorization': token, 'Content-Type': 'application/json' },

        });
    let data = await request.json();
    console.log(data);

    document.getElementById(idprodotto).remove();


}

async function insertproduct() {
    let request = await fetch(endpointUrl,
        {
            method: 'POST',
            headers: { 'Authorization': token, 'Content-Type': 'application/json' },
            body: JSON.stringify({ "name": inputName.value, "description": inputDesc.value, "brand": inputBrand.value, "imageUrl": inputImg.value, "price": inputPrezzo.value })
        });
    let data = await request.json();
    console.log(data);

    createPostTemplate(data)
}



function createPostTemplate(input) {
    // Creo la card
    let card = document.createElement("card")
    card.classList.add("card", "col-2")
    listaProdotti.appendChild(card);
    card.id = input._id

    //inserisco l'immagine nella card
    let img = document.createElement("img");
    img.classList.add("img-fluid");
    img.src = input.imageUrl;
    card.appendChild(img)

    // creo name
    let name = document.createElement("p");
    name.classList.add("fw-bold")
    name.textContent = "name: " + input.name;
    card.appendChild(name);
    // creo descrizione
    let description = document.createElement("p");
    description.classList.add("fw-bold")
    description.textContent = input.description;
    card.appendChild(description);
    // creo il brand
    let brand = document.createElement("p");
    brand.classList.add("fw-bold")
    brand.textContent = input.brand;
    card.appendChild(brand);
    //Aggiungi prezzo
    let prezzo = document.createElement("p");
    prezzo.textContent = (input.price + " " + "Euro");
    prezzo.classList.add("fw-bold")
    card.appendChild(prezzo);
    // Aggiungi un bottone
    // let bottone = document.createElement("button");
    // bottone.textContent = "Acquista";
    // bottone.classList.add("bg-primary", "rounded-3", "text-light", "mt-auto");
    // card.appendChild(bottone);

    //aggiungi bottone modifica
    let modifica = document.createElement("button");
    modifica.textContent = "Modifica";
    modifica.classList.add("bg-success", "rounded-3", "text-light", "mt-auto");
    card.appendChild(modifica);

    //aggiungo bottone cancella
    let cancella = document.createElement("button");
    cancella.textContent = "Cancella";
    cancella.classList.add("bg-danger", "rounded-3", "text-light", "mt-auto", "deleteproduct");
    card.appendChild(cancella);

    cancella.addEventListener("click", () => {
        deleteproduct(input._id);
    });


}

btnNewPost.addEventListener("click", () => {
    insertproduct();
})


