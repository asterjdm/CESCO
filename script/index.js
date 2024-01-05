async function voteAndUpdatePost(postId, voteType) {
  await vote(postId, voteType);
  updatePost(postId);
}

function validateSignup(){
  let passwordInp = document.getElementById('passwordInput');
  let passwordValidationInp = document.getElementById('passwordValidationInput');
  

  if(passwordInp.value != passwordValidationInp.value) {
    passwordValidationInp.style.backgroundColor = "red";
    alert("Veuillez vérifier votre mot de passe.")
    return false
  }
}

var root = document.documentElement;
var savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  setDarkTheme();
} else {
  setLightTheme();
}


if (location.hostname != "localhost" && location.hostname != "127.0.0.1" && location.hostname != "0.0.0.0"){
  if (window.location.protocol != "https:") {
    window.location.protocol="https:";
  }
}