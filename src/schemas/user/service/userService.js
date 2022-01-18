const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../model/userModel')

router.post('/register', async(req, res) =>{
    try {
        const { email } = req.body;

        if(await User.findOne({email}))
            return res.status(400).send({error: 'E-mail já cadastrado'})

        const user = await User.create(req.body);

        user.password = undefined;

        res.send({user})
    } catch (err) {
        res.status(400).send({error: 'Falha ao cadastrar usuário ' + err})
    }
})

router.post('/authenticate', async(req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email}).select('+password');

    if(!user)
        return res.status(400).send({error: 'Usuário não encontrado'})
    if(!await bcrypt.compare(password, user.password))
        return res.status(400).send({error: 'Senha inválida'})

    user.password = undefined;

    res.send(user);
})

router.delete('/deleteUser', async(req, res) => {
    const {id} = req.body;
    try {
        const user = await User.findById(id);

        User.deleteOne(user).then((value) => { 
            res.send(value)
        })
    } catch (err) {
        res.status(400).send({error: 'Falha ao deletar usuário ' + err})
    }
})

module.exports = app => app.use('/user', router);