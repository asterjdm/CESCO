

export async function submitComment(postId: number, commentContent: string)
{
    let formData = new FormData();

    formData.append('postId', postId.toString());
    formData.append('commentContent', commentContent);

    /*const response = */await fetch("api/newComment.php", {
        method: "POST",
        body: formData,
        credentials: "include"
    });

    // const data = await response.json()
}