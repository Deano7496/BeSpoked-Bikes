import React, { Fragment, useState } from 'react';  

// Make sure to use props as argument
const NewSale = ({ sales }) => {
  const [product, setProduct] = useState(sales.product);
  const [salesperson, setSalesperson] = useState(sales.salesperson);
  const [customer_name, setCustomer] = useState(sales.customer_name);
  const [sales_date, setSalesDate] = useState(sales.sales_date);
  const [purchase_price, setPurchasePrice] = useState(sales.purchase_price);
  const [qty_sold, setQtySold] = useState(sales.qty_sold);
  

// function used to create a new sale with api
  const createSale = async (e) => {
    e.preventDefault();
    try {
      const body = {product, salesperson, sales_date, customer_name, purchase_price, qty_sold}
      const response = await fetch(`http://localhost:3001/api/sales`, {
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
  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target='#myModal'>
    New Sale
  </button>
  <form type="submit"> 
  <div className="modal" id='myModal'>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Sales</h4>
          <button type="button" className="close" data-bs-dismiss="modal">X</button>
        </div>
        <div className="modal-body">
          <label style={{margin: 8}}>
           Product Name
            <input type='text' className='form-control' value={product} onChange={e => setProduct(e.target.value)}/>
            </label>
            <label style={{margin: 8}} title='Sales Person'>
            Sales Person {(' ')}
              <select>
           {sales.map(sales => (
            
               <option value={salesperson} onChange={e => setSalesperson(e.target.value)}>
                 {sales.salesperson}
                </option>
           
                ))} 
                </select>
               
            </label>
            <label style={{margin: 8}}>
            Sales Date
            <input type='date' className='form-control' value={sales_date} onChange={e => setSalesDate(e.target.value)}/>
            </label>
            <label style={{margin: 8}}>
              Customer
            <input type='text' className='form-control' value={customer_name} onChange={e => setCustomer(e.target.value)}/>
            </label>
            <label style={{margin: 8}}>
             Price
            <input type='money' className='form-control' value={purchase_price} onChange={e => setPurchasePrice(e.target.value)}/>
            </label>
            <label style={{margin: 8}}>
              Quantity Sold
            <input type='number' className='form-control' value={qty_sold} onChange={e => setQtySold(e.target.value)}/>
            </label>
           
        </div>
        <div className="modal-footer">
        <button 
        type="button" 
        className="btn btn-success" 
        data-bs-dismiss="modal"
        onClick={e => createSale(e)}
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

export default NewSale;