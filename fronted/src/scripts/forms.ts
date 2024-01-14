async function sendConnection() {
    const signinForm = document.getElementById("signinForm");


    if (!signinForm) return;

    const usernameInput: HTMLInputElement | null = signinForm.querySelector("#usernameInput");
    const passwordInput: HTMLInputElement | null = signinForm.querySelector("#passwordInput");
    
    if (!usernameInput || !passwordInput) {
        return;
    }
    
    const username = usernameInput.value;
    const password = passwordInput.value;
    
    
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
        

    const response = await fetch(`https://rmbi.ch/cesco/api/connection.php`, {
        method: "POST",
        body: formData,
        credentials: "include"
    });

    const responseData = await response.json();

    if (responseData.success)
    {
        location.reload();
    } else {
        const signinPopup: HTMLElement | null = document.getElementById("signin-popup");

        if (!signinPopup) return;

        const messagePlace: HTMLElement | null = signinPopup.querySelector('#message');
        
        console.log("fake pasword")
        if (!messagePlace) return;
        
        messagePlace.innerHTML = "Mot de Passe ou Nom d'Utilisateur <strike>incorèkte</strike> <b>incorrect</b> !";
        
    }
}
