const express = require("express");
const router = require("../routes/index");
const morgan = require("morgan");
const connectDB = require("../config/db/connectDB");
const { engine } = require("express-handlebars");
const path = require("path");
const app = express();
const port = 5000;

//Morgan logger
app.use(morgan("dev"));

//Router
router(app);

//Connect to DB
connectDB();

//Handlebars
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "layout",
    helpers: {
      eq: (a, b) => a === b,
    },
  }),
);

app.set("view engine", "hbs");
app.set("views", "../views");
app.set("views", path.join(__dirname, "../views"));

//Listen
app.listen(port, () => {
  console.log(`Port: ${port}`);
});
