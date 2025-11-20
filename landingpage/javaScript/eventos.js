export function init(data) {
    document.getElementById('eventosTitle').textContent = data.title;
    
    const colors = [
        { bg: 'linear-gradient(135deg, #2D5BFF, #6A00FF)', icon: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>' },
        { bg: 'linear-gradient(135deg, #FF2E63, #FF7A00)', icon: '<circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon>' }
    ];

    document.getElementById('eventosGrid').innerHTML = data.items.map((item, i) => {
        const theme = colors[i] || colors[0];
        return `
        <div class="evento-card">
            <div class="evento-img">
                <img src="${item.image}" alt="${item.title}">
                <div class="evento-tag" style="background: ${theme.bg}">${item.tag}</div>
            </div>
            <div class="evento-content">
                <div class="evento-header">
                    <div class="evento-icon" style="background: ${theme.bg}">
                        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">${theme.icon}</svg>
                    </div>
                    <h3>${item.title}</h3>
                </div>
                <p>${item.description}</p>
            </div>
        </div>
        `;
    }).join('');
}