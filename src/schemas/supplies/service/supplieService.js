const express = require('express');
const router = express.Router();
const Supplie = require('../model/supplieModel')

const watchSupplie = Supplie.watch(options = {fullDocument: "updateLookup"});

watchSupplie.on('change', (data) => {
    Supplie.find({}, (req, supplies) =>{
        socketIo.emit('Supplie Alterado', supplies);
    })
})

router.get('/listSupplies', async(req, res) => {
    try {
        Supplie.find({}, (req, supplies) => {
            res.send(supplies);
        })
    } catch (err) {
        res.status(400).send({error: 'Falha ao consultar insumos ' + err})
    }
});

router.post('/createSupplie', async(req, res) => {
    try {
        const supplie = await Supplie.create(req.body);
        res.send(supplie);
    } catch (err) {
        res.status(400).send({error: 'Falha ao cadastrar insumo ' + err})
    }
})

router.patch('/alterSupplie', async(req, res) => {
    const {id, name} = req.body
    try {
        const supplie = await Supplie.findById(id);
        supplie.name = name
        await supplie.update({name: name}).then((value) => res.send(value));
    } catch (err) {
        res.status(400).send({error: 'Falha ao alterar insumo ' + err})
    }
})

router.delete('/deleteSupplie', async(req, res) => {
    const {id} = req.body;
    try {
        const supplie = await Supplie.findById(id);

        await Supplie.deleteOne(supplie).then((value) => { 
            res.send( value)
        })
    } catch (err) {
        res.status(400).send({error: 'Falha ao excluir insumo ' + err})
    }
})

module.exports = app => app.use('/supplie', router);