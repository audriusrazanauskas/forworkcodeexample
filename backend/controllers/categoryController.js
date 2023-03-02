import asyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";
import slugify from "slugify";

// @desc    Fetch all categories in admin
// @route   GET /api/categories
// @access  Private/Admin
const getCategoriesAdmin = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 1;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Category.countDocuments({
    ...keyword,
  });
  const categories = await Category.find({
    ...keyword,
  })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({
    categories,
    page,
    pageSize,
    pages: Math.ceil(count / pageSize),
  });
});

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  const category = new Category({
    user: req.user._id,
    name: req.body.name,
    slug: req.body.slug,
  });

  if (req.body.parentId) {
    category.parentId = req.body.parentId;
  }

  const createdCategory = await category.save();

  res.status(201).json(createdCategory);
});

// help function to create categories with children subcategories and subsubcategories
const createCategories = (categories, parentId = null) => {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      children: createCategories(categories, cate._id),
    });
  }

  return categoryList;
};

// @desc    Get all categories with children subcategories and subsubcategories with pagination and search
// @route   GET /api/categories
// @access  Private/Admin

const getCategories = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 500;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const count = await Category.countDocuments({
    ...keyword,
  });

  const categoryList = await Category.find({
    ...keyword,
  })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  if (categoryList) {
    const categories = createCategories(categoryList);
    res.status(200).json({
      categories,
      page,
      pageSize,
      pages: Math.ceil(count / pageSize),
    });
  } else {
    res.status(404);
    throw new Error("Categories not found");
  }
});

/* 
  Category.find({}).exec((error, categories) => {
    if (error) return res.status(400).json({ error });
    if (categories) {
      const categoryList = createCategories(categories);
      res.status(200).json({ categoryList });
    }
  }); */

// @desc    Get category by ID
// @route   GET /api/categories/:id
// @access  Private
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    res.json(category);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

// @desc    Update a category
// @route   PUT /api/categories/:id/update
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  const { name, slug, parentId } = req.body;

  const category = await Category.findById(req.params.id);

  if (category) {
    category.name = name;
    category.slug = slug;
    category.parentId = parentId;

    const updatedCategory = await category.save();
    res.json({ message: "Category updated", updatedCategory });
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

// @desc    Delete a category
// @route   DELETE /api/categories/:id/delete
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    await category.remove();
    res.json({ message: "Category removed" });
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

export {
  getCategories,
  getCategoriesAdmin,
  createCategory,
  deleteCategory,
  updateCategory,
  getCategoryById,
};
