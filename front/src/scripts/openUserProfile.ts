import { addPosts } from "./addPosts";
import { follow } from "./follow";
import { getUser } from "./getUser";
import { openPopup } from "./popups";

export async function openUserProfile(userId: number) {
    const profilePopup = document.getElementById("profile-popup") as HTMLDivElement;
    const usernamePlace = profilePopup.querySelector("#username") as HTMLElement;
    const profilePicturePlace = profilePopup.querySelector("#profilePicture") as HTMLImageElement;
    const postsPlace = profilePopup.querySelector("#userPagePosts") as HTMLDivElement;
    const followButton = profilePopup.querySelector("#followButton") as HTMLButtonElement;

    postsPlace.innerHTML = "..."
    openPopup("profile-popup");

    addPosts("userPagePosts", 50, userId)

    const user = await getUser(userId);

    usernamePlace.innerText = user.username;
    profilePicturePlace.src = user.profile_picture
    
    const response = await fetch("https://rmbi.ch/cesco/api/getMySession.php", {
        credentials: "include"
    });
    
    const mySession = await response.json();
    const myId = mySession.userId;

    followButton.onclick = function(){};
    
    if(myId != null) {
        followButton.onclick = () => handleFollowButtonClick(followButton, userId)

        if(user.following.some((item: any) => item.followed_user_id == user.ID)) {
            followButton.innerText = "unFollow";
        } else {
            followButton.innerText = "Follow";
        }
    }
}

async function handleFollowButtonClick(followButton: HTMLButtonElement, userId:number) {
    const response = await (await follow(userId)).json();
    if(response.message == "followed") {
        followButton.innerText = "unFollow";
    }else if(response.message == "unfollowed") {
        followButton.innerText = "Follow";

    }
}