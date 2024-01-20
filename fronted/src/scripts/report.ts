export async function report(postid: number){
    const reasonUser = prompt("Quel est le problème ?");
    
    if(reasonUser != null){
        let formData = new FormData
        formData.append('post_id', postid.toString());
        formData.append('reason', reasonUser);
    
        const response = await fetch("https://rmbi.ch/cesco/api/report.php", {
            method: "POST",
            body: formData
        });
    }


}
