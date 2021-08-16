const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
var cors = require('cors');

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
  
const app = express();

let json = require('./token.json');

mongoose.connect('mongodb+srv://root:' + json + '@cluster0.ywlii.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !')
  );

  //body-parser is outdated, we use this syntax instead, the idea is still the same, analyse and treat body request.
  app.use(express.urlencoded({extended: true})); 
  app.use(express.json());

  //fix security when doing http request
  app.use(cors())

  app.use('/images', express.static(path.join(__dirname, 'images')));
  app.use('/api/sauces', saucesRoutes);
  app.use('/api/auth', userRoutes);
  

  module.exports = app;