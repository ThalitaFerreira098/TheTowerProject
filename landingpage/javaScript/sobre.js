export function init(data) {
    document.getElementById('sobreTitle').textContent = data.title;
    document.getElementById('sobrePlaceholder').textContent = `"${data.placeholder}"`;

    document.getElementById('sobreGrid').innerHTML = data.sections.map(s => `
        <div class="sobre-item">
            <h4>${s.title}</h4>
            <p>${s.content}</p>
        </div>
    `).join('');
}