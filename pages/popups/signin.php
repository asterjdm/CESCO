<div id="signin-popup" class="popup">
    <div class="popup-content">
        <button class="popup-content-close" onclick="closePopup('signin-popup')"></button>

        <div class="popup-content-left">
            <h1 class="popup-content-title">Connexion</h1>
            <a class="popup-content-link" onclick="closePopup('signin-popup'); openPopup('signup-popup')">Pas de compte ?</a>
            <br>
            <p style='color:aliceblue;'><b><?php echo $_GET["message"]; ?></b></p>
        </div>

        <div class="popup-content-right">
            <form action="api/connection.php" method="post">
                <div class="popup-content-inputbox">
                    <input name="username" class="popup-content-inputbox-input" type="text" required="required">
                    <span class="popup-content-inputbox-span">Nom d'utilisateur</span>
                </div>
                <div class="popup-content-inputbox">
                    <input name="password" class="popup-content-inputbox-input" type="password" required="required">
                    <span class="popup-content-inputbox-span">Mot de passe</span>
                </div>
                <button type="submit" class="popup-content-button">Connexion</button>        
            </form>            
        </div>
    </div>
</div>
