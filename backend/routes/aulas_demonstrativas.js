 const express = require("express");
const router = express.Router();
const db = require("../db_config.js");

// LISTAR AULAS EM ANDAMENTO
router.get("/listar", async (req, res) => {
    try {
        const [rows] = await db.query(
            "select * from vw_aulas_demonstrativas_marcadas;"
        );
        res.json(rows);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
});

// MARCAR AULA
router.post("/marcar", async (req, res) => {
    const { nome, email, data, horario } = req.body;

    try {
        const [resultado] = await db.query(
            "CALL sp_marca_aula_demostrativa(?,?,?,?);",
            [nome, data, email, horario]
        );

        res.json(resultado[0][0]);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
});

// CANCELAR
router.put("/cancelar/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const [resultado] = await db.query(
            "CALL sp_cancela_aula_demostrativa(?);",
            [id]
        );
        res.json(resultado[0][0]);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
});

// CONFIRMAR MATRÍCULA
router.put("/confirmar/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const [resultado] = await db.query(
            "CALL sp_cofirma_matricula(?);",
            [id]
        );
        res.json(resultado[0][0]);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
});

module.exports = router;
