// Arquivo: sections/metodologia/metodologia.js

// --- 1. Renderiza o Banner ---
function renderBanner(data) {
    const wrapper = document.getElementById('metodoBannerWrapper');
    if (!wrapper) return;
    
    wrapper.innerHTML = `
        <div class="banner-content container">
            <span class="banner-tag animate-fade-in-up">${data.tag}</span>
            <h1 class="banner-title animate-fade-in-up" style="animation-delay: 0.1s">${data.title}</h1>
            <p class="banner-subtitle animate-fade-in-up" style="animation-delay: 0.2s">${data.subtitle}</p>
            <div class="banner-cta-group animate-fade-in-up" style="animation-delay: 0.3s">
                <button class="btn-banner btn-primary">${data.ctaPrimary}</button>
                <button class="btn-banner btn-secondary">${data.ctaSecondary}</button>
            </div>
        </div>
        <div class="banner-wave-bottom">
            <svg viewBox="0 0 1440 100" fill="none" preserveAspectRatio="none"><path d="M0 80 V 40 Q 720 0, 1440 40 V 80 Z" fill="#FFFFFF"/></svg>
        </div>
    `;
}

// --- 2. Renderiza os 4 Cards de Features (Grid 2x2) ---
function renderFeatureCards(data) {
    document.getElementById('featuresTitle').textContent = data.title;
    document.getElementById('featuresSubtitle').textContent = data.subtitle;
    
    const icons = {
        book: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
        headset: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18V6h18v12M3 18a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2M3 10h18M3 14h18"/></svg>',
        music: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13M9 18a2 2 0 0 1-2 2H5a2 2 0 0 1 2-2M21 16v-3l-12-2v12l12-2M21 16a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2"/></svg>',
        chat: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>'
    };

    document.getElementById('featuresGrid').innerHTML = data.items.map(item => `
        <div class="feature-card animate-on-scroll">
            <div class="feature-icon ${item.iconClass}">
                ${icons[item.iconClass.replace('icon-', '')] || icons.book}
            </div>
            <h4>${item.title}</h4>
            <p>${item.description}</p>
        </div>
    `).join('');
}

// --- 3. Renderiza os 7 Livros (Estilo Cards Brancos com Barra) ---
function render7BooksCards(livros, title, subtitle) {
    document.getElementById('metodoTitle').textContent = title;
    document.getElementById('metodoSubtitle').textContent = subtitle;
    
    // Ícones (os mesmos que usamos antes)
    const bookIcons = {
        stack: '<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
        chat: '<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
        book: '<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
        volume: '<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>',
        bubble: '<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
        pulse: '<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>'
    };

    const gridContainer = document.getElementById('metodologiaGrid');
    // Importante: Adiciona a classe 'books-grid' para o CSS funcionar
    gridContainer.className = 'books-grid'; 

    gridContainer.innerHTML = livros.map((livro) => `
        <div class="book-card animate-on-scroll">
            <div class="book-card-header">
                <div class="book-icon-box" style="background-color: ${livro.color}; box-shadow: 0 5px 15px ${livro.color}40;">
                    ${bookIcons[livro.icon] || bookIcons.book}
                </div>
                
                <div class="book-number-box">
                    <span class="label-livro">Livro</span>
                    <span class="num-livro" style="color: ${livro.color};">${livro.bookNum}</span>
                </div>
            </div>

            <h3>${livro.title}</h3>

            <div class="book-tags">
                <span class="tag-duration">${livro.duration}</span>
                <span class="tag-badge" style="background-color: ${livro.color};">${livro.badge}</span>
            </div>

            <p>${livro.description}</p>

            <div class="book-progress-bg">
                <div class="book-progress-fill" style="background-color: ${livro.color};"></div>
            </div>
        </div>
    `).join('');
}

// --- Função Principal ---
export function init(data) {
    if (!data) return console.error("Dados de 'metodologia' não encontrados.");

    renderBanner(data.metodoBanner);
    renderFeatureCards(data.metodoFeatures);
    render7BooksCards(data.livros, data.title, data.subtitle);
}