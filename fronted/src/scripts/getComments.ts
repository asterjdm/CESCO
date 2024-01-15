import { PostComment } from "./interfaces";

export async function getComments(postId: number): Promise<[PostComment]>
{
    const response = await fetch(`https://rmbi.ch/cesco/api/posts.php?id=${postId}`);
    const post = await response.json();
    const comments = await post[0].comments
    console.log(comments);
    return comments;
}

export async function formateComment(comment: PostComment): Promise<HTMLDivElement> {
    
    const commentDiv = document.createElement('div');
    commentDiv.className = 'chat-message';

    const commentDivContainer = document.createElement('div');
    commentDivContainer.className = 'chat-message-div';

    const profilePicture = document.createElement('img');
    profilePicture.className = 'chat-message-div-picture';
    profilePicture.src = comment.author_profile_picture;
    profilePicture.alt = comment.author + ' profile picture';

    const commentInfosDiv = document.createElement('div');
    commentInfosDiv.className = 'chat-message-div-infos';

    const authorName = document.createElement('p');
    authorName.textContent = comment.author;

    const commentDatetime = document.createElement('p');
    commentDatetime.textContent = comment.datetime;

    commentInfosDiv.appendChild(authorName);
    commentInfosDiv.appendChild(commentDatetime);

    commentDivContainer.appendChild(profilePicture);
    commentDivContainer.appendChild(commentInfosDiv);

    const commentText = document.createElement('div');
    commentText.className = 'chat-message-text';
    commentText.textContent = comment.content;

    commentDiv.appendChild(commentDivContainer);
    commentDiv.appendChild(commentText);

    return commentDiv;
}
