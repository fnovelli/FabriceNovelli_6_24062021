const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

let json = require('./token.json');

mongoose.connect('mongodb+srv://root:' + json + '@cluster0.ywlii.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(bodyParser.json());

  app.post('/api/stuff', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
      message: 'Sauce created!'
    });
  });

app.use('/api/stuff', (req, res, next) => {
    const stuff = [
      {
        _id: 'oeihfzeoi',
        title: 'First Sauce',
        description: 'Sauce information',
        imageUrl: '',
        price: 4900,
        userId: 'qsomihvqios',
      },
      {
        _id: 'oeihfzeomoihi',
        title: 'Second sauce',
        description: 'Sauce information 2',
        imageUrl: '',
        price: 2900,
        userId: 'qsomihvqios',
      },
    ];
    res.status(200).json(stuff);
  });

  module.exports = app;