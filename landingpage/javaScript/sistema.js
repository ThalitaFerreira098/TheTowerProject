function renderSistema(data) {
    const target = document.getElementById('sistema'); 
    if (!target || !data) return;

    target.innerHTML = `
        <div class="container sistema-section"> 
            <h2 class="cta-title">${data.title}</h2>
            <p class="cta-summary">${data.subtitle}</p>

            <img src="./imagens/clipboard-3d.png" 
                 alt="Prancheta e lupa de gestão de dados" 
                 class="system-asset asset-clipboard" aria-hidden="true">
            
            <img src="./imagens/chart-3d.png" 
                 alt="Usuário interagindo com plataforma de relatórios" 
                 class="system-asset asset-phone-chart" aria-hidden="true">

            <a href="${data.linkHref}" 
               class="btn-sistema-admin"
               role="button"
               aria-label="Acessar o Painel de Controle de Gestão">
                ${data.buttonText}
            </a>
        </div>
    `;
}


async function startSistemaApp() {
    try {
        const resp = await fetch(`data.json`);

        if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`);
        
        const siteData = await resp.json();
        
        const sistemaData = siteData.sistema; 

        if (sistemaData) {
            renderSistema(sistemaData);
        } else {
            console.error("Dados do componente 'sistema' faltando no JSON.");
        }

    } catch (error) {
       
        console.error("Erro fatal ao carregar dados do sistema:", error);
        
        const target = document.getElementById('sistema');
        if(target) target.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', startSistemaApp);