const express = require('express');
const { getEmployeeById, getAllSalesPeople, updateSalesperson } = require('../model/salesperson');

const router = express.Router();

// All routes needed and exported for the salesperson model to function


router.get('/employees/:id', getEmployeeById);

router.get('/employees', getAllSalesPeople);
router.put('/employees/:id', updateSalesperson);



module.exports = router;