// const slides = [
//     {
//         name: '一名資工系大一學生',
//         desc: '不只是寫Bug的學生，也是會Debug的開發者。<br>正在成為工程師的路上打怪升級！',
//         image: '../pic/banner1.png',
//         imageStyle: 'max-width: 160%; top: 110px; left: 60px;',
//     },
//     {
//         name: '想像力的實踐者<span style="color:#5bbfbf; font-size:20px;">學徒版</span>',
//         desc: '寫程式，也寫生活。<br>致力於<span style="color:#5bbfbf">學習</span>用程式碼把腦海裡天馬行空的點子變成看得見的東西～',
//         image: '../pic/banner3.png',
//         imageStyle: 'max-width: 150%; top: 20px; left: 60px;',
//     }
// ];

// let slides = [];
let currentSlide = 0;

fetch('home.json')
    .then(res => res.json())
    .then(data => {
        slides = data.slides;
        updateSlide();
        setInterval(nextSlide, 10000);
    });

function updateSlide() {
    const slide = slides[currentSlide];
    const name = document.querySelector('.banner-name');
    const desc = document.querySelector('.banner-desc');
    const img = document.querySelector('.banner-image img');
    const banner = document.querySelector('.banner');

    // 移除動畫 class，讓動畫可以重新觸發
    name.classList.remove('animate');
    desc.classList.remove('animate');
    img.classList.remove('animate');

    // 更新內容
    name.innerHTML = slide.name;
    desc.innerHTML = slide.desc;
    img.src = slide.image;
    img.style.cssText = slide.imageStyle;
    banner.style.cssText = slide.banner;

    // 強制瀏覽器重新渲染，再加回動畫
    requestAnimationFrame(() => {
        name.classList.add('animate');
        desc.classList.add('animate');
        img.classList.add('animate');
    });

    // 更新點點
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active-dot', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlide();
}

function goToSlide(index) {
    if (currentSlide != index){
        currentSlide = index;
        updateSlide();
    }
}

// 每4秒自動換一張
// setInterval(nextSlide, 10000);

// updateSlide();