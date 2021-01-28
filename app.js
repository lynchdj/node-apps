// Imports
const express = require("express");

// Data
const PORT = 3000;

// Express application
const app = express();

// Listen for requests
app.listen(PORT);

// Get index
app.get("/", (req, res) => {
  //res.send("<p>Homepage</p>"); // send() automatically infers the correct header
  res.sendFile("./views/index.html", { root: __dirname });
});

// Get about
app.get("/about", (req, res) => {
  res.sendFile("./views/about.html", { root: __dirname });
});

// Redirect about-us
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// 404 page
app.use((req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});
