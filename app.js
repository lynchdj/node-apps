// Imports
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const { render } = require("ejs");

// Data
const PORT = 3000;
const DBURI =
  "mongodb+srv://darcy:Bruce2001MDB@node-tutorial.tvw5b.mongodb.net/node-tutorial?retryWrites=true&w=majority"; // Connect to MongoDB

// Express application
const app = express();

// Connect to MongoDB
mongoose
  .connect(DBURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => app.listen(PORT)) // Listen for requests
  .catch((err) => console.log(err));

// Register view engine
app.set("view engine", "ejs");

// Middlewear and static files
app.use(express.static("public"));
app.use(morgan("dev"));

// Get index
app.get("/", (req, res) => {
  //res.send("<p>Homepage</p>"); // send() automatically infers the correct header
  //res.sendFile("./views/index.html", { root: __dirname }); // Send an entire file to client

  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Get about
app.get("/about", (req, res) => {
  res.render("about", { title: "About" }); // Render a page using view engine and send to client
});

// Get create
app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create" });
});

// Redirect about-us
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
