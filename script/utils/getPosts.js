async function getPosts(sortby, searchQuery, userId, postId, showOnlyFollowed) {
    let apiUrl = "api/posts.php?"
    if(sortby != null){
        apiUrl += "sort=" + sortby + "&"
    }
    if(searchQuery != null){
        apiUrl += "q=" + searchQuery + "&"
    }
    if(userId != null){
        apiUrl += "userId=" + userId + "&"
    }
    if(postId != null){
        apiUrl += "id=" + postId + "&"
    }
    if(showOnlyFollowed != null && showOnlyFollowed != false){
        apiUrl += "onlyFollowed&"
    }

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw Response.error()
        return
    }
    const data = await response.json();
    return data
}