function renderBanner(data) {
    const wrapper = document.getElementById('metodoBannerWrapper');
    if (!wrapper) return;
    
    wrapper.innerHTML = `
        <div class="banner-content container">
            <span class="banner-tag animate-fade-in-up">${data.tag}</span>
            <h1 class="banner-title animate-fade-in-up" style="animation-delay: 0.1s">${data.title}</h1>
            <p class="banner-subtitle animate-fade-in-up" style="animation-delay: 0.2s">${data.subtitle}</p>
            <div class="banner-cta-group animate-fade-in-up" style="animation-delay: 0.3s">
                <button class="btn-banner btn-primary" id="btnVerMetodo">
                    <span class="text-gradiente">${data.ctaPrimary}</span>
                </button>
                <button class="btn-banner btn-secondary" id="btnModulos">${data.ctaSecondary}</button>
            </div>
        </div>
        <div class="banner-wave-bottom">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" fill="none" preserveAspectRatio="none">
            <path fill="#ffffff" fill-opacity="1" d="M0,96L60,112C120,128,240,160,360,186.7C480,213,600,235,720,224C840,213,960,171,1080,160C1200,149,1320,171,1380,181.3L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"/></svg>
        </div>
    `;

// Botão "Ver Metodologia"
setTimeout(() => {
    const btnMetodo = document.getElementById('btnVerMetodo');
    if (btnMetodo) {
            btnMetodo.onclick = () => {
                const target = document.getElementById('target-nossa-metodologia');
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };
    }


// Botão "Módulos"
    const btnModulos = document.getElementById('btnModulos');
    if (btnModulos) {
            btnModulos.onclick = () => {
                const target = document.getElementById('target-modulos');
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            };
        }
    }, 100);
}

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
            <div class="feature-header-group">
                <div class="feature-icon ${item.iconClass}">
                    ${icons[item.iconClass.replace('icon-', '')] || icons.book}
                </div>
                <h4>${item.title}</h4>
            </div>
            
            <p>${item.description}</p>
        </div>
    `).join('');
}


function render7BooksCards(livros, title, subtitle) {
    document.getElementById('metodoTitle').textContent = title;
    document.getElementById('metodoSubtitle').textContent = subtitle;
    
    const bookIcons = {
        stack: '<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
        chat: '<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
        book: '<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
        volume: '<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>',
        bubble: '<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
        pulse: '<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
        case: '<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>'
    };

    const gridContainer = document.getElementById('metodologiaGrid');
    gridContainer.className = 'books-grid'; 

    gridContainer.innerHTML = livros.map((livro, index) => {
        
        let porcentagem = ((index + 1) / 7) * 100;
        return `
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
                <div class="book-progress-fill" 
                style="background-color: ${livro.color}; width:0;" 
                data-width="${porcentagem}%">
                </div>
            </div>
        </div>
    `}).join('');
    setTimeout(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    
                    const bar = entry.target;
                    const targetWidth = bar.getAttribute('data-width');
                    if (targetWidth) {
                        bar.style.width = targetWidth;
                    }
                    
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.1 }); 

        const bars = document.querySelectorAll('.book-progress-fill');
        bars.forEach(bar => observer.observe(bar));
    }, 200);
}
function renderEvolucao(data) {
    const target = document.getElementById('target-evolucao');
    if (!target || !data) return;

    const icons = {
        medal: '<svg width="28" height="28" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
        target: '<svg width="28" height="28" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>'
    };

    const cardsHTML = data.cards.map(card => `
        <div class="glass-card">
            <div class="glass-icon ${card.colorClass}">
                ${icons[card.icon]}
            </div>
            <h3>${card.title}</h3>
            <ul class="check-list">
                ${card.list.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
    `).join('');
    target.innerHTML = `
        <section class="evolucao-section">
            <div class="container">
                <div class="evolucao-header">
                    <span class="badge-results">${data.badge}</span>
                    <h2 class="evolucao-title">${data.title}</h2>
                    <p class="evolucao-subtitle">${data.subtitle}</p>
                </div>

                <div class="evolucao-grid">
                    ${cardsHTML}
                </div>

                <div class="cta-box-glass">
                    <h3>${data.cta.title}</h3>
                    <p>${data.cta.description}</p>
                    <div class="cta-buttons-group">
                        <a href="#" class="btn-glow-white">${data.cta.btnPrimary}</a>
                        <a href="#" class="btn-outline-white">${data.cta.btnSecondary}</a>
                    </div>
                </div>
            </div>
        </section>
    `;
}

export function init(data) {
    if (!data) return console.error("Dados de 'metodologia' não encontrados.");

    renderBanner(data.metodoBanner);
    renderFeatureCards(data.metodoFeatures);
    render7BooksCards(data.livros, data.title, data.subtitle);
    renderEvolucao(data.evolucao);
}