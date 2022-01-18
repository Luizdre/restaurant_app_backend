const express = require('express');
const Order = require('../model/orderModel')
const Supplie = require('../../supplies/model/supplieModel')
const Product = require('../../product/model/productModel')

const router = express.Router();

const watchOrder = Order.watch(options = {fullDocument: "updateLookup"})

watchOrder.on('change', change => {
    Order.find({}, (res, orders) => {
        socketIo.emit('Pedido alterado', orders)
    })
})

router.post('/sendOrder', async(req, res) => {
    try {
        var order = await Order.create(req.body);
        order.totalPrice = (order.totalPrice).toFixed(2)
        console.log(order.totalPrice)
        res.send(order)
    } catch (err) {
        res.status(400).send({error: 'Falha ao registrar novo pedido ' + err})
        console.log(err)
    }
})

router.patch('/acceptOrder', async(req, res) => {
    const {id, status} = req.body;

    try {
        const order = await Order.findById(id);

        await order.update({status: status}).then((value) => { 
            res.send(value) 
        });
    } catch (err) {
        res.status(400).send({error: 'Falha ao atualizar pedido ' + err})
    }
})

router.patch('/payOrder', async(req, res)=>{
    const {id, payd} = req.body;

    try {
        const order = Order.findById(id);

        order.payd = true

        await order.update({payd: payd}).then((value)=>{ res.send(value)});
    } catch (err) {
        res.status(400).send({error: 'Falha na atualização de pedido ' + err})
    }
})

router.get('/listOrders', async(req, res) => {
    try {
        Order.find({}, (req, orders) => {
            return res.send(orders)
        })       
    } catch (err) {
        res.status(400).send({error: 'Falha ao consultar pedidos ' + err})
    }
})

router.delete('/cancelOrder', async(req, res) => {
    const {id} = req.body;
    try {
        const order = Order.findById(id);
        await Order.deleteOne(order).then((value) =>{
            res.send(value);
        });
    } catch (err) {
        res.status(400).send({error: 'Falha ao deletar pedido ' + err})
        console.log(err);
    }
})

module.exports = app => app.use('/order', router);