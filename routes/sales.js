const express = require('express');
const { newSale, getSales,newSaleReportRecord, salesReport } = require('../model/sales');

const router = express.Router();

// All routes needed and exported for the sales model to function


router.get('/sales', getSales);
router.post('/sales', newSale);
router.get('/salesreport', salesReport);
router.post('/salesreport', newSaleReportRecord);


module.exports = router;