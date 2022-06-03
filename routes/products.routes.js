const express = require('express');

//Middlewares
const {
  protectProductOwner,
  productExists,
} = require('../middlewares/products.middlewares');

const { protectToken } = require('../middlewares/users.middlewares');

const {
  createProductValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');

//Controller
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products.controller');

const {
  getAllCategories,
  createCategory,
  updateCategory,
} = require('../controllers/categories.controller');

const router = express.Router();

router.get('/', getAllProducts);

router.get('/categories', getAllCategories);

router.get('/:id', productExists, getProductById);

router.use(protectToken);

router.post('/', createProductValidations, checkValidations, createProduct);

router.post('/categories', createCategory);

router.patch('/categories/:id', updateCategory);

router
  .route('/:id')
  .patch(protectProductOwner, productExists, updateProduct)
  .delete(protectProductOwner, productExists, deleteProduct);

module.exports = { productsRouter: router };
