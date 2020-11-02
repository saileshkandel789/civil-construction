const express = require("express");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/Users");
const contact = require("./routes/api/Contact");
const blog = require("./routes/api/Blog");
const service = require("./routes/api/Service");
const banner = require("./routes/api/Banner");
const booknow = require("./routes/api/BookNow");
const project = require("./routes/api/Project");
const team = require("./routes/api/Team");
const video = require("./routes/api/Video");
const vdo = require("./routes/api/Vdo");



const cors = require("cors");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static(path.join("uploads")));

// DB config
const db = require("./config/keys").mongoURI;

// connect to mongodb
mongoose
  .connect(db)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

// passport middleware
app.use(passport.initialize());

// passport config
require("./config/passport")(passport);

const port = process.env.PORT || 4000;
// To make uploads folder publically available with '/api/videos' route
app.use('/api/videos', express.static('media/uploads'));

app.use("/api/users", users);
app.use("/api/contact", contact);
app.use("/api/blog", blog);
app.use("/api/service", service);
app.use("/api/banner", banner);
app.use("/api/booknow", booknow);
app.use("/api/project", project);
app.use("/api/team", team);
app.use("/api/video", video);
app.use("/api/upload", vdo);



app.listen(port, () => console.log(`server running on port ${port}`));
