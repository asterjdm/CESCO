import { addPosts } from "./addPosts";
import { getUser } from "./getUser";

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

    if(myId != null) {
        if(user.following.some((item: any) => item.followed_user_id == user.ID)) {
            followButton.innerText = "unFollow";
        } else {
            followButton.innerText = "Follow";
        }
    }
}