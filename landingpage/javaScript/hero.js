export function init(data) {

    document.getElementById('heroTitle').textContent = data.title;
    document.getElementById('heroDescription').textContent = data.description;
    
    
    const btn = document.getElementById('ctaButton');
    btn.textContent = data.cta;
    btn.setAttribute('rel', 'noopener noreferrer');
    btn.addEventListener('click', () => {
        window.open(`https://wa.me/${data.whatsapp}`, '_blank');
    });
}