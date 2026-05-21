const SLIDES_PER_PAGE = 3;
let currentSlide = 0;
let totalPages = 0;

window.addEventListener('load', () => {
    const track = document.getElementById('galleryTrack');
    const slides = Array.from(track.querySelectorAll('.gallery-slide'));
    totalPages = Math.ceil(slides.length / SLIDES_PER_PAGE);

    // 建立分頁
    const wrapper = document.createElement('div');
    wrapper.className = 'gallery-slides-wrapper';

    for (let p = 0; p < totalPages; p++) {
        const page = document.createElement('div');
        page.className = 'gallery-page';

        const pageSlides = slides.slice(p * SLIDES_PER_PAGE, (p + 1) * SLIDES_PER_PAGE);
        pageSlides.forEach(slide => {
            page.appendChild(slide);
            const img = slide.querySelector('img');
            img.addEventListener('click', () => openLightbox(img.src));
        });

        wrapper.appendChild(page);
    }

    track.appendChild(wrapper);
    updateGallery();
});

function updateGallery() {
    const wrapper = document.querySelector('.gallery-slides-wrapper');
    wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;

    document.querySelector('.gallery-arrow.left').classList.toggle('hidden', currentSlide === 0);
    document.querySelector('.gallery-arrow.right').classList.toggle('hidden', currentSlide === totalPages - 1);
}

function prevSlide() {
    if (currentSlide > 0) { currentSlide--; updateGallery(); }
}

function nextSlide() {
    if (currentSlide < totalPages - 1) { currentSlide++; updateGallery(); }
}

function openLightbox(src) {
    document.getElementById('lightboxImg').src = src;
    document.getElementById('lightbox').classList.add('show');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('show');
}