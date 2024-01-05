async function submitComment(postId, content) {

    var formData = new FormData();

    formData.append('postId', postId);
    formData.append('commentContent', content);

    const response = await fetch("api/newComment.php", {
        method: "POST",
        body: formData
    });

    const data = await response.json()

}
