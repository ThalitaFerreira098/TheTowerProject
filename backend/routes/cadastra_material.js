const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require("../db_config.js");

const router = express.Router();

// storage dinâmico
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const nomePasta = req.body.nome_pasta;

        let dest;
        if (req.body.tipo_aula === "Lesson") {
            dest = path.join(__dirname, '..', '..', 'materiais', 'books', nomePasta);
        } else {
            dest = path.join(__dirname, '..', '..', 'materiais', nomePasta);
        }

        fs.mkdirSync(dest, { recursive: true });
        cb(null, dest);
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

// AQUI ESTÁ A CORREÇÃO (antes estava .single('pdf'))
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'application/pdf') return cb(new Error('Apenas PDF permitido'));
        cb(null, true);
    }
}).any();  // <<< CORREÇÃO AQUI!!! <<<


router.post('/', (req, res) => {
    upload(req, res, async function (err) {

        if (err) {
            console.error('MulTer erro', err);
            return res.status(400).json({ resultado: 0, mensagem: err.message || 'Erro no upload' });
        }

        // extrair o arquivo PDF corretamente
        const file = req.files.find(f => f.fieldname === 'pdf');
        const nome_arquivo = file ? file.originalname : null;

        const tipo_aula = req.body.tipo_aula;
        const nome_pasta = req.body.nome_pasta || '';
        const id_book = req.body.id_book ? parseInt(req.body.id_book) : null;
        const numero_lesson = req.body.numero_lesson ? parseInt(req.body.numero_lesson) : null;
        const titulo = req.body.titulo || '';

        if (!tipo_aula || !nome_arquivo) {
            if (file && file.path && fs.existsSync(file.path)) fs.unlinkSync(file.path);
            return res.status(400).json({ resultado: 0, mensagem: 'Dados incompletos' });
        }

        try {
            const conn = db.promise ? db : db;

            const [rows] = await conn.query('CALL sp_cadastra_material(?,?,?,?,?,?)', [
                tipo_aula,
                nome_pasta,
                nome_arquivo,
                titulo,
                id_book || 0,
                numero_lesson || 0
            ]);

            let resultado = 0;

            if (Array.isArray(rows) && rows.length) {
                const first = rows[0];
                if (Array.isArray(first) && first.length && first[0].resultado !== undefined) {
                    resultado = first[0].resultado;
                } else if (first.resultado !== undefined) {
                    resultado = first.resultado;
                } else if (rows[0] && rows[0][0] && rows[0][0].resultado !== undefined) {
                    resultado = rows[0][0].resultado;
                }
            }

            if (resultado === 1) {
                return res.json({ resultado: 1, mensagem: 'Cadastrado com sucesso' });
            } else {
                if (file && file.path && fs.existsSync(file.path)) fs.unlinkSync(file.path);
                return res.json({ resultado: 0, mensagem: 'Não foi possível cadastrar: arquivo pode já existir ou dados inválidos.' });
            }

        } catch (error) {
            console.error('Erro procedure:', error);
            if (file && file.path && fs.existsSync(file.path)) fs.unlinkSync(file.path);
            return res.status(500).json({ resultado: 0, mensagem: 'Erro interno no servidor.' });
        }

    });
});


// GET /books
router.get("/books", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM tb_books ORDER BY numero_book ASC");
        res.json(rows);
    } catch (err) {
        console.error("Erro ao buscar books:", err);
        res.status(500).json({ mensagem: "Erro interno ao buscar os books." });
    }
});

module.exports = router;
