import React, { useState, useEffect, Fragment } from 'react'
import UpdateSalesReport from './UpdateSalesReport';
import { FaFilter } from 'react-icons/fa';
import Nav from '../Nav/Nav';

function SalesReportData() {
  const [salesReport, setSalesReport] = useState([]);
  const [error, setError] = useState();
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  
// function used to map and filter all sales report data
  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
        const filteredData = salesReport.filter((sales_report) => {
            return Object.values(sales_report).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        setFilteredResults(filteredData)
    }
    else{
        setFilteredResults(salesReport)
    }
}

// fetch all sales data from api
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const fetchSalesReport = async () => {
  //   await fetch('http://localhost:3001/api/salesreport')
  //   .then(response => {
  //     return response.json()
  //   })
  //   .then(data => {
  //     setSalesReport(data)
  //   })
  // }

   // eslint-disable-next-line react-hooks/exhaustive-deps
   const totalBonus = async() => {
      await fetch('http://localhost:3001/api/salesreport/bonus')
      .then(response => {
        return response.json()
      })
      .then(data => {
        setSalesReport(data)
      })
  } 


  useEffect(() => {
    totalBonus();
  }, [totalBonus]);

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
        <th>Total Bonus</th>
      </tr>
    </thead> 
    
    <tbody>
    {searchInput.length > 1 ? (
                    filteredResults.map((sales_report) => {
                        return (
                          <tr>
       
                          <td>{sales_report.id}</td>
                          <td>{sales_report.employee_name}</td>
                          <td>{sales_report.total_bonus}</td>
                          <td><UpdateSalesReport sales_report={sales_report} key={sales_report} /></td>
                          
                      
                          </tr>
                        )
                    })
                ) : (
         salesReport.map((sales_report) => {
         return (
            <tr>
       
                          <td>{sales_report.id}</td>
                          <td>{sales_report.employee_name}</td>
                          <td>{sales_report.total_bonus}</td>
                          <td><UpdateSalesReport sales_report={sales_report} key={sales_report} /></td>
    
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

export default SalesReportData;