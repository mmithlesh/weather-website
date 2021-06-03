const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000
console.log(__dirname);
console.log(path.join(__dirname, "../public"));

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlers engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Mithlesh",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    errorText: "For any help, Kindly contact the developer !!",
    name: "Mithlesh",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Mithlesh",
  });
});
/* app.get("", (req, res) => {
  res.send("Home Page");
});
app.get("/help", (req, res) => {
  res.send("Help Page");
});
app.get("/about", (req, res) => {
  res.send("About Page");
}); */
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address !",
    });
  }
  const location = req.query.address;
  geocode(location, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error
      });
    }
    forecast(latitude, longitude, (error, foreCastdata) => {
      if (error) {
        return res.send({
          error
        });
      }
      res.send({
        forecast: foreCastdata,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term !",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Help Page",
    name: "Mithlesh",
    errorMessage: "Help article not found !!",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Page",
    name: "Mithlesh",
    errorMessage: "Page not found !!",
  });
});
app.listen(port, () => {
  console.log("Server running on port "+port);
});
