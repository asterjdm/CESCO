
const sortBy = document.getElementById("sortSelector")
const searchInput = document.getElementById("searchInput")
const refreshButton = document.getElementById("refreshButton")
const showOnlyFollowedCheckbox = document.getElementById("showOnlyFollowedCheckbox")
const showOnlyFollowedDiv= document.getElementById("showOnlyFollowedDiv")

async function isLoggedin(){
    let session = await getSessionInfo()
    return session.userId != null
}

async function init(){
    loadPosts("latest", searchInput.value, null, false, "posts");

    if(!await isLoggedin() && isElementExist(showOnlyFollowedDiv)){
        showOnlyFollowedDiv.style.display = 'none'
    }
    
    if(isElementExist(sortBy)) {
        sortBy.addEventListener("change", function(e){
            loadPosts(e.target.value, searchInput.value, null, showOnlyFollowedCheckbox.checked, "posts")
        })
    }   
    
    if(isElementExist(searchInput)) {
        searchInput.addEventListener("input", function(e){
            let searchQ = e.target.value
            loadPosts("", searchInput.value, null, showOnlyFollowedCheckbox.checked, "posts")
    
        })
    }
    
    if(isElementExist(refreshButton)) {
        refreshButton.addEventListener("click", function(e){
            loadPosts(sortBy.value, searchInput.value, null, showOnlyFollowedCheckbox.checked, "posts")
        });
    }
    
    if(isElementExist(showOnlyFollowedCheckbox)) {
        showOnlyFollowedCheckbox.addEventListener("click", function(e){
            loadPosts(sortBy.value, searchInput.value, null, e.target.checked, "posts")
        });
    }
    
}

init()