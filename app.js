const express = require("express");
      app = express();
      request = require("request");
      bodyParser = require("body-parser");
      mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

const campgroundSchema = mongoose.Schema({
  name: String,
  image: String
});

const Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {
//     name: "Blackwoods Campground", 
//     image:"https://s3-production.bobvila.com/slides/26529/widened/blackwoods.jpg?1526489505"
//   }, (err, campground) => {
//     err ? console.log(err) : console.log("Campground added successfully: " + campground)
//   });

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
  Campground.find({}, (err, allCampgrounds) => {
    err ? console.log(err) : res.render("campgrounds", {campgrounds: allCampgrounds})
  });
});

app.post("/campgrounds", (req, res) => {
  const name = req.body.name;
  const image = req.body.image;
  const newCampground = {name: name, image: image};
  Campground.create(newCampground, (err, newData) => {
    err ? console.log(err) : res.redirect("/campgrounds")
  });
});

app.get("/campgrounds/new", (req, res) =>{
  res.render("new.ejs");
});

app.listen(3000, () => {
  console.log("Server now running!");
});