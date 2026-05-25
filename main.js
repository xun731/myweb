loadNav();

// 插入導覽列
function loadNav() {
    const base = getBasePath();
    const nav = `
    <nav>
        <div class="nav-logo">薰雞蛋吐司</div>
        <div class="nav-links">
            <button onclick="location.href='${base}home/home.html'">首頁</button>
            <button onclick="location.href='${base}about/about.html'">關於我</button>
            <button onclick="location.href='${base}works/works.html'">作品</button>
            <button onclick="location.href='${base}notes/notes.html'">碎碎念</button>
        </div>
        <div class="nav-avatar" onclick="toggleContact()">
            <img src="${base}pic/avatar.png" alt="頭像">
            <div class="contact-dropdown" id="contactDropdown">
                <a href="https://instagram.com/07.31_xun" target="_blank">
                    <i class="fab fa-instagram"></i> Instagram
                </a>
                <a href="https://github.com/xun731" target="_blank">
                    <i class="fab fa-github"></i> GitHub
                </a>
                <a href="https://discordapp.com/users/688704833687126017" target="_blank">
                    <i class="fab fa-discord"></i> Discord
                </a>
            </div>
            <div class="speech-bubble" id="speechBubble"></div>
        </div>
    </nav>`;
    document.body.insertAdjacentHTML('afterbegin', nav);
}

function getBasePath() {
    const path = window.location.pathname;

    if (path.includes('/projects/')) return '../../';
    
    if (path.includes('/home/') || 
        path.includes('/about/') || 
        path.includes('/works/') || 
        path.includes('/notes/')) return '../';
    
    return './';
}

// 個人選單
function toggleContact() {
    const dropdown = document.getElementById('contactDropdown');
    dropdown.classList.toggle('show');
}

document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav-avatar')) {
        document.getElementById('contactDropdown').classList.remove('show');
    }
});

const speeches = [
    '點開有我的一些社群帳號喔!',
    '好...好暈!!',
    '呃...要吐...嘔...',
    '快停下...!!',
    '...(暈過去了)'
];

let speechTimer = null;
let speechInterval = null;
let speechIndex = 0;

const avatar = document.querySelector('.nav-avatar img');
const bubble = document.getElementById('speechBubble');

avatar.addEventListener('mouseenter', () => {
    speechTimer = setTimeout(() => {
        speechIndex = 0;
        bubble.textContent = speeches[speechIndex];
        bubble.classList.add('show');

        speechInterval = setInterval(() => {
            speechIndex++;
            if (speechIndex >= speeches.length) {
                clearInterval(speechInterval);
                bubble.classList.remove('show');
            } else {
                bubble.textContent = speeches[speechIndex];
            }
        }, 5000);
    }, 500);
});

avatar.addEventListener('mouseleave', () => {
    clearTimeout(speechTimer);
    clearInterval(speechInterval);
    bubble.classList.remove('show');
});

// 判斷目前頁面加底線
const currentPage = window.location.pathname;
document.querySelectorAll('nav button').forEach(btn => {
    const target = btn.getAttribute('onclick')
        .replace(".html'", '');
    if (currentPage.includes(target.split('/').pop())) {
        btn.classList.add('active-btn');
    }
});

// 關於我的轉場
function goToAbout() {
    document.body.style.overflow = 'hidden'; 
    document.querySelector('main').classList.add('page-exit');

    const overlay = document.createElement('div');
    overlay.id = 'transition-overlay';
    document.body.appendChild(overlay);

    const tags = ['樂觀', '活力', '好奇心', '同理心', '想像力', '創造力',
                  'Python', 'C++', 'HTML', 'CSS', 'JavaScript',
                  '寫程式', '繪圖', '打電動', '特戰英豪', '崩壞．星穹鐵道', '異環',
                  '這是彩蛋','懶貓子超級可愛','偶像學園中文版能不能重新上架'];

    // 產生彈幕
    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            const tag = document.createElement('span');
            tag.textContent = tags[Math.floor(Math.random() * tags.length)];
            tag.className = 'transition-tag';
            tag.style.top = Math.random() * 100 + 'vh';
            tag.style.animationDuration = (0.3 + Math.random() * 0.2) + 's';
            tag.style.fontSize = (30 + Math.floor(Math.random() * 16)) + 'px';
            tag.style.opacity = (0.7 + Math.random() * 0.3).toString();
            overlay.appendChild(tag);
        }, i * 5); 
    }

    setTimeout(() => {
        location.href = '../about/about.html';
    }, 800);
}

// 各頁面卡片動畫，左右輪流飛入
function animateCards(cards) {
    cards.forEach((card, i) => {
        const animName = i % 2 === 0 ? 'tagCardInLeft' : 'tagCardInRight';
        card.style.opacity = '0';
        card.style.animation = `${animName} 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.12}s forwards`;
    });
}