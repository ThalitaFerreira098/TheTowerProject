document.addEventListener('DOMContentLoaded', async () => {
    const listaAulas = document.getElementById('listaAulas');
    const listaPresenca = document.getElementById('listaPresenca');
    const frameMaterial = document.getElementById('frameMaterial');
    const btnConcluir = document.getElementById('btnConcluir');
 
    const params = new URLSearchParams(window.location.search);
    const idTurma = params.get('id');
    const tipoAula = params.get('tipo');
    const response = await fetch(`http://localhost:3000/api/aulas/${idTurma}/${tipoAula}`);
    const dados = await response.json();

    let aulaSelecionadaId = null;

    if (!dados.success){
        console.error("ERRO na API: ", dados.error);
        return;
    }
    const aulas = dados.data[0];

    aulas.forEach(aula => {
        const li = document.createElement('li');
        li.textContent = `${aula.titulo}`;
        if (aula.aula_concluida) li.classList.add('concluida');

        li.addEventListener('click', async () => {

            document.querySelectorAll('#listaAulas li').forEach(item => item.classList.remove('selected'));
            li.classList.add('selected');

            aulaSelecionadaId = aula.id_aula;
             
            if (aula.tipo_aula === 'Conversação') {
                frameMaterial.src = '';
                tituloMaterial.textContent = 'Aula de Conversação'; 
                btnConcluir.disabled = false;
            } else {
                frameMaterial.src = `/frontend/assets/materiais/${aula.nome_pasta}/${aula.nome_arquivo}`;   
                btnConcluir.disabled = false;
            }

            
            const presencaResp = await fetch(`http://localhost:3000/api/presencas/${aula.id_aula}`);
            const dadosPresenca = await presencaResp.json();

            if(!dadosPresenca.success){
                console.error("ERRO ao carregar presenças: ", dadosPresenca.message);
                listaPresenca.innerHTML = "<li>ERRO ao carregar presenças</li>";
                return;
            }

            const alunos = dadosPresenca.data;
            listaPresenca.innerHTML = '';

            alunos.forEach(aluno => {
                const liAluno = document.createElement('li');
                liAluno.innerHTML = `
                    ${aluno.nome_aluno}
                    <button class="btn-presenca" data-id="${aluno.id_aluno}" data-aula="${aula.id_aula}" data-presente="1">Presente</button>
                    <button class="btn-presenca falta" data-id="${aluno.id_aluno}" data-aula="${aula.id_aula}" data-presente="0">Falta</button>
                `;
                listaPresenca.appendChild(liAluno);
            });
        });

        listaAulas.appendChild(li);
    });

     
    document.addEventListener('click', async e => {
        if (e.target.classList.contains('btn-presenca')) {
            const idAluno = e.target.dataset.id;
            const idAula = e.target.dataset.aula;
            const presente = e.target.dataset.presente;

            await fetch('http://localhost:3000/api/presencas/registrar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idAluno, idAula, presente })
            });
        }
    });

     
    btnConcluir.addEventListener('click', async () => {
        if (!aulaSelecionadaId) return;

        await fetch(`http://localhost:3000/api/aulas/concluir/${aulaSelecionadaId}`, { method: 'PUT' });
        const li = [...document.querySelectorAll('#listaAulas li')]
            .find(li => li.textContent.includes(`#${aulaSelecionadaId}`));

        if (li) li.classList.add('concluida');
        btnConcluir.disabled = true;
    });
});

function irPara(pagina){
    window.location.href = pagina;
}
