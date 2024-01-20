const editorPopup = document.getElementById("editor-popup") as HTMLDivElement;
const imgPreviewDiv = editorPopup.querySelector("#imgPreviewDiv") as HTMLDivElement;
const imageInput = editorPopup.querySelector("#images-upload-input") as HTMLDivElement;
const imgButtonText = editorPopup.querySelector("#imgButtonText") as HTMLElement;

const postLengthEl = document.getElementById("postLength") as HTMLElement;
const postContentEditorEl = document.getElementById("postContentEditorDiv") as HTMLDivElement;
const addImgInput = document.getElementById("imageUploadInput") as HTMLInputElement;
const addImgLabel = document.getElementById("imageBtnLabel") as HTMLInputElement;

const settingsPopup = document.getElementById("settings-popup") as HTMLDivElement;
const settingsUsername = document.getElementById("settingsUsername") as HTMLInputElement;
const settingsNewPassword = document.getElementById("settingsNewPassword") as HTMLInputElement;
const settingsOldPassword = document.getElementById("settingsOldPassword") as HTMLInputElement;
const settingsProfileImageInput = document.getElementById("settingsProfileImageInput") as HTMLInputElement;



// async function updateSettings()
// {
//     const newUsername = settingsUsername.value;
//     const newPassword = settingsNewPassword.value;
//     const oldPassword = settingsOldPassword.value;
//     const newProfilePictureFiles = settingsProfileImageInput.files as FileList;

//     const formData = new FormData();

//     formData.append("username", newUsername);
//     formData.append("newPassword", newPassword);
//     formData.append("oldPassword", oldPassword);

//     if(newProfilePictureFiles.length >= 1)
//     {
//         formData.append("profile_image", newProfilePictureFiles[0])
//     }

//     const response = await fetch(`https://rmbi.ch/cesco/api/saveSettings.php`, {
//         method: "POST",
//         body: formData,
//         credentials: "include"
//     });

//     const responseData = await response.json();

//     if (responseData.success) {
//         location.reload();
//     } else {
//         const messagePlace = settingsPopup.querySelector("#message") as HTMLElement;
        

//         switch (responseData.error){
//             case "not connected":
//                 messagePlace.innerText = "Veuillez vous connectez";
//                 break;
//             case "error" || "image error":
//                 messagePlace.innerText = "Une erreur s'est produite";
//                 break;
//             case "banned username":
//                 messagePlace.innerText = "Votre nom d'utilisateur n'est pas acceptable";
//                 break;
//             case "username already taken":
//                 messagePlace.innerText = "Votre nom d'utilisateur est déjà utilisé, veuillez en choisir un autre";
//                 break;
//             case "username already taken":
//                 messagePlace.innerText = "Vote mot de passe est incorect";
//                 break;


//         }
//     }
// }

function onPostEditorChange() {
    const postLength = (postContentEditorEl.innerHTML || "").length;

    if (!postLengthEl) return;

    postLengthEl.innerText = `${postLength}/500`;

    const submitPostButton = document.getElementById("newPostSubmitButton") as HTMLButtonElement;
    if (!submitPostButton) return;

    if (postLength > 500) {
        postLengthEl.style.color = "red";
        submitPostButton.disabled = true;
    } else {
        postLengthEl.style.color = "black";
        submitPostButton.disabled = false;
    }
}

function formateText(command: string, value: string) {
    document.execCommand(command, false, value);
}


function postsImageChangeHandler() {
    console.info("addImagePreview")

    const postImageFiles = addImgInput.files;

    if (postImageFiles && postImageFiles.length > 0) {
        const fileReader = new FileReader();
        const selectedFile = postImageFiles[0];

        fileReader.readAsDataURL(selectedFile);
        fileReader.addEventListener("load", function () {
            imgPreviewDiv.innerHTML = `<img class='img-preview' id='imgPreview' width=100 src='${this.result}' />`;
        });

        imgButtonText.innerText = "Supprimer l'image";
        addImgInput.disabled = true;
        addImgLabel.onclick = removeImagePreview;

    }
}

function removeImagePreview() {
    console.info("remove image preview")
    imgPreviewDiv.innerHTML = "";
    imgButtonText.innerText = "Image";

    addImgLabel.removeEventListener("click", removeImagePreview);
    setTimeout(function() {
        addImgInput.disabled = false;
    }, 50)
}

async function report(postid: number){
    const reasonUser = prompt("Quel est le problème ?");
    
    if(reasonUser != null){
        let formData = new FormData
        formData.append('post_id', postid.toString());
        formData.append('reason', reasonUser);
    
        const response = await fetch("https://rmbi.ch/cesco/api/report.php", {
            method: "POST",
            body: formData
        });
    }


}


postContentEditorEl.addEventListener("input", onPostEditorChange);
