import config from "../../config.json";
import { Post } from "./interaces.ts"

export async function getPost(id?: number, index?: number): Promise<Post>
{
    const response = await fetch(`${config.api_base_url}posts.php`);
    const posts = await response.json();

    return posts;
}

export function formatePost(postData: Post): String
{
    let postHtml = /*html*/ `
        <div id='post_${postData.ID}' class="post-message">
            <div class="post-message-div">
                <img style='cursor: pointer;' class="post-message-div-picture" src="${postData.author_profile_picture}" width="55" height="55" alt="${postData.author} profile picture" onclick="openUserPagePopup(${USER_FK})">
                <div class="post-message-div-infos">
                    <p>${postData.author}</p>
                    <p>${postData.date}</p>
                </div>
            </div>

            <div class="post-message-text">
                ${postData.content}
            </div>
            <footer class="post-message-footer">
                <button class="post-message-footer-button except" onclick="openCommentsPopup(${postData.ID})" ><img class="post-message-footer-button-img" src="./images/comments.svg" alt="comment button"></button>
                <button class="post-message-footer-button" onclick="voteAndUpdatePost(${postData.ID}, 2)" ><img class="post-message-footer-button-img" src="./images/expandWhite.svg" alt="comment button"><p class="post-message-footer-button-text">${postData.votes_positives_count}</p></button>
                <button class="post-message-footer-button" onclick="voteAndUpdatePost(${postData.ID}, 1)" ><img class="post-message-footer-button-img" src="./images/middlevote.svg" alt="comment button"><p class="post-message-footer-button-text">${postData.votes_neutrals_count}</p></button>
                <button class="post-message-footer-button" onclick="voteAndUpdatePost(${postData.ID}, 0)" ><img class="post-message-footer-button-img" src="./images/downvote.svg" alt="comment button"><p class="post-message-footer-button-text">${postData.votes_negatives_count}</p></button>
                <button class="post-message-footer-button except" onclick="report(${postData.ID})"><img class="post-message-footer-button-img" src="./images/report.svg" alt="comment button"></button>
            </footer>
        </div>
    `

    return postHtml;
}