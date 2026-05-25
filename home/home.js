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

    name.classList.remove('animate');
    desc.classList.remove('animate');
    img.classList.remove('animate');

    name.innerHTML = slide.name;
    desc.innerHTML = slide.desc;
    img.src = slide.image;
    img.style.cssText = slide.imageStyle;
    banner.style.cssText = slide.banner;

    requestAnimationFrame(() => {
        name.classList.add('animate');
        desc.classList.add('animate');
        img.classList.add('animate');
    });

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