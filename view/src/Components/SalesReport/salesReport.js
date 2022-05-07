import React, { useState, useEffect, Fragment } from 'react'
import NewSaleReport from './newSaleReport';
import { FaFilter } from 'react-icons/fa';
import Nav from '../Nav/Nav';

function SalesReportData() {
  const [sales_report, setSalesReport] = useState([]);
  const [error, setError] = useState();
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  
// function used to map and filter all sales report data
  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
        const filteredData = sales_report.filter((sales_report) => {
            return Object.values(sales_report).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        setFilteredResults(filteredData)
    }
    else{
        setFilteredResults(sales_report)
    }
}

// fetch all sales data from api
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchSalesReport = async () => {
    await fetch('http://localhost:3001/api/salesreport')
    .then(response => {
      return response.json()
    })
    .then(data => {
      setSalesReport(data)
    })
  }

/*   const totalBonus = async() => {
      await fetch('http://localhost:3001/salesreport/bonus')
      .then(response => {
        return response.json()
      })
      .then(data => {
        setBonus(data)
      })
  } */


  useEffect(() => {
    fetchSalesReport(); 
  }, [fetchSalesReport]);

  return (
    <Fragment>
      <Nav />
    <div className="container">
  <h2>Quarterly Sales Report</h2>
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
        <th>Employee ID</th>
        <th>Employee Name</th>
        <th>Total Sales</th>
        <th>Commission</th>
        <th>Total Bonus</th>
      </tr>
    </thead> 
    
    <tbody>
    {searchInput.length > 1 ? (
                    filteredResults.map((sales_report) => {
                        return (
                          <tr>
       
                          <td>{sales_report.employee_id}</td>
                          <td>{sales_report.employee_name}</td>
                          <td>{sales_report.total_sales}</td>
                          <td>{sales_report.commission}%</td>
                          <td>{sales_report.total_bonus}</td>
                      
                          </tr>
                        )
                    })
                ) : (
         sales_report.map((sales_report) => {
         return (
            <tr>
       
                          <td>{sales_report.employee_id}</td>
                          <td>{sales_report.employee_name}</td>
                          <td>{sales_report.total_sales}</td>
                          <td>{sales_report.commission}%</td>
                          <td>{sales_report.total_bonus}</td>
    
                          </tr>
        
          )
        })
      )}
    
    </tbody> 
   
  </table>
        <NewSaleReport sales_report={sales_report} key={sales_report} />
</div>
</Fragment>
  )
}

export default SalesReportData;