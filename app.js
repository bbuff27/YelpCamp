const express = require("express");
const app = express();
const request = require("request");

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
  const campgrounds = [
    {name: "Bartlett Cove", image:"https://s3-production.bobvila.com/slides/26527/widened/bartlett-cove.jpg?1526489504"},
    {name: "Redfish Lake", image:"https://s3-production.bobvila.com/slides/26528/widened/redfish.jpg?1526489504"},
    {name: "Blackwoods Campground", image:"https://s3-production.bobvila.com/slides/26529/widened/blackwoods.jpg?1526489505"}
  ];
  res.render("campgrounds", {campgrounds: campgrounds});
});

app.listen(3000, () => {
  console.log("Server now running!");
});