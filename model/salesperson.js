const { query } = require('express');
const pool = require('./database');

// All SQL injection queries for salesperson table in Postgres

  const getEmployeeById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM salesperson WHERE employee_id = $1', [id], (error, results) => {
      if (error) {
        return console.error('Error executing query', error.stack)
      }
      response.status(200).json(results.rows)
    })
  }

  const getAllSalesPeople = (request, response) => {
    pool.query('SELECT * FROM salesperson ORDER BY employee_id', (error, results) => {
      if (error) {
        return console.error('Error executing query', error.stack)
      }
      response.status(200).json(results.rows)
    })
  }


const updateSalesperson = (request, response) => {
  const id = parseInt(request.params.id)
  const { first_name, last_name, address, phone, start_date, termination_date, manager} = request.body

  pool.query(
    'UPDATE salesperson SET first_name = $1, last_name = $2, address = $3, phone = $4, start_date = $5, termination_date = $6, manager = $7 WHERE employee_id = $8',
    [first_name, last_name, address, phone, start_date, termination_date, manager, id],
    (error, results) => {
      if (error) {
        return console.error('Error executing query', error.stack)
      }
      response.status(200).send(`Employee modified with ID: ${id}`)
    }
  )
}

module.exports = {
  getAllSalesPeople,
  getEmployeeById,
  updateSalesperson
};