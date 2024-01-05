async function follow(userId) {
    var formData = new FormData();

    formData.append('id', userId);

    let response = await fetch("api/follow.php", {
        method: "POST", 
        body: formData
    })

    return response
}
