
export function iniciar(dados) {
    document.getElementById('tituloHeroDesktop').innerHTML = dados.titulo_desktop; 
    document.getElementById('tituloHeroMobile').innerHTML = dados.titulo_mobile;

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
            const mensagem = encodeURIComponent(dados.whatsappMessage);
            window.open(`https://wa.me/${dados.whatsapp}?text=${mensagem}`, '_blank');
        });
    }
}