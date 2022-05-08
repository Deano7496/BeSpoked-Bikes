import React, { useState, useEffect, Fragment} from 'react'
import EditProduct from './EditProduct';
import { FaFilter } from 'react-icons/fa';
import Nav from '../Nav/Nav';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState();
    const [discount, setDiscount] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [discountResult, setDiscountResult] = useState([]);
    const [discountSearch, setDiscountSearch] = useState('');


    // function used to map and filter product data
  const searchProducts = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
        const filteredData = products.filter((products) => {
            return Object.values(products).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        setFilteredResults(filteredData)
    }
    else{
        setFilteredResults(products)
    }
}
// function used to filter discount data
const searchDiscounts = (searchValue) => {
  setDiscountSearch(searchValue)
  if (discountSearch !== '') {
      const filteredData = discount.filter((discount) => {
          return Object.values(discount).join('').toLowerCase().includes(discountSearch.toLowerCase())
      })
      setDiscountResult(filteredData)
  }
  else{
      setDiscountResult(discount)
  }
}
    
// function used to fetch all product data from api
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchProducts = async () => {
      
      await fetch('http://localhost:3001/api/products')
      .then(response => {
        return response.json()
      })
      .then(data => {
        setProducts(data)
      })
    }
     // function used to fetch all discount data from api

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchDiscounts = async () => {
      await fetch('http://localhost:3001/api/discounts')
      .then(response => {
        return response.json()
      })
      .then(data => {
        setDiscount(data)
      })
    }

    

    useEffect(() => {
      fetchProducts();
      fetchDiscounts();
    }, [fetchProducts]);
    
  return (
    <Fragment>
    <Nav />
    <div className="container">
  <h2>Products</h2>
    <div className='search' style={{ padding: 10, display: 'inline-block' }}>
            <FaFilter /> <input 
                type='text'
                placeholder='Filter...'
                onChange={(e) => searchProducts(e.target.value)}
            />
    </div>        
  <table className="table table-bordered"> 
 
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Manufacturer</th>
        <th>Style</th>
        <th>Price</th>
        <th>Sale Price</th>
        <th>Quantity</th>
        <th>Commission</th>
      </tr>
    </thead> 
    
    <tbody>
    {searchInput.length > 1 ? (
                    filteredResults.map((products) => {
                        return (
                          <tr>
       
        <td>{products.id}</td>
        <td>{products.name}</td>
        <td>{products.manufacturer}</td>
        <td>{products.style}</td>
        <td>{products.purchase_price}</td>
        <td>{products.sale_price}</td>
        <td>{products.qty_on_hand}</td>
        <td>{products.commission_percentage}%</td>
        <td><EditProduct products={products} key={products}/></td>
        </tr>
                        )
                    })
       ):(
      products.map(products => {
        return (
      <tr>
       
        <td>{products.id}</td>
        <td>{products.name}</td>
        <td>{products.manufacturer}</td>
        <td>{products.style}</td>
        <td>{products.purchase_price}</td>
        <td>{products.sale_price}</td>
        <td>{products.qty_on_hand}</td>
        <td>{products.commission_percentage}%</td>
        <td><EditProduct products={products} key={products}/></td>
        </tr>
   )
  })
)}
    
    </tbody>
  </table>
  <h3>Product Discount</h3>
  <div className='search' style={{ padding: 10, display: 'inline-block' }}>
            <input 
                type='text'
                placeholder='Search...'
                onChange={(e) => searchDiscounts(e.target.value)}
            />
    </div> 
  <table className="table table-bordered">
    <thead>
      <tr>
        <th>Product ID</th>
        <th>Begin Date</th>
        <th>End Date</th>
        <th>Discount Percentage</th>
      </tr>
    </thead>
    <tbody>
        
    {discountSearch.length > 1 ? (
                    discountResult.map((discount) => {
                        return (
                          <tr>
                            <td>{discount.product}</td>
                            <td>{discount.begin_date}</td>
                            <td>{discount.end_date}</td>
                            <td>{discount.discount_percentage}%</td>
                          </tr>
                        )
                    })
        
        ):(
          discount.map(discount => {
            return (
          <tr>
            <td>{discount.product}</td>
            <td>{discount.begin_date}</td>
            <td>{discount.end_date}</td>
            <td>{discount.discount_percentage}%</td>
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

export default Products;