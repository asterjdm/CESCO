import { Post } from "./interfaces.ts"
import { vote } from "./vote.ts";
import { openCommentsPopup } from "./openCommentsPopup.ts";
import { report } from "./report.ts";
import { openUserProfile } from "./openUserProfile.ts";




export async function getPosts(max: number|null, userId: number|null): Promise<[Post]>
{
    const urlParams = new URLSearchParams();

    if (max) {
        urlParams.append('max', max.toString());
    }
    if (userId) {
        urlParams.append('userId', userId.toString());
    }

    const response = await fetch(`api/posts.php?${urlParams}`, {
        method: "GET"
    });

    const posts = await response.json();

    return posts;
}


export async function formatePost(postData: Post): Promise<HTMLDivElement> {
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
    postMessageDivPicture.onclick = () => openUserProfile(Number(postData.USER_FK));

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
    commentsButton.onclick = () => openCommentsPopup(Number(postData.ID));

    let commentsButtonImg = document.createElement('img');
    commentsButtonImg.className = 'post-message-footer-button-img';
    commentsButtonImg.src = './public/comments.svg';
    commentsButtonImg.alt = 'comment button';

    commentsButton.appendChild(commentsButtonImg);

    let positiveVotesButton = document.createElement('button');
    positiveVotesButton.id = `vote_2_button_${postData.ID}`;
    positiveVotesButton.className = 'post-message-footer-button';
    positiveVotesButton.onclick = () => vote(Number(postData.ID), 2)

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
    neutralVotesButton.onclick = () => vote(Number(postData.ID), 1)

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
    negativeVotesButton.onclick = () => vote(Number(postData.ID), 0)
    
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
    reportButton.onclick = () => report(Number(postData.ID));

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

