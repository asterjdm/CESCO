import { loadCommments } from "./loadCommments";
import { openPopup } from "./popups";
import { submitComment } from "./submitComment";


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