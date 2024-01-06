import {getPost, formatePost} from "./getPosts.ts";


async function loadPost(placeId: string, postId?: number, index?: number)
{  
    const postsPlace = document.getElementById(placeId);
    
    let postsData;

    if (typeof postId !== "undefined")
    {
        postsData = await getPost(postId);
    }
    else if (typeof index !== "undefined")
    {
        postsData = await getPost(undefined, index);
    }
    else {
        throw new Error("Post index or ID is not specified");
    }
     
    const postHtml: String = formatePost(postsData);
    
    
}