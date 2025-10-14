async function getSessionInfo() {
    const response = await fetch("api/getMySessionInfos.php");
    const data = await response.json();
    return data
}
