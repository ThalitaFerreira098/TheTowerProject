const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: 'minhasenhasql',
    database: 'thetower_db'
});

db.connect(err => {
    if(err){
        console.error('Erro ao conectar ao MYSQL: ', err);
    }
    else{
        console.log("Conectado ao MySQL com sucesso!");
    }
});

module.exports = db;