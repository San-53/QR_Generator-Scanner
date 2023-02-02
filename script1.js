//js for scanner

const wrapper2=document.querySelector(".wrapper_left"),
form = wrapper2.querySelector("form");
fileInp=form.querySelector("input");
infoText = form.querySelector(".upload_para");
copyBtn = wrapper2.querySelector(".copy");
closeBtn = wrapper2.querySelector(".close");


function fetchRequest(formData,file){
    infoText.innerText="Scanning QR Code...";
    //sending post request to qr server api with passing 
    //form data as body and getting response from it
    fetch("http://api.qrserver.com/v1/read-qr-code/",{
        method:'POST',
        body: formData
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data;//extracting the exact data from the original data set
        console.log(result);
        infoText.innerText=result ? "Upload QR code to scan" : "Couldn't Scan QR Code";
        if(!result)return;
        wrapper2.querySelector("textarea").innerText=result;
        form.querySelector("img").src=URL.createObjectURL(file);//URL.createObjectUR creates string containing a URL of passed object,and passing this URL as image src
        wrapper2.classList.add("active");
        // console.log(result);
    }).catch(() => {
        infoText.innerText="Couldn't Scan QR Code";
    })
}


fileInp.addEventListener("change" , e => {
    let file = e.target.files[0]; //getting user selected files
    // console.log(file);
    if(!file) return;
    let formData = new FormData();//creating a new FormData object
    formData.append("file",file); //adding selected files to formData
    fetchRequest(formData,file);
})

// copyBtn.addEventListener("click", () =>{
//     let text = wrapper2.querySelector("textarea").innerContent;
//     navigator.clipboard.writeText(text);
// })

copyBtn.addEventListener("click", () => {
    let text = document.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
});

form.addEventListener("click", () => fileInp.click());
closeBtn.addEventListener("click", () => wrapper2.classList.remove("active"));