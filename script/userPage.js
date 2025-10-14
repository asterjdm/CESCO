const usernamePlace = document.getElementById('username');
const profilePicturePlace = document.getElementById('profilePicture');
const followButton = document.getElementById('followButton');


async function updateFollowButton(data) {
    const session = await getSessionInfo();
    const userId = session.userId;

    if(userId != null){
        const userData = await getUser(userId);

        if(userData.following.some(item => item.followed_user_id == data.ID)) {
            followButton.innerText = "UnFollow";
        } else {
            followButton.innerText = "Follow";
        }
    }
}



async function addUserData(data, isModerator) {
    await updateFollowButton(data);

    followButton.addEventListener("click", async function(e) {
        const response = await follow(data.ID);
        if(response.status == 401) {
            openPopup("signin-popup");
        }
        await updateFollowButton(data);
    });

    let emojis;
    if(data.grade === "founder") {
        emojis = "🚀👨‍💻🌟";
    } else if(data.grade === "moderator") {
        emojis = "👨‍💻";
    }
    usernamePlace.innerText = data.username + emojis;
    profilePicturePlace.src = data.profile_picture;
}

async function updateUserPage() {
    const userId = document.getElementById('userPageId').value;

    const isModerator = false;
    const userData = await getUser(userId);
    await addUserData(userData, isModerator);
    loadPosts("latest", null, userId, false, "userPagePosts");
}


