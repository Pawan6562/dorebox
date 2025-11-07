// Step 1: Ek khali array banao.
const blogPosts = [];

// Step 2: Ek function banao jo is array mein post add karega.
function addPost(postObject) {
    if (postObject) {
        blogPosts.push(postObject);
    }
}
