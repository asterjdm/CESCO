import { addPosts } from "./addPosts";
import { getUser } from "./getUser";

export async function openUserProfile(userId: number) {
    const profilePopup = document.getElementById("profile-popup") as HTMLDivElement;
    const usernamePlace = profilePopup.querySelector("#username") as HTMLElement;
    const profilePicturePlace = profilePopup.querySelector("#profilePicture") as HTMLImageElement;
    const postsPlace = profilePopup.querySelector("#userPagePosts") as HTMLDivElement;

    postsPlace.innerHTML = "..."
    openPopup("profile-popup");

    addPosts("userPagePosts", 50, userId)

    const user = await getUser(userId);

    usernamePlace.innerText = user.username;
    profilePicturePlace.src = user.profile_picture
    
}