


export async function amIconnected(): Promise<boolean>
{
    const response = await fetch("https://rmbi.ch/cesco/api/amIconnected.php", {
        credentials: "include"
    });
    
    const responseData = await response.json();
    const isConnected = responseData.connected;

    return isConnected
}