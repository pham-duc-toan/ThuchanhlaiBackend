const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/admin/uploads/"); // đường dẫn thư mục tính từ file public
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Đặt tên file là timestamp + extension
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
