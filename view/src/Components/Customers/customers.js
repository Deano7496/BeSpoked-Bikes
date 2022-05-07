import React, { useState, useEffect, Fragment } from 'react'
import NewCustomer from './newCustomer';
import { FaFilter } from 'react-icons/fa';
import Nav from '../Nav/Nav';

function CustomerData() {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState();
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  
// function used to map and filter customer data
  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
        const filteredData = customers.filter((customers) => {
            return Object.values(customers).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        setFilteredResults(filteredData)
    }
    else{
        setFilteredResults(customers)
    }
}
  
// function used to fetch all customer data from api
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchCustomers = async () => {
    await fetch('http://localhost:3001/api/customers')
    .then(response => {
      return response.json()
    })
    .then(data => {
      setCustomers(data)
    })
  }


  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return (
    <Fragment>
      <Nav /> 
    <div className="container">
  <h2>Customers</h2>

    <div className='search' style={{ padding: 10, display: 'inline-block' }}>
            <FaFilter/> <input 
                type='text'
                placeholder='Filter...'
                onChange={(e) => searchItems(e.target.value)}
            /> 
              
    </div> 
    <NewCustomer className='new-customer-btn' customers={customers} key={customers} />
          
  <table className="table table-bordered"> 
 
    <thead>
      <tr>
        <th>ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Address</th>
        <th>Phone</th>
        <th>Start Date</th>
      </tr>
    </thead> 
    
    <tbody>
    {searchInput.length > 1 ? (
                    filteredResults.map((customers) => {
                        return (
                          <tr>
                            <td>{customers.id}</td>
                            <td>{customers.first_name}</td>
                            <td>{customers.last_name}</td>
                            <td>{customers.address}</td>
                            <td>{customers.phone}</td>
                            <td>{customers.start_date}</td>
                          </tr>
                        )
                    })


      ) :(
      customers.map(customers => {
        return (
            <tr>
              <td>{customers.id}</td>
              <td>{customers.first_name}</td>
              <td>{customers.last_name}</td>
              <td>{customers.address}</td>
              <td>{customers.phone}</td>
              <td>{customers.start_date}</td>
            </tr>
       )
      })
    )}
    
    </tbody>
  </table>
</div>

</Fragment>
  )
}

export default CustomerData;