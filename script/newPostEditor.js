const postLength = document.getElementById("postLength");
let postEditorTextArea = document.getElementById("postContentEditorDiv");
let uploadInput = document.getElementById("images-upload");
let imageBtn = document.getElementById("imgButtonText");
const imageInput = document.getElementById("images-upload");
const imgPreviewDiv = document.getElementById("imgPreviewDiv");
const form = document.getElementById("postEditorForm")

let clearImage = (event)=>{
    uploadInput.value = "";
    imageBtn.innerText = "Image";
    imageBtn.setAttribute("for", "images-upload");
    imageBtn.removeAttribute("onclick")
    document.getElementById("imgPreview").remove();
    event.preventDefault();
}


function format(command, value) {
    document.execCommand(command, false, value);
}

async function handleSubmit(){

}



imageInput.addEventListener("change", function () {
    const files = imageInput.files[0];
    if (files) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files);
        fileReader.addEventListener("load", function () {
            imgPreviewDiv.innerHTML = `<img class='img-preview' id='imgPreview' width=100 src='${this.result}' />`
        });    
    }

});

async function main() {
    const config = await getConfig();
    const maxlength = config.max_posts_length;


    // Event listener for text input
    postEditorTextArea.addEventListener("keydown", (e) =>{
        const currentLength = e.target.innerText.length;


        postLength.textContent = `${e.target.innerText.length} / ${maxlength}`;

        if (currentLength >= maxlength) {
            postLength.style.color = "red";
        } else {
            postLength.style.color = "white";
        }
    });


    uploadInput.onchange = ()=>{
        const files = this.files[0];
        if (files) {
            imageBtn.innerText = "Suprimer";
            imageBtn.removeAttribute("for");
            imageBtn.setAttribute("onclick", "clearImage(event)");
        }
    };

    form.addEventListener("submit", function(e) {
        if(postEditorTextArea.innerText.length > maxlength){
            alert(`Veuillez ne pas dépasser ${maxlength} caractères`)
            e.preventDefault()
        }
        document.getElementById("postEditorTextArea").value = document.getElementById("postContentEditorDiv").innerHTML;
    })
}

main()