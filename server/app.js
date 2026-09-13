const express = require("express");
const router = require("../routes/index");
const morgan = require("morgan");
const connectDB = require("../config/db/connectDB");
const methodOverride = require("method-override");
const { engine } = require("express-handlebars");
const path = require("path");
const app = express();
const port = 5000;

//Morgan logger
app.use(morgan("dev"));

//Method Override
app.use(methodOverride("_method"));

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
