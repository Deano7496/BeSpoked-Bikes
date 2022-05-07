import React from 'react'
import Logo from '../../images/bespokedLogo.png';
import { Link } from 'react-router-dom';

function Nav() {
  return (
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
  )
}

export default Nav;