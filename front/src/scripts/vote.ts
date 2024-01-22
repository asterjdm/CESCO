import { sendVote } from "./sendVote";




export async function vote(postId: number, voteType: number) {
    const responseData = await sendVote(postId, voteType);
    const postList = document.querySelectorAll(`#post_${postId}`);

    postList.forEach((post) => {
        const voteCounter = post.querySelector(`#votes_count_${voteType}`) as HTMLElement;
        voteCounter.textContent = responseData.votes_count;
        
    });
    

}