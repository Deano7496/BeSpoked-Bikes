import React, { Fragment, useState } from 'react';  

// Make sure to use props as argument
const EditEmployee = ({ products }) => {
  const [name, setName] = useState(products.name);
  const [manufacturer, setManufacturer] = useState(products.manufacturer);
  const [style, setStyle] = useState(products.style);
  const [purchase_price, setPurchasePrice] = useState(products.purchase_price);
  const [sale_price, setSalePrice] = useState(products.sale_price);
  const [qty_on_hand, setQuantity] = useState(products.qty_on_hand);
  const [commission_percentage, setCommissionPercentage] = useState(products.commission_percentage);

// Update Product function
  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      const body = {name, manufacturer, style, purchase_price, sale_price, qty_on_hand, commission_percentage}
      const response = await fetch(`http://localhost:3001/api/products/${products.id}`, {
        method: 'PUT',
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
  <button type="button" className="btn btn-outline-info" data-bs-toggle="modal" data-bs-target={`#id${products.id}`}>
    Update Product
  </button>
  <form type="submit"> 
  <div className="modal" id={`id${products.id}`}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Product {`${products.id}: ${products.name}`}</h4>
          <button type="button" className="close" data-bs-dismiss="modal">X</button>
        </div>
        <div className="modal-body">
          <label style={{margin: 8}}>
            Name 
            <input type='text' className='form-control' value={name} onChange={e => setName(e.target.value)}/>
            </label>
            <label style={{margin: 8}}>
              Manufacturer
            <input type='text' className='form-control' value={manufacturer} onChange={e => setManufacturer(e.target.value)}/>
            </label>
            <label style={{margin: 8}}>
             Style
            <input type='text' className='form-control' value={style} onChange={e => setStyle(e.target.value)}/>
            </label>
            <label style={{margin: 8}}>
              Price
            <input type='text' className='form-control' value={purchase_price} onChange={e => setPurchasePrice(e.target.value)}/>
            </label>
            <label style={{margin: 8}}>
              Sale Price
            <input type='text' className='form-control' value={sale_price} onChange={e => setSalePrice(e.target.value)}/>
            </label>
            <label style={{margin: 8}}>
              Quantity
            <input type='text' className='form-control' value={qty_on_hand} onChange={e => setQuantity(e.target.value)}/>
            </label>
            <label style={{margin: 8}}>
              Commission
            <input type='text' className='form-control' value={commission_percentage} onChange={e => setCommissionPercentage(e.target.value)}/>
            </label>
           
        </div>
        <div className="modal-footer">
        <button 
        type="button" 
        className="btn btn-success" 
        data-bs-dismiss="modal"
        onClick={e => updateProduct(e)}
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

export default EditEmployee;