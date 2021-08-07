const router = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')

router.get('/', async (req, res) => {
    const resultados = await TabelaFornecedor.listar()
    res.send(
        JSON.stringify(resultados)
    )
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id 
        const fornecedor = new Fornecedor({ id:id })
        await fornecedor.carregar()
        res.send(
            JSON.stringify(fornecedor)
        )
    }catch (erro) {
        res.send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})

router.post('/', async (req, res) => {
    try {
        const dadosRecebidos = req.body
        const fornecedor = new Fornecedor(dadosRecebidos)
        await fornecedor.criar()
        res.send(
            JSON.stringify(fornecedor)
        )
    }catch (erro) {
        res.send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})

router.put('/:id', async (req, res) => {
    try {
        const dadosRecebidos = req.body
        const id = req.params.id
        const dados = Object.assign({}, dadosRecebidos, {id: id})
        const fornecedor =  new Fornecedor(dados)
        await fornecedor.atualizar()
        res.end()
    }catch(erro) {
        res.send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const id = req.params.id
        const fornecedor = new Fornecedor({id: id})
        await fornecedor.carregar()
        await fornecedor.remover()
        res.end()
    }catch(erro){
        res.send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})

module.exports = router