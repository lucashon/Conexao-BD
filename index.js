// modulos //
const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql2')

const port = 3000
const app = express()
//Receber dados json FRONT END
app.use(express.urlencoded({extended:true}))
app.use(express.json())


//configuração Handlebars
app.engine('handlebars', exphbs.engine())
app.set('view engine' , 'handlebars')

// Middlewars para utilizar os arquivos estáticos
app.use(express.static('public'))

//Rota -> localhost:3000
app.get('/', (req,res)=>{
    return res.render('home')
})

//Rota -> localhost:3000/books/insertbook
app.post('/books/insertbook',(req,res)=>{
    const {title, nm_paginas} = req.body

    const sql = `INSERT INTO tb_books (title, nm_paginas) VALUES ('${title}', '${nm_paginas}') `
    conn.query(sql, (err)=>{
        if(err){
            console.log(err)
            return
        }
        return res.redirect('/')
    })

    
})

// Rota -> localhost:3000/books   ->Lista os livros
app.get('/books', (req,res)=>{
    const sql = 'SELECT  * FROM tb_books'
    
    conn.query(sql, (err, data)=>{
        if(err){
            console.log(err)
            return
        }
        const books = data
        console.log(books)
        res.render('books', {books})

    })
})

//Criar conexão com o banco
const conn = mysql.createConnection({
    host:'localhost',
    port:'3306',
    user:'aluno_medio',
    password:'@lunoSenai23.',
    database:'banco2'
})
//Estabelecer uma conexão com o banco
conn.connect((err)=>{
    if(err){
        console.log(err)
        return
    }
    console.log('MYSQL Conectado!')
    app.listen(port,()=>{
        console.log(`servidor rodando na porta: ${port}`)
    })  
})


