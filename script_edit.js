let endpointUrl = "https://striveschool-api.herokuapp.com/api/product/"
let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdmNWJmY2I5YzBmNzAwMTQ0ODRmOTIiLCJpYXQiOjE2ODYwNjgyMjAsImV4cCI6MTY4NzI3NzgyMH0.e8OjUNPyNbtZn952cqRrt1KWyuuPWozTSAhxnPeXlIM"

let inputName = document.getElementById("inputname");
let inputDesc = document.getElementById("inputdesc");
let inputBrand = document.getElementById("inputbrand");
let inputImg = document.getElementById("inputimg");
let inputPrezzo = document.getElementById("inputprice");

let btnEditPost = document.getElementById("modifcapost");

const activeQuery = new URLSearchParams(windows.location.search);
const activeId = activeQuery.get("id");
console.log(activeId);

windows.onload = showPost();

async function showPost() {
    let request = await fetch(endpointUrl + activeId);
    let json = await request.json();

    inputName.value = json.name;
    inputDesc.value = json.description;
    inputBrand.value = json.brand;
    inputImg.value = json.imageUrl;
    inputPrezzo.value = json.price;
}

async function editPost() {
    // let newPayload = {
    //     "name": inputName.value,
    //     "description": inputDesc.value,
    //     "brand": inputBrand.value,
    //     "imageUrl": inputImg.value,
    //     "price": inputPrezzo.value
    // };
   try{
      const editRes = await fetch(endpointUrl + activeId, {
        method: "PUT",
        headers: {
            'Authorization': token, 'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "name": inputName.value, "description": inputDesc.value, "brand": inputBrand.value, "imageUrl": inputImg.value, "price": inputPrezzo.value })
    });

   } catch (error) {
    console.log(error);
    }
}

btnEditPost.addEventListener("click", () =>{
    console.log(btnEditPost);
   editPost();
})