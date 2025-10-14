async function loadComments(postId){
    const post = await getPosts(null, null, null, postId);
    console.log(post[0]);
    const session = await getSessionInfo();
    const isModerator = session.isModerator;
    const comments = post[0].comments
    console.log(comments)
    const formattedComments = formateComments(comments, isModerator)
    document.getElementById("commentsContainer").innerHTML = formattedComments
}

function formateComments(comments, isModerator) {
    let html = '';
    let commentsHtml
    comments.forEach(comment => {
        commentsHtml = formateComment(comment);
        html += commentsHtml
    });
    
    return html;
}

function formateComment(data){
    let author = data.author
    if(data.author_grade == "founder"){
        author += "🚀🌟";
    }else if(data.author_grade == "moderator"){
        author += "👨‍💻";
    }

    // return `
    // <section class="comment">
    //     <div class="comment-top">
    //         <a href='index.php?p=user&id=${USER_FK}'>
    //             <img src="${profilePictureUrl}" alt="user profile picture" class="comment-top-profile">
    //         </a>
    //         <div class="comment-top-username-date">
    //             <a href='index.php?p=user&id=${USER_FK}'>
    //                 <p class="comment-top-username">${author}</p>
    //             </a>
    //             <p class="comment-top-date">${datetime}</p>
    //         </div>
    //     </div>
    //     <p class="comment-content">${content}</p>
    //     <div class="line"></div>
    // </section>
    // `


    // comment.content, comment.author, comment.datetime,  comment.author_profile_picture, isModerator, comment.author_grade, comment.USER_FK

    return `
        <div class="chat-message">
            <div class="chat-message-div">
                <img  class="chat-message-div-picture" src="${data.author_profile_picture}" alt="${data.author} profile picture">
                <div class="chat-message-div-infos">
                    <p>${author}</p>
                    <p>${data.datetime}</p>
                </div>
            </div>
            <div class="chat-message-text">${data.content}</div>
        </div>

    `
}