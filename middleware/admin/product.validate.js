module.exports.formProductItem = async (req, res, next) => {
  //   console.log("chạy vào đây");

  if (!req.body.title) {
    req.flash("error", "Vui lòng điền đủ thông tin !");
    res.redirect("back");
    return;
  }
  next();
};
