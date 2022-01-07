var express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client')

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
    

    return res.json({
        email: email,
        password: password
    });


})

module.exports = app;

