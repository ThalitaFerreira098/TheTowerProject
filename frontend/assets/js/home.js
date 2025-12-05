const API_URL = "http://localhost:3000/api";

function irPara(pagina){
    window.location.href = pagina;
}

function atualizarSaudacao(){
    const agora = new Date();
    const hora = agora.getHours();
    let saudacao;

    if(hora >= 5 && hora < 12){
        saudacao = "Bom dia Jefferson, bem-vindo de volta!";
    } 
    else if(hora >= 12 && hora < 18){
        saudacao = "Boa tarde Jefferson, bem-vindo de volta!";
    }
    else{
        saudacao = "Boa noite Jefferson, bem-vindo de volta!";
    }
    document.getElementById("saudacao").textContent = saudacao;
}

async function carregarAgendaHoje(){
    const lista = document.getElementById("lista-agenda");
    try {
        const resposta = await fetch(`${API_URL}/home/agenda`);
        const data = await resposta.json();

        if(!data.success || data.data.length === 0){
            lista.innerHTML = `<div class='agenda-vazia'>Nenhuma aula hoje 🎉</div>`;
            return;
        }

        lista.innerHTML = "";

        data.data.forEach(aula => {
            const item = document.createElement("div");
            item.classList.add("agenda-item");

            item.innerHTML = `
                <span class="agenda-item-nome">${aula.nome_turma}</span>
                <span class="agenda-item-horario">${aula.horario_aula} - ${aula.hora_fim}</span>
            `;

            lista.appendChild(item);
        });

    } catch (erro) {
        console.error("Erro ao carregar agenda:", erro);
        lista.innerHTML = `<div class='agenda-vazia'>Erro ao carregar agenda.</div>`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    atualizarSaudacao();
    carregarAgendaHoje();
});
