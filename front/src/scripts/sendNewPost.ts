



export async function sendNewPost(postContent: string, postImageFile: File|null): Promise<any>
{

    const formData = new FormData();
    formData.append('postContent', postContent);

    if(postImageFile){
        formData.append('postImage', postImageFile);

    }
 
    const response = await fetch(`https://rmbi.ch/cesco/api/newPost.php`, {
        method: "POST",
        body: formData,
        credentials: "include"
    });

    const responseData = await response.json();

    return responseData


}