const express = require("express");
      app = express();
      request = require("request");
      bodyParser = require("body-parser");
      mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

const campgroundSchema = mongoose.Schema({
  name: String,
  image: String,
  description: String
});

const Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {
//     name: "Blackwoods Campground", 
//     image:"https://s3-production.bobvila.com/slides/26529/widened/blackwoods.jpg?1526489505",
//     description: "Beautiful clear water views nestled deep in the mountains. Plenty of sun and fishing."
//   }, (err, campground) => {
//     err ? console.log(err) : console.log("Campground added successfully: " + campground)
//   });

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.render("landing");
});

//INDEX - Show all campgrounds in database
app.get("/campgrounds", (req, res) => {
  Campground.find({}, (err, allCampgrounds) => {
    err ? console.log(err) : res.render("index", {campgrounds: allCampgrounds})
  });
});

//CREATE - Add new campgrounds to database
app.post("/campgrounds", (req, res) => {
  const name = req.body.name;
  const image = req.body.image;
  const description = req.body.description;
  const newCampground = {name: name, image: image, description: description};
  Campground.create(newCampground, (err, newData) => {
    err ? console.log(err) : res.redirect("/campgrounds")
  });
});

//NEW - Display form to create new campground in database
app.get("/campgrounds/new", (req, res) => {
  res.render("new.ejs");
});

//SHOW - Display information on a single campground
app.get("/campgrounds/:id", (req, res) => {
  Campground.findById(req.params.id, (err, id) => {
    err ? console.log(err) : res.render("show", {campground: id})
  });
});

app.listen(3000, () => {
  console.log("Server now running!");
});