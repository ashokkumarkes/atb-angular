import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          JJ
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              Products
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/orders" className="navbar-link">
              Orders
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/users" className="navbar-link">
              Users
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

