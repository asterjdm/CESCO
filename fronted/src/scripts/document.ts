const editorPopup = document.getElementById("editor-popup") as HTMLDivElement;
const imgPreviewDiv = editorPopup.querySelector("#imgPreviewDiv") as HTMLDivElement;
const imageInput = editorPopup.querySelector("#images-upload-input") as HTMLDivElement;
const imgButtonText = editorPopup.querySelector("#imgButtonText") as HTMLElement;

const postLengthEl = document.getElementById("postLength") as HTMLElement;
const postContentEditorEl = document.getElementById("postContentEditorDiv") as HTMLDivElement;
const addImgInput = document.getElementById("images-upload-input") as HTMLInputElement;
const addImgLabel = document.getElementById("imageBtnLabel") as HTMLInputElement;



if (!editorPopup || !editorPopup || !imageInput || !imageInput || !postLengthEl || !postContentEditorEl || !addImgLabel) {
    throw new Error("Elements not found.");
}


async function sendConnection() {
    const signinForm = document.getElementById("signinForm") as HTMLFormElement;

    if (!signinForm) return;

    const usernameInput = signinForm.querySelector("#usernameInput") as HTMLInputElement;
    const passwordInput = signinForm.querySelector("#passwordInput") as HTMLInputElement;

    if (!usernameInput || !passwordInput) return;

    const username = usernameInput.value;
    const password = passwordInput.value;

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    try {
        const response = await fetch(`https://rmbi.ch/cesco/api/connection.php`, {
            method: "POST",
            body: formData,
            credentials: "include"
        });

        const responseData = await response.json();

        if (responseData.success) {
            location.reload();
        } else {
            const signinPopup = document.getElementById("signin-popup") as HTMLElement;
            const messagePlace = signinPopup?.querySelector('#message') as HTMLElement;

            if (messagePlace) {
                console.log("fake password");
                messagePlace.innerHTML = "Mot de Passe ou Nom d'Utilisateur <strike>inkorècktte</strike> <b>incorrect</b> !";
            }
        }
    } catch (error) {
        console.error("Error during login:", error);
    }
}

async function sendNewPost() 
{
    const postContentEditor = postContentEditorEl.innerHTML;
    const postImageFiles = addImgInput.files;

    const formData = new FormData();
    formData.append('postContent', postContentEditor);

    if (postImageFiles && postImageFiles.length > 0) {
        formData.append('postImage', postImageFiles[0]);
    }

    try {
        const response = await fetch(`https://rmbi.ch/cesco/api/newPost.php`, {
            method: "POST",
            body: formData,
            credentials: "include"
        });

        const responseData = await response.json();

        if (responseData.success) {
            location.reload();
        } else {
            const messagePlace = editorPopup?.querySelector("#message") as HTMLElement;
            if (messagePlace) {
                messagePlace.innerHTML = "Un problème est survenu...";
            }
        }
    } catch (error) {
        console.error("Error during post creation:", error);
    }
}

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



postContentEditorEl.addEventListener("input", onPostEditorChange);
