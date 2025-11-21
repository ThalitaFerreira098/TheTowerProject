export function init(data) {
    const target = document.getElementById('sistema'); 
    if (!target || !data) return;

    target.innerHTML = `
        <div class="sistema-section"> 
        <h2 class="cta-title">${data.title}</h2>
        <p class="cta-subtitle">${data.subtitle}</p>
        <a href="${data.linkHref}" class="btn-sistema-admin">
            ${data.buttonText}
        </a>
    </div>
    `;
}