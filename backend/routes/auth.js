const express = require("express");
const router = express.Router();
const db = require('../db_config');

// rota para login
router.post('/login', (req, res) => {
    const { usuario, senha } = req.body;
     
    if(!usuario || !senha){
        return res.status(400).json({success: false, message: "Usuário e senha são obrigatórios!"});
    }

    const sql = `CALL sp_verifica_admin(?, ?)`;

    db.query(sql, [usuario, senha], (err, results) => {
        if(err){
            console.error('Erro ao executar procedure:', err);
            return res.status(500).json({success: false, message: 'Erro: no servidor'})
        } 
        
         
       const resultado =  results[0][0].resultado;


        if(resultado === 1){
            //login funcionou
            res.json({success: true, message: 'Login realizado com sucesso!' });

        }
        else{
            //senha ou usuario errados
            res.status(401).json({success: false, message: 'Usuário ou senha incorretos!'});
        }
        
    });
});

module.exports = router;