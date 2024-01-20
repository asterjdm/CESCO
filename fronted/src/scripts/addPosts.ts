import { formatePost, getPosts } from "./getPosts";
import { Post } from "./interfaces";

export async function addPosts(placeId: string, max: number|null, userId: number|null) {  
    const postsPlace = document.getElementById(placeId);

    if (!postsPlace) {
        throw new Error("Posts place Id is null");
    }

    const postsData = await getPosts(max, userId);

    let postDiv: HTMLDivElement;

    postsData.forEach(async (post: Post) => {
        postDiv = await formatePost(post);
        postsPlace.appendChild(postDiv);
    });
}
