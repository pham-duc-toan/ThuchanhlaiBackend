const express = require("express");
const route = express.Router();
const controller = require("../../controllers/admin/product.controller");
const validate = require("../../middleware/admin/product.validate");
//Cấu hình multer upload file
const upload = require("../../helpers/storageMulter");
//End multer
route.get("/products", controller.index);
route.patch("/products/change-status/:id/:status", controller.changeStatus);
route.patch("/products/change-multi", controller.changeMulti);
route.delete("/products/delete/:id", controller.deleteItem);
route.get("/products/position/swap/:id", controller.positionList);
route.patch("/products/change-position/:id1/:id2", controller.swapPosition);
route.get("/products/create", controller.createProduct);
route.post(
  "/products/create",
  upload.single("thumbnail"),
  validate.formProductItem,
  controller.createPostProduct
);
route.get("/products/edit/:id", controller.editProductItem);
route.patch(
  "/products/edit/:id",
  upload.single("thumbnail"),
  validate.formProductItem,
  controller.editProductPatch
);
route.get("/products/detail/:id", controller.detailProduct);

route.get("/update/model", controller.updateModel);
module.exports = route;
