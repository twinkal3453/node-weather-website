const express = require("express");
const path = require("path");
const hbs = require("hbs");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("views", viewPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

//rendering index.hbs file
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Twinkal K Raj",
  });
});

//rendering about.hbs file
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Twinkal K Raj",
  });
});

app.get("/weather", (req, res) => {
  console.log(req.query.address);
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  forecast(
    req.query.address,
    (error, { status, temp, feels, location, icon } = {}) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        status,
        forecast: temp,
        feels,
        address: req.query.address,
        location,
      });
    }
  );

  // res.send({
  //   forecast: "It is showing!",
  //   location: "Rajasthan",
  //   address: req.query.address,
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

//rendering help.hbs file
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Twinkal K Raj",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Twinkal K Raj",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Twinkal K Raj",
    errorMessage: "Page not Found.",
  });
});

// Running to the port number
app.listen(port, () => {
  console.log("Server is up in port" + port);
});
