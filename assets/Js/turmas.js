const API_URL = "http://localhost:3000/api";

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

carregarTurmas();

 