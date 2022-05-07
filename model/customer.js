const { query } = require('express');
const pool = require('./database');

// All SQL injection queries for customers table in Postgres

  const getCustomerById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM customers WHERE id = $1', [id], (error, results) => {
      if (error) {
        return console.error('Error executing query', error.stack)
      }
      response.status(200).json(results.rows)
    })
  }

  const getAllCustomers = (request, response) => {
    pool.query('SELECT * FROM customers ORDER BY id', (error, results) => {
      if (error) {
        return console.error('Error executing query', error.stack)
      }
      response.status(200).json(results.rows)
    })
  }

  const newCustomer = (request, response) => {
    const { id, first_name, last_name, address, phone, start_date } = request.body
  
    pool.query('INSERT INTO customers (id, first_name, last_name, address, phone, start_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', 
    [id, first_name, last_name, address, phone, start_date], (err, result) => {
      if (err) {
        return console.error('Error executing query', err.stack)
      }
      response.status(201).send(`New sale created with ID: ${result.insertId}`)
    })
  }


module.exports = {
  getAllCustomers,
  getCustomerById,
  newCustomer
};