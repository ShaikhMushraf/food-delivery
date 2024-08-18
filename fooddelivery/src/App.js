import './App.css';
import Home from './Screens/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import Signup from './Screens/Signup.jsx';
import { CartProvider } from './components/ContextReducer.jsx';
import PaymentGateway from './components/PaymentGateway.jsx';
import SuccessfulPayment from './components/SuccessfulPayment.jsx';
import AdminSignIn from './Screens/Admin/AdminSignIn.jsx';
import AdminSignUp from './Screens/Admin/AdminSignUp.jsx';
import AdminDashboard from './Screens/Admin/AdminDashboard.jsx';
import AdminHome from './Screens/Admin/AdminHome.jsx';
import UserManagement from './Screens/Admin/UserManagement.jsx';
import OrderManagement from './Screens/Admin/OrderManagement.jsx';
import AdminSettings from './Screens/Admin/AdminSettings.jsx';

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <div>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/createuser" element={<Signup />} />
              <Route path="/payment-gateway" element={<PaymentGateway />} />
              <Route path="/payment-success" element={<SuccessfulPayment />} />
              {/* Admin Routes */}
              <Route path="/admin-signin" element={<AdminSignIn />} />
              <Route path="/admin-signup" element={<AdminSignUp />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/home" element={<AdminHome />} />
              <Route path="/admin/users" element={<UserManagement />} />
              <Route path="/admin/orders" element={<OrderManagement />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
