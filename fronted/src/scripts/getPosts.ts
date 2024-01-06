import config from "../../config.json";
import { Post } from "./interfaces.ts"

export async function getPosts(max: number): Promise<[Post]>
{
    const response = await fetch(`${config.api_base_url}posts.php?max=${max}`);
    const posts = await response.json();

    return posts;
}

export function formatePost(postData: Post): string
{
    let postHtml = /*html*/ `
        <div id="post_${postData.ID}" class="supra-post">
            <div class="post-message">
                <div class="post-message-div">
                    <img style='cursor: pointer;' class="post-message-div-picture" src="${postData.author_profile_picture}" width="55" height="55" alt="${postData.author} profile picture" onclick="openUserPagePopup(${postData.USER_FK})">
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
        </div>
    `

    return postHtml;
}