import {getPosts, formatePost} from "./getPosts.ts";
import { Post } from "./interfaces.ts";


async function loadPosts(placeId: string, max: number)
{  
    const postsPlace = document.getElementById(placeId);

    if (postsPlace === null)
    {
        throw "Posts place Id is null"
    }

    const postsData = await getPosts(max);

    let postHtml: string = "";

    postsData.forEach((post: Post) => {
        postHtml += formatePost(post);
    });

    postsPlace.innerHTML += postHtml;
}

loadPosts("postsPlace", 30)