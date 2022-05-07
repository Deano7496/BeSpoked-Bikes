const express = require('express');
const { getAllCustomers, getCustomerById, newCustomer } = require('../model/customer');

const router = express.Router();

// All routes needed and exported for the customers model to function

router.get('/customers', getAllCustomers);
router.post('/customers', newCustomer);
router.get('/customers/:id', getCustomerById); 


module.exports = router;