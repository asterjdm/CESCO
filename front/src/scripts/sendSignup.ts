

export async function sendSignup(username: string, password: string): Promise<any>
{
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const response = await fetch(`api/new_user.php`, {
        method: "POST",
        body: formData,
        credentials: "include"
    });

    const responseData = await response.json();

    return responseData;


}