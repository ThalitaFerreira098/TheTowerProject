const express = require('express');
const router = express.Router();
const db = require("../db_config.js");

 
router.get("/emprestimos-ativos", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM vw_emprestimos_ativos ");
        res.json({ success: true, data: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

 
router.get("/livros-disponiveis", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM tb_acervo_livros WHERE status = 'Disponivel'");
        res.json({ success: true, data: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

 
router.get("/historico-devolucoes", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM vw_emprestimos_finalizados");
        res.json({ success: true, data: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

 
router.get("/pesquisar-livro", async (req, res) => {
    const { termo } = req.query;
    
    try {
         
        const numeroLivro = parseInt(termo);
        
        const [rows] = await db.query("CALL sp_pesquisa_livro(?, ?)", 
            [termo, isNaN(numeroLivro) ? null : numeroLivro]);
        
        res.json({ success: true, data: rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

 
router.post("/inserir-livro", async (req, res) => {
    const { nome_livro, genero, autor, nicho, numero_livro } = req.body;

    if (!nome_livro || !genero || !autor || !nicho || !numero_livro) {
        return res.status(400).json({
            success: false,
            message: "Todos os campos são obrigatórios"
        });
    }

    try {
        const [resultados] = await db.query("CALL sp_insere_livro(?, ?, ?, ?, ?)", 
            [nome_livro, genero, autor, nicho, numero_livro]);

        const resultado = resultados?.[0]?.[0]?.resultado;

        if (resultado === 1) {
            res.json({ success: true, message: "Livro inserido com sucesso!" });
        } else if (resultado === 2) {
            res.json({ success: false, message: "Já existe um livro com este nicho e número!" });
        } else {
            res.json({ success: false, message: "Erro ao inserir livro!" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

 
router.put("/editar-livro", async (req, res) => {
    const { id_livro, nome_livro, genero, autor, nicho, numero_livro } = req.body;

    if (!id_livro || !nome_livro || !genero || !autor || !nicho || !numero_livro) {
        return res.status(400).json({
            success: false,
            message: "Todos os campos são obrigatórios"
        });
    }

    try {
        const [resultados] = await db.query("CALL sp_edita_livro(?, ?, ?, ?, ?)", 
            [nome_livro, genero, autor, nicho, numero_livro]);

        const resultado = resultados?.[0]?.[0]?.resultado;

        if (resultado === 1) {
            res.json({ success: true, message: "Livro atualizado com sucesso!" });
        } else if (resultado === 2) {
            res.json({ success: false, message: "Livro não encontrado!" });
        } else {
            res.json({ success: false, message: "Erro ao atualizar livro!" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

 
router.post("/registrar-emprestimo", async (req, res) => {
    const { email_aluno, id_livro } = req.body;

    if (!email_aluno || !id_livro) {
        return res.status(400).json({
            success: false,
            message: "Email do aluno e ID do livro são obrigatórios"
        });
    }

    try {
        const [resultados] = await db.query("CALL sp_registar_emprestimo(?, ?)", 
            [email_aluno, id_livro]);

        const resultado = resultados?.[0]?.[0]?.resultado;

        if (resultado === 1) {
            res.json({ success: true, message: "Empréstimo registrado com sucesso!" });
        } else if (resultado === 2) {
            res.json({ success: false, message: "Aluno ou livro não encontrado!" });
        } else if (resultado === 3) {
            res.json({ success: false, message: "Este livro já está emprestado!" });
        } else {
            res.json({ success: false, message: "Erro ao registrar empréstimo!" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

 
router.post("/registrar-devolucao", async (req, res) => {
    const { id_emprestimo } = req.body;

    if (!id_emprestimo) {
        return res.status(400).json({
            success: false,
            message: "ID do empréstimo é obrigatório"
        });
    }

    try {
        const [resultados] = await db.query("CALL sp_registra_devolução(?)", [id_emprestimo]);

        const resultado = resultados?.[0]?.[0]?.resultado;

        if (resultado === 1) {
            res.json({ success: true, message: "Devolução registrada com sucesso!" });
        } else if (resultado === 2) {
            res.json({ success: false, message: "Empréstimo não encontrado ou já devolvido!" });
        } else {
            res.json({ success: false, message: "Erro ao registrar devolução!" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;