async function formatPosts(posts, withPostDiv, isModerator) {
    let html = '';

    for (const post of posts) {
        const postHtml = await formatPost(post.content, post.author, post.date, post.ID, post.votes_positives_count, post.votes_neutrals_count, post.votes_negatives_count, isModerator, post.author_profile_picture, post.author_grade, post.USER_FK);
       
        if (withPostDiv) {
            const postDiv = document.createElement('div');
            postDiv.setAttribute("id", "post_" + post.ID);
            postDiv.classList.add("supra-post");
            postDiv.innerHTML = postHtml;
            html += postDiv.outerHTML;
        } else {
            html += postHtml;
        }
    }

    return html;
}

async function formatPost(content, author, date, ID, positivesVotes, neutralVotes, negativeVotes, isModerator, profilePictUrl, authorGrade, USER_FK) {
    let moderatorActionButton = isModerator ? `<button onclick="window.location.href='api/removePost.php?post_id=${ID}'" class="circle-button"><p class="action-button-text">X</p></button>` : "";

    if (authorGrade === "founder") {
        author += "🚀👨‍💻🌟";
    } else if (authorGrade === "moderator") {
        author += "👨‍💻";
    }
    return `
        <div id='post_${ID}' class="post-message">
            <div class="post-message-div">
                <img style='cursor: pointer;' class="post-message-div-picture" src="${profilePictUrl}" width="55" height="55" alt="${author} profile picture" onclick="openUserPagePopup(${USER_FK})">
                <div class="post-message-div-infos">
                    <p>${author}</p>
                    <p>${date}</p>
                </div>
            </div>

            <div class="post-message-text">
                ${content}
            </div>
            <footer class="post-message-footer">
                <button class="post-message-footer-button except" onclick="openCommentsPopup(${ID})" ><img class="post-message-footer-button-img" src="./images/comments.svg" alt="comment button"></button>
                <button class="post-message-footer-button" onclick="voteAndUpdatePost(${ID}, 2)" ><img class="post-message-footer-button-img" src="./images/expandWhite.svg" alt="comment button"><p class="post-message-footer-button-text">${positivesVotes}</p></button>
                <button class="post-message-footer-button" onclick="voteAndUpdatePost(${ID}, 1)" ><img class="post-message-footer-button-img" src="./images/middlevote.svg" alt="comment button"><p class="post-message-footer-button-text">${neutralVotes}</p></button>
                <button class="post-message-footer-button" onclick="voteAndUpdatePost(${ID}, 0)" ><img class="post-message-footer-button-img" src="./images/downvote.svg" alt="comment button"><p class="post-message-footer-button-text">${negativeVotes}</p></button>
                <button class="post-message-footer-button except" onclick="report(${ID})"><img class="post-message-footer-button-img" src="./images/report.svg" alt="comment button"></button>
                ${moderatorActionButton}
            </footer>
        </div>
    `
}

async function updatePost(ID) {
    const posts = await getPosts(null, null, null, ID);
    const session = await getSessionInfo();
    const isModerator = session.isModerator;
    const formattedPosts = await formatPosts(posts, true, isModerator);
    document.getElementById("post_" + ID).innerHTML = formattedPosts;

}

async function loadPosts(sortby, searchQuery, userId, showOnlyFollowed, postPlaceId) {
    console.log("loading posts");

    const posts = await getPosts(sortby, searchQuery, userId, null, showOnlyFollowed);
    const session = await getSessionInfo();
    const isModerator = session.isModerator;
    const formattedPosts = await formatPosts(posts, true, isModerator);
    document.getElementById(postPlaceId).innerHTML = formattedPosts;
}

function isElementExist(element) {
    return typeof(element) != 'undefined' && element != null;
}
