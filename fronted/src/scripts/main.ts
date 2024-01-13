import { getPosts, formatePost } from "./getPosts.ts";
import { Post } from "./interfaces.ts";
import config from "../../config.json";
import { sendVote } from "./sendVote.ts";

async function loadPosts(placeId: string, max: number) {  
    const postsPlace = document.getElementById(placeId);

    if (!postsPlace) {
        throw new Error("Posts place Id is null");
    }

    const postsData = await getPosts(max);

    let postDiv: HTMLDivElement;

    postsData.forEach((post: Post) => {
        postDiv = formatePost(post);
        postsPlace.appendChild(postDiv);
    });
}

export async function vote(postId: number, voteType: number) {
    sendVote(postId, voteType);
    
    const voteCounter = document.getElementById(`post_${postId}`)?.querySelector(`#votes_count_${voteType}`);
    
    if (voteCounter) {
        voteCounter.textContent = (Number(voteCounter.textContent) + 1).toString();
    }
}

loadPosts("postsPlace", 30);
