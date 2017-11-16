var axios = require('axios');
var admin = require("firebase-admin");
var uuid = require('uuid');
var http = require('http');
var fs = require('fs');
var csv = require("fast-csv");
var express = require('express');
var router = express.Router();

var db = require('../db');

var intervalId = 0;
var content = {
  country: '',
  state: '',
  city: '',
  venue: ''
};

var isStarted = false;

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  console.log(content);
  res.render('index', Object.assign({ buttonText: !isStarted ? 'start' : 'stop' }, content));
});
var intervalObj = null;
router.post('/', (req, res) => {
  content = {
    country: req.body.country || 'Australia',
    state: req.body.state || 'Victoria',
    city: req.body.city || 'Melbourne',
    venue: req.body.venue || 'Carsales',
  };

  isStarted = !isStarted;
  
  if(isStarted){
    intervalObj = setInterval(() => {
      console.log('interviewing the interval');
      download()
    }, 10000);}
  else{
    clearInterval(intervalObj);
  }
  res.redirect('/');
})

module.exports = router;




// read csv file from F1 and store it locally
function download(){

  const stats = fs.statSync("results.csv")
  const oldSizeInBytes = stats.size

  var file = fs.createWriteStream("results.csv");
  var request = http.get("http://f1inschools/results.csv", function(response) {

    response.pipe(file);    
    var newSizeInBytes = response.headers['content-length'];
    // check if file is updated then update Firebase db
    if(newSizeInBytes > oldSizeInBytes){    
      readCsvAndPushToFirebase();
    }
    
    file.on('finish', function() {
      file.close();
    });
  });
}

function readCsvAndPushToFirebase(){
      
      var array = [];     
      var columns = ["RaceId", "RaceType", "Team", "Reaction_Time", "Split_Time", "Race_Time", "Combined_Time"];
      require("csv-to-array")({
        file: "results.csv",
        columns: columns
      }, function (err, array) {
        
        if(array && array.length > 1){
          var firstTeam =array[array.length-1];
          var secondTeam =array[array.length-2];

          var resultId1 = uuid.v1();
          var resultId2 = uuid.v1();
          // save race
          db.collection('races').doc(firstTeam['RaceId']).set({
            country: content.country, state: content.state, city: content.city,
            date: new Date(), venue: content.venue, team1:firstTeam['Team'], team2: secondTeam['Team'] });
          // save result of first team
          db.collection('results').doc(resultId1).set({ race: firstTeam['RaceId'], team: firstTeam['Team'],
            race_time: firstTeam['Reaction_Time'], reaction_time: firstTeam['Reaction_Time'], split_time: firstTeam['Split_Time'],
            combined_time: firstTeam['Combined_Time']? firstTeam['Combined_Time'] : 0});

           // save result of second team
          db.collection('results').doc(resultId2).set({ race: secondTeam['RaceId'], team: secondTeam['Team'],
          race_time: secondTeam['Reaction_Time'], reaction_time: secondTeam['Reaction_Time'], split_time: secondTeam['Split_Time'],
          combined_time: secondTeam['Combined_Time']?secondTeam['Combined_Time'] :0});

        } 
       
      });
}

