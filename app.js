const express = require("express");
const app = express();

app.use(express.urlencoded());
app.use(express.static("public"));

app.set('view engine', 'ejs');

var items = [];

app.get("/", function(req, res) {
  var today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  }
  var day = today.toLocaleDateString("en-US", options);

  res.render('list', {
    day: day,
    items: items
  });
});


app.post("/", function(req, res) {
  var item = req.body.toDoAction;
  if (item != "") {
    items.push(item);
    res.redirect("/");
  }

});

app.listen(3000, function() {
  console.log("Server started on port 3000")
});
