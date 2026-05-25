window.addEventListener('load', () => {
    document.querySelector('main').classList.add('page-enter');

    document.querySelectorAll('nav button').forEach(btn => {
        const onclick = btn.getAttribute('onclick');
        // console.log(onclick)
        // console.log(onclick.includes('About'))
        // console.log(onclick && onclick.includes('About'))
        if (onclick && onclick.includes('About')) {
            btn.classList.add('active-btn');
        }
    });
});

fetch('about.json')
    .then(res => res.json())
    .then(data => {
        document.querySelector('.intro-text h2').textContent = data.intro.title;
        document.querySelector('.intro-text p').innerHTML = data.intro.text;
        document.querySelector('.about-reason h2').textContent = data.reason.title;
        document.querySelector('.about-reason p').textContent = data.reason.text;

    });


const tagColors = {
    skill: { bg: 'rgba(106, 156, 253, 0.15)', color: '#6A9CFD' },
    trait: { bg: 'rgba(91, 191, 191, 0.15)', color: '#5bbfbf' },
    hobby: { bg: 'rgba(201, 160, 220, 0.15)', color: '#c9a0dc' },
    game:  { bg: 'rgba(255, 180, 120, 0.15)', color: '#ffb478' }
};

let currentFilter = 'skill';
let allTags = {};

function renderTags(type) {
    const list = document.getElementById('tagList');
    list.innerHTML = '';

    const tags = allTags[type] || [];
    const cards = [];

    tags.forEach((tag, i) => {
        const card = document.createElement('div');
        card.className = 'tag-card';

        if (tag.point !== undefined) {
            let dots = '';
            for (let d = 1; d <= 5; d++) {
                dots += `<div class="${d <= tag.point ? 'dot-filled' : 'dot-empty'}"></div>`;
            }
            card.innerHTML = `
                <div class="tag-name">${tag.name}</div>
                <div class="tag-dots">${dots}</div>
            `;
        } else {
            card.innerHTML = `<div class="tag-name">${tag.name}</div>`;
        }

        list.appendChild(card);
        cards.push(card);
    });

    animateCards(cards);
    
}

function filterTags(type) {
    currentFilter = type;

    document.querySelectorAll('.danmaku-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    renderTags(type);
}

fetch('about.json')
    .then(res => res.json())
    .then(data => {
        document.querySelector('.intro-text h2').textContent = data.intro.title;
        document.querySelector('.intro-text p').innerHTML = data.intro.text;
        document.querySelector('.about-reason h2').textContent = data.reason.title;
        document.querySelector('.about-reason p').textContent = data.reason.text;

        allTags = data.tags;
        renderTags('skill');
    });