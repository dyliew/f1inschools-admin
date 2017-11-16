const firebase = require('firebase-admin');

var serviceAccount = require("./service-account.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://f1inschools-df6e1.firebaseio.com"
});
var db = firebase.firestore();

module.exports = db;