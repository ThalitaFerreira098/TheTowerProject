const express = require('express');
const router = express.Router();
const db = require("../db_config.js");

router.get("/", (req, res) => {
    db.query("CALL sp_lista_turmas()", (erro, resultados) => {
        if(erro){
            console.error("Erro ao listar turmas:", erro);
            return res.status(500).json({erro: "Erro ao listar Turmas"});
        }
        res.json(resultados[0]);
    });
});

router.post("/", (req, res) => {
    const { nome_turma, dia_semana, hora_inicio, hora_fim} = req.body;

    if(!nome_turma || !dia_semana || !hora_inicio || !hora_fim){
        return res.status(400).json({
            erro:"O preenchimento de todos os campos é obrigatório"
        });
    }

    db.query("CALL sp_criar_turma(?, ?, ?, ?)",
        [nome_turma, dia_semana, hora_inicio, hora_fim],
        (erro, resultados) => {
            if(erro){
                console.error("Erro ao criar turma: ", erro);
                return res.status(500).json({ erro: "Erro ao criar turma"});
            }

            const id_turma = resultados[0][0]?.id_turma;
            res.status(201).json({ message: `Turma", ${nome_turma}," criada com sucesso! ` });
        }
    );
});

router.put("/:id", (req, res) => {
    const {id} = req.params;
    const { nome_turma, dia_semana, hora_inicio, hora_fim } = req.body;

    if (!nome_turma || !dia_semana ||!hora_inicio ||!hora_fim){
        return res.status(400).json({
            erro: "os campos devem estar preenchidos obrigatoriamente!"
        });
    }

    db.query("CALL sp_atualiza_turma(?, ?, ?, ?)",
        [id, nome_turma, dia_semana, hora_inicio, hora_fim], 
        (erro) => {
            if(erro){
                console.error("Erro ao atualizar a turma:", erro);
                return res.status(500).json({ erro: "Erro ao atualizar turma"});
            }
            res.json({mensgem: "Turma atualiazada com sucesso!"});
        }
    );

});



module.exports = router;