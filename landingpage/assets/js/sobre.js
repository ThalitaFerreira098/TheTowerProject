function renderizarIdiomas(idiomas) {
    const gradeElemento = document.getElementById('gradeIdiomas');
    if (!gradeElemento || !idiomas) return;

    const nomesCompletos = {
        'US': 'Inglês',
        'ES': 'Espanhol',
        'DE': 'Alemão',
        'IT': 'Italiano',
        'NL': 'Holandês',
        'BR': 'Português',
        'FR': 'Francês',
        'JP': 'Japonês'
    };

    gradeElemento.innerHTML = idiomas.map((codigo, index) => {
        const nomeIdioma = nomesCompletos[codigo] || codigo;
        const delay = (index + 1) * 0.1; 
        
        return `
            <div class="badge-idioma" style="animation-delay: ${delay}s">
                <img class="img-bandeira" src="./landingpage/assets/img/${codigo}.png" alt="${codigo}" onerror="this.style.display='none'">
                <span class="nome-idioma">${nomeIdioma}</span>
            </div>
        `;
    }).join('');
}

export function iniciar(dados) {
    if (!dados) return console.error("Dados de 'sobre' faltando.");    

    const titulo = document.getElementById('tituloSobre');
    if (titulo) titulo.textContent = dados.titulo;

    const nome = document.getElementById('nomeMentor');
    if (nome) nome.textContent = dados.nomeMentor;

    const foto = document.getElementById('fotoMentor');
    if (foto && dados.foto) foto.src = dados.foto;

    const tituloIdiomas = document.getElementById('tituloIdiomas');
    if (tituloIdiomas && dados.tituloIdiomas) tituloIdiomas.textContent = dados.tituloIdiomas;

    const gradeTexto = document.getElementById('gradeTextoSobre');
    if (gradeTexto && dados.paragrafos) {
        gradeTexto.innerHTML = dados.paragrafos.map(p => `
            <p>${p}</p>
        `).join('');
    }

    renderizarIdiomas(dados.idiomas);
}