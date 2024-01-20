


export async function updateSettings(newUsername: string|null, newPassword: string|null, oldPassword: string|null, newProfilePicture: File|null): Promise<any>
{
    // const newUsername = settingsUsername.value;
    // const newPassword = settingsNewPassword.value;
    // const oldPassword = settingsOldPassword.value;
    // const newProfilePictureFiles = settingsProfileImageInput.files as FileList;

    const formData = new FormData();

    if(newUsername) formData.append("username", newUsername);
    if(newPassword) formData.append("newPassword", newPassword);
    if(oldPassword) formData.append("oldPassword", oldPassword);

    if(newProfilePicture)
    {
        formData.append("profile_image", newProfilePicture)
    }

    const response = await fetch(`https://rmbi.ch/cesco/api/saveSettings.php`, {
        method: "POST",
        body: formData,
        credentials: "include"
    });

    const responseData = await response.json();


    return responseData;


    // if (responseData.success) {
    //     location.reload();
    // } else {
    //     const messagePlace = settingsPopup.querySelector("#message") as HTMLElement;
        

    //     switch (responseData.error){
    //         case "not connected":
    //             messagePlace.innerText = "Veuillez vous connectez";
    //             break;
    //         case "error" || "image error":
    //             messagePlace.innerText = "Une erreur s'est produite";
    //             break;
    //         case "banned username":
    //             messagePlace.innerText = "Votre nom d'utilisateur n'est pas acceptable";
    //             break;
    //         case "username already taken":
    //             messagePlace.innerText = "Votre nom d'utilisateur est déjà utilisé, veuillez en choisir un autre";
    //             break;
    //         case "username already taken":
    //             messagePlace.innerText = "Vote mot de passe est incorect";
    //             break;


    //     }
    // }
}