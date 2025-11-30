const express = require('express');
const router = express.Router();
const db = require("../db_config.js");

router.get("/listar", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM tb_estoque ORDER BY numero_book");
        res.json({ success: true, data: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post("/incrementar", async (req, res) => {
    const { numero_book } = req.body;

    if (!numero_book) {
        return res.status(400).json({
            success: false,
            message: "Número do book é obrigatório"
        });
    }

    try {
        const [resultados] = await db.query("CALL sp_incrementa_estoque(?)", [numero_book]);
        const resultado = resultados?.[0]?.[0]?.resultado;

        if (resultado === 1) {
            res.json({ 
                success: true, 
                message: "Estoque incrementado com sucesso!",
                resultado: resultado
            });
        } else {
            res.json({ 
                success: false, 
                message: "Book não encontrado no estoque!",
                resultado: resultado
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post("/decrementar", async (req, res) => {
    const { numero_book } = req.body;

    if (!numero_book) {
        return res.status(400).json({
            success: false,
            message: "Número do book é obrigatório"
        });
    }

    try {
        const [resultados] = await db.query("CALL sp_decrementa_estoque(?)", [numero_book]);
        const resultado = resultados?.[0]?.[0]?.resultado;

        if (resultado === 1) {
            res.json({ 
                success: true, 
                message: "Estoque decrementado com sucesso!",
                resultado: resultado
            });
        } else if (resultado === 2) {
            res.json({ 
                success: false, 
                message: "Não é possível decrementar - quantidade zero ou book não encontrado!",
                resultado: resultado
            });
        } else {
            res.json({ 
                success: false, 
                message: "Erro ao decrementar estoque!",
                resultado: resultado
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;