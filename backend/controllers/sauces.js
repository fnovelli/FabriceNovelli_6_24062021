const Sauce = require('../models/Sauces');
const fs = require('fs'); //alow to edit or remove files

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce created!'}))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.editSauce = (req, res, next) => {
  const sauceObject = req.file ? //if req file exist create one specific object, otherwise create another one.
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce edited!'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1]; //get file name, second element of the array is the name.
      fs.unlink(`images/${filename}`, () => { //delete 
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce deleted!'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

function likeSauce(req, res) {

  Sauce.updateOne({_id: req.params.id}, {
    $inc: { likes: +1},
    $push: {usersLiked: req.body.userId}
})
.then(() => res.status(200).json({message: 'Liked!'}))
.catch(error => res.status(400).json({ error }));
}

function dislikeSauce(req, res) {

  Sauce.updateOne({_id: req.params.id}, {
    $inc: { dislikes: +1},
    $push: {usersDisliked: req.body.userId}
})
.then(() => res.status(200).json({message: 'Disliked!'}))
.catch(error => res.status(400).json({ error }));
  
}

function removeLikeDislike(req, res) {

  Sauce.findOne({ _id: req.params.id })
  .then((sauce) => {

      if (sauce.usersLiked.includes(req.body.userId)) {
          Sauce.updateOne({_id: req.params.id}, {
              $inc: { likes: -1},
              $pull: {usersLiked: req.body.userId}
          })
          .then(() => res.status(200).json({message: 'Like cancelled!'}))
          .catch(error => res.status(400).json({ error }));
      }

      if (sauce.usersDisliked.includes(req.body.userId)) {
          Sauce.updateOne({_id: req.params.id}, {
              $inc: { dislikes: -1},
              $pull: {usersDisliked: req.body.userId}
          })
          .then(() => res.status(200).json({message: 'Dislike cancelled!'}))
          .catch(error => res.status(400).json({ error }));
      }
  })
}

exports.likesDislikes = (req, res, next) => {

  if (req.body.like >= 1) {
    removeLikeDislike(req, res);
    likeSauce(req, res);
  } 
  
  if (req.body.like <= -1) {
    dislikeSauce(req, res);
  } 

  if (req.body.like == 0) {
    removeLikeDislike(req, res);   
  }
}