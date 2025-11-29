export function iniciar(dados) {

    if (!dados || !dados.itens) {
        console.error("Erro: Dados de modalidades não encontrados no JSON.");
        return;
    }

    
    const tituloElemento = document.getElementById('tituloModalidades');
    if (tituloElemento) tituloElemento.textContent = dados.titulo;
    
    
    const icones = {
        monitor: '<svg aria-hidden="true" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>',
        wifi: '<svg aria-hidden="true" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>',
        repetir: '<svg aria-hidden="true" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline></svg>'
    };
    
    
    const cores = ['#2D5BFF', '#6A00FF', '#FF2E63'];

    const gradeElemento = document.getElementById('gradeModalidades');
    
    if (gradeElemento) {
        
        gradeElemento.innerHTML = dados.itens.map((item, i) => `
            <div class="card-modalidade">
                <div class="icone-modalidade" style="color: ${cores[i] || cores[0]}">
                    ${icones[item.icone] || icones.monitor}
                </div>
                <h3>${item.titulo}</h3>
                <p>${item.descricao}</p>
            </div>
        `).join('');
    }
}