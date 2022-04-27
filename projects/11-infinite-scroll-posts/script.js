/** VARIABLES */
const $postsContainer = document.querySelector('#posts-container');
const $loader = document.querySelector('.loader');
const $filter = document.querySelector('#filter');

let limit = 5;
let page = 1;

/** EVENTS */
window.addEventListener('scroll', () => {
    // https://stackoverflow.com/questions/22675126/what-is-offsetheight-clientheight-scrollheight
    // scrollHeight: ENTIRE content & padding (visible or not)
    // clientHeight: VISIBLE content & padding
    // offsetHeight: VISIBLE content & padding + border + scrollbar
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
    if (scrollTop + clientHeight >= scrollHeight) {
        page++;
        loadPosts(); 
    }
}, { passive: true });

$filter.addEventListener('input', filterPosts);

/** LOGIC FUNCTIONS */
async function loadPosts() {
    showLoader();
    setTimeout(async () => {
        const posts = await api_fetchPosts();
        drawPosts(posts);
        
        cleanFilter(); filterPosts();
        removeLoader();
    }, 1000)
}

function filterPosts() {
    const term = $filter.value.toLowerCase();

    const $posts = document.querySelectorAll('.post');

    $posts.forEach($post => {
        const title = $post.querySelector('.post-title').textContent.toLowerCase();
        const body = $post.querySelector('.post-body').textContent.toLowerCase();

        $post.style.display = (title.indexOf(term) > -1 || body.indexOf(term) > -1) ? 'flex' : 'none';
    });
}

/** UI FUNCTIONS */
async function drawPosts(posts) {
    posts.forEach(post => {
        const $post = document.createElement('div');
        $post.classList.add('post');
        $post.innerHTML = `
            <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">${capitalize(post.title)}</h2>
                <p class="post-body">${post.body}</p>
            </div>
        `;
        $postsContainer.appendChild($post);
    });
}

function showLoader() {
    $loader.classList.add('show');
}

function removeLoader() {
    $loader.classList.remove('show');
}

function cleanFilter() {
    $filter.value = '';
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/** API CALLS */
async function api_fetchPosts() {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching posts!' + error);
    }
}

/** APP INIT */
loadPosts();