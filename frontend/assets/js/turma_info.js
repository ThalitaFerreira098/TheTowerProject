const API_URL = "http://localhost:3000/api";

document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const idTurma = params.get("id");

    if(!idTurma) return alert("Turma não encontrada!");

    try{

        const infoRes = await fetch(`${API_URL}/turmas/info/${idTurma}`);
        const infoData = await infoRes.json();

        if(infoData.success && infoData.data.length > 0){
            const t = infoData.data[0];

            document.getElementById("nomeTurma").textContent = t.nome_turma;
            document.getElementById("diaAula").textContent = t.dia_aula;
            document.getElementById("horario").textContent = `${t.horario_aula} - ${t.hora_fim}`;
            document.getElementById("qtdAlunos").textContent = t.qtd_alunos;
            document.getElementById("aulasProg").textContent = t.qtd_aulas_programadas;
            document.getElementById("aulasConcluidas").textContent = t.qtd_aulas_realizadas;

            const progresso = Math.round(t.progresso_turma || 0);
            document.getElementById("progress").style.width = `${progresso}%`;
            document.getElementById("Percentual").textContent = `${progresso}%`;

        }

        const alunosRes = await fetch(`${API_URL}/turmas/alunos/${idTurma}`);
        const alunosData = await alunosRes.json();

        if(alunosData.success){
            const lista = document.getElementById("listaAlunos");
            lista.innerHTML = "";
            alunosData.data.forEach(al => {
                const li = document.createElement("li");
                li.textContent = al.nome_aluno;
                lista.appendChild(li);
            });
        }

        const ultimaRes = await fetch(`${API_URL}/turmas/ultima/${idTurma}`);
        const ultimaData = await ultimaRes.json();

        if(ultimaData.success && ultimaData.data.length > 0){
            const aula = ultimaData.data[0];
            document.getElementById("ultimaAula").textContent = 
            `Última aula : ${aula.tipo_aula} (${aula.data_aula})`;
        }

        document.querySelectorAll(".aula-card").forEach(card => {
            card.addEventListener("click", () => {
                const tipo = card.dataset.tipo;

                if(tipo === "Conversação"){
                    window.location.href = `chamada.html?id=${idTurma}&tipo=${tipo}`;
                }
                else{
                    window.location.href = `aula.html?id=${idTurma}&tipo=${tipo}`;
                }
            });
        });
    }catch (err){
        console.error(err);
        alert("Erro ao carregar informações da turma.");
    }
});

function irPara(pagina){
    window.location.href = pagina;
}