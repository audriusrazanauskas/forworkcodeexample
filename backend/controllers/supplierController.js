import asyncHandler from "express-async-handler";
import Supplier from "../models/supplierModel.js";

// @desc    Create a supplier
// @route   POST /api/suppliers
// @access  Private/Admin
const createSupplier = asyncHandler(async (req, res) => {
  const supplier = new Supplier({
    name: "Sample supplier",
    user: req.user._id,
  });

  const createdSupplier = await supplier.save();
  res.status(201).json(createdSupplier);
});

// @desc    Get all suppliers
// @route   GET /api/suppliers
// @access  Private/Admin
const getSuppliers = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Supplier.countDocuments({
    ...keyword,
  });
  const suppliers = await Supplier.find({
    ...keyword,
  })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({
    suppliers,
    page,
    pageSize,
    pages: Math.ceil(count / pageSize),
  });
});

// @desc    Get supplier by ID
// @route   GET /api/suppliers/:id
// @access  Private
const getSupplierById = asyncHandler(async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);

  if (supplier) {
    res.json(supplier);
  } else {
    res.status(404);
    throw new Error("Supplier not found");
  }
});

// @desc    Update a supplier
// @route   PUT /api/suppliers/:id
// @access  Private/Admin
const updateSupplier = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const supplier = await Supplier.findById(req.params.id);

  if (supplier) {
    supplier.name = name;

    const updatedSupplier = await supplier.save();
    res.json(updatedSupplier);
  } else {
    res.status(404);
    throw new Error("Supplier not found");
  }
});

// @desc    Delete a supplier
// @route   DELETE /api/suppliers/:id
// @access  Private/Admin
const deleteSupplier = asyncHandler(async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);

  if (supplier) {
    await supplier.remove();
    res.json({ message: "Supplier removed" });
  } else {
    res.status(404);
    throw new Error("Supplier not found");
  }
});

export {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
