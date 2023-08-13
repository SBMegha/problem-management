const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const hbs = require("hbs");
const path = require("path");
const verifyToken = require("./utils/verifyToken");
const port = 8000;
const app = express();

hbs.registerHelper("ifCustom", function (v1, operator, v2, options) {
  switch (operator) {
    case "==":
      return v1 == v2 ? options.fn(this) : options.inverse(this);
    case "===":
      return v1 === v2 ? options.fn(this) : options.inverse(this);
    case "!=":
      return v1 != v2 ? options.fn(this) : options.inverse(this);
    case "!==":
      return v1 !== v2 ? options.fn(this) : options.inverse(this);
    case "<":
      return v1 < v2 ? options.fn(this) : options.inverse(this);
    case "<=":
      return v1 <= v2 ? options.fn(this) : options.inverse(this);
    case ">":
      return v1 > v2 ? options.fn(this) : options.inverse(this);
    case ">=":
      return v1 >= v2 ? options.fn(this) : options.inverse(this);
    case "&&":
      return v1 && v2 ? options.fn(this) : options.inverse(this);
    case "||":
      return v1 || v2 ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
});
hbs.registerPartials(path.join(__dirname, "views/partials"));
//connect to monogodb
mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://127.0.0.1:27017/RuralDevelopment", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use("/img/", express.static(path.join(__dirname, "public","img")));
app.use("/css/", express.static(path.join(__dirname, "public","css")));
app.set("view engine", "hbs");
app.get("/",verifyToken,(req, res) => {
  let userType;
  if (req.user) userType = req.user.role;
  res.render("index.hbs",{
    loggedIn: userType !== undefined,
    user: req.user,
    public: userType === "public",
    employee: userType === "employee",
    admin: userType === "admin"
  });
});

app.use("/auth", require("./routes/auth"));
app.use("/public", require("./routes/public"));
app.use("/employee", require("./routes/employee"));
app.use("/admin", require("./routes/admin"));


app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
