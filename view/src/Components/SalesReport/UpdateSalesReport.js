import React, { useState } from 'react';

// Dont forget to use props
const UpdateSalesReport = ({ sales_report }) => {
  const [employee_name, setEmployeeName] = useState(sales_report.employee_name)
  const [total_sales, setTotalSales] = useState(sales_report.total_sales);
  const [commission, setCommission] = useState(sales_report.commission);


// function used to create a new sales report
  const updateReport = async (e) => {
    e.preventDefault();
    try {
      const body = {employee_name, total_sales, commission}
      const response = await fetch(`http://localhost:3001/api/salesreport/${sales_report.id}`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify(body)
      } );
      console.log(response)
    } catch (err) {
      return alert('Duplicate report not allowed')
    }
  }

  return (
   
      <div className="container">
  <button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target={`#id${sales_report.id}`}>
    Update Sales Report
  </button>
  <form type="submit"> 
  <div className="modal" id={`id${sales_report.id}`}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Sales Report</h4>
          <button type="button" className="close" data-bs-dismiss="modal">X</button>
        </div>
        <div className="modal-body">
            <label style={{margin: 8}} title='Employee Name'>
            Employee Name
           <input type='text' placeholder={`${employee_name}`} onChange={e => setEmployeeName(e.target.value)} />
            </label>
            <label style={{margin: 8}}>
            Total Sales
            <input type='money' className='form-control' value={total_sales} onChange={e => setTotalSales(e.target.value)}/>
            </label>
            <label style={{margin: 8}}>
            Commission
            <input type='int' className='form-control' value={commission} onChange={e => setCommission(e.target.value)}/>
            </label>
           
        </div>
        <div className="modal-footer">
        <button 
        type="button" 
        className="btn btn-success" 
        data-bs-dismiss="modal"
        onClick={e => updateReport(e)}
        >
          Update
          </button>
        </div>
        
      </div>
    </div>
  </div>
   </form>
</div>
  
  )
}

export default UpdateSalesReport;