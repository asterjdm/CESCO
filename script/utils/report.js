async function report(postid){
    const reasonUser = prompt("Quel est le problème ?");
    
    if(reasonUser != null){
        let formData = new FormData
        formData.append('post_id', postid);
        formData.append('reason', reasonUser);
    
        const response = await fetch("api/report.php", {
            method: "POST",
            body: formData
        });
    }


}