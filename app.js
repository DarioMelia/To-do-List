const express = require("express");
const app = express();

app.use(express.urlencoded());
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/", function(req, res){
  res.render('list', {day: currentDay()});
});

app.listen(3000, function(){
  console.log("Server started on port 3000")
})


function currentDay(){
  var listDays = ["Sunday", "Monday", "Tuesday", "Wendsday", "Thursday", "Friday", "Saturday"] ;
  var dayIndex = new Date().getDay();
  var today = listDays[dayIndex];
  return today;
}
