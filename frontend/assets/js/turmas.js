const API_URL = "http://localhost:3000/api";
const inputPesquisa = document.getElementById("pesquisaAluno");
const cardsTurmas = document.getElementById("cardsTurmas");

let painelAluno = null;

async function carregarTurmas(){
    try{
        const resposta = await fetch(`${API_URL}/turmas`);
        if(!resposta.ok) throw new Error("Erro ao buscar turmas");
        
        const turmas = await resposta.json();

        const container = document.getElementById("cardsTurmas");
        container.innerHTML = "";

        turmas.forEach(turma => {
            const card  = document.createElement("div");
            card.classList.add("card-turma");
            card.innerHTML = `<h3>${turma.nome_turma}</h3>`;
            card.addEventListener("click", () => {
                window.location.href = `turma_info.html?id=${turma.id_turma}`;
            });
            container.appendChild(card);
        });
    }catch (erro){
        console.error("Erro ao carregar turmas:", erro)
    }
}

document.getElementById("btnCriarTurma").addEventListener("click", () => {
    window.location.href = `criar_turma.html`;
});

function irPara(pagina){
    window.location.href = pagina;
}

inputPesquisa.addEventListener("input", async () => {
    const valor = inputPesquisa.value.trim();

    if( valor === ""){
        if(painelAluno) painelAluno.remove();
        carregarTurmas();
        return;
    }

    try{
        const resp = await fetch(`${API_URL}/alunos/buscar?nome=${valor}`);
        const dados =await resp.json();
        if(!dados.success) return;


        const alunos = dados.data;

        cardsTurmas.innerHTML = "";

        if(painelAluno) painelAluno.remove();

        painelAluno = document.createElement("div");
        painelAluno.classList.add("painel-resultado");


        if(alunos.length === 0){
            painelAluno.innerHTML = "<p>Nenhum aluno encontrado.</p>";
            cardsTurmas.appendChild(painelAluno);
            return;
        }

        alunos.forEach( async aluno => {
            const card = document.createElement("div");
            card.classList.add("card-aluno-info");

            const freqResp = await fetch(`${API_URL}/alunos/frequencia/${aluno.id_aluno}`);
            const freqDados = await freqResp.json();
            const freq = freqDados.data[0] || {};

            const histResp = await fetch(`${API_URL}/alunos/historico/${aluno.id_aluno}`);
            const histDados = await histResp.json();
             
            let historico = histDados.data[0] || [];

            if(!Array.isArray(historico)){
                historico = [historico];
            }
            card.innerHTML = `
            <h2>${aluno.nome_aluno}</h2>

            <div class="linha"><strong>Matrícula:</strong> ${aluno.data_matricula}</div>
            <div class="linha"><strong>Cidade:</strong> ${aluno.cidade}</div>
            <div class="linha"><strong>Banco:</strong> ${aluno.tipo_bancaria}</div>
            <div class="linha"><strong>Telefone:</strong> ${aluno.numero_telefone}</div>
            <div class="linha"><strong>Bolsista:</strong> ${aluno.bolsista ? "Sim" : "Não"}</div>
            <div class="linha"><strong>Ativo:</strong> ${aluno.ativo ? "Sim" : "Não"}</div>
            <div class="linha"><strong>Email:</strong> ${aluno.email_aluno}</div>
            <div class="linha"><strong>Nível:</strong> ${aluno.nivel}</div>

            <hr>

            <h3>Frequência</h3>
            <div class="linha"><strong>Turma:</strong> ${freq.nome_turma || "-"}</div>
            <div class="linha"><strong>Total de Aulas:</strong> ${freq.total_aulas || 0}</div>
            <div class="linha"><strong>Presentes:</strong> ${freq.aulas_presentes || 0}</div>
            <div class="linha"><strong>Faltas:</strong> ${freq.aulas_faltadas || 0}</div>
            <div class="linha"><strong>Frequência:</strong> ${freq.frequencia_percentual || 0}%</div>

            <hr>

            <h3>Histórico</h3>

            ${
                historico.length === 0
                ? "<p>Sem histórico.</p>"
                : historico.map(h => `
                    <div class="hist-item">
                        <strong>${h.nome_turma}</strong>
                        <p>Entrada: ${h.data_entrada}</p>
                        <p>Saída: ${h.data_saida}</p>
                    </div>
                `).join("")
            }
            `;
            painelAluno.appendChild(card);
        });

        cardsTurmas.appendChild(painelAluno);

    }catch (error){
        console.error("Erro ao buscar aluno:", error);
        error.innerText = "Erro ao buscar aluno.";
    }
});

carregarTurmas();

 