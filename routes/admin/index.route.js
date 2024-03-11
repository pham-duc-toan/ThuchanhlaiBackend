const dashboard = require("./dashboard.route");
const products = require("./product.route");
const varSystem = require("../../config/variable.system");
const prefixAdmin = varSystem.prefixAdmin;
module.exports = (app) => {
  app.use(`/${prefixAdmin}`, dashboard);
  app.use(`/${prefixAdmin}`, products);
};
