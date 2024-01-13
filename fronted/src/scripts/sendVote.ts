import config from "../../config.json";




export async function sendVote(postId: number, voteType: number)
{
    const formData = new FormData();

    formData.append('post_id', postId.toString());
    formData.append('type', voteType.toString());

    const response = await fetch(`${config.api_base_url}newVote.php`, {
        method: "POST",
        body: formData
    });

    const responseData = await response.json();
}