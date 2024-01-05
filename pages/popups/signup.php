<div id="signup-popup" class="popup">
    <div class="popup-content">
        <button class="popup-content-close" onclick="closePopup('signup-popup')"></button>
        <div id="popupContentLeft" class="popup-content-left">
            <h1 id="popupContentTitle" class="popup-content-title">Inscription</h1>
            <a id="popupContentLink" class="popup-content-link" onclick="closePopup('signup-popup'); openPopup('signin-popup')">Pas de compte ?</a>
            <br>
            <p style='color:aliceblue;'><b><?php echo $_GET["message"]; ?></b></p>
        </div>
        <div id="popupContentRight" class="popup-content-right">
            <form action="api/newUser.php" method="post" onsubmit="return validateSignup()">
                <div class="popup-content-inputbox">
                    <input name="username" class="popup-content-inputbox-input" type="text" required="required">
                    <span class="popup-content-inputbox-span">Nom d'utilisateur</span>
                </div>
                <div class="popup-content-inputbox">
                    <input id="passwordInput" name="password" class="popup-content-inputbox-input" type="password" required="required">
                    <span class="popup-content-inputbox-span">Mot de passe</span>
                </div>
                <div class="popup-content-inputbox">
                    <input id="passwordValidationInput" class="popup-content-inputbox-input" type="password" required="required">
                    <span class="popup-content-inputbox-span">Confirmer le mot de passe</span>
                </div>
                <button type="submit" class="popup-content-button">Connexion</button>        
            </form>
        </div>
    </div>
</div>
