import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const supplierSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, default: 0, required: true },
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Supplier",
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: false,
      default: 0,
    },
    suppliers: [supplierSchema],
    price: {
      type: Number,
      required: true,
      default: 0,
    },

    numReviews: {
      type: Number,
      required: false,
      default: 0,
    },
    numSuppliers: {
      type: Number,
      required: false,
      default: 0,
    },

    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    sku: {
      type: String,
      required: true,
    },
    mpn: {
      type: String,
      required: false,
    },
    contents: {
      type: String,
      required: false,
    },
    longDescription: {
      type: String,
      required: false,
    },
    manufacturer: {
      type: String,
      required: false,
    },
    vat: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
