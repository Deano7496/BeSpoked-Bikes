const { query } = require('express');
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
    const { product, salesperson, customer, sales_date } = request.body
  
    pool.query('INSERT INTO sales (product, salesperson, customer, sales_date) VALUES ($1, $2, $3, $4) RETURNING *', [product, salesperson, customer, sales_date], (error, results) => {
      if (error) {
        return console.error('Error executing query', error.stack)
      }
      response.status(201).send(`New sale created with ID: ${results.insertId}`)
    })
  }

  const salesReport = (request, response) => {
    pool.query('SELECT * FROM sales_report ORDER BY employee_id', (error, results) => {
      if (error) {
        return console.error('Error executing query', error.stack)
      }
      response.status(201).json(results.rows)
    })
  }

  // Query for sales_report table in Postgres
  const newSaleReportRecord = (request, response) => {
    const { employee_id, total_sales, commission, total_bonus } = request.body
  
    pool.query('INSERT INTO sales_report VALUES ($1, $2, $3, $4) RETURNING *', [employee_id, total_sales, commission, total_bonus], (error, results) => {
      if (error) {
        return console.error('Error executing query', error.stack)
      }
      response.status(201).send(`New sale created with ID: ${results.InsertEmployee_id}`)
    })
  }

module.exports = {
  getSales,
  newSale,
  salesReport,
  newSaleReportRecord
};