const postContentEditor = document.getElementById("postContentEditorDiv")
 

async function sendConnection() 
{
    const signinForm = document.getElementById("signinForm");


    if (!signinForm) return;

    const usernameInput: HTMLInputElement | null = signinForm.querySelector("#usernameInput");
    const passwordInput: HTMLInputElement | null = signinForm.querySelector("#passwordInput");
    
    if (!usernameInput || !passwordInput) {
        return;
    }
    
    const username = usernameInput.value;
    const password = passwordInput.value;
    
    
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
        

    const response = await fetch(`https://rmbi.ch/cesco/api/connection.php`, {
        method: "POST",
        body: formData,
        credentials: "include"
    });

    const responseData = await response.json();

    if (responseData.success)
    {
        location.reload();
    } else {
        const signinPopup: HTMLElement | null = document.getElementById("signin-popup");

        if (!signinPopup) return;

        const messagePlace: HTMLElement | null = signinPopup.querySelector('#message');
        
        console.log("fake pasword")
        if (!messagePlace) return;

        messagePlace.innerHTML = "Mot de Passe ou Nom d'Utilisateur <strike>incorèkte</strike> <b>incorrect</b> !";
        
    }
}



async function sendNewPost() 
{

    const editorForm = document.getElementById("editorForm");

    if (!editorForm) return;

    const postImageEl: HTMLInputElement | null = editorForm.querySelector("#images-upload");
    const postContentEditorEl = document.getElementById("postContentEditorDiv")
    
    if (!postImageEl || !postContentEditorEl) {
        return;
    }


    const postContentEditor = postContentEditorEl.innerHTML;
    const postImageFiles: FileList|null = postImageEl.files;

    const formData = new FormData();


    formData.append('postContent', postContentEditor);

    if (postImageFiles != null && postImageFiles.length > 0) {
        formData.append('postImage', postImageFiles[0]);
    }
    
    const response = await fetch(`https://rmbi.ch/cesco/api/newPost.php`, {
        method: "POST",
        body: formData,
        credentials: "include"
    });

    const responseData = await response.json();

    if (responseData.success)
    {
        location.reload();
    } else {
        const messagePlace = editorForm.querySelector("#message");
        if (messagePlace == null) { return; }
        messagePlace.innerHTML = "Un problème est survenu...";
    }
}


async function onPostEditorChange(e: Event)
{
    console.log("post change")
    const postLengthEl = document.getElementById("postLength");

    const { target } = e;
    if (!target) return;

    const postLength = (target as HTMLDivElement).innerHTML.length;

    if(!postLengthEl) return;

    postLengthEl.innerText = `${postLength.toString()}/500`;

    const submitPostButton = document.getElementById("newPostSubmitButton") as HTMLButtonElement
    if(!submitPostButton) return;
    if (postLength > 500)
    {
        postLengthEl.style.color = "red";

        submitPostButton.disabled = true
    } else {
        postLengthEl.style.color = "black";
        submitPostButton.disabled = false;
    }
}

postContentEditor?.addEventListener("keyup", onPostEditorChange);