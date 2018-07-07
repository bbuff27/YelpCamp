const express = require("express");
const app = express();
const request = require("request");
const bodyParser = require("body-parser");
const campgrounds = [
  {name: "Bartlett Cove", image:"https://s3-production.bobvila.com/slides/26527/widened/bartlett-cove.jpg?1526489504"},
  {name: "Redfish Lake", image:"https://s3-production.bobvila.com/slides/26528/widened/redfish.jpg?1526489504"},
  {name: "Blackwoods Campground", image:"https://s3-production.bobvila.com/slides/26529/widened/blackwoods.jpg?1526489505"}
];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
  res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", (req, res) => {
  const name = req.body.name;
  const image = req.body.image;
  const newCampground = {name: name, image: image};
  campgrounds.push(newCampground);
  res.redirect("/campgrounds");
});

app.get("/campgrounds/new", (req, res) =>{
  res.render("new.ejs");
});

app.listen(3000, () => {
  console.log("Server now running!");
});