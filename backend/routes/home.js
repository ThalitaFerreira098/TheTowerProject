const express = require('express');
const router = express.Router();
const db = require("../db_config.js");


router.get("/agenda", async (req, res) => {
 
    try {
        const [rows] = await db.query("select * from vw_lista_aula_dia;");

        res.json({
            success: true,
            data: rows
        });

    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            error: "Erro ao buscar agenda."
        });
    }
});
module.exports = router;