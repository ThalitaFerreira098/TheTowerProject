const express = require('express');
const router = express.Router();
const db = require("../db_config.js");

router.get("/info/:id", async (req, res) => {
    const { id } = req.params;
    
    try{
        const [rows] = await db.query("CALL sp_lista_info_turma(?);", [id]);
        res.json({ success: true, data: rows[0]});
    }catch (error){
        console.error(error);
        res.status(500).json({success: false, error: error.message});
    }
});

router.get("/alunos/:id", async (req, res) => {
    const {id} = req.params;

    try{
        const [rows] = await db.query("CALL sp_lista_turma_alunos(?);", [id]);
        res.json({ success: true, data: rows[0]});
    }catch(error){
        res.status(500).json({success: false, message: error.message});
    }
});

router.get("/ultima/:id", async (req, res) => {
    const {id} = req.params;

    try{
        const [rows] = await db.query("CALL sp_ultima_aula(?);",[id]);
        res.json({ success: true, data: rows[0]});
    }catch(error){
        res.status(500).json({ success: false, error: error.message});
    }
});


router.get("/",  async (req, res) => {
   try{
    const [rows] = await db.query("CALL sp_lista_turmas();");
    res.json(rows[0]);
   }catch(erro){
    console.error("Erro ao listar turmas:", erro);
    res.status(500).json({ erro: "Erro ao listar turmas"});
   }
});

router.post("/", async (req, res) => {
    const { nome_turma, dia_semana, hora_inicio, hora_fim} = req.body;

    if(!nome_turma || !dia_semana || !hora_inicio || !hora_fim){
        return res.status(400).json({
            erro:"O preenchimento de todos os campos é obrigatório"
        });
    }

    try{
        const [resultados] = await db.query("CALL sp_criar_turma(?, ?, ?, ?); ",
            [nome_turma, dia_semana, hora_inicio, hora_fim]);

        const resultado = resultados?.[0]?.[0]?.resultado;
        
        if(resultado === 1){
            res.status(201).json({resultado: 1, mensagem: "Turma Criada com sucesso!"});
        } else if(resultado === 2){
            res.status(200).json({resultado: 2, mensagem: "Conflito de horário detectado com turmas existentes!" });
        }else{
            res.status(500).json({resultado: 0 , mensagem: "Erro ao criar a Turma!"});
        }
    }catch (erro){
        console.error("Erro ao criar turma:", erro);
        res.status(500).json({ erro: "Erro ao criar turma"});
    }
});

router.put("/editar", async (req, res) => {
    const {
        id_turma,
        novo_nome_turma,
        novo_dia_aula,
        novo_horario_aula,
        novo_hora_fim,
        ativa
    } = req.body;

    try {
        const [rows] = await db.query(
            "CALL sp_editar_turma(?, ?, ?, ?, ?, ?)",
            [id_turma, novo_nome_turma, novo_dia_aula, novo_horario_aula, novo_hora_fim, ativa]
        );

        const resultado = rows[0][0]?.resultado || 0;

        res.json({ resultado });
    } catch (erro) {
        console.error("Erro ao editar turma:", erro);
        res.status(500).json({ resultado: 0 });
    }
});


module.exports = router;