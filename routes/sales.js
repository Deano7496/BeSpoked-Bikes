const express = require('express');
const { newSale, getSales,newSaleReportRecord, salesReport, totalBonus, updateSalesReport } = require('../model/sales');

const router = express.Router();

// All routes needed and exported for the sales model to function


router.get('/sales', getSales);
router.post('/sales', newSale);
router.get('/salesreport', salesReport);
router.post('/salesreport', newSaleReportRecord);
router.get('/salesreport/bonus', totalBonus);
router.put('/salesreport/:id', updateSalesReport)


module.exports = router;