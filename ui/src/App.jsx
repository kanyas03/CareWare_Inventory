
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import ProductList from './pages/ProductList.jsx'
import AddProduct from './pages/AddProduct.jsx'
import OrderList from './pages/OrderList.jsx'
import Staff from './pages/Staff.jsx'
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import Userhome from './pages/Userhome.jsx'
import Cart from './pages/Cart.jsx'
import Non_product from './compoents/Non_product.jsx'
import Dis_product from './compoents/Dis_poduct.jsx'
import UserProfile from './pages/Userprofile.jsx'
import UpdateProduct from './pages/UpdateProduct.jsx'


const App=()=> {


  return (
    <div>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<SignUp/>} />
    <Route path='/login' element={<Login/>} />
    <Route path="/home" element={<Home/>} /> 
    <Route path="/products" element={<ProductList />} />
    <Route path="/addproduct" element={<AddProduct/>}/>
    <Route path='/updateproduct'element={<UpdateProduct/>}/>
    <Route path="/non_product" element={<Non_product/>} />
    <Route path="/dis_product" element={<Dis_product />} />
    <Route path="/updateproduct/:ProductId" element={<UpdateProduct />} />
    <Route path='/Orderlist' element={<OrderList/>}/>
    <Route path='/staff' element={<Staff/>}/>
    <Route path='/userhome' element={<Userhome/>}/>
    <Route path='/userprofile'element={<UserProfile/>}/>
    <Route path='/cart' element={<Cart/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
