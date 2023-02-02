const wrapper = document.querySelector(".wrapper"),
qrInput = wrapper.querySelector(".form input"),
generateBtn = wrapper.querySelector(".form button"),
qrImg = wrapper.querySelector(".qr-code img");
let preValue;

generateBtn.addEventListener("click", () => {
    let qrValue = qrInput.value.trim();

    //if the input is empty or the previous value of the input field is not modefied then no change
    if(!qrValue || preValue === qrValue) return;

    //after getting a value in qr value we are assigning it in prevalue
    preValue = qrValue;
    generateBtn.innerText = "Generating QR Code...";

    //this is a simple api we are going to use to generate the qr code
    //here we are getting a QR code of user entered value using the qrserver
    //api and passing the api returned img src to qrImg
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;


    qrImg.addEventListener("load", () => { //once QR code img loaded 
        wrapper.classList.add("active");
        generateBtn.innerText = "Generate QR Code";
    });
});

//when we remove the text from the input field then the qr code 
//will aslo get removed from the output field
qrInput.addEventListener("keyup", () => {
    if(!qrInput.value.trim()) {
        wrapper.classList.remove("active");
        preValue = "";
    }
});


