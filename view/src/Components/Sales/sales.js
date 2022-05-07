import React, { useState, useEffect, Fragment } from 'react'
import NewSale from './newSale';
import { FaFilter } from 'react-icons/fa';
import Nav from '../Nav/Nav';

function SalesData() {
  const [sales, setSales] = useState([]);
  const [error, setError] = useState();
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  
// function used to map and filter sales data
  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
        const filteredData = sales.filter((sales) => {
            return Object.values(sales).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        setFilteredResults(filteredData)
    }
    else{
        setFilteredResults(sales)
    }
}

// function used to fetch all sales data from api
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchSales = async () => {
    await fetch('http://localhost:3001/api/sales')
    .then(response => {
      return response.json()
    })
    .then(data => {
      setSales(data)
    })
  }


  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  return (
   
    <Fragment> 
    <Nav />
    <div className="container">
  <h2>Sales</h2>
    <div className='search' style={{ padding: 10, display: 'inline-block' }}>
            <FaFilter /> <input 
                type='text'
                placeholder='Filter...'
                onChange={(e) => searchItems(e.target.value)}
            />
    </div>          
  <table className="table table-bordered"> 
 
    <thead>
      <tr>
        <th>Product</th>
        <th>Sales Person</th>
        <th>Sales Date</th>
        <th>Customer</th>
        <th>Price</th>
        <th>Quantity</th>
      </tr>
    </thead> 
    
    <tbody>
    {searchInput.length > 1 ? (
                    filteredResults.map((sales) => {
                        return (
                          <tr>
       
                          <td>{sales.product}</td>
                          <td>{sales.salesperson}</td>
                          <td>{sales.sales_date}</td>
                          <td>{sales.customer_name}</td>
                          <td>{sales.purchase_price}</td>
                          <td>{sales.qty_sold}</td>
                          </tr>
                        )
                    })
                ) : (
         sales.map((sales) => {
         return (
      <tr>
       
       <td>{sales.product}</td>
                          <td>{sales.salesperson}</td>
                          <td>{sales.sales_date}</td>
                          <td>{sales.customer_name}</td>
                          <td>{sales.purchase_price}</td>
                          <td>{sales.qty_sold}</td>
        </tr> 
        
          )
        })
      )}
    
    </tbody> 
   
  </table>
        <NewSale sales={sales} key={sales} />
</div>
</Fragment>
  )
}

export default SalesData;