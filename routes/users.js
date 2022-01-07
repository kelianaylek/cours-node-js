let express = require('express');
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const bcrypt = require("bcrypt");
const {PrismaClientValidationError} = require("@prisma/client/runtime");

const app = express();

/* GET users. */
app.get('/', async function(req, res, next) {
  const users = await prisma.users.findMany()
  res.status(200).json(users);
});

/* POST users. */
app.post('/create', async (req, res) => {
  const { username, password, email } = req.body
  const salt = await bcrypt.genSalt(10);
  const userPassword = await bcrypt.hash(password, salt);
  try {
    const user = await prisma.users.create({
      data: {
        username,
        password : userPassword,
        email,
        created_on : new Date(),
        last_login : new Date()
      },
    })
    res.json(user)

  } catch (e) {
      if (e.code === 'P2002') {
        return res.json({message : 'Cet email est déjà associé à un compte.', code : e.code})
      }
    if (e instanceof PrismaClientValidationError) {
      return res.json({message : 'Bad request', code : e.code})
    }
    throw e
  }

})




module.exports = app;
