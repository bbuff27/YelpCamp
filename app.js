const express = require("express");
const app = express();
const request = require("request");

app.get("/", (req, res) => {
  res.send("Everything works well!");
});

app.listen(3000, () => {
  console.log("Server now running!");
});