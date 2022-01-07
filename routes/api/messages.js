var express = require('express');
var path = require('path')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const {PrismaClientValidationError} = require("@prisma/client/runtime");


const app = express();



/* GET messages. */
app.get('/', async function(req, res, next) {
    const messages = await prisma.messages.findMany({
        orderBy: [
            {
                sendAt: 'desc',
            }
        ],
    })
    res.status(200).json(messages);
});

/* POST messages. */
app.post('/create/:id', async (req, res) => {
    const { id } = req.params
    const { content } = req.body
    const user = await prisma.users.findUnique({
        where: {
            user_id: parseInt(id),
        },
    })
    const message = await prisma.messages.create({
        data: {
            sendAt : new Date(),
            content : content,
            user_id : parseInt(id)
        },
    })
    res.json(message)
})

module.exports = app