export function init(planos) {
    document.getElementById('planoGrupoContainer').innerHTML = `
        <div class="plano-card" style="text-align:center;">
            <h3 style="font-size:24px; margin-bottom:20px;">${planos.grupo.title}</h3>
            <div style="margin: 20px 0;">
                <span style="font-size:20px;">R$</span>
                <span class="price-big">${planos.grupo.price}</span>
                <span>/mês</span>
            </div>
            <div style="text-align:left; margin-top:30px;">
                ${planos.grupo.features.map(f => `<p style="margin-bottom:10px; color:#555;">✓ ${f}</p>`).join('')}
            </div>
        </div>
    `;

    document.getElementById('planoParticularContainer').innerHTML = `
        <div class="plano-card">
            <h3 style="font-size:32px; text-align:center;">${planos.particulares.title}</h3>
            <div class="particular-stack">
                ${planos.particulares.items.map(item => `
                    <div class="particular-row">
                        <h4>${item.frequency}</h4>
                        <div class="row-price">R$ ${item.price}</div>
                    </div>
                `).join('')}
            </div>
            <p style="text-align:center; margin-top:20px; font-style:italic; color:#888;">*${planos.particulares.observacao}</p>
            <button class="btn-contratar">Contratar Agora</button>
        </div>
    `;
}