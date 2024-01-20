export async function getUser(id: number): Promise<any> {
    const response = await fetch("https://rmbi.ch/cesco/api/user.php?id=" + id);
    const data = await response.json();
    return data
}