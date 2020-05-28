const BASE_URL = 'https://jsonplaceholder.typicode.com';

let usersDivEl;
let postsDivEl;
let commentsDivEl;
let albumDivEl;
let loadButtonEl;
function createPhotosList(photos) {
    const ulEl = document.createElement('ul');

    for (let i = 0; i < photos.length; i++) {
        const photo = photos[i];
        // creating paragraph
        const strongEl = document.createElement('strong');
        strongEl.textContent = photo.title;

        var br = document.createElement("br");

        const img = document.createElement("img");
        img.src = photo.thumbnailUrl;


        const pEl = document.createElement('p');
        pEl.appendChild(strongEl);
        pEl.appendChild(br);
        pEl.appendChild(img);

        // creating list item
        const liEl = document.createElement('li');
        liEl.appendChild(pEl);

        ulEl.appendChild(liEl);
    }

    return ulEl;
}

function onPhotosReceived() {
    const text = this.responseText;
    const photos = JSON.parse(text);
    const albumId = (photos[0].albumId);

    const divEl = document.getElementById(albumId);


    divEl.appendChild(createPhotosList(photos));
}

function onPhotosPosts() {
    const el = this;
    const albumID = el.getAttribute('data-album-id');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onPhotosReceived);
    xhr.open('GET', BASE_URL + '/photos?albumId=' + albumID);
    xhr.send();
}
function createAlbumList(albums) {
    const ulEl = document.createElement('ul');

    for (let i = 0; i < albums.length; i++) {
        const album = albums[i];

        const idEl = document.createAttribute('data-album-id')
        idEl.value = album.id;
        // creating paragraph
        const buttonEl = document.createElement('button');
        buttonEl.textContent = album.title;
        buttonEl.setAttributeNode(idEl);
        buttonEl.addEventListener('click', onPhotosPosts);

        const pEl = document.createElement('p');
        pEl.id = album.id;
        pEl.appendChild(buttonEl);

        // creating list item
        const liEl = document.createElement('li');
        liEl.appendChild(pEl);

        ulEl.appendChild(liEl);
    }

    return ulEl;
}

function onAlbumReceived() {
    posts.style.display = 'none';
    album.style.display = 'block';
    commentsDivEl.style.display = 'none';


    const text = this.responseText;
    const albums = JSON.parse(text);

    const divEl = document.getElementById('album-content');
    while (divEl.firstChild) {
        divEl.removeChild(divEl.firstChild);
    }
    divEl.appendChild(createAlbumList(albums));
}

function onLoadAlbum() {
    const el = this;
    const userID = el.getAttribute('data-user-id-album');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onAlbumReceived);
    xhr.open('GET', BASE_URL + '/albums?userId=' + userID);
    xhr.send();
}
function createCommentList(comments) {
    const ulEl = document.createElement('ul');

    for (let i = 0; i < comments.length; i++) {
        const comment = comments[i];

        // creating paragraph
        const strongEl = document.createElement('strong');
        strongEl.textContent = comment.name;

        const pEl = document.createElement('p');
        pEl.appendChild(strongEl);
        pEl.appendChild(document.createTextNode(`: ${comment.body}`));

        // creating list item
        const liEl = document.createElement('li');
        liEl.appendChild(pEl);

        ulEl.appendChild(liEl);
    }

    return ulEl;
}

function onCommentReceived() {
    album.style.display = 'none';
    commentsDivEl.style.display = 'block';

    const text = this.responseText;
    const comments = JSON.parse(text);
    const postId = (comments[0].postId);

    const divEl = document.getElementById('comment' + postId);

    divEl.appendChild(createCommentList(comments));
}

function onCommentPosts() {
    const el = this;
    const postID = el.getAttribute('data-post-id');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onCommentReceived);
    xhr.open('GET', BASE_URL + '/comments?postId=' + postID);
    xhr.send();}

function createPostsList(posts) {
    const ulEl = document.createElement('ul');

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];

        // creating paragraph
        const idEl = document.createAttribute('data-post-id')
        idEl.value = post.id;

        const buttonEl = document.createElement('button');
        buttonEl.textContent = post.title;
        buttonEl.setAttributeNode(idEl);
        buttonEl.addEventListener('click', onCommentPosts);

        const pEl = document.createElement('p');
        pEl.id = 'comment' + post.id;
        pEl.appendChild(buttonEl);
        pEl.appendChild(document.createTextNode(`: ${post.body}`));

        // creating list item
        const liEl = document.createElement('li');
        liEl.appendChild(pEl);

        ulEl.appendChild(liEl);
    }

    return ulEl;
}

function onPostsReceived() {

    albumDivEl.style.display = "none"
    postsDivEl.style.display = 'block';

    const text = this.responseText;
    const posts = JSON.parse(text);

    const divEl = document.getElementById('posts-content');
    while (divEl.firstChild) {
        divEl.removeChild(divEl.firstChild);
    }
    divEl.appendChild(createPostsList(posts));
}

function onLoadPosts() {
    const el = this;
    const userId = el.getAttribute('data-user-id');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onPostsReceived);
    xhr.open('GET', BASE_URL + '/posts?userId=' + userId);
    xhr.send();
}

function createUsersTableHeader() {
    const idTdEl = document.createElement('td');
    idTdEl.textContent = 'Id';

    const nameTdEl = document.createElement('td');
    nameTdEl.textContent = 'Name';

    const trEl = document.createElement('tr');
    trEl.appendChild(idTdEl);
    trEl.appendChild(nameTdEl);

    const theadEl = document.createElement('thead');
    theadEl.appendChild(trEl);
    return theadEl;
}

function createUsersTableBody(users) {
    const tbodyEl = document.createElement('tbody');

    for (let i = 0; i < users.length; i++) {
        const user = users[i];

        // creating id cell
        const idTdEl = document.createElement('td');
        idTdEl.textContent = user.id;

        // creating name cell
        const dataUserIdAttr = document.createAttribute('data-user-id');
        dataUserIdAttr.value = user.id;

        const dataUserIdAttrAlbum = document.createAttribute('data-user-id-album');
        dataUserIdAttrAlbum.value = user.id;

        const buttonEl = document.createElement('button');
        buttonEl.textContent = user.name;
        buttonEl.setAttributeNode(dataUserIdAttr);
        buttonEl.addEventListener('click', onLoadPosts);

        const buttonAlbumEl = document.createElement('button');
        buttonAlbumEl.textContent = "Album";
        buttonAlbumEl.setAttributeNode(dataUserIdAttrAlbum);
        buttonAlbumEl.addEventListener('click', onLoadAlbum);


        const nameTdEl = document.createElement('td');
        nameTdEl.appendChild(buttonEl);
        nameTdEl.appendChild(buttonAlbumEl);


        // creating row
        const trEl = document.createElement('tr');
        trEl.appendChild(idTdEl);
        trEl.appendChild(nameTdEl);

        tbodyEl.appendChild(trEl);
    }

    return tbodyEl;
}

function createUsersTable(users) {
    const tableEl = document.createElement('table');
    tableEl.appendChild(createUsersTableHeader());
    tableEl.appendChild(createUsersTableBody(users));
    return tableEl;
}

function onUsersReceived() {
    loadButtonEl.remove();

    const text = this.responseText;
    const users = JSON.parse(text);

    const divEl = document.getElementById('users-content');
    divEl.appendChild(createUsersTable(users));
}

function onLoadUsers() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onUsersReceived);
    xhr.open('GET', BASE_URL + '/users');
    xhr.send();
}



document.addEventListener('DOMContentLoaded', (event) => {
    usersDivEl = document.getElementById('users');
    postsDivEl = document.getElementById('posts');
    commentsDivEl = document.getElementById('comments');
    albumDivEl = document.getElementById('album');
    loadButtonEl = document.getElementById('load-users');
    loadButtonEl.addEventListener('click', onLoadUsers);
});
