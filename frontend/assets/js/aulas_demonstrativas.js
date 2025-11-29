const API_URL = "http://localhost:3000/api/aula-demonstrativas";
 
document.addEventListener("DOMContentLoaded", () => {
    carregarAulas();

    document.getElementById("btnNovaAula").onclick = abrirModal;
    document.getElementById("btnFechar").onclick = fecharModal;
    document.getElementById("btnSalvar").onclick = salvarAula;
});

async function carregarAulas() {
    const list = document.getElementById("listaAulas");
    list.innerHTML = "<p>Carregando...</p>";

    const res = await fetch(`${API_URL}/listar`);
    const aulas = await res.json();

    list.innerHTML = "";

    if (aulas.length === 0) {
        list.innerHTML = "<p>Nenhuma aula demonstrativa marcada.</p>";
        return;
    }

    aulas.forEach(aula => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${aula.nome_aluno}</h3>
            <p><strong>Email:</strong> ${aula.email_aluno}</p>
            <p><strong>Data:</strong> ${aula.data_aula.slice(0, 10)}</p>
            <p><strong>Horário:</strong> ${aula.horario}</p>
            <p><strong>Status:</strong> ${aula.status}</p>

            <div class="btn-area">
                <button class="btn-cancelar" onclick="cancelarAula(${aula.id_aula_demostrativa})">Cancelar</button>
                <button class="btn-confirmar" onclick="confirmarMatricula(${aula.id_aula_demostrativa})">Confirmar Matrícula</button>
            </div>
        `;

        list.appendChild(card);
    });
}

function abrirModal() {
    document.getElementById("modalAula").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modalAula").style.display = "none";
}

async function salvarAula() {

    const confirmar = confirm("Tem certeza que deseja salvar essa aula?");
    if (!confirmar) return;

    const nome = document.getElementById("nome_aluno").value;
    const email = document.getElementById("email_aluno").value;
    const data = document.getElementById("data_aula").value;
    const horario = document.getElementById("horario").value;

    const res = await fetch(`${API_URL}/marcar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, data, horario })
    });

    const result = await res.json();

    if (result.resultado === 1){
         alert("Aula marcada com sucesso!");
         fecharModal();
         carregarAulas();
    }
    else if (result.resultado === 2) alert("Conflito detectado! Email ou horário já marcado.");
    else if (result.resultado === 3) alert("Data invalida, escolha uma data maior que a corrente.");
    else if (result.resultado === 4) alert("Horario invalido, escolha uma horário entre 08h e 20h.");
    else alert("Erro ao marcar aula!, certifique-se de preencher todos os campos");
}

async function cancelarAula(id) {

    const confirmar = confirm("Tem certeza que deseja cancelar essa aula?");
    if (!confirmar) return;

    const res = await fetch(`${API_URL}/cancelar/${id}`, { method: "PUT" });
    const r = await res.json();

    if (r.resultado === 1) alert("Aula cancelada");
    else alert("Não foi possível cancelar");

    carregarAulas();
}

async function confirmarMatricula(id) {
    const confirmar = confirm("Tem certeza que deseja confirmar essa matricula?");
    if (!confirmar) return;

    const res = await fetch(`${API_URL}/confirmar/${id}`, { method: "PUT" });
    const r = await res.json();

    if (r.resultado === 1) alert("Matrícula confirmada!");
    else alert("Erro ao confirmar matrícula");

    carregarAulas();
}

function irPara(pagina){
    window.location.href = pagina;
}

  
     
 
   
 
