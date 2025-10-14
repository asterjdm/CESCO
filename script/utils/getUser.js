async function getUser(id) {
    const response = await fetch("api/user.php?id=" + id);

    if(!response.ok){
        throw Response.error()
        return
    }
    const data = await response.json();
    return data
}