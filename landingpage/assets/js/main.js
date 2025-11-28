/* =====================================================
   MAIN.JS - CONFIGURAÇÃO GERAL
   ===================================================== */

const MAPA_COMPONENTES = {
    hero: { chaveJson: 'hero', idHtml: 'home' }, 
    modalidades: { chaveJson: 'modalidades', idHtml: 'modalidades' },
    tipodeaula: { chaveJson: 'tiposDeAulas', idHtml: 'tipos' },
    metodologia: { chaveJson: 'metodologia', idHtml: 'metodologia' },
    eventos: { chaveJson: 'eventos', idHtml: 'eventos' },
    planos: { chaveJson: 'planos', idHtml: 'planos' },
    sobre: { chaveJson: 'sobre', idHtml: 'sobre' },
    footer: { chaveJson: 'footer', idHtml: 'contato' },
    depoimentos: { chaveJson: 'depoimentos', idHtml: 'depoimentos' },
    sistema: { chaveJson: 'sistema', idHtml: 'sistema' }
};

let dadosDoSite = {};

// AJUSTE CRÍTICO: 
// Se o index.html está FORA da pasta landingpage, use './landingpage'
// Se o index.html está DENTRO da pasta landingpage, use '.'
const CAMINHO_BASE = './landingpage'; 

async function carregarComponente(nomeArquivo, idElemento, dados) {
    try {
        // 1. Carrega o HTML
        const resposta = await fetch(`${CAMINHO_BASE}/${nomeArquivo}.html`);
        
        if (!resposta.ok) throw new Error(`Erro ao carregar HTML ${nomeArquivo} (404)`);
        const htmlTexto = await resposta.text();
        
        const container = document.getElementById(idElemento);
        if (container) {
            container.innerHTML = htmlTexto;

            // 2. Carrega o CSS Dinamicamente (AQUI ESTÁ O SEGREDO)
            // Verifica se já existe para não carregar duas vezes
            if (!document.querySelector(`link[href*="${nomeArquivo}.css"]`)) {
                
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                
                // Monta o caminho: ./landingpage/assets/css/hero.css
                const caminhoCSS = `${CAMINHO_BASE}/assets/css/${nomeArquivo}.css`;
                link.href = caminhoCSS; 
                
                // Mensagem para Debug (Olhe no Console F12 se não funcionar)
                console.log(`Tentando carregar CSS: ${caminhoCSS}`);

                document.head.appendChild(link);
            }
            
            // 3. Carrega o JS Específico
            try {
                // Caminho: ./assets/js/hero.js (vizinho deste arquivo)
                const modulo = await import(`./${nomeArquivo}.js`);
                if (modulo.iniciar) { 
                    modulo.iniciar(dados); 
                }
            } catch (erroJs) {
                // Ignora se não tiver JS
            }
        }
    } catch (erro) {
        console.error(`Erro fatal componente ${nomeArquivo}:`, erro);
    }
}

async function iniciarSite() {
    try {
        // Busca o JSON
        const resp = await fetch(`${CAMINHO_BASE}/data.json`);
        dadosDoSite = await resp.json();

        // Loop pelos componentes
        for (const [nomeComponente, mapa] of Object.entries(MAPA_COMPONENTES)) {
            const dadosParaEnviar = dadosDoSite[mapa.chaveJson];
            if (dadosParaEnviar) {
                await carregarComponente(nomeComponente, mapa.idHtml, dadosParaEnviar);
            }
        }

        iniciarMenu();
        iniciarAnimacoes();

    } catch (erro) {
        console.error("Erro ao iniciar o site (verifique o JSON):", erro);
    }
}

function iniciarAnimacoes() {
    const opcoes = { threshold: 0.1 };
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => { 
            if (entrada.isIntersecting) entrada.target.classList.add('visivel'); 
        });
    }, opcoes);

    setTimeout(() => {
        const elementos = document.querySelectorAll('.animar-ao-rolar, .animar-aparecer, .animar-aparecer-cima');
        elementos.forEach(el => observador.observe(el));
    }, 800); 
}

function iniciarMenu() {
    const botao = document.getElementById('botaoMenuMobile'); 
    const menu = document.getElementById('listaMenu');     
    
    if(botao && menu) {
        const novoBotao = botao.cloneNode(true);
        botao.parentNode.replaceChild(novoBotao, botao);

        novoBotao.addEventListener('click', () => {
            const aberto = menu.classList.toggle('ativo'); 
            novoBotao.setAttribute('aria-expanded', aberto);
        });
        
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('ativo'); 
                novoBotao.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

window.addEventListener('scroll', () => {
    const nav = document.getElementById('navegacao');
    if (nav) {
        if(window.scrollY > 40) nav.classList.add('rolagem');
        else nav.classList.remove('rolagem');
    }
});

document.addEventListener('DOMContentLoaded', iniciarSite);