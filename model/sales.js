const { query, response, request } = require('express');
const pool = require('./database');

// All SQL injection queries for sales table in Postgres

  const getSales = (request, response) => {
    pool.query('SELECT DISTINCT * FROM sales ORDER BY product', (error, results) => {
      if (error) {
        return console.error('Error executing query', error.stack)
      }
      response.status(200).json(results.rows)
    })
  }
  const newSale = (request, response) => {
    const { product, salesperson, sales_date, customer_name, purchase_price, qty_sold  } = request.body
  
    pool.query('INSERT INTO sales (product, salesperson, sales_date, customer_name, purchase_price, qty_sold ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
     [product, salesperson, sales_date, customer_name, purchase_price, qty_sold], (error, results) => {
      if (error) {
        return console.error('Error executing query', error.stack)
      }
      response.status(201).send(`New sale created with ID: ${results.insertId}`)
    })
  }






  // Query for sales_report table in Postgres
  const newSaleReportRecord = (request, response) => {
    const { id, employee_name, total_sales, commission} = request.body
  
    pool.query('INSERT INTO sales_report VALUES ($1, $2, $3, $4) ORDER BY id RETURNING *', [id, employee_name, total_sales, commission], (error, results) => {
      if (error) {
        return console.error('Error executing query', error.stack)
      }
      response.status(201).send(`New sale created with ID: ${results.InsertEmployee_id}`)
    })
  }  
  
  const salesReport = (request, response) => {
    pool.query('SELECT * FROM sales_report ORDER BY id', (error, results) => {
      if (error) {
        return console.error('Error executing query', error.stack)
      }
      response.status(201).json(results.rows)
    })
  }

  const totalBonus = (request, response) => {
    pool.query('SELECT id, employee_name, ((total_sales)*commission/100) AS total_bonus FROM sales_report ORDER BY id',
    (err, results) => {
      if (err) {
      return console.error('Error executing query', err.stack)
      }
      response.status(201).json(results.rows)
    }
    
    )
  }

  const updateSalesReport = (request, response) => {
    const id = parseInt(request.params.id)
    const { employee_name, total_sales, commission } = request.body
  
    pool.query(
      'UPDATE sales_report SET employee_name = $1, total_sales = $2, commission = $3 WHERE id = $4 RETURNING *',
      [employee_name, total_sales, commission, id],
      (error, results) => {
        if (error) { 
          return console.error('Error executing query', error.stack)
        }
        response.status(200).send(`Product modified with ID: ${results.insertId}`)
      }
    )
  }

module.exports = {
  getSales,
  newSale,
  salesReport,
  newSaleReportRecord,
  totalBonus,
  updateSalesReport
};