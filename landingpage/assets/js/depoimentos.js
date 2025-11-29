function gerarEstrelas(quantidade) {
    const estrelaCheia = '<span class="icone-estrela">&#9733;</span>'; 
    return estrelaCheia.repeat(quantidade); 
}

function habilitarLoopInfinito(grid, numItensOriginais) {
    const larguraCard = 330; 
    
    const pontoDeReset = larguraCard * numItensOriginais; 
    
    const limiteEsquerdo = larguraCard * 0.5;

    grid.addEventListener('scroll', () => {
        if (grid.scrollLeft >= pontoDeReset) {
            grid.scrollLeft -= pontoDeReset; 
        }
        else if (grid.scrollLeft <= limiteEsquerdo) {
            grid.scrollLeft += pontoDeReset;
        }
    });

    grid.scrollLeft = 0; 
}

export function iniciar(dados) {
    if (!dados) return console.error("Dados de 'depoimentos' não encontrados.");

    const target = document.getElementById('depoimentos');
    if (!target) return;

    const titulo = document.getElementById('tituloDepoimentos');
    const subtitulo = document.getElementById('subtituloDepoimentos');
    
    if (titulo) titulo.textContent = dados.titulo;
    if (subtitulo) subtitulo.textContent = dados.subtitulo;

 
    const grade = document.getElementById('gradeDepoimentos');
    const numItensOriginais = dados.itens.length;
    const itensLoop = [...dados.itens, ...dados.itens.slice(0, 3)];

    if (grade && dados.itens) {

        grade.innerHTML = itensLoop.map(depoimento => `
            <div class="card-depoimento">
                <div class="avaliacao-depoimento" aria-hidden="true">
                    ${gerarEstrelas(5)} 
                </div>
                <p class="texto-depoimento">"${depoimento.texto}"</p>
                
                <div class="info-autor-depoimento">
                    <div class="wrapper-foto-autor">
                        <img src="${depoimento.foto}" alt="Foto de ${depoimento.nome}" class="img-avatar-depoimento">
                    </div>
                    <div>
                        <h4 class="nome-autor">${depoimento.nome}</h4>
                        <p class="curso-autor">${depoimento.curso}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }

    setTimeout(() => {
        const btnAnt = document.getElementById('btnAntDepoimento');
        const btnProx = document.getElementById('btnProxDepoimento');
        const scrollAmount = 330; 

        habilitarLoopInfinito(grid, numItensOriginais);

        if (btnAnt && btnProx) {
            btnAnt.onclick = () => {
                grade.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            };
            btnProx.onclick = () => {
                grade.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            };
        }
    }, 100);
}