
function generateStars(rating) {
    const fullStar = '<span class="star-icon">&#9733;</span>'; 
    return fullStar.repeat(5); 
}

function renderDepoimentos(data) {
    const target = document.getElementById('depoimentos');
    if (!target || !data) return;

    const cardsHTML = data.items.map(depoimento => `
        <div class="depoimento-card">
            <div class="depoimento-rating">
                ${generateStars(5)} 
            </div>
            <p class="depoimento-text">"${depoimento.text}"</p>
            <div class="depoimento-author-info">
                <div class="author-image-wrapper">
                   <img src="${depoimento.image}" alt="${depoimento.name}" class="depoimento-avatar-img">
                </div>
                <div>
                    <h4 class="depoimento-author">${depoimento.name}</h4>
                    <p class="depoimento-role">${depoimento.course}</p>
                </div>
            </div>
        </div>
    `).join('');

    target.innerHTML = `
        <section class="depoimentos-section section">
            <div class="container">
                <h2 class="section-title text-center">${data.title}</h2>
                <p class="section-subtitle text-center">${data.subtitle}</p>
                <div class="carousel-wrapper">
                    <div class="depoimentos-grid">
                        ${cardsHTML}
                    </div>
                    
                    <button class="carousel-nav-btn btn-prev">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z"/></svg>
                    </button>
                    <button class="carousel-nav-btn btn-next">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
                    </button>
                </div>
            </div>
        </section>
    `;
    setTimeout(() => {
        const grid = document.querySelector('.depoimentos-grid');
        const btnPrev = document.querySelector('.btn-prev');
        const btnNext = document.querySelector('.btn-next');
        
        // Define o quanto rolar: largura de um card (350px) + gap (30px)
        const scrollAmount = 380; 

        if (grid && btnPrev && btnNext) {
            btnPrev.onclick = () => {
                grid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            };
            btnNext.onclick = () => {
                grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            };
        }
    }, 100);
}

export function init(data) {
    renderDepoimentos(data);
}