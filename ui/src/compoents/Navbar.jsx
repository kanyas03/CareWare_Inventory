import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate(); // Hook to navigate after logout

  const handleLogout = async () => {
    try {
      const response = await fetch('/logout', {
        method: 'GET',
        credentials: 'include', // Ensure cookies are included
      });

      if (response.ok) {
        navigate('/login'); // Redirect to login page after successful logout
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    // <nav>
    //   <div className="bg-zinc-500">
    //     <h1 className="text-3xl ml-5 pt-2 pb-2 font-extrabold text-white">CareWare</h1>
    //   </div>
    //   <div className="bg-zinc-500 mt-2 h-10 md:space-x-12 space-x-2 md:w-full drop-shadow-xl shadow-gray-950">
    //     <Link to={'/home'} className="md:text-base font-bold text-sm text-white ml-[550px] hover:text-black">Dashboard</Link>
    //     <Link to={'/products'} className="md:text-base font-bold text-sm text-white hover:text-black">Inventory</Link>
    //     <Link to={'/staff'} className="md:text-base font-bold text-sm text-white hover:text-black">Staffs</Link>
    //     <Link to={'/addproduct'} className="md:text-base font-bold text-sm text-white hover:text-black">Add stock</Link>
    //     <Link to={'/Orderlist'} className="md:text-base font-bold text-sm text-white hover:text-black">Orders</Link>
    //     {/* Call handleLogout when clicking Logout */}
    //     <button onClick={handleLogout} className="md:text-base font-bold text-sm text-white hover:text-black">
    //       LogOut
    //     </button>
    //   </div>
    // </nav>


    <nav>
    <div className="bg-zinc-500">
        <h1 className="text-3xl ml-5 pt-2 pb-2 font-extrabold text-white">CareWare</h1>
    </div>
    <div className="bg-zinc-500 mt-2 h-auto flex overflow-x-auto whitespace-nowrap py-2 gap-4 md:gap-12 w-full drop-shadow-xl shadow-gray-950 px-4">
        <Link to={'/home'} className="md:text-base font-bold text-sm text-white hover:text-black">Dashboard</Link>
        <Link to={'/products'} className="md:text-base font-bold text-sm text-white hover:text-black">Inventory</Link>
        <Link to={'/staff'} className="md:text-base font-bold text-sm text-white hover:text-black">Staffs</Link>
        <Link to={'/addproduct'} className="md:text-base font-bold text-sm text-white hover:text-black">Add stock</Link>
        <Link to={'/Orderlist'} className="md:text-base font-bold text-sm text-white hover:text-black">Orders</Link>
        <button onClick={handleLogout} className="md:text-base font-bold text-sm text-white hover:text-black">
            LogOut
        </button>
    </div>
</nav>


  );
}

export default Navbar;
