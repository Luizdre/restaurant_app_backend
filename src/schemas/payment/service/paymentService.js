const Payment = require('../model/paymentModel');
const express = require('express');
const router = express.Router();

const paymentWatch = Payment.watch(options = {fullDocument: "updateLookup"});

paymentWatch.on('change', (change) => {
    Payment.find({}, (req, payments) => {
        socketIo.emit('Payment Alterado', payments);
    })
})

router.get('/listPayments', async(req, res)=>{
    Payment.find({}, (req, payments)=>{
        res.send(payments);
    })
});

router.post('/createPayment', async(req,res)=>{
    try {
        const payment = await Payment.create(req.body);
        res.send({payment});
    } catch (err) {
        res.status(400).send({error:'Falha no cadastro de pagamento ' + err})
    }
});

router.delete('/deletePayment', async(req, res)=>{
    const {id} = req.body;

    try {
        const payment = Payment.findById(id);
        
        await Payment.deleteOne(payment).then((value) => {
            res.send(value);
        });
    } catch (err) {
        res.status(400).send({error: 'Falha na exclusão de pagamento ' + err})
    }
});

router.patch('/updatePayment', async(req, res)=>{
    const {id, name} = req.body;

    try {
        const payment = Payment.findById(id);

        payment.name = name

        await payment.update({name: name}).then((value)=>{ res.send(value)});
    } catch (err) {
        res.status(400).send({error: 'Falha na atualização de pagamento ' + err})
    }
})

module.exports = app => app.use('/payment', router);