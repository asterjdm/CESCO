export async function getUser(id: number): Promise<any> {
    const response = await fetch("api/user.php?id=" + id);
    const data = await response.json();
    return data
}