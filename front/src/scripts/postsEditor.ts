const editorPopup = document.getElementById("editor-popup") as HTMLDivElement;

const postLengthEl = document.getElementById("postLength") as HTMLElement;
const postContentEditorEl = document.getElementById("postContentEditorDiv") as HTMLDivElement;
const addImgInput = document.getElementById("imageUploadInput") as HTMLInputElement;
const imgPreviewDiv = editorPopup.querySelector("#imgPreviewDiv") as HTMLDivElement;
const imgButtonText = editorPopup.querySelector("#imgButtonText") as HTMLElement;
const addImgLabel = document.getElementById("imageBtnLabel") as HTMLInputElement;



export async function onPostEditorChange() {
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

// async function formateText(command: string, value: string) {
//     document.execCommand(command, false, value);
// }


export async function postsImageChangeHandler() {
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

async function removeImagePreview() {
    console.info("remove image preview")
    imgPreviewDiv.innerHTML = "";
    imgButtonText.innerText = "Image";

    addImgLabel.removeEventListener("click", removeImagePreview);
    setTimeout(function() {
        addImgInput.disabled = false;
    }, 50)
}

