
export function iniciar(dados) {
    const titulo = document.getElementById('tituloHero');
    const descricao = document.getElementById('descricaoHero');
    
    if (titulo) titulo.textContent = dados.titulo;
    if (descricao) descricao.textContent = dados.descricao;
    
    // Configura o botão do WhatsApp
    const botao = document.getElementById('botaoAcao');
    if (botao) {
        botao.textContent = dados.cta; 
        botao.setAttribute('rel', 'noopener noreferrer');
        
        botao.addEventListener('click', (e) => {
            e.preventDefault(); 
            window.open(`https://wa.me/${dados.whatsapp}`, '_blank');
        });
    }
}