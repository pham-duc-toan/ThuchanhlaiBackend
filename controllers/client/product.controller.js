const Product = require("../../models/product.model");
//[GET] /products
module.exports.index = async (req, res) => {
  const products = await Product.find({
    deleted: false,
    status: "active",
  }).sort({ position: "desc" });

  products.map((item) => {
    item.priceNew = Math.round(
      item.price * (1 - item.discountPercentage / 100)
    );
    return item;
  });
  res.render("client/pages/products/index", {
    title: "Trang danh sách sản phẩm",
    products: products,
  });
};
//[GET] /products/detail/:slug
module.exports.detailProductItem = async (req, res) => {
  try {
    const slug = req.params.slug;
    const product = await Product.findOne({ slug: slug });
    if (!product) {
      res.redirect("back");
      return;
    }
    res.render("./client/pages/products/detail", {
      product: product,
      deleted: false,
      status: "active",
    });
  } catch (error) {
    res.redirect("/");
  }
};
