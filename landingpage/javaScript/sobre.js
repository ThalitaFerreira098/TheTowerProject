const getFlagEmoji = (countryCode) => {
    if (!countryCode) return '';
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
};



function renderLanguages(languages) {
    const gridElement = document.getElementById('idiomasGridUnderPhoto');
    if (!gridElement || !languages) return;

   
    const nomesCompletos = {
        'US': 'Inglês',
        'ES': 'Espanhol',
        'DE': 'Alemão',
        'IT': 'Italiano',
        'NL': 'Holandês',
        'BR': 'Português'
    };

    gridElement.innerHTML = languages.map(lang => {
    
        const nomeIdioma = nomesCompletos[lang.code] || lang.code;

        return `
            <div class="idioma-badge">
                <img class="bandeira-img" src="/landingpage/imagens/${lang.code}.png" alt="${lang.code}">
                <span class="idioma-nome">${nomeIdioma}</span>
            </div>
        `;
    }).join('');
}


export function init(data) {
    if (!data) return console.error("Dados de 'sobre' faltando.");    

    const sobreGrid = document.getElementById('sobreGrid');
    if (sobreGrid) {
        sobreGrid.innerHTML = data.sections.map(s => `
            <div class="sobre-item">
               
                
                ${s.content.map(p => `<p>${p}</p>`).join('')} 
            </div>
        `).join('');
    }

    renderLanguages(data.languages);
}