let notesData = {};
let currentFilter = 'post';

fetch('notes.json')
    .then(res => res.json())
    .then(data => {
        notesData = data;
        renderNotes('post');
    });

function renderNotes(type) {
    const list = document.getElementById('notesList');
    list.innerHTML = '';

    list.style.display = 'flex';
    list.style.flexDirection = 'column';
    list.style.gap = '20px';
    const cards = [];
    notesData.post.forEach((item, i) => {
        const card = document.createElement('div');
        card.className = 'post-card';
        card.style.opacity = '0';
        
        const imgHTML = item.image
            ? `<img class="post-img" src="${item.image}" alt="${item.title}">` 
            : '';

        card.innerHTML = `
            <div class="post-card-main">
                ${imgHTML}
                <div class="post-info">
                    <h3 class="post-title">${item.title}</h3>
                    <p class="post-desc">${item.desc}</p>
                </div>
                <span class="post-date">${item.date}</span>
            </div>
        `;
        card.addEventListener('click', () => {
            window.open(item.link, '_blank');
        });
        list.appendChild(card);
        cards.push(card);
    });
    animateCards(cards);
}

function filterNotes(type) {
    currentFilter = type;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    document.getElementById('notesList').className = '';
    renderNotes(type);
}