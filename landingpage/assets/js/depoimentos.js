function gerarEstrelas(quantidade) {
    const estrelaCheia = '<span class="icone-estrela">&#9733;</span>'; 
    return estrelaCheia.repeat(quantidade); 
}

export function iniciar(dados) {
    if (!dados) return console.error("Dados de 'depoimentos' não encontrados.");

    const titulo = document.getElementById('tituloDepoimentos');
    const subtitulo = document.getElementById('subtituloDepoimentos');
    
    if (titulo) titulo.textContent = dados.titulo;
    if (subtitulo) subtitulo.textContent = dados.subtitulo;

 
    const grade = document.getElementById('gradeDepoimentos');
    if (grade && dados.itens) {

        const itensLoop = [...dados.itens, ...dados.itens.slice(0, 3)];

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
        const scrollAmount = 380; 

        if (grade && btnAnt && btnProx) {
            btnAnt.onclick = () => {
                grade.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            };
            btnProx.onclick = () => {
                grade.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            };
        }
    }, 100);
}