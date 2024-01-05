async function getConfig() {
    const response = await fetch("api/getConfig.php");

    if(!response.ok){
        throw Response.error()
        return
    }
    const data = await response.json();
    return data

}