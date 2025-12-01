export function iniciar(dados) {

    if (!dados) return;

    const titulo = document.getElementById('tituloEventos');
    if (titulo) titulo.textContent = dados.titulo;
    
   
    const temas = [
        { 
            fundo: 'linear-gradient(135deg, #2D5BFF, #6A00FF)', 
            icone: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>' 
        },
        { 
            fundo: 'linear-gradient(135deg, #FF2E63, #FF7A00)', 
            icone: '<circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon>' 
        }
    ];

    const grade = document.getElementById('gradeEventos');
    
    if (grade && dados.itens) {
        grade.innerHTML = dados.itens.map((item, i) => {
        
            const tema = temas[i] || temas[0];
            
            return `
            <div class="card-evento">
                <div class="img-evento">
                    <img src="${item.imagem}" alt="Imagem ${item.titulo}" loading="lazy">
                    <div class="tag-evento" style="background: ${tema.fundo}">${item.tag}</div>
                </div>
                
                <div class="conteudo-evento">
                    <div class="cabecalho-evento">
                        <div class="icone-evento" style="background: ${tema.fundo}">
                            <svg aria-hidden="true" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">${tema.icone}</svg>
                        </div>
                        <h3>${item.titulo}</h3>
                    </div>
                    <p>${item.descricao}</p>
                </div>
            </div>
            `;
        }).join('');
    }
}