const { query, request, response } = require('express');
const pool = require('./database');

// All SQL injection queries for products table in Postgres

  const getProductById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM products WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getAllProducts = (request, response) => {
    pool.query('SELECT * FROM products ORDER BY id', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }


const updateProduct = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, manufacturer, style, purchase_price, sale_price, qty_on_hand, commission_percentage} = request.body

  pool.query(
    'UPDATE products SET name = $1, manufacturer = $2, style = $3, purchase_price = $4, sale_price = $5, qty_on_hand = $6, commission_percentage = $7 WHERE id = $8 RETURNING *',
    [name, manufacturer, style, purchase_price, sale_price, qty_on_hand, commission_percentage, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Product modified with ID: ${id}`)
    }
  )
}
// Query to discount table in Postgres
const getDiscounts = (request, response) => {
  pool.query('SELECT * FROM discount ORDER BY product', (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).json(results.rows)
  })
}

module.exports = {
  getProductById,
  updateProduct,
  getAllProducts,
  getDiscounts
};