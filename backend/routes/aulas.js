const express = require('express');
const router = express.Router();
const db = require("../db_config.js");

router.get("/:idTurma/:tipoAula", async (req, res) => {
    const {idTurma, tipoAula} = req.params;
        

    try{
        const [rows] = await db.query("CALL sp_lista_aulas(?, ?);", [idTurma, tipoAula]);
        
        res.json({success: true, data: rows});
    } catch (error){
        console.error("Erro ao listar aulas: ", error);
        res.status(500).json({success: false, error: error.message});
    }
});

router.put("/concluir/:idAula", async (req, res) => {
    const {idAula } = req.params;

    try{
        const [rows] = await db.query("CALL sp_conclui_aula(?);", [idAula]);
        const resultado = rows[0][0]?.resultado;

        if(resultado === 1){
            res.json({success: true, message: "Aula concluída com sucesso!"});
        }else{
            res.json({ success: false, message: "Aula já concluída ou não encontrada."});
        }
    }catch(error){
        console.error("Erro ao concluir aula: ", error);
        res.status(500).json({success: false, error: error.message});
    }
});

module.exports = router;