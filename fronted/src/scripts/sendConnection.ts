

export async function sendConnection(username: string, password: string): Promise<any>
{
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const response = await fetch(`https://rmbi.ch/cesco/api/connection.php`, {
        method: "POST",
        body: formData,
        credentials: "include"
    });

    const responseData = await response.json();

    return responseData;
    
    // if (responseData.success) {
    //     location.reload();
    // } else {
    //     const signinPopup = document.getElementById("signin-popup") as HTMLElement;
    //     const messagePlace = signinPopup?.querySelector('#message') as HTMLElement;

    //     if (messagePlace) {
    //         console.log("fake password");
    //         messagePlace.innerHTML = "Mot de Passe ou Nom d'Utilisateur <strike>inkorècktte</strike> <b>incorrect</b> !";
    //     }
    // }

}