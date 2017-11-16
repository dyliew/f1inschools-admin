var axios = require('axios');

var express = require('express');
var router = express.Router();

var db = require('../db');

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render('index');
});

router.post('/', (req, res) => {
  var current = req.body;

  // todo:

  res.redirect('/');  
})

// router.get('/api/countries', (req, res) => {
//   db.collection('countries').get()
//     .then(docs => {
//       var countries = [];
//       docs.forEach((doc) => countries.push(doc.id));
//       res.send(countries);
//     });
// });

// router.get('/api/:country/states', (req, res) => {
//   db.collection('countries').doc(req.params.country).get()
//     .then(doc => {
//       if (doc.exists) {
//         res.send(doc.data().states);
//       } else {
//         res.sendStatus(404);
//       }
//     });
// });

// router.get('/api/:country/:state/cities', (req, res) => {
//   db.collection('countries').doc(req.params.country).get()
//     .then(doc => {
//       if (!doc.exists) {
//         res.sendStatus(404);
//         return Promise.reject('country not found');
//       }
//       else {
//         return db.collection('states').doc(req.params.state).get()
//       }
//     })
//     .then(doc => {
//       if (!doc.exists) {
//         res.sendStatus(404);
//         return Promise.reject('state not found');
//       } else {
//         res.send(doc.data().cities);
//       }
//     })
// });

// router.get('/api/:country/:state/:city/venues', (req, res) => {
//   db.collection('countries').doc(req.params.country).get()
//     .then(doc => {
//       if (!doc.exists) {
//         res.sendStatus(404);
//         return Promise.reject('country not found');
//       }
//       else {
//         return db.collection('states').doc(req.params.state).get()
//       }
//     })
//     .then(doc => {
//       if (!doc.exists) {
//         res.sendStatus(404);
//         return Promise.reject('state not found');
//       }
//       else {
//         return db.collection('cities').doc(req.params.city).get()
//       }
//     })
//     .then(doc => {
//       if (!doc.exists) {
//         res.sendStatus(404);
//         return Promise.reject('city not found');
//       } else {
//         res.send(doc.data().venues);
//       }
//     })
// });

// router.get('/api/:country/:state/:city/:venue/dates', (req, res) => {
//   db.collection('countries').doc(req.params.country).get()
//     .then(doc => {
//       if (!doc.exists) {
//         res.sendStatus(404);
//         return Promise.reject('country not found');
//       }
//       else {
//         return db.collection('states').doc(req.params.state).get()
//       }
//     })
//     .then(doc => {
//       if (!doc.exists) {
//         res.sendStatus(404);
//         return Promise.reject('state not found');
//       }
//       else {
//         return db.collection('cities').doc(req.params.city).get()
//       }
//     })
//     .then(doc => {
//       if (!doc.exists) {
//         res.sendStatus(404);
//         return Promise.reject('city not found');
//       }
//       else {
//         return db.collection('venues').doc(req.params.venue).get()
//       }
//     })
//     .then(doc => {
//       if (!doc.exists) {
//         res.sendStatus(404);
//         return Promise.reject('venue not found');
//       } else {
//         res.send(doc.data().dates);
//       }
//     })
// });

module.exports = router;
