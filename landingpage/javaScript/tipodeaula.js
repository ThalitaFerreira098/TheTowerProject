export function init(data) {
    if (!data) return console.error("Dados de 'tipodeaula' não encontrados para inicialização.");

    const titleElement = document.getElementById('tiposTitle');
    if(titleElement) titleElement.textContent = data.title;

    // Cards de Tipos de aula
    const grid = document.getElementById('tiposGrid');
    if (grid) {
            // Card Aula Particular
        grid.innerHTML = `
            <div class="tipo-card blue animate-on-scroll">
                <div class="card-icon">
                    <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
                <h3>${data.particular.title}</h3>
                <p>${data.particular.description}</p>
                <div style="flex-grow: 1; min-height: 10px;"></div> 
            </div>
            
            
            <div class="tipo-card red animate-on-scroll">
                <div class="card-content-split"> 
                    <div class="split-left">
                        <div class="card-icon">
                            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                        </div>
                        <h3>${data.grupo.title}</h3> 
                        <p class="description-text">${data.grupo.description}</p>
                    </div>

                    <div class="split-right">
                        <h4 class="schedule-title">${data.horarios.subtitle}</h4>
                        
                        ${data.horarios.turmas.map(t => `
                            <div class="schedule-item-split">
                                ${t.nome}: ${t.horario}
                            </div>
                        `).join('')}
                        
                        <div class="schedule-warning">(${data.horarios.duracao})</div>
                    </div>
                </div>
                </div>
        `;
    }
    // Card Vantagens
    const vantagensGrid = document.getElementById('vantagensGrid');
    if (vantagensGrid) {
        const iconList = [
            '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line>',
            '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>',
            '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>',
            '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>',
            '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>'
        ];

        vantagensGrid.innerHTML = data.vantagens.map((v, i) => `
            <div class="vantagem-item">
                <div class="vantagem-icon">
                    <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        ${iconList[i] || iconList[0]}
                    </svg>
                </div>
                <span>${v}</span>
            </div>
        `).join('');
    }
}