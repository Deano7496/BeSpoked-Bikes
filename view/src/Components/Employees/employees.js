import React, { useState, useEffect, Fragment } from 'react'
import EditEmployee from './EditEmployee';
import { FaFilter } from 'react-icons/fa';
import Nav from '../Nav/Nav';

function EmployeeData() {
  const [salesperson, setSalesperson] = useState([]);
  const [error, setError] = useState();
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  
// Filter used to map and filter employee data
  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
        const filteredData = salesperson.filter((salesperson) => {
            return Object.values(salesperson).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        setFilteredResults(filteredData)
    }
    else{
        setFilteredResults(salesperson)
    }
}
  
// function to fetch all employees from api
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchEmployees = async () => {
    await fetch('http://localhost:3001/api/employees')
    .then(response => {
      return response.json()
    })
    .then(data => {
      setSalesperson(data)
    })
  }


  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return (
    <Fragment>
      <Nav />
    <div className="container">
  <h2>Employees</h2>

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
        <th>ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Address</th>
        <th>Phone</th>
        <th>Start Date</th>
        <th>Termination Date</th>
        <th>Manager</th>
      </tr>
    </thead> 
    
    <tbody>
     
    {searchInput.length > 1 ? (
                    filteredResults.map((salesperson) => {
                        return (
                          <tr>
                          <td>{salesperson.employee_id}</td>
                          <td>{salesperson.first_name}</td>
                          <td>{salesperson.last_name}</td>
                          <td>{salesperson.address}</td>
                          <td>{salesperson.phone}</td>
                          <td>{salesperson.start_date}</td>
                          <td>{salesperson.termination_date}</td>
                          <td>{salesperson.manager}</td>
                          <td><EditEmployee salesperson={salesperson} key={salesperson} /></td>
                          </tr>
                        )
                    })
      ):(
      salesperson.map(salesperson => {
        return (
      <tr>
       
        <td>{salesperson.employee_id}</td>
        <td>{salesperson.first_name}</td>
        <td>{salesperson.last_name}</td>
        <td>{salesperson.address}</td>
        <td>{salesperson.phone}</td>
        <td>{salesperson.start_date}</td>
        <td>{salesperson.termination_date}</td>
        <td>{salesperson.manager}</td>
        <td><EditEmployee salesperson={salesperson} key={salesperson} /></td>
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

export default EmployeeData;