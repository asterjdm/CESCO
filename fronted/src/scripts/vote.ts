import { sendVote } from "./sendVote";




export async function vote(postId: number, voteType: number) {
    const responseData = await sendVote(postId, voteType);
    
    const voteCounter = document.getElementById(`post_${postId}`)?.querySelector(`#votes_count_${voteType}`);
    
    if (voteCounter) {
        voteCounter.textContent = responseData.votes_count;
    }
}