const routerProduct = require("./product.router");
const routerHome = require("./home.router");
module.exports = (app) => {
  app.get("/", routerHome);
  app.use("/products", routerProduct);
};
