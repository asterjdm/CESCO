<script defer src="script/settings.js"></script>
<!-- <div id="settings-popup" class="popup">
    <div class="popup-content">
            <button class="circle-button popup-close" onclick="closePopup('settings-popup')">X</button>
            <h1 class="popup-title title-bug">Paramètres</h1>

            <form  enctype="multipart/form-data" action="api/saveSettings.php" method="post">

                <div class="top-settings">
                    <label id="imagePreview" class="file-upload-button">
                        <input id="profileImageInput" name="profile_image" type="file" class="file-input"/>
                    </label>
                     <p class="profile-text">Changer de photo de profil</p>
                </div>

                <label  class="settings-label" name="username">Changer nom d'utilisateur</label>
                <input maxlength="14" minlength=3 class="standart-input" type="text" name="username" placeholder="Nom d'utilisateur">
                


                <h3>Changer de mot de passe :</h3>


                <label class="settings-label" for="old-password">Mot de passe actuel</label>
                <input class="standart-input" type="password" name="old-password" placeholder="Mot de passe actuel">


                <label class="settings-label" for="password">Nouveau mot de passe</label>
                <input class="standart-input" minlength="8" maxlength="255" type="password" name="newPassword" placeholder="Nouveau mot de passe">
                

                <button type="submit" class="longed-button">Enregister</button>
                
            </form>
    </div>
</div> -->


<div id="settings-popup" class="popup">
    <div class="popup-content">
        <button class="popup-content-close" onclick="closePopup('settings-popup')"></button>

        <div id="popupContentLeft" class="popup-content-left">
            <h1 id="popupContentTitle" class="popup-content-title mini">Paramètres</h1>
            <br>
            <p style='color:aliceblue;'><b><?php echo $_GET["message"]; ?></b></p>
        </div>

        <div id="popupContentRight" class="popup-content-right">

            <form  enctype="multipart/form-data" action="api/saveSettings.php" method="post">

                <div class="popup-content-inputbox">
                    <input name="username" maxlength="14" minlength=3 class="popup-content-inputbox-input" type="text">
                    <span class="popup-content-inputbox-span">Changer nom d'utilisateur</span>
                </div>
                <div class="popup-content-inputbox">
                    <input minlength="8" maxlength="255" name="newPassword" placeholder="Nouveau mot de passe" class="popup-content-inputbox-input" type="password" required="required">
                    <span class="popup-content-inputbox-span">Changer mot de passe</span>
                </div>
                <div class="popup-content-inputbox">
                    <input name="old-password" class="popup-content-inputbox-input" type="password">
                    <span class="popup-content-inputbox-span">Mot de passe actuel</span>
                </div>

                <label id="imagePreview" class="file-upload-button">
                    <input id="profileImageInput" class="file-upload-input" name="profile_image" type="file">
                    <span class="popup-content-inputbox-span">Changer d'image de profile</span>
                </label>

                <button type="submit" class="popup-content-button">Enregistrer</button>     

            </form>
        </div>

    </div>
</div>
