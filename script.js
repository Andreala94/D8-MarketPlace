let endpointUrl = "https://striveschool-api.herokuapp.com/api/product/"
let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdmNWJmY2I5YzBmNzAwMTQ0ODRmOTIiLCJpYXQiOjE2ODYwNjgyMjAsImV4cCI6MTY4NzI3NzgyMH0.e8OjUNPyNbtZn952cqRrt1KWyuuPWozTSAhxnPeXlIM"
let inputName = document.getElementById("inputname");
let inputDesc = document.getElementById("inputdesc");
let inputBrand = document.getElementById("inputbrand");
let inputImg = document.getElementById("inputimg");
let inputPrezzo = document.getElementById("inputprice");
let btnNewPost = document.getElementById("creapost");
let listaProdotti = document.getElementById("lista");



//Creo una funzione che ristituisce gli oggetti tramite fetch metodo(GET)
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

//creo una funzione per la cancellazione del prodotto nella fetch metodo(DELETE)
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

//creo una funzione dove inserisco nella fetch i prodotti tramite il valore degli input
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


// creo la funzione per la costruzione del tamplete "card" con immagine, nome, descrizione, brand e prezzo + i due bottoni di modifica e cancellazione

function createPostTemplate(element) {
    // Creo la card
    let card = document.createElement("card")
    card.classList.add("card", "col-xl-2", "col-md-3", "col-sm-12")
    listaProdotti.appendChild(card);
    card.id = element._id

    //inserisco l'immagine nella card
    let img = document.createElement("img");
    img.classList.add("img-fluid");
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

    //aggiungo la pagina dettagli
    let dettagli = document.createElement("a");
    dettagli.textContent = "Dettagli Prodotto";
    card.appendChild(dettagli);
    dettagli.href = "dettagli.html?id=" + element._id;
    dettagli.target="_blank";
    

    //aggiungi bottone modifica
    let modifica = document.createElement("a");
    modifica.textContent = "Modifica";
    modifica.href = "edit.html?id=" + element._id;
    modifica.target = "_blank";
    modifica.classList.add("bg-success", "rounded-3", "text-light", "mt-auto", "mb-2","text-center");
    card.appendChild(modifica);

    //aggiungo bottone cancella
    let cancella = document.createElement("button");
    cancella.textContent = "Cancella";
    cancella.classList.add("bg-danger", "rounded-3", "text-light", "mt-auto", "deleteproduct");
    card.appendChild(cancella);

    cancella.addEventListener("click", () => {
        deleteproduct(element._id);
    });

    

}

btnNewPost.addEventListener("click", () => {
    // al click richiamo la funzione del POST
    insertproduct();
    //cancellazione input
    inputName.value = "";
    inputDesc.value = "";
    inputBrand.value = "";
    inputImg.value = "";
    inputPrezzo.value = "";
})


