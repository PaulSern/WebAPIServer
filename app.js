const express = require('express');
const app = express();
const axios = require('axios');
const SuperHero = require('./SuperHero');
const apikey = '2024039317656535';

const cors = require('cors');

app.use(cors());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/gethero', (req, res) => {
  const hero = req.query.hero;
  const querystr = `http://www.superheroapi.com/api.php/${apikey}/search/${hero}`;

  axios
    .get(querystr)
    .then(response => {
      const hero = new SuperHero({
        name: response.data.results[0].name,
        gender: response.data.results[0].appearance.gender,
        race: response.data.results[0].appearance.race,
        publisher: response.data.results[0].biography.publisher,
        image: response.data.results[0].image.url
      });
      hero
        .save()
        .then(response => {
          res.status(200).json(response);
        })
        .catch(error => {
          res.status(400).json(error);
        });
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

app.get('/getallhero', (req, res) => {
  SuperHero.find({})
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

app.get('/deletehero', (req, res) => {
  //case sensitive
  SuperHero.deleteMany()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

app.listen(5000, () => {
  console.log('server listening on port 5000');
});
