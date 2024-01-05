var commentInput = document.getElementById("commentTextInput")
var commentTextContent = commentInput.value;
var submitButton = document.getElementById("submitButton");

function runCommentSubmit() {
    let postId = document.getElementById("commentPostId").value;
    commentTextContent = commentInput.value;
    submitComment(postId, commentTextContent)
    loadComments(postId);
    commentInput.value = "";
}

document.addEventListener('keydown', function(event) {
    if(event.key === 'Enter'){
        runCommentSubmit();
    }
});

submitButton.addEventListener('click', function(event) {
    runCommentSubmit();
});