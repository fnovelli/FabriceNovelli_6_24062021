const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
var cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
const rateLimit = require("express-rate-limit");
  
const app = express();

let json = require('./token.json');

mongoose.connect('mongodb+srv://root:' + json + '@cluster0.ywlii.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !')
  );

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });

  //body-parser is outdated, we use this syntax instead, the idea is still the same, analyse and treat body request.
  app.use(express.urlencoded({extended: true})); 
  app.use(express.json());

  //fix security when doing http request
  app.use(cors())
  app.use(mongoSanitize());
  app.use(limiter);
  app.use('/images', express.static(path.join(__dirname, 'images')));
  app.use('/api/sauces', saucesRoutes);
  app.use('/api/auth', userRoutes);
  

  module.exports = app;