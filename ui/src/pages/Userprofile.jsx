import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import box from "../assets/images/Box.svg";
import cart from "../assets/images/ShoppingCart.svg";
import logout from "../assets/images/Share.svg";

const UserNavbar = ({ onLogout }) => {
  return (
   
    <div className="w-[200px] bg-zinc-400 h-screen p-5 flex flex-col items-start">
     
      <Link to={'/userhome'} className="flex items-center mb-6">
        <img src={box} className="size-6" alt="Inventory" />
        <p className="text-xl pl-5">Inventory</p>
      </Link>
      <Link to={"/cart"} className="flex items-center mb-6">
        <img src={cart} className="size-6" alt="Order" />
        <p className="text-xl pl-5">Order</p>
      </Link>
      <button onClick={onLogout} className="flex items-center mb-6">
        <img src={logout} className="size-6" alt="Logout" />
        <p className="text-xl pl-5">LogOut</p>
      </button>
    </div>

    
    

    
  );
};

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("/api/getuser", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: Failed to fetch user data`);
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/logout", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        window.location.href = "/login";
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    // <div className="bg-zinc-300 ">
    // <div className="h-screen flex flex-col">
    //   <div className="bg-zinc-500 text-white text-3xl font-extrabold p-4 shadow-md">
    //     CareWare
    //   </div>
    //   <div className="flex flex-grow">
    //     <UserNavbar onLogout={handleLogout} />
    //     <div className="w-3/4 flex justify-center items-center">
    //       <div className="bg-zinc-500 rounded-2xl p-10 w-3/4 drop-shadow-xl shadow-gray-950">
    //         <h2 className="text-2xl font-bold mb-5">User Profile</h2>
    //         <table className="w-full text-left border-collapse">
    //           <tbody>
    //             <tr className="border-b">
    //               <td className="py-2 font-medium w-1/3">FirstName:</td>
    //               <td className="py-2">{userData?.firstName || "N/A"}</td>
    //             </tr>
    //             <tr className="border-b">
    //               <td className="py-2 font-medium w-1/3">LastName:</td>
    //               <td className="py-2">{userData?.lastName || "N/A"}</td>
    //             </tr>
    //             <tr className="border-b">
    //               <td className="py-2 font-medium w-1/3">UserName:</td>
    //               <td className="py-2">{userData?.userName || "N/A"}</td>
    //             </tr>
    //             <tr className="border-b">
    //               <td className="py-2 font-medium">Department:</td>
    //               <td className="py-2">{userData?.dept || "N/A"}</td>
    //             </tr>
    //             <tr className="border-b">
    //               <td className="py-2 font-medium">Phone:</td>
    //               <td className="py-2">{userData?.Ph || "N/A"}</td>
    //             </tr>
    //           </tbody>
    //         </table>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    // </div>
<>


    <div className="bg-zinc-300 min-h-screen flex flex-col">
  <div className="bg-zinc-500 text-white text-2xl md:text-3xl font-extrabold p-4 shadow-md">
    CareWare
  </div>

  <div className="flex flex-col md:flex-row flex-grow">
    {/* Sidebar */}
    <div className="w-full md:w-1/4">
      <UserNavbar onLogout={handleLogout} />
    </div>

    {/* Profile Section */}
    <div className="flex flex-grow justify-center items-center p-4">
      <div className="bg-zinc-500 rounded-2xl px-6 md:px-10 py-8 w-full sm:w-3/4 drop-shadow-xl shadow-gray-950">
        <h2 className="text-xl md:text-2xl font-bold mb-5 text-center md:text-left">
          User Profile
        </h2>
        <table className="w-full text-left border-collapse">
          <tbody>
            <tr className="border-b">
              <td className="py-2 font-medium w-1/3 text-sm md:text-base">First Name:</td>
              <td className="py-2 text-sm md:text-base">{userData?.firstName || "N/A"}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium w-1/3 text-sm md:text-base">Last Name:</td>
              <td className="py-2 text-sm md:text-base">{userData?.lastName || "N/A"}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium w-1/3 text-sm md:text-base">Username:</td>
              <td className="py-2 text-sm md:text-base">{userData?.userName || "N/A"}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium text-sm md:text-base">Department:</td>
              <td className="py-2 text-sm md:text-base">{userData?.dept || "N/A"}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium text-sm md:text-base">Phone:</td>
              <td className="py-2 text-sm md:text-base">{userData?.Ph || "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</>
  );
};

export default UserProfile;


