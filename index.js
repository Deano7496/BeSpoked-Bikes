// All variables required for function backend
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

const port = 3001



app.use(cors());

//Routes 

const productRoute = require('./routes/products');
const salespersonRoute = require('./routes/salesperson');
const customerRoute = require('./routes/customers');
const salesRouter = require('./routes/sales');


// Middleware
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.use('/api', productRoute)
app.use('/api', salespersonRoute)
app.use('/api', customerRoute)
app.use('/api', salesRouter)

//

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})