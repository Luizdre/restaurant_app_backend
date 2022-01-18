const express = require('express');
const router = express.Router();
const Product = require('../model/productModel');

const watchProduct = Product.watch(options = {fullDocument: "updateLookup"});

watchProduct.on('change', (change) =>{
    Product.find({}, (req, products) =>{
        socketIo.emit('Product Alterado', products)
    });
})

router.get('/listProducts', async(req, res) => {
    try {
        Product.find({}, (req, products) => {
            res.send(products);
        })
    } catch (err) {
        res.status(400).send({error: 'Falha ao consultar produtos ' + err})
    }
})

router.post('/createProduct', async(req, res) => {
    try {
        const product = await Product.create(req.body);
        res.send(product);
    } catch (err) {
        res.status(400).send({error: 'Falha ao registrar produto ' + err})
    }
});

router.delete('/deleteProduct', async(req, res) => {
    const {id} = req.body;
    try {
        const product = await Product.findById(id);

        await Product.deleteOne(product).then((value) => {
            res.send(value)
        });
        
    } catch (err) {
        res.status(400).send({error: 'Falha ao deletar produto ' + err})
    }
})

router.put('/updateProduct', async(req, res) => {
    const {id} = req.body;
    try {
        const product = await Product.findById(id);
        await product.update(req.body).then((value) => {
            res.send(value)
        })
    } catch (err) {
        res.status(400).send({error: 'Falha ao atualizar o produto ' + err})
    }
})

module.exports = app => app.use('/product', router);