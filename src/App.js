import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from './Pages/Authentication/SignIn/SignIn';
import SignUp from './Pages/Authentication/SignUp/SignUp';
import Blog from './Pages/Blog/Blog';
import Home from './Pages/Home/Home/Home';
import Footer from './Pages/Shared/Footer/Footer';
import Header from './Pages/Shared/Header/Header';
import { ToastContainer } from 'react-toastify';
import CarPartsPurchase from './Pages/CarParts/CarPartsPurchase/CarPartsPurchase';
import CarParts from './Pages/CarParts/CarParts/CarParts';
import Dashboard from './Pages/DashBoard/DashBoard/DashBoard';
import MyProfile from './Pages/DashBoard/MyProfile/MyProfile';
import MyOrders from './Pages/DashBoard/User/MyOrders/MyOrders';
import AddReview from './Pages/DashBoard/User/AddReview/AddReview';
import AddCartItem from './Pages/DashBoard/Admin/AddCarItem/AddCarItem';
import ManageCarItems from './Pages/DashBoard/Admin/ManageCarItems/ManageCarItems';
import ManageAllOrders from './Pages/DashBoard/Admin/ManageAllOrders/ManageAllOrders';
import MakeAdmin from './Pages/DashBoard/Admin/MakeAdmin/MakeAdmin';
import RequiredAuth from './Pages/Authentication/RequiredAuth/RequiredAuth';
import NotFound from './Pages/Shared/NotFound/NotFound';
import RequiredAdmin from './Pages/Authentication/RequiredAdmin/RequiredAdmin';
import Payment from './Pages/DashBoard/Payment/Payment';

function App() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/car-parts" element={<CarParts />} />
        <Route
          path="/purchase/:carItemId"
          element={
            <RequiredAuth>
              <CarPartsPurchase />
            </RequiredAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequiredAuth>
              <Dashboard />
            </RequiredAuth>
          }
        >
          <Route index element={<MyProfile />} />
          <Route path="myorders" element={<MyOrders />} />
          <Route path="payment/:id" element={<Payment />} />
          <Route path="addreview" element={<AddReview />} />
          <Route
            path="addcaritem"
            element={
              <RequiredAdmin>
                <AddCartItem />
              </RequiredAdmin>
            }
          />
          <Route
            path="managecaritems"
            element={
              <RequiredAdmin>
                <ManageCarItems />
              </RequiredAdmin>
            }
          />
          <Route
            path="manageallorders"
            element={
              <RequiredAdmin>
                <ManageAllOrders />
              </RequiredAdmin>
            }
          />
          <Route
            path="makeadmin"
            element={
              <RequiredAdmin>
                <MakeAdmin />
              </RequiredAdmin>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default App;
