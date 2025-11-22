export function init(planos) {
    const whatsappNumber = "5519999999999";

    const precoParts = planos.grupo.price.split(',');

    const groupPlanMessage = encodeURIComponent(`Olá! Tenho interesse no Plano Aulas em Grupo por R$${planos.grupo.price} que vi no site.`);
    const groupPlanHref = `https://wa.me/${whatsappNumber}?text=${groupPlanMessage}`;
    
    const privatePlanMessage = encodeURIComponent("Olá! Tenho interesse nas Aulas Particulares e gostaria de mais informações para contratação.");
    const privatePlanHref = `https://wa.me/${whatsappNumber}?text=${privatePlanMessage}`;

    document.getElementById('planoGrupoContainer').innerHTML = `
        <div class="plano-card">
            <div class="card-content">
                <h3 class="plan-title">${planos.grupo.title}</h3>

                <div class="price-wrapper">
                    <span class="currency">R$</span>
                    <span class="price-value text-gradient-blue">${precoParts[0]}</span>
                    <div class="price-details">
                        <span class="cents text-gradient-blue">,${precoParts[1]}</span> 
                        <span class="period">/mês</span>
                    </div>
                </div>

                <ul class="feature-list">
                    ${planos.grupo.features.map(f => `
                        <li>
                            <svg class="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                            ${f}
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            <a href="${groupPlanHref}" class="btn-plan-action" target="_blank">Entrar na Turma</a>
        </div>
    `;

    document.getElementById('planoParticularContainer').innerHTML = `
        <div class="plano-card">
            <div class="card-content">
                <h3 class="plan-title">${planos.particulares.title}</h3>
                
                <p class="plan-subtitle">${planos.particulares.observacao}</p> 

                <div class="clean-options-list">
                    ${planos.particulares.items.map(item => `
                        <div class="clean-option-row">
                            <div class="freq-info">
                                <span class="freq-text">${item.frequency}</span>
                            </div>
                            <div class="price-info">
                                <span class="small-rs">R$</span>
                                <span class="clean-price text-gradient-red">${item.price}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <a href="${privatePlanHref}" class="btn-plan-action btn-highlight" target="_blank">Contratar Agora</a>
        </div>
    `;
}