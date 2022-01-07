var express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client')
var jwt = require('jsonwebtoken');
const prisma = new PrismaClient()
const bcrypt = require("bcrypt");
const {PrismaClientValidationError} = require("@prisma/client/runtime");

app.post('/', async(req, res, next) => {
    const {email, password} = req.body

    const user = await prisma.users.findUnique({
        where: {
            email: email,
        },
    })

    if(!user){
        res.status(400).send('User does not exists!');
    } else {
        if(password === user.password){
            console.log(user.password, password)
        } else {
            console.log('wrong password')
        }
    }
  
    const token = jwt.sign({ user }, process.env.TOKEN_SECRET, { expiresIn: '1 day' }); 



    return res.json({
        id: user.user_id,
        username: user.username,
        email: email,
        password: password,
        token : token
    });


})

module.exports = app;


