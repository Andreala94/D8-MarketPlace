let endpointUrl = "https://striveschool-api.herokuapp.com/api/product/"
let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdmNWJmY2I5YzBmNzAwMTQ0ODRmOTIiLCJpYXQiOjE2ODYwNjgyMjAsImV4cCI6MTY4NzI3NzgyMH0.e8OjUNPyNbtZn952cqRrt1KWyuuPWozTSAhxnPeXlIM";
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

getproduct();


function createPostTemplate(element) {
    // Creo la card
    let card = document.createElement("card")
    card.setAttribute("data-pid", element._id);
    card.classList.add("card", "col-xl-2", "col-md-4", "col-sm-12")
    listaProdotti.appendChild(card);
    card.id = element._id

    //inserisco l'immagine nella card
    let img = document.createElement("img");
    img.classList.add("img-fluid", "w-100","h-75");
    img.src = element.imageUrl;
    card.appendChild(img)

    // creo name
    let name = document.createElement("p");
    name.classList.add("fw-bold", "mt-2")
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
    prezzo.textContent = ("Prezzo: " + element.price + " " + "€");
    prezzo.classList.add("fw-bold")
    card.appendChild(prezzo);

    //aggiungo la pagina dettagli
    let dettagli = document.createElement("a");
    dettagli.textContent = "Dettagli Prodotto";
    dettagli.classList.add("mb-3");
    card.appendChild(dettagli);
    dettagli.href = "dettagli.html?id=" + element._id;
    dettagli.target = "_blank";
}