import React, { Fragment, useState } from 'react';
import './customers.css';  

//Make sure to use props as argument
const NewCustomer = ({ customers }) => {
  const [id, setId] = useState(customers.id);
  const [first_name, setFirstName] = useState(customers.first_name);
  const [last_name, setLastName] = useState(customers.last_name);
  const [address, setAddress] = useState(customers.address);
  const [phone, setPhone] = useState(customers.phone);
  const [start_date, setStartDate] = useState(customers.start_date);
  

// Create New Customer function
  const createCustomer = async (e) => {
    e.preventDefault();
    try {
      const body = {id, first_name, last_name, address, phone, start_date}
      const response = await fetch(`http://localhost:3001/api/customers`, {
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
  <button type="button"  className="btn btn-info" data-bs-toggle="modal" data-bs-target='#myModal'>
    New Customer
  </button>
  <form type="submit"> 
  <div className="modal" id='myModal'>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">New Customer</h4>
          <button type="button" className="close" data-bs-dismiss="modal">X</button>
        </div>
        <div className="modal-body">
          <label style={{margin: 8}}>
           Customer ID
            <input type='number' className='form-control' value={id} onChange={e => setId(e.target.value)}/>
            </label>
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
           
        </div>
        <div className="modal-footer">
        <button 
        type="button" 
        className="btn btn-success" 
        data-bs-dismiss="modal"
        onClick={e => createCustomer(e)}
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

export default NewCustomer;