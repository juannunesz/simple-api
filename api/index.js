const express = require('express')
const app = express()
const config = require('config')
const fornecedores = require('./routes/fornecedores')
const NaoEncontrado = require('./err/NaoEncontrado')

app.use(express.json())

app.use('/api/fornecedores', fornecedores)

app.use((err, req, res) => {
    if(erro instanceof NaoEncontrado) {
        res.status(404)
    } else {
        res.status(400)
    }

    res.send(
        JSON.stringify({
            mensagem: erro.message,
            id: erro.idErro
        })
    )
})

app.listen( config.get('api.port'), () => {
    console.log('🔥 Server is Running 🔥')
})
