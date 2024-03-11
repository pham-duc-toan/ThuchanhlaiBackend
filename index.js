const express = require("express");
const app = express();
require("dotenv").config();
const varSystem = require("./config/variable.system");
//[-----------------THU VIEN---------------------]
const methodOverride = require("method-override");
const flash = require("express-flash");
var bodyParser = require("body-parser");
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));
//flash
const cookieParser = require("cookie-parser");
const session = require("express-session");
app.use(cookieParser("keyboard cat"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
//end flash
//[-----------------END THU VIEN---------------------]

const database = require("./config/database");
database.connect();

const port = process.env.PORT;

app.set("view engine", "pug");
app.set("views", `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));

//var pug
app.locals.prefixAdmin = varSystem.prefixAdmin;
//end var pug

//routes
const route = require("./routes/client/index.router");
const routeAdmin = require("./routes/admin/index.route");
routeAdmin(app);
route(app);
//end routes

app.listen(port, () => {
  console.log(`ok đã vào cổng ${port}`);
});
