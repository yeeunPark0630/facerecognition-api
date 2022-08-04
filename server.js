const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')
const cors = require('cors')
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : '',
      password : '',
      database : 'smart-brain'
    }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

// root
app.get('/', (req, res) => {
    res.send(database.users);
})

// signin
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

// register
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

// profile/id
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)})

// image
app.put('/image', (req, res) => {image.handleImage(req,res, db)})



app.listen(3000, () => {
    console.log('app is running on part 3000');
})

/* 
/signin --> post -> success/fail
/register --> post -> user
/profile/:userId --> GET -> user
/image --> put (update) -> user
*/