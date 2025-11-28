export function iniciar(dados) {
    if (!dados) return console.error("Dados de 'sistema' não encontrados.");

    const titulo = document.getElementById('tituloSistema');
    if (titulo) titulo.textContent = dados.titulo;

    const subtitulo = document.getElementById('subtituloSistema');
    if (subtitulo) subtitulo.textContent = dados.subtitulo;

    const btn = document.getElementById('btnAcessoSistema');
    if (btn) {
        btn.textContent = dados.textoBotao;
        btn.href = dados.linkUrl; 
    }
}