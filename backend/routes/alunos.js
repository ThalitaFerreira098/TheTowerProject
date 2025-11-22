const express = require('express');
const router = express.Router();
const db = require("../db_config.js");


router.get("/pesquisar/:nome", async (req, res) => {
    const { nome } = req.params;

    if(!nome){return res.status(400).json({ success: false, message: "Nome do aluno é obrigatório." });}

    try{
        const [alunos] = await db.query("CALL sp_pesquisa_aluno(?);", [nome] );
        res.json({success: true, data: alunos[0]});
    }catch( error){
        res.status(500).json({success: false, message: error.message});
    }
});


router.get("/frequencia/:idAluno", async (req, res) => {
    const { idAluno} = req.params;

    try{
        const [rows]  = await db.query("CALL sp_obter_frequencia_aluno(?);", [idAluno] );
        res.json({success: true, data: rows[0]});

    }catch(error){
        console.error("Erro ao obter frequência do aluno: ", error);
        res.status(500).json({success: false, message: error.message});
    }
 });


 router.get("/historico/:idAluno", async (req, res) => {
    const {idAluno} = req.params;
     try{
        const [rows] = await db.query("CALL sp_historico_aluno(?);", [idAluno]);
        res.json({success: true,  data: rows});
    }catch(error){
        console.error("Erro ao obter histórico do aluno: ", error);
        res.status(500).json({success: false, message: error.message});
    }
 });

router.put("/editar/:id", async (req, res) => {
  const { id } = req.params;
  const {
    nome, cidade, tipo_bancaria, telefone,
    bolsista, email, ativo, nivel, id_turma
  } = req.body;

  try{
    const [resultados] = await db.query("CALL sp_edita_aluno(?,?,?,?,?,?,?,?,?,?);",
      [id, nome, cidade, tipo_bancaria, telefone, bolsista, email, ativo, nivel, id_turma]
    );

    const valor = resultados?.[0]?.[0]?.resultado;
    if (valor === 1) return res.json({ success: true, message: "Aluno atualizado."});
    if (valor === 2) return res.status(400).json({ success: false, message: "Email já existe ou turma inválida."});
    return res.status(500).json({ success: false, message: "Erro inesperado."});
  }catch(err){
    console.error(err);
    return res.status(500).json({ success:false, message: err.message });
  }
});

router.get("/turmas", async (req, res) => {
    try{
        const [turmas] = await db.query("call sp_lista_turmas();");
        res.json({success: true, data: turmas[0]});
    }catch(err){
        console.error(err);
        res.status(500).json({success: false, message: err.message});
    }
})

router.post("/matricular", async (req, res) => {
    const { nome, email, cidade, bolsista, nivel, telefone, tipo_bancaria, id_turma } = req.body;
    if(!nome || !email || !cidade || !bolsista || !nivel || !telefone || !tipo_bancaria || !id_turma){
        return res.status(400).json({ resultado: 0, message: "Todos os campos são obrigatórios."});
    }

    try{
        const [resultados] = await db.query("call sp_matricula_aluno(?,?,?,?,?,?,?,?);",
            [nome, cidade, tipo_bancaria, telefone, bolsista, email, nivel, id_turma]
        );

        const resultado = resultados?.[0]?.[0]?.resultado;

        if(resultado === 1){
            res.status(201).json({ resultado: 1 , message: "Aluno matriculado com sucesso."});
        }else if(resultado === 2){
            res.status(400).json({ resultado: 2, message: "Email já existe ou turma inválida."});
        }else{
            res.status(500).json({ resultado: 0, message: "Erro inesperado na matrícula."});
        }

    }catch(erro){
        console.error("Erro ao matricular aluno:", erro);
        res.status(500).json({erro: "Erro ao matricular aluno."});
    }
});

module.exports = router;