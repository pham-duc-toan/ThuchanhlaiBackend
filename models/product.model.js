const mongoose = require("mongoose");

var slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const productSchema = new mongoose.Schema(
  {
    title: String,
    slug: { type: String, slug: "title", unique: true },
    description: String,
    price: Number,
    position: Number,
    discountPercentage: Number,
    rating: Number,
    stock: Number,
    brand: String,
    category: String,
    thumbnail: String,
    status: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", productSchema, "products");
module.exports = Product;
