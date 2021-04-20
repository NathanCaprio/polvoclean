const mysql = require('mysql')
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your new password',
    port: 3306,
    database: 'produtos',
    multipleStatements: true

});

db.connect((erro)=>{
    if(erro){
        throw erro;
    }
    console.log(`Conectado ao banco de dados`)
})

global.db = db

module.exports = db;