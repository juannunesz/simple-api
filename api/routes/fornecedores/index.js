const router = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')
const NaoEncontrado = require('../../err/NaoEncontrado')

router.get('/', async (req, res) => {
    const resultados = await TabelaFornecedor.listar()
    res.status(200)
    res.send(
        JSON.stringify(resultados)
    )
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id 
        const fornecedor = new Fornecedor({ id:id })
        await fornecedor.carregar()
        res.status(200)
        res.send(
            JSON.stringify(fornecedor)
        )
    }catch (erro) {
        res.status(404).send(
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
        res.status(201)
        res.send(
            JSON.stringify(fornecedor)
        )
    }catch (erro) {
        res.status(400).send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})

router.put('/:id', async (req, res, prox ) => {
    try {
        const dadosRecebidos = req.body
        const id = req.params.id
        const dados = Object.assign({}, dadosRecebidos, {id: id})
        const fornecedor =  new Fornecedor(dados)
        await fornecedor.atualizar()
        res.status(204).end()
    }catch(erro) {
       prox(erro)
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const id = req.params.id
        const fornecedor = new Fornecedor({id: id})
        await fornecedor.carregar()
        await fornecedor.remover()
        res.status(204).end()
    }catch(erro){
        res.status(404).send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})

module.exports = router 