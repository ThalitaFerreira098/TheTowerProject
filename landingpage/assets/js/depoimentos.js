function gerarEstrelas(quantidade) {
    const estrelaCheia = '<span class="icone-estrela">&#9733;</span>'; 
    return estrelaCheia.repeat(quantidade); 
}

function habilitarLoopInfinito(grid) {
    const card = grid.querySelector('.card-depoimento');
    if (!card) return;

    grid.addEventListener('scroll', () => {
        if (grid.scrollWidth <= grid.clientWidth) return;

        const scrollTotal = grid.scrollWidth;
        const umTeco = scrollTotal / 3;
        const buffer = 10;

        if (grid.scrollLeft >= (umTeco * 2) - buffer) {
            grid.scrollLeft -= umTeco;
        } 
        else if (grid.scrollLeft <= buffer) {
            grid.scrollLeft += umTeco;
        }
    });
}

export function iniciar(dados) {
    if (!dados) return console.error("Dados de 'depoimentos' não encontrados.");

    const titulo = document.getElementById('tituloDepoimentos');
    const subtitulo = document.getElementById('subtituloDepoimentos');
    
    if (titulo) titulo.textContent = dados.titulo;
    if (subtitulo) subtitulo.textContent = dados.subtitulo;

    const grade = document.getElementById('gradeDepoimentos');
    
    if (grade && dados.itens) {
        const itensLoop = [...dados.itens, ...dados.itens, ...dados.itens]; 

        grade.innerHTML = itensLoop.map(depoimento => `
            <div class="card-depoimento">
                <div class="avaliacao-depoimento" aria-hidden="true">
                    ${gerarEstrelas(5)} 
                </div>
                <p class="texto-depoimento">"${depoimento.texto}"</p>
                
                <div class="info-autor-depoimento">
                    <div class="wrapper-foto-autor">
                        <img src="${depoimento.foto}" alt="Foto de ${depoimento.nome}" class="img-avatar-depoimento" loading="lazy">
                    </div>
                    <div>
                        <h4 class="nome-autor">${depoimento.nome}</h4>
                        <p class="curso-autor">${depoimento.curso}</p>
                    </div>
                </div>
            </div>
        `).join('');

        setTimeout(() => {
            const btnAnt = document.getElementById('btnAntDepoimento');
            const btnProx = document.getElementById('btnProxDepoimento');
            const scrollTotal = grade.scrollWidth;
            const umTeco = scrollTotal / 3;
            grade.scrollLeft = umTeco; 

            habilitarLoopInfinito(grade);

            if (btnAnt && btnProx) {
                btnAnt.onclick = () => {
                    const card = grade.querySelector('.card-depoimento');
                    const largura = card ? card.offsetWidth + 30 : 330;
                    grade.scrollBy({ left: -largura, behavior: 'smooth' });
                };
                
                btnProx.onclick = () => {
                    const card = grade.querySelector('.card-depoimento');
                    const largura = card ? card.offsetWidth + 30 : 330;
                    grade.scrollBy({ left: largura, behavior: 'smooth' });
                };
            }
        }, 100);
    }
}