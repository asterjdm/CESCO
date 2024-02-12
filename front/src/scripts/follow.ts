
export async function follow(userId: number): Promise<any>{
    var formData = new FormData();

    formData.append('id', userId.toString());

    let response = await fetch("api/follow.php", {
        method: "POST", 
        body: formData,
        credentials: "include"
    });

    return response
}
