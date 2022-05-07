import React from "react";
import Products from "./Components/Products/products";
import { BrowserRouter as Router, Routes, Route, Link, useSearchParams } from 'react-router-dom';
import EmployeeData from "./Components/Employees/employees";
import CustomerData from "./Components/Customers/customers";
import Logo from './images/bespokedLogo.jpeg'
import './App.css';
import SalesData from "./Components/Sales/sales";
import SalesReportData from "./Components/SalesReport/salesReport";

// BrowserRouter used for smooth switching between different tabs on application
function App() {
  return (
   <Router>
     <nav>
       <div className='nav_wrapper'>
         <ul className='list'>
           <center>
             <img src={Logo} alt='logo' className='logo' />
             <h3>BeSpoked Bikes</h3>

           </center>
           <li>
          <Link to ="/">
            Products
          </Link>
           </li>
           <li>
          <Link to ="/employees">
            Employees
          </Link>
           </li>
           <li>
          <Link to ="/customers">
            Customers
          </Link>
           </li>
           <li>
          <Link to ="/sales">
            Sales
          </Link>
           </li>
           <li>
          <Link to ="/salesreport">
            Sales Report
          </Link>
           </li>
         </ul>
       </div>
       </nav>


    
     <Routes>
       <Route exact path="/" element={<Products />} />
       <Route exact path="/employees" element={<EmployeeData />} />
       <Route exact path="/customers" element={<CustomerData />}/>
       <Route exact path="/sales" element={<SalesData />}/>
       <Route exact path="/salesreport" element={<SalesReportData />}/>
       </Routes>
   </Router>
    
  );
}

export default App;
