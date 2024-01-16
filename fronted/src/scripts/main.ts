import { getPosts, formatePost } from "./getPosts.ts";
import { Post, PostComment } from "./interfaces.ts";
import { sendVote } from "./sendVote.ts";
import { amIconnected } from "./amIconnected.ts";
import { getComments, formateComment } from "./getComments.ts";
import { submitComment } from "./submitComment.ts";



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
}



main();