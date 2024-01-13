import config from "../../config.json";
import { Post } from "./interfaces.ts"

export async function getPosts(max: number): Promise<[Post]>
{
    const response = await fetch(`${config.api_base_url}posts.php?max=${max}`);
    const posts = await response.json();

    return posts;
}


export function formatePost(postData: Post): HTMLDivElement {
    let postDiv = document.createElement('div');
    postDiv.id = `post_${postData.ID}`;
    postDiv.className = 'supra-post';

    let globalPostMessageDiv = document.createElement('div');
    globalPostMessageDiv.className = 'post-message';

    let postMessageDiv = document.createElement('div');
    postMessageDiv.className = 'post-message-div';

    let postMessageDivPicture = document.createElement('img');
    postMessageDivPicture.style.cursor = 'pointer';
    postMessageDivPicture.className = 'post-message-div-picture';
    postMessageDivPicture.src = postData.author_profile_picture;
    postMessageDivPicture.width = 55;
    postMessageDivPicture.height = 55;
    postMessageDivPicture.alt = `${postData.author} profile picture`;
    postMessageDivPicture.onclick// = () => openUserPagePopup(postData.USER_FK);

    let postMessageDivInfos = document.createElement('div');
    postMessageDivInfos.className = 'post-message-div-infos';

    let authorParagraph = document.createElement('p');
    authorParagraph.textContent = postData.author;

    let dateParagraph = document.createElement('p');
    dateParagraph.textContent = postData.date;

    postMessageDivInfos.appendChild(authorParagraph);
    postMessageDivInfos.appendChild(dateParagraph);

    let postMessageDivContent = document.createElement('div');
    postMessageDivContent.className = 'post-message-text';
    postMessageDivContent.innerHTML = postData.content;

    let postMessageFooter = document.createElement('footer');
    postMessageFooter.className = 'post-message-footer';

    let commentsButton = document.createElement('button');
    commentsButton.className = 'post-message-footer-button except';
    commentsButton.onclick// = () => openCommentsPopup(postData.ID);

    let commentsButtonImg = document.createElement('img');
    commentsButtonImg.className = 'post-message-footer-button-img';
    commentsButtonImg.src = './public/comments.svg';
    commentsButtonImg.alt = 'comment button';

    commentsButton.appendChild(commentsButtonImg);

    let positiveVotesButton = document.createElement('button');
    positiveVotesButton.id = `vote_2_button_${postData.ID}`;
    positiveVotesButton.className = 'post-message-footer-button';

    let positiveVotesButtonImg = document.createElement('img');
    positiveVotesButtonImg.className = 'post-message-footer-button-img';
    positiveVotesButtonImg.src = './public/expandWhite.svg';
    positiveVotesButtonImg.alt = 'comment button';

    let positiveVotesCount = document.createElement('p');
    positiveVotesCount.id = 'votes_count_2';
    positiveVotesCount.className = 'post-message-footer-button-text';
    positiveVotesCount.textContent = postData.votes_positives_count;

    positiveVotesButton.appendChild(positiveVotesButtonImg);
    positiveVotesButton.appendChild(positiveVotesCount);

    let neutralVotesButton = document.createElement('button');
    neutralVotesButton.id = `vote_1_button_${postData.ID}`;
    neutralVotesButton.className = 'post-message-footer-button';

    let neutralVotesButtonImg = document.createElement('img');
    neutralVotesButtonImg.className = 'post-message-footer-button-img';
    neutralVotesButtonImg.src = './public/middlevote.svg';
    neutralVotesButtonImg.alt = 'comment button';

    let neutralVotesCount = document.createElement('p');
    neutralVotesCount.id = 'votes_count_1';
    neutralVotesCount.className = 'post-message-footer-button-text';
    neutralVotesCount.textContent = postData.votes_neutrals_count;

    neutralVotesButton.appendChild(neutralVotesButtonImg);
    neutralVotesButton.appendChild(neutralVotesCount);

    let negativeVotesButton = document.createElement('button');
    negativeVotesButton.id = `vote_0_button_${postData.ID}`;
    negativeVotesButton.className = 'post-message-footer-button';

    let negativeVotesButtonImg = document.createElement('img');
    negativeVotesButtonImg.className = 'post-message-footer-button-img';
    negativeVotesButtonImg.src = './public/downvote.svg';
    negativeVotesButtonImg.alt = 'comment button';

    let negativeVotesCount = document.createElement('p');
    negativeVotesCount.id = 'votes_count_0';
    negativeVotesCount.className = 'post-message-footer-button-text';
    negativeVotesCount.textContent = postData.votes_negatives_count;

    negativeVotesButton.appendChild(negativeVotesButtonImg);
    negativeVotesButton.appendChild(negativeVotesCount);

    let reportButton = document.createElement('button');
    reportButton.className = 'post-message-footer-button except';
    reportButton.onclick// = () => report(postData.ID);

    let reportButtonImg = document.createElement('img');
    reportButtonImg.className = 'post-message-footer-button-img';
    reportButtonImg.src = './public/report.svg';
    reportButtonImg.alt = 'comment button';


    reportButton.appendChild(reportButtonImg);

    postMessageFooter.appendChild(commentsButton);
    postMessageFooter.appendChild(positiveVotesButton);
    postMessageFooter.appendChild(neutralVotesButton);
    postMessageFooter.appendChild(negativeVotesButton);
    postMessageFooter.appendChild(reportButton);

    postMessageDiv.appendChild(postMessageDivPicture);
    postMessageDiv.appendChild(postMessageDivInfos);

    globalPostMessageDiv.appendChild(postMessageDiv);
    globalPostMessageDiv.appendChild(postMessageDivContent);
    globalPostMessageDiv.appendChild(postMessageFooter);

    postDiv.appendChild(globalPostMessageDiv);

    return postDiv;
}

