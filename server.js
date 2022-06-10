// requiring neccessary dependencies
require("dotenv").config();
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");
const { User } = require("./models");
const fileUpload = require("express-fileupload");

// requiring sequelize
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: process.env.SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// LIMITS CAN BE ADDED HERE AS WELL IF THATS WHAT WE WANT TO DO
app.use(fileUpload());

app.post("/upload", async (req, res) => {
  let sampleFile;
  let uploadPath;

//   if (!req.files || Object.keys(req.files).length === 0) {
//     res.status(400).send('No files were uploaded.');
//     return;
//   }

  console.log("req.files >>>", req.files);

  const b64img = Buffer.from(req.files.sampleFile.data).toString("base64");
  console.log(b64img);

  await User.update(
    {
      image: b64img,
    },
    {
      where: {
        id: req.session.user_id,
      },
    }
  );

  res.redirect("/dashboard");
});

app.use(routes);

// connecting to sequelize server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Now listening on http://localhost:${PORT}`)
  );
});
