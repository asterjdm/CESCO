import { getComments, formateComment } from "./getComments.ts";
import { PostComment } from "./interfaces";

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