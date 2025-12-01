const express = require('express');
const router = express.Router();
const db = require("../db_config.js");

// 1. Ranking de Turmas por Frequência Média
router.get("/ranking-turmas", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM vw_ranking_maior_frec_turma;");
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// 2. Progresso Temporal por Turma
router.get("/progresso-temporal", async (req, res) => {
  const { turma } = req.query;
  try {
    let query = "SELECT * FROM vw_prog_temporal_turma";
    const params = [];
    
    if (turma) {
      query += " WHERE nome_turma = ?";
      params.push(turma);
    }
    
    query += " ORDER BY ano, mes";
    
    const [rows] = await db.query(query, params);
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// 3. Taxa de Retenção por Período
router.get("/taxa-retencao", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM vw_taxa_retencao_periodo;");
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// 4. Turmas que Precisam de Atenção
router.get("/turmas-atencao", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM vw_turmas_precisam_atencao;");
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// 5. Previsão de Evasão
router.get("/previsao-evasao", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM vw_prev_evacao;");
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// 6. Linha do Tempo de Saídas
router.get("/linha-tempo-saidas", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM vw_linha_tem_saidas;");
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;