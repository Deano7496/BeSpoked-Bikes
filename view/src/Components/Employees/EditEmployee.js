import React, { Fragment, useState } from 'react';  
import './editEmployee.css';

//Make sure to use props as argument
const EditProduct = ({ salesperson }) => {
  const [first_name, setFirstName] = useState(salesperson.first_name);
  const [last_name, setLastName] = useState(salesperson.last_name);
  const [address, setAddress] = useState(salesperson.address);
  const [phone, setPhone] = useState(salesperson.phone);
  const [start_date, setStartDate] = useState(salesperson.start_date);
  const [termination_date, setTerminationDate] = useState(salesperson.termination_date);
  const [manager, setManager] = useState(salesperson.manager);

// Update Employee function
  const updateEmployee = async (e) => {
    e.preventDefault();
    try {
      const body = {first_name, last_name, address, phone, start_date, termination_date, manager}
      const response = await fetch(`http://localhost:3001/api/employees/${salesperson.employee_id}`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify(body)
      } );
      console.log(response)
    } catch (error) {
      window.alert('Employee already exists')
      console.error(error.message)
    }
  }

  return (
    <Fragment>
      <div className="container">
  <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target={`#id${salesperson.employee_id}`}>
    Update Employee
  </button>
  <form type="submit"> 
  <div className="modal" id={`id${salesperson.employee_id}`}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Employee {`${salesperson.employee_id}`}</h4>
          <button type="button" className="close" data-bs-dismiss="modal">X</button>
        </div>
        <div className="modal-body">
          <label style={{margin: 8}}>
            First Name 
            <input type='text' className='form-control' value={first_name} onChange={e => setFirstName(e.target.value)}/>
            </label>
            <label style={{margin: 8}}>
             Last Name
            <input type='text' className='form-control' value={last_name} onChange={e => setLastName(e.target.value)}/>
            </label>
            <label style={{margin: 8}}>
            Address
            <input type='text' className='form-control' value={address} onChange={e => setAddress(e.target.value)}/>
            </label>
            <label style={{margin: 8}}>
              Phone
            <input type='text' className='form-control' value={phone} onChange={e => setPhone(e.target.value)}/>
            </label>
            <label style={{margin: 8}}>
              Start Date
            <input type='date' className='form-control' value={start_date} onChange={e => setStartDate(e.target.value)}/>
            </label>
            <label style={{margin: 8}}>
              Termination Date
            <input type='date' className='form-control' value={termination_date} onChange={e => setTerminationDate(e.target.value)}/>
            </label>
            <label style={{margin: 8}}>
             Manager
            <input type='text' className='form-control' value={manager} onChange={e => setManager(e.target.value)}/>
            </label>
           
        </div>
        <div className="modal-footer">
        <button 
        type="button" 
        className="btn btn-success" 
        data-bs-dismiss="modal"
        onClick={e => updateEmployee(e)}
        >
          Update
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

export default EditProduct;