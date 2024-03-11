const { prefixAdmin } = require("../../config/variable.system");
const Product = require("../../models/product.model");
//[GET] /admin/products
module.exports.index = async (req, res) => {
  const query = req.query;
  const find = {
    deleted: false,
  };
  //filter status
  if (query.status) {
    find.status = query.status;
  }

  const filterStatus = [
    {
      name: "Tất cả",
      status: "",
      class: "",
    },
    {
      name: "Hoạt động",
      status: "active",
      class: "",
    },
    {
      name: "Dừng hoạt động",
      status: "inactive",
      class: "",
    },
  ];
  if (query.status)
    filterStatus[
      filterStatus.findIndex((ele) => ele.status == query.status)
    ].class = "active";
  else filterStatus[0].class = "active";
  // end filter status

  // filter search
  let keyword = "";
  if (query.keyword) {
    keyword = query.keyword;
    const keywordRegex = new RegExp(keyword, "i");
    find.title = keywordRegex;
  }
  // end filter search

  //pagination
  const numberProducts = await Product.countDocuments(find);
  const pagination = {
    currentPage: 1,
    numberProductsInPage: 5,
  };
  pagination.totalPage = Math.ceil(
    numberProducts / pagination.numberProductsInPage
  );
  if (query.pages) {
    pagination.currentPage = parseInt(query.pages);
  }
  //end pagination
  const products = await Product.find(find)
    .sort({ position: "desc" })
    .limit(pagination.numberProductsInPage)
    .skip(pagination.numberProductsInPage * (pagination.currentPage - 1));
  res.render("./admin/pages/products/index", {
    products: products,
    filterStatus: filterStatus,
    keyword: keyword,
    pagination: pagination,
  });
};
//[PATCH] /admin/products/change-status/:id/:status
module.exports.changeStatus = async (req, res) => {
  try {
    const status = req.params.status;
    const id = req.params.id;
    await Product.updateOne({ _id: id }, { status: status });
    req.flash("success", "Cập nhật thành công !");
    res.redirect("back");
  } catch (error) {
    res.redirect("back");
  }
};
//[PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.trim().split(" ");
  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: type });
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: type });
      break;
    case "delete-all":
      await Product.updateMany(
        { _id: { $in: ids } },
        { deleted: true, deletedAt: new Date() }
      );
      break;
    default:
      break;
  }
  req.flash("success", "Cập nhật thành công !");
  res.redirect("back");
};
//[DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
  try {
    const id = req.params.id;
    await Product.deleteOne({ _id: id });
    req.flash("success", "Cập nhật thành công !");
    res.redirect("back");
  } catch (error) {
    res.redirect("back");
  }
};
//[GET] /admin/position/swap/:id
module.exports.positionList = async (req, res) => {
  try {
    const id = req.params.id;
    const productItem = await Product.findOne({ _id: id });
    const products = await Product.find({
      deleted: false,
      _id: { $ne: id },
    }).sort({ position: "desc" });
    res.render("./admin/pages/products/swap-position", {
      products: products,
      productItem: productItem,
    });
  } catch (error) {
    res.redirect("back");
  }
};
//[PATCH] /admin/products/change-position/:id1/:id2
module.exports.swapPosition = async (req, res) => {
  try {
    const id1 = req.params.id1;
    const id2 = req.params.id2;
    const product1 = await Product.findOne({ _id: id1 });
    const product2 = await Product.findOne({ _id: id2 });
    await Product.updateOne({ _id: id1 }, { position: product2.position });
    await Product.updateOne({ _id: id2 }, { position: product1.position });
    req.flash("success", "Cập nhật thành công !");
    res.redirect("/admin/products");
  } catch (error) {
    res.redirect("back");
  }
};
//[GET] /admin/products/create
module.exports.createProduct = async (req, res) => {
  res.render(`./admin/pages/products/create`);
};
//[POST] /admin/products/create
module.exports.createPostProduct = async (req, res) => {
  const fileName = req.file.filename;
  req.body.thumbnail = `/admin/uploads/${fileName}`;
  req.body.stock = parseInt(req.body.stock);
  req.body.discountPercentage = parseFloat(req.body.discountPercentage);
  req.body.price = parseInt(req.body.price);
  const products = await Product.find({});
  let pos = 0;
  products.forEach((ele) => {
    pos = Math.max(pos, ele.position);
  });

  req.body.position = pos + 1;
  const product = new Product(req.body);
  await product.save();
  req.flash("success", "Cập nhật thành công !");
  res.redirect(`/${prefixAdmin}/products`);
};
//[GET] /admin/products/edit/:id
module.exports.editProductItem = async (req, res) => {
  try {
    const id = req.params.id;
    const productItem = await Product.findOne({ _id: id });
    res.render("./admin/pages/products/edit", {
      product: productItem,
    });
  } catch (error) {
    res.redirect("back");
  }
};
//[PATCH] /admin/products/edit/:id
module.exports.editProductPatch = async (req, res) => {
  try {
    const id = req.params.id;
    if (req.file) {
      const fileName = req.file.filename;
      req.body.thumbnail = `/admin/uploads/${fileName}`;
    }
    req.body.stock = parseInt(req.body.stock);
    req.body.discountPercentage = parseFloat(req.body.discountPercentage);
    req.body.price = parseInt(req.body.price);
    await Product.updateOne({ _id: id }, req.body);
    req.flash("success", "Cập nhật thành công !");
    res.redirect(`/${prefixAdmin}/products`);
  } catch (error) {
    res.redirect("back");
  }
};
//[GET] /admin/products/detail/:id
module.exports.detailProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ _id: id });
    if (product.price)
      product.priceNew = Math.round(
        (product.price * (100 - product.discountPercentage)) / 100
      );
    res.render("./admin/pages/products/detail", {
      product: product,
    });
  } catch (error) {
    res.redirect("back");
  }
};
//[GET] /admin/update/model
module.exports.updateModel = async (req, res) => {
  res.redirect("back");
};
