// Imports
const express = require("express");

// Data
const PORT = 3000;

// Express application
const app = express();

// Register view engine
app.set("view engine", "ejs");

// Listen for requests
app.listen(PORT);

// Get index
app.get("/", (req, res) => {
  //res.send("<p>Homepage</p>"); // send() automatically infers the correct header
  //res.sendFile("./views/index.html", { root: __dirname }); // Send an entire file to client

  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Mario finds stars",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "How to defeat bowser",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
  ];

  res.render("index", { title: "Home", blogs }); // Render a page using view engine and send to client
});

// Get about
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// Get about
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
