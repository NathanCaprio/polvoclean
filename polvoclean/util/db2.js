const mysql = require('mysql')
const db2 = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your new password',
    port: 3306,
    database: 'Tags',
    multipleStatements: true

});

db2.connect((erro)=>{
    if(erro){
        throw erro;
    }
    console.log(`Conectado ao banco de dados de TAGS`)
})

global.db = db2

module.exports = db2;