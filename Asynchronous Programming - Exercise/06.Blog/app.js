function attachEvents() {

    const posts = document.getElementById('posts');
    const btnLoadPosts = document.getElementById('btnLoadPosts');
    const btnViewPosts = document.getElementById('btnViewPost');
    const postTitle = document.getElementById('post-title');
    const postBody = document.getElementById('post-body');
    const postComments = document.getElementById('post-comments');
    const allOptions = document.getElementById('posts');

    btnLoadPosts.addEventListener('click', loadPosts);
    btnViewPosts.addEventListener('click', viewPosts);

    const url = 'http://localhost:3030/jsonstore/blog/'

    async function loadPosts() {

        postTitle.textContent = 'Post Details'
        postBody.innerHTML = ''
        postComments.innerHTML = '';
        posts.innerHTML = '';
       
        const resp = await fetch(`${url}posts`);
        const allPosts = await resp.json();
        for (const key in allPosts) {
            if (Object.hasOwnProperty.call(allPosts, key)) {
                const option = document.createElement('option');
                const line = allPosts[key];
                const value = line.id;
                const text = line.title;

                option.value = value;
                option.textContent = text;
                posts.appendChild(option);
            }
        }
    }

    async function viewPosts() {

        postBody.innerHTML = ''
        postComments.innerHTML = '';

        let postId = ''
     
        for (let post of allOptions) {
            if (post.selected) {
                console.log(post);
                postTitle.textContent = post.textContent;
                postId = post.value;
            }
        }

        const resp = await fetch(`${url}posts/${postId}`);
        const post = await resp.json();

        const response = await fetch(`${url}comments`);
        const allComments = await response.json();

        for (const key in allComments) {

            if (allComments[key].postId === postId) {
                let li = document.createElement('li');
                li.textContent = allComments[key].text;
                postComments.appendChild(li);

            }

        }

        postBody.textContent = post.body;
    }
}

attachEvents();