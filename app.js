// Imports
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

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
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Get index page
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

// All blog routes
app.use("/blogs", blogRoutes);

// Get about page
app.get("/about", (req, res) => {
  res.render("about", { title: "About" }); // Render a page using view engine and send to client
});

// Redirect about-us to about page
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// Get 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
