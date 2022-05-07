const express = require('express');
const { getProductById, getAllProducts, updateProduct, getDiscounts } = require('../model/products');

const router = express.Router();

// All routes needed and exported for the products model to function

router.get('/products/:id', getProductById);
router.get('/discounts', getDiscounts)
router.get('/products', getAllProducts);
router.put('/products/:id', updateProduct);



module.exports = router;