let express = require('express');
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const app = express();

/* GET users. */
app.get('/', async function(req, res, next) {
  const users = await prisma.users.findMany()
  res.status(200).json(users);
});

/* POST users. */
app.post('/create', async (req, res) => {
  const { username, password, email } = req.body
  const user = await prisma.users.create({
    data: {
      username,
      password,
      email,
      created_on : new Date(),
      last_login : new Date()
    },
  })
  res.json(user)
})

module.exports = app;
