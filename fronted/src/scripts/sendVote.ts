
export async function sendVote(postId: number, voteType: number): Promise<any>
{
    const formData = new FormData();

    formData.append('post_id', postId.toString());
    formData.append('type', voteType.toString());

    const response = await fetch(`https://rmbi.ch/cesco/api/newVote.php`, {
        method: "POST",
        body: formData,
        credentials: "include"
    });

    const responseData = await response.json();
    
    return responseData;
}

