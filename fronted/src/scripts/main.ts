import { getPosts, formatePost } from "./getPosts.ts";
import { Post, PostComment } from "./interfaces.ts";
import { sendVote } from "./sendVote.ts";
import { amIconnected } from "./amIconnected.ts";
import { getComments, formateComment } from "./getComments.ts";
import { submitComment } from "./submitComment.ts";
import { sendConnection } from "./sendConnection.ts";
import { sendNewPost } from "./sendNewPost.ts";
import { updateSettings } from "./sendSettings.ts";


const submitConnectionButton = document.getElementById("submitConnectionButton") as HTMLButtonElement;
const submitNewPostButton = document.getElementById("newPostSubmitButton") as HTMLButtonElement
const submitSettingsButton = document.getElementById("submitSettingsButton") as HTMLButtonElement


async function loadPosts(placeId: string, max: number) {  
    const postsPlace = document.getElementById(placeId);

    if (!postsPlace) {
        throw new Error("Posts place Id is null");
    }

    const postsData = await getPosts(max);

    let postDiv: HTMLDivElement;

    postsData.forEach(async (post: Post) => {
        postDiv = await formatePost(post);
        postsPlace.appendChild(postDiv);
    });
}

export async function vote(postId: number, voteType: number) {
    const responseData = await sendVote(postId, voteType);
    
    const voteCounter = document.getElementById(`post_${postId}`)?.querySelector(`#votes_count_${voteType}`);
    
    if (voteCounter) {
        voteCounter.textContent = responseData.votes_count;
    }
}

export async function openCommentsPopup(postId: number)
{
    const submitCommentButton = document.getElementById("submitCommentButton") as HTMLButtonElement;
    const commentsPlace = document.getElementById("commentsContainer") as HTMLDivElement;
    const commentTextInput = document.getElementById("commentTextInput") as HTMLInputElement;

    openPopup("comments-popup");

    submitCommentButton.onclick = ()=> {
        submitComment(postId, commentTextInput.value)
        commentTextInput.value = "";
        loadCommments(postId, commentsPlace);
    };

    loadCommments(postId, commentsPlace)


}

export async function loadCommments(postId: number, commentsPlace: HTMLDivElement)
{
    
    const comments: [PostComment] = await getComments(postId);

    let commentEl: HTMLDivElement;

    commentsPlace.innerHTML = "";
    comments.forEach(async (comment: PostComment) => {
        commentEl = await formateComment(comment);
        commentsPlace.appendChild(commentEl);
    });
}



async function main()
{
    loadPosts("postsPlace", 30);

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


    submitConnectionButton.addEventListener("click", async function (event: Event) 
    {
        const connectionPopup = document.getElementById("signin-popup") as HTMLDivElement;

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

    submitNewPostButton.addEventListener("click", async function(event)
    {
        const newPostPopup = document.getElementById("editor-popup") as HTMLDivElement;
        const editorDiv = newPostPopup.querySelector("#postContentEditorDiv") as HTMLDivElement;
        const imagesInput = newPostPopup.querySelector("#imageUploadInput") as HTMLInputElement;

        const imagesFiles = imagesInput.files as FileList;
        let uploadImageFile;

        if (imagesFiles.length >= 1) {
            uploadImageFile = imagesFiles[0];
        } else {
            uploadImageFile = null;
        }

        const postContent = editorDiv.innerHTML;

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
        const settingsPopup = document.getElementById("settings-popup") as HTMLDivElement;
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
}


main();