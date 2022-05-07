import React from "react";
import Products from "./Components/Products/products";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeData from "./Components/Employees/employees";
import CustomerData from "./Components/Customers/customers";
import './App.css';
import SalesData from "./Components/Sales/sales";
import SalesReportData from "./Components/SalesReport/salesReport";

// BrowserRouter used for smooth switching between different tabs on application
function App() {
  return (
   <Router>
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
