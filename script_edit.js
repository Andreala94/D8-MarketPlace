let endpointUrl = "https://striveschool-api.herokuapp.com/api/product/"
let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdmNWJmY2I5YzBmNzAwMTQ0ODRmOTIiLCJpYXQiOjE2ODYwNjgyMjAsImV4cCI6MTY4NzI3NzgyMH0.e8OjUNPyNbtZn952cqRrt1KWyuuPWozTSAhxnPeXlIM"

let inputName = document.getElementById("inputname");
let inputDesc = document.getElementById("inputdesc");
let inputBrand = document.getElementById("inputbrand");
let inputImg = document.getElementById("inputimg");
let inputPrezzo = document.getElementById("inputprice");
let editDone = document.getElementById("edit-done")
let errorAlert = document.getElementById("errorAlert");
let btnEditPost = document.getElementById("modificapost");

const activeQuery = new URLSearchParams(window.location.search);
const activeId = activeQuery.get("id");
// console.log(activeId);


async function getPost() {

    try {
        const getRes = await fetch(endpointUrl + activeId, {
            method: "GET",
            headers: {
                'Authorization': token, 'Content-Type': 'application/json'
            },

        });
        let data = await getRes.json();

            inputName.value = data.name;
            inputDesc.value = data.description;
            inputBrand.value = data.brand;
            inputImg.value = data.imageUrl;
            inputPrezzo.value = data.price;

    } catch (error) {
        console.log(error);
    }
}
getPost();


async function editPost() {
   if ( inputName.value !== "" && inputDesc.value !== "" && inputBrand.value !== "" && inputImg.value !== "" && inputPrezzo.value !== "") {
    try {
        const editRes = await fetch(endpointUrl + activeId, {
            method: "PUT",
            headers: {
                'Authorization': token, 'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "name": inputName.value, "description": inputDesc.value, "brand": inputBrand.value, "imageUrl": inputImg.value, "price": inputPrezzo.value })
        });

        editDone.classList.toggle("d-none");
        setTimeout(() => {
            editDone.classList.toggle("d-none");
        }, 5000);



    } catch (error) {
        console.log(error);
    }
}else {
    errorAlert.classList.toggle("d-none");
    setTimeout(() => {
        errorAlert.classList.toggle("d-none");
    }, 5000);
}
}

btnEditPost.addEventListener("click", () => {
    console.log(btnEditPost);
    editPost();
})