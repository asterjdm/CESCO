import { amIconnected } from "./amIconnected.ts";
import { sendConnection } from "./sendConnection.ts";
import { sendNewPost } from "./sendNewPost.ts";
import { updateSettings } from "./sendSettings.ts";
import { onPostEditorChange, postsImageChangeHandler } from "./postsEditor.ts";
import { addPosts } from "./addPosts.ts";
import { closePopup, openPopup } from "./popups.ts";

const submitConnectionButton = document.getElementById("submitConnectionButton") as HTMLButtonElement;
const submitNewPostButton = document.getElementById("newPostSubmitButton") as HTMLButtonElement
const submitSettingsButton = document.getElementById("submitSettingsButton") as HTMLButtonElement

const connectionPopup = document.getElementById("signin-popup") as HTMLDivElement;
const newPostPopup = document.getElementById("editor-popup") as HTMLDivElement;
const settingsPopup = document.getElementById("settings-popup") as HTMLDivElement;

const newPostEditorDiv = newPostPopup.querySelector("#postContentEditorDiv") as HTMLDivElement;
const imageUploadInput = newPostPopup.querySelector("#imageUploadInput") as HTMLInputElement;

const newPostButton = document.getElementById("newPostButton") as HTMLButtonElement;
const settingsButton = document.getElementById("settingsButton") as HTMLButtonElement;
const signinButton = document.getElementById("signinButton") as HTMLButtonElement;
const signupButton = document.getElementById("signupButton") as HTMLButtonElement;
const alreadyHaveAccountButton = document.getElementById("alreadyHaveAccountButton") as HTMLButtonElement;
const noAccountButton = document.getElementById("noAccountButton") as HTMLButtonElement;


newPostButton.onclick = () => openPopup("editor-popup");
settingsButton.onclick = () => openPopup("settings-popup");
signinButton.onclick = () => openPopup("signin-popup");
signupButton.onclick = () => openPopup("signup-popup");

alreadyHaveAccountButton.addEventListener("click", async function() {
    closePopup("signup-popup");
    openPopup("signin-popup");
})


noAccountButton.addEventListener("click", async function() {
    closePopup("signin-popup");
    openPopup("signup-popup");
})

async function main()
{
    addPosts("postsPlace", 30, null);

    const isConnected = await amIconnected();
    
    if(isConnected) {
        const loggedButtonsList: NodeListOf<HTMLElement> = document.querySelectorAll("#loggedButtons");

        loggedButtonsList.forEach(async loggedButtons => {
                loggedButtons.style.display = "block";
        });

    } else {

        const guestButtonsList: NodeListOf<HTMLElement> = document.querySelectorAll("#guestButtons");
        
        guestButtonsList.forEach(async guestButtons => {
            guestButtons.style.display = "block";
        });
    }



}


main();


submitConnectionButton.addEventListener("click", async function () 
{
    const usernameInput = connectionPopup.querySelector("#usernameInput") as HTMLInputElement;
    const passwordInput = connectionPopup.querySelector("#passwordInput") as HTMLInputElement;

    const username = usernameInput.value;
    const password = passwordInput.value;

    const response = await sendConnection(username, password);

    if (response.success) {
        location.reload();
    } else {
        const messagePlace = connectionPopup.querySelector('#message') as HTMLElement;

        if (messagePlace) {
            console.log("fake password");
            messagePlace.innerHTML = "Mot de Passe ou Nom d'Utilisateur <strike>inkorècktte</strike> <b>incorrect</b> !";
        }
    }

});

submitNewPostButton.addEventListener("click", async function()
{
    const imagesInput = newPostPopup.querySelector("#imageUploadInput") as HTMLInputElement;

    const imagesFiles = imagesInput.files as FileList;
    let uploadImageFile;

    if (imagesFiles.length >= 1) {
        uploadImageFile = imagesFiles[0];
    } else {
        uploadImageFile = null;
    }

    const postContent = newPostEditorDiv.innerHTML;

    const response = await sendNewPost(postContent, uploadImageFile);

    if (response.success) {
        location.reload();
    } else {
        const messagePlace = newPostPopup.querySelector("#message") as HTMLElement;
        if (messagePlace) {
            messagePlace.innerHTML = "Un problème est survenu...";
        }
    }
});

submitSettingsButton.addEventListener("click", async function() {
    const newUsernameInput = settingsPopup.querySelector("#newUsernameInput") as HTMLInputElement;
    const newPasswordInput = settingsPopup.querySelector("#newPasswordInput") as HTMLInputElement;
    const oldPasswordInput = settingsPopup.querySelector("#oldPasswordInput") as HTMLInputElement;
    const profileImageInput = settingsPopup.querySelector("#profileImageInput") as HTMLInputElement;

    const newUsername = newUsernameInput.value;
    const newPassword = newPasswordInput.value;
    const oldPassword = oldPasswordInput.value;
    const profileImageFiles = profileImageInput.files as FileList;

    let response: any

    if(profileImageFiles.length >= 1)
    {
        response = await updateSettings(newUsername, newPassword, oldPassword, profileImageFiles[0]);
    } else {
        response = await updateSettings(newUsername, newPassword, oldPassword, null);
    }

    if (response.success) {
        location.reload();
    } else {
        const messagePlace = settingsPopup.querySelector("#message") as HTMLElement;
        

        switch (response.error){
            case "not connected":
                messagePlace.innerText = "Veuillez vous connectez";
                break;
            case "error" || "image error":
                messagePlace.innerText = "Une erreur s'est produite";
                break;
            case "banned username":
                messagePlace.innerText = "Votre nom d'utilisateur n'est pas acceptable";
                break;
            case "username already taken":
                messagePlace.innerText = "Votre nom d'utilisateur est déjà utilisé, veuillez en choisir un autre";
                break;
            case "incorrect password":
                messagePlace.innerText = "Vote mot de passe est incorect";
                break;


        }
    }


})

newPostEditorDiv.addEventListener("input", onPostEditorChange)
imageUploadInput.addEventListener("change", postsImageChangeHandler)