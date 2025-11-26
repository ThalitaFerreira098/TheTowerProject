const express = require('express');
const router = express.Router();
const db = require("../db_config.js");

router.get("/:idAula", async (req, res) => {
    const { idAula } = req.params;
    
    try{
        const [rows] = await db.query("CALL sp_listar_presencas_por_aula(?);", [idAula]);
        const dados = rows[0];

        if (dados.length === 1 && dados[0].resultado === 0){
            res.json({ success: false, message: "Aula não encontrada. "});
        }else{
            res.json({success: true, data: dados});
        }
    } catch (error){
        console.error("Erro ao listar presenças : ", error);
        res.status(500).json({ success: false, message: error.message});
    }
});

router.post("/registrar", async (req, res) =>{
    const { idAluno, idAula, presente } = req.body;

    try{
        const [rows] = await db.query("CALL sp_realizar_chamada(?, ?, ?);", 
            [
                presente, 
                idAluno,
                idAula,
            ]);
        
        const resultado = rows[0][0]?.resultado;
        
        if(resultado == 1){
            res.json({success: true, message: "Presença registrada com sucesso!"});
        }else{
            res.json({success: false, message: "Erro ao registrar presença!."});
        }

    }catch (error){
        console.error(" Erro ao registrar presença: ", error);
        res.status(500).json({success: false, message: error.message});
    }
});

router.post("/concluir/conversacao/:idTurma", async (req, res) => {
    const { idTurma} = req.params;

    try{
        const [rows] = await db.query("call sp_conclui_conversacao(?);", [idTurma]);
        const resultado = rows[0][0]?.resultado;
        const idAula = rows[0][0]?.id_aula || null;

        if(resultado == 1){
            res.json({ success: true, id_aula: idAula});
        }else{
            res.json({success: false, message: "Aula não encontrada."})
        }
    }catch(error){
        console.error(error);
        res.status(500).json({success: false, message: error.message});
    }
});

module.exports = router;