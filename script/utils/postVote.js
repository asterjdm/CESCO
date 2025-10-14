async function vote(postId, vote_type) {
    var formData = new FormData();

    formData.append('post_id', postId);
    formData.append('type', vote_type);

    const response = await fetch("api/newVote.php", {
        method: "POST",
        body: formData
    });

    const data = await response.json();


}
