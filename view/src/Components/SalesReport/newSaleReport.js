import React, { Fragment, useState } from 'react';
import fetchSales from'./salesReport';

// Dont forget to use props
const NewSaleReport = ({ sales_report }) => {
  const [employee_id, setEmployeeId] = useState(sales_report.employee_id);
  const [employee_name, setEmployeeName] = useState(sales_report.employee_name)
  const [total_sales, setTotalSales] = useState(sales_report.total_sales);
  const [commission, setCommission] = useState(sales_report.commission);
  const [total_bonus, setTotalBonus] = useState(sales_report.total_bonus);

  

// function used to create a new sales report
  const createSaleReport = async (e) => {
    e.preventDefault();
    try {
      const body = {employee_id, employee_name, total_sales, commission, total_bonus}
      const response = await fetch(`http://localhost:3001/api/salesreport`, {
        method: 'POST',
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify(body)
      } );
      console.log(response)
      
    } catch (error) {
      console.error(error.message)
    }
    
  }

  return (
    <Fragment>
      <div className="container">
  <button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target='#myModal'>
    New Sale Report
  </button>
  <form type="submit"> 
  <div className="modal" id='myModal'>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Sales Report</h4>
          <button type="button" className="close" data-bs-dismiss="modal">X</button>
        </div>
        <div className="modal-body">
          <label style={{margin: 8}}>
           Employee ID
            <input type='number' className='form-control' value={employee_id} onChange={e => setEmployeeId(e.target.value)}/>
            </label>
            <label style={{margin: 8}}>
            Employee Name
            <input type='text' className='form-control' value={employee_name} onChange={e => setEmployeeName(e.target.value)}/>
            </label>
            <label style={{margin: 8}}>
            Total Sales
            <input type='money' className='form-control' value={total_sales} onChange={e => setTotalSales(e.target.value)}/>
            </label>
            <label style={{margin: 8}}>
            Commission
            <input type='int' className='form-control' value={commission} onChange={e => setCommission(e.target.value)}/>
            </label>
            <label style={{margin: 8}}>
            Total Bonus
            <input type='money' className='form-control' value={total_bonus} onChange={e => setTotalBonus(e.target.value)}/>
            </label>
           
        </div>
        <div className="modal-footer">
        <button 
        type="button" 
        className="btn btn-success" 
        data-bs-dismiss="modal"
        onClick={e => createSaleReport(e)}
        >
          Create
          </button>
        </div>
        
      </div>
    </div>
  </div>
   </form>
</div>
  </Fragment>
  )
}

export default NewSaleReport;