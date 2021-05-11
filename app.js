const express = require("express");
const app = express();

app.use(express.urlencoded());
app.use(express.static("public"));

app.set('view engine', 'ejs');

let items = [];

app.get("/", function(req, res) {

  let day = newDateToString("en-Us");

  res.render('list', {
    day: day,
    items: items
  });
});


app.post("/", function(req, res) {
  let item = req.body.toDoAction;
  if (item != "") {
    items.push(item);
    res.redirect("/");
  }

});

app.listen(3000, function() {
  console.log("Server started on port 3000")
});




function newDateToString(lang){
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  return today.toLocaleDateString(lang, options);
};
