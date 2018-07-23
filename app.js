const express = require("express"),
      app = express(),
      request = require("request"),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose"),
      Campground = require("./models/campground"),
      Comment = require("./models/comment")
      seedDB = require("./seeds");

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.render("landing");
});

//INDEX - Show all campgrounds in database
app.get("/campgrounds", (req, res) => {
  Campground.find({}, (err, allCampgrounds) => {
    err ? console.log(err) : res.render("campgrounds/index", {campgrounds: allCampgrounds})
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
  res.render("campgrounds/new");
});

//SHOW - Display information on a single campground
app.get("/campgrounds/:id", (req, res) => {
  Campground.findById(req.params.id).populate("comments").exec((err, id) => {
    err ? console.log(err) : res.render("campgrounds/show", {campground: id})
  });
});

// ****COMMENTS ROUTES****
app.get("/campgrounds/:id/comments/new", (req, res) => {
  Campground.findById(req.params.id, (err, id) => {
    err ? console.log(err) : res.render("comments/new", {campground: id});
  });
});

app.post("/campgrounds/:id/comments", (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if(err) { 
      console.log(err)
      res.redirect("/campgrounds")
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        err ? console.log(err) 
            : campground.comments.push(comment);
              campground.save();
              res.redirect("/campgrounds/" + campground._id);
      });
    }
  });
});

app.listen(3000, () => {
  console.log("Server now running!");
});