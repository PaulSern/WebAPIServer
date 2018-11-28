const mongoose = require('mongoose');
const db = 'mongodb://user11:user11@ds261440.mlab.com:61440/superhero';

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('connected to database');
  })
  .catch(error => {
    console.log('Mongoose connection error: ', error);
  });

const schema = mongoose.Schema({
  name: {
    type: String
  },
  gender: {
    type: String
  },
  race: {
    type: String
  },
  publisher: {
    type: String
  },
  image: {
    type: String
  }
});

const SuperHero = mongoose.model('SuperHero', schema, 'superheroCollection');

module.exports = SuperHero;
