const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const fornecedores = require('./routes/fornecedores')

app.use(bodyParser.json())

app.use('/api/fornecedores', fornecedores)

app.listen( config.get('api.port'), () => {
    console.log('Ouvindo na porta 3000')
})
