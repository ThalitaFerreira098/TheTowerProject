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

function preencherSistema(dados) {
    if (!dados || !dados.sistema) {
        console.error("Erro: Dados de sistema não encontrados no JSON.");
        return;
    }
    
    document.getElementById('tituloSistema').textContent = dados.sistema.titulo;
    document.getElementById('subtituloSistema').innerHTML = dados.sistema.subtitulo;
    document.getElementById('btnAcessoSistema').textContent = dados.sistema.textoBotao;
    document.getElementById('btnAcessoSistema').href = dados.sistema.linkUrl;
}

async function carregarDadosDoSistema() {
    try {
        const resposta = await fetch('data.json'); 
        
        if (!resposta.ok) throw new Error('Erro ao carregar data.json.');
        
        const dadosCompletos = await resposta.json();
        
        preencherSistema(dadosCompletos);
        
    } catch (erro) {
        console.error("Falha ao buscar os dados do JSON para a tela do sistema.", erro);
        document.getElementById('tituloSistema').textContent = "ERRO DE CONEXÃO";
    }
}

document.addEventListener('DOMContentLoaded', carregarDadosDoSistema);