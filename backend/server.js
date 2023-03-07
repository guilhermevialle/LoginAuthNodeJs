import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken'

const client = new PrismaClient();
const server = express();
const port = 3000;

server.use(cors());
server.use(bodyParser());

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  console.log(token)

  if (!token) {
    return res.status(401).send({ message: "Acesso negado." })
  }

  try {
    const secret = process.env.SECRET
    jwt.verify(token, secret)
    next()
    return res.status(200).send({ message: 'Autheticated user' })

  } catch (err) {
    console.log(err)
    return res.status(400).send({ message: 'Token invalido.' })
  }
}

server.get('/auth', verifyJWT, async (req, res) => {

})

server.post('/register', async (req, res) => {
  const validadeData = req.body;
  const validadeEmail = req.body.email;
  const validadeUsername = req.body.username;

  console.log({ data: validadeData });

  if (validadeData) {
    const existingEmail = await client.user.findUnique({
      where: {
        email: validadeEmail,
      },
    });
    if (existingEmail) {
      return res.status(400).send({
        message: 'Email already in use',
      });
    }

    const existingUsername = await client.user.findUnique({
      where: {
        username: validadeUsername,
      },
    });
    if (existingUsername) {
      return res.status(400).send({
        message: 'Username already in use',
      });
    }

    const user = await client.user.create({
      data: validadeData,
    });
    console.log(user);
    return res.status(201).send({
      message: 'Account created sucessfuly',
    });
  }
});

server.post('/login', async (req, res) => {
  const data = req.body;
  console.log(data);

  if (data) {
    const existingUsername = await client.user.findUnique({
      where: {
        username: data.emailOrUsername,
      },
    });

    const existingEmail = await client.user.findUnique({
      where: {
        email: data.emailOrUsername,
      },
    });

    if (existingUsername || existingEmail) {
      if (
        (existingUsername?.password == data.password) |
        (existingEmail?.password == data.password)
      ) {
        const secret = process.env.SECRET

        const token = jwt.sign({ userId: existingUsername?.id || existingEmail.id }, secret, { expiresIn: 300 })
        res.status(201).send({ message: 'Logged in!', auth: true, token });
      } else {
        return res.status(401).send({ message: 'Invalid email or password' });
      }
    } else {
      return res.status(401).send({ message: 'Invalid email or password' });
    }
  }
});



server.listen(port);
