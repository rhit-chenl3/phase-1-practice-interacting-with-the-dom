document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('plus').addEventListener('click', updateCounter);
    document.getElementById('minus').addEventListener('click', (e) => updateCounter(e, -1));
    document.getElementById('pause').addEventListener('click', togglePause);
    document.getElementById('heart').addEventListener('click', addLike);
    document.getElementById('comment-form').addEventListener('submit', addComment);
});

let timer = setInterval(updateCounter, 1000);
const likes = {};

function updateCounter(e, increment=1) {
    const counter = document.getElementById('counter');
    counter.textContent = +counter.textContent + increment;
}

function togglePause() {
    const pauseBttn = document.getElementById('pause');
    const otherBttns = Array.from(document.getElementsByTagName('button')).filter(bttn => (
        bttn.id !== 'pause'
    ));
    if (pauseBttn.innerText === 'pause') {
        clearInterval(timer);
        pauseBttn.textContent = 'resume';
        otherBttns.forEach(bttn => bttn.disabled = true);
    } else {
        timer = setInterval(updateCounter, 1000);
        pauseBttn.textContent = 'pause';
        otherBttns.forEach(bttn => bttn.disabled = false);
    }

}

function addLike() {
    const counterValue = document.getElementById('counter').textContent;
    if (Object.keys(likes).includes(counterValue)) {
        likes[counterValue]++
    } else {
        likes[counterValue] = 1;
    }
    displayLikes();
}

function displayLikes() {
    const likeList = document.querySelector('ul.likes');
    const newLikes = [];
    for (const key in likes) {
        const newLike = document.createElement('li');
        newLike.textContent = `${key} has been liked ${likes[key]} ${likes[key]===1?'time':'times'}`;
        newLikes.push(newLike);
    }
    likeList.replaceChildren(...newLikes);
}

function addComment(e) {
    e.preventDefault();
    const commentList = document.getElementById('list');
    const newComment = document.createElement('p');
    newComment.textContent = e.target.querySelector('#comment-input').value;
    commentList.appendChild(newComment);
    e.target.reset();
}