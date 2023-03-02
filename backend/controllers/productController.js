import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 10;
  const page = Number(req.query.pageNumber) || 1;

  const manufacturer = req.query.manufacturer
    ? {
        manufacturer: {
          $regex: req.query.manufacturer,
          $options: "i",
        },
      }
    : {};

  const category = req.query.category
    ? {
        category: {
          $regex: req.query.category,
          $options: "i",
        },
      }
    : {};

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({
    ...keyword,
    ...category,
    ...manufacturer,
  });
  const products = await Product.find({
    ...keyword,
    ...category,
    ...manufacturer,
  })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({
    products,
    page,
    pageSize,
    pages: Math.ceil(count / pageSize),
  });
});

// @desc    Fetch products by category id
// @route   GET /api/products/category/:id
// @access  Public
const getProductsByCategoryId = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 10;
  const page = Number(req.query.pageNumber) || 1;

  const count = await Product.countDocuments({
    category: req.params.id,
  });

  const products = await Product.find({ category: req.params.id })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({
    products,
    page,
    pageSize,
    pages: Math.ceil(count / pageSize),
  });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    numSuppliers: 0,
    description: "Sample description",
    sku: "Sample sku",
    mpn: "Sample mpn",
    contents: "Sample contents",
    longDescription: "Sample long description",
    manufacturer: "Sample manufacturer",
    vat: 21,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
    sku,
    mpn,
    contents,
    longDescription,
    manufacturer,
    vat,
    /*    suppliers, */
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.sku = sku;
    product.mpn = mpn;
    product.contents = contents;
    product.longDescription = longDescription;
    product.manufacturer = manufacturer;
    product.vat = vat;
    /*  product.suppliers = suppliers; */

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
// @desc    Get product suppliers
// @route   POST /api/products/:id/suppliers
// @access  Private/Admin
const getProductSuppliers = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product.suppliers);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Add new supplier to product by id from supplier list
// @route   POST /api/products/:id/suppliers
// @access  Private
const addProductSupplier = asyncHandler(async (req, res) => {
  const { supplierId, name, price } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const supplier = product.suppliers.find(
      (r) => r._id.toString() === supplierId
    );

    if (supplier === undefined) {
      product.suppliers.push({ _id: supplierId, price, name });
      product.numSuppliers = product.suppliers.length;
      await product.save();
      res.status(201).json({ message: "Supplier added" });
    } else {
      res.status(400);
      throw new Error("Product already has this supplier");
    }
  } else {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(201).json({ message: "Supplier added" });
});

// @desc    Update product supplier by id
// @route   PUT /api/products/:id/suppliers/:supplierId
// @access  Private
const UpdateProductSupplierById = asyncHandler(async (req, res) => {
  const { price } = req.body;

  const findSupplier = (supplier) =>
    supplier._id.toString() === req.params.supplierId;

  const product = await Product.findById(req.params.id);
  const supplier = product.suppliers.find(findSupplier);

  if (supplier.price === price) {
    res.status(400);
    throw new Error("Price is the same");
  }

  if (supplier === undefined) {
    res.status(400);
    throw new Error("Product does not have this supplier");
  } else {
    supplier.price = price;
  }

  await product.save();

  res.status(201).json({ message: "Supplier price updated" });
});

// @desc    Update product supplier price by id
// @route   PUT /api/products/:id/suppliers
// @access  Private
const updateProductSupplier = asyncHandler(async (req, res) => {
  const { id, price } = req.body;

  const findSupplier = (supplier) => supplier._id.toString() === id;

  const product = await Product.findById(req.params.id);
  const supplier = product.suppliers.find(findSupplier);

  if (supplier.price === price) {
    res.status(400);
    throw new Error("Price is the same");
  } else {
    supplier.price = price;
  }

  await product.save();

  res.status(201).json({ message: "Supplier price updated" });
});

// @desc    Delete product specific supplier from all suppliers
// @route   DELETE /api/products/:id/suppliers
// @access  Private
const deleteProductSupplier = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const findSupplier = (supplier) => supplier._id.toString() === id;

  const product = await Product.findById(req.params.id);

  const supplier = product.suppliers.find(findSupplier);

  if (supplier === undefined) {
    res.status(400);
    throw new Error("Product does not have this supplier");
  } else {
    product.suppliers = product.suppliers.filter(
      (supplier) => supplier._id.toString() !== id
    );
  }

  product.numSuppliers = product.suppliers.length;

  await product.save();

  res.status(201).json({ message: "Supplier deleted" });
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  addProductSupplier,
  deleteProductSupplier,
  updateProductSupplier,
  UpdateProductSupplierById,
  getProductSuppliers,
  getProductsByCategoryId,
};
