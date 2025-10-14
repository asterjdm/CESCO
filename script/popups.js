
function openPopup(id) {
    document.body.style.overflow = "hidden";

    const popup = document.getElementById(id);
    popup.classList.add("show");
}

function closePopup(id) {
    let hamburgerMenu = document.querySelector('.hamburger-menu');
    if (hamburgerMenu.classList.contains("active")) {
        hamburgerMenu.classList.toggle("active")
    }

    document.body.style.overflow = "auto";

    setTimeout(() => {
        const popup = document.getElementById(id)
        popup.classList.remove('show', 'closing');
    }, 250);
}

function openCommentsPopup(postId) {
    let postIdInput = document.getElementById("commentPostId");
    if (!postIdInput) {
        postIdInput = document.createElement("input");
        postIdInput.setAttribute("id", "commentPostId");
        postIdInput.type = "hidden";
        document.body.appendChild(postIdInput);
    }
    
    postIdInput.value = postId;
    

    openPopup("comments-popup");
    loadComments(postId);
}

function openUserPagePopup(userId) {
    let userIdInput = document.getElementById("userPageId");
    if (!userIdInput) {
        userIdInput = document.createElement("input");
        userIdInput.setAttribute("id", "userPageId");
        userIdInput.type = "hidden";
        document.body.appendChild(userIdInput);
    }
    
    userIdInput.value = userId;
    

    openPopup("userPage-popup");
    updateUserPage()
}