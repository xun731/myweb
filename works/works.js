let worksData = {};
let currentFilter = 'code';

fetch('works.json')
    .then(res => res.json())
    .then(data => {
        worksData = data;
        renderWorks('code');
    });

function renderWorks(type) {
    const list = document.getElementById('worksList');
    list.innerHTML = '';

    if (type === 'code') {
        list.style.display = 'flex';
        list.style.flexDirection = 'column';
        list.style.gap = '20px';
        const cards = [];
        worksData.code.forEach((item, i) => {
            const card = document.createElement('div');
            card.className = 'work-card';
            card.style.opacity = '0';
            
            card.innerHTML = `
                <div class="work-card-main">
                    <div class="work-info">
                        <h3 class="work-title">${item.title}</h3>
                        <p class="work-desc">${item.desc}</p>
                    </div>
                    <span class="work-date">${item.date}</span>
                </div>
            `;
            card.addEventListener('click', () => {
                location.href = item.link;
            });
            list.appendChild(card);
            cards.push(card);
        });
        animateCards(cards);
    } else {
        renderDraw(worksData.draw);
    }
}

function filterWorks(type) {
    currentFilter = type;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    document.getElementById('worksList').className = '';
    renderWorks(type);
}

// 繪圖排版
function renderDraw(items) {
    const list = document.getElementById('worksList');
    list.className = 'draw-grid';
    list.innerHTML = '';

    // 顯示載入提示
    const loading = document.createElement('div');
    loading.className = 'loading-hint';
    loading.innerHTML = `<span>圖片載入中</span><span class="loading-dots">...</span>`;
    list.appendChild(loading);

    const FIXED_HEIGHT = 200;
    const GAP = 16;
    let loadedCount = 0;
    const imgs = [];

    items.forEach((item, i) => {
        const card = document.createElement('div');
        card.className = 'draw-card';
        card.style.opacity = '0';

        const img = document.createElement('img');
        img.src = item.image;
        img.alt = '插圖';
        img.style.height = FIXED_HEIGHT + 'px';
        img.style.width = 'auto';
        img.style.display = 'block';
        img.style.pointerEvents = 'none';
        img.style.userSelect = 'none';

        card.appendChild(img);
        list.appendChild(card);
        imgs.push({ card, img });

        img.onload = () => {
            loadedCount++;
            if (loadedCount === items.length) {
                loading.remove();
                layoutDraw(imgs, GAP, FIXED_HEIGHT);
                imgs.forEach(({ card }, i) => {
                    card.style.animation = `fadeInUp 0.5s ease ${i * 0.1}s forwards`;
                });
            }
        };

        // 圖片載入失敗
        img.onerror = () => {
            loadedCount++;
            if (loadedCount === items.length) {
                loading.remove();
                layoutDraw(imgs, GAP, FIXED_HEIGHT);
            }
        };
    });
}

function layoutDraw(imgs, gap, height) {
    const container = document.getElementById('worksList');
    const containerWidth = container.clientWidth;
    const widths = imgs.map(({ img }) => img.naturalWidth * (height / img.naturalHeight));

    let rows = [];
    let currentRow = [];
    let currentWidth = 0;

    widths.forEach((w, i) => {
        if (currentRow.length > 0 && currentWidth + gap + w > containerWidth) {
            rows.push([...currentRow]);
            currentRow = [i];
            currentWidth = w;
        } else {
            currentRow.push(i);
            currentWidth += (currentRow.length > 1 ? gap : 0) + w;
        }
    });
    if (currentRow.length > 0) rows.push(currentRow);

    // 排版
    rows.forEach((row, rowIndex) => {
        const isLastRow = rowIndex === rows.length - 1;
        const totalImgWidth = row.reduce((sum, i) => sum + widths[i], 0);
        const totalGap = isLastRow
            ? gap * (row.length - 1)
            : (containerWidth - totalImgWidth) / Math.max(row.length - 1, 1);

        let x = 0;
        row.forEach((imgIndex, j) => {
            const { card } = imgs[imgIndex];
            card.style.position = 'absolute';
            card.style.left = x + 'px';
            card.style.top = rowIndex * (height + gap) + 'px';
            card.style.width = widths[imgIndex] + 'px';
            card.style.height = height + 'px';
            x += widths[imgIndex] + (isLastRow ? gap : totalGap);
        });

        container.style.position = 'relative';
        container.style.height = (rows.length * (height + gap)) + 'px';
    });
}