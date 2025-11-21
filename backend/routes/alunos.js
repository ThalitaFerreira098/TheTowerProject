const express = require('express');
const router = express.Router();
const db = require("../db_config.js");


router.get("/buscar", async (req, res) => {
    const { nome } = req.query;

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


module.exports = router;