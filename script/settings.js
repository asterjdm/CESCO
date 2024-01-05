let profileImageInput = document.getElementById("profileImageInput");
let imgPreview = document.getElementById("imagePreview");

profileImageInput.addEventListener("change",  ()=>{
    let files = profileImageInput.files[0];
    if (files) {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(files);
        fileReader.addEventListener("load", function () {
            imgPreview.style.backgroundImage = "url(" + this.result + ")";
        });    
    }

});