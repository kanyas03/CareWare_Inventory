import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import grid from '../assets/images/Grid.svg';
import box from '../assets/images/Box.svg';
import plus from '../assets/images/Plus.svg';
import user from '../assets/images/Users.svg';
import file from '../assets/images/File.svg';
import share from '../assets/images/Share.svg';
import image from '../assets/images/image.svg';
import StockAlert from '../compoents/Stockalert';


function Home() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            const response = await fetch('/api/logout', {
                method: 'GET',
                credentials: 'include'
            });

            if (response.ok) {
                navigate('/login');
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        

    <div className="bg-slate-200 min-h-screen">
    <div className="bg-zinc-500 drop-shadow-xl shadow-gray-950">
        <h1 className="text-3xl ml-5 pt-2 pb-2 font-extrabold text-white">CareWare</h1>
    </div>

    <div className="flex flex-col md:flex-row md:space-x-4 space-x-1">
    <div className="bg-zinc-500 md:w-[200px] w-full md:h-[570px] h-auto p-3 flex md:flex-col flex-wrap md:items-start items-center md:justify-start justify-center overflow-y-auto max-h-[570px]">
        <Link to={'/home'} className="flex items-center space-x-2 md:w-full w-auto md:text-xl mt-5 mb-5">
            <img src={grid} className="md:size-8 size-6" />
            <p className="md:pl-5 md:text-lg text-sm">Dashboard</p>
        </Link>

        <Link to={'/products'} className="flex items-center space-x-2 md:w-full w-auto md:text-xl mt-5 mb-5">
            <img src={box} className="md:size-8 size-6" />
            <p className="md:pl-5 md:text-lg text-sm">Inventory</p>
        </Link>

        <Link to={'/addProduct'} className="flex items-center space-x-2 md:w-full w-auto md:text-xl mt-5 mb-5">
            <img src={plus} className="md:size-8 size-6" />
            <p className="md:pl-5 md:text-lg text-sm">Quick Add</p>
        </Link>

        <Link to={'/staff'} className="flex items-center space-x-2 md:w-full w-auto">
            <img src={user} className="md:size-8 size-6" />
            <p className="md:pl-5 md:text-lg text-sm">Staffs</p>
        </Link>

        <Link to={'/Orderlist'} className="flex items-center space-x-2 md:w-full w-auto md:text-xl mt-5 mb-5">
            <img src={file} className="md:size-8 size-6" />
            <p className="md:pl-5 md:text-lg text-sm">Orders</p>
        </Link>

        <button onClick={handleLogout} className="flex items-center space-x-2 md:w-full w-auto text-left">
            <img src={share} className="md:size-8 size-6" />
            <p className="md:pl-5 md:text-lg text-sm">Log Out</p>
        </button>
    </div>





        <div className="flex-1 px-4 md:px-0">
            <div className="bg-zinc-400 flex flex-col md:flex-row items-center md:w-[998px] w-full rounded-2xl drop-shadow-2xl space-x-4 shadow-gray-950 md:mt-10 mt-5 md:mx-10 p-4">
                <img src={image} className="md:w-[300px] w-[190px]" />
                <h1 className="font-bold md:text-2xl text-sm text-center md:text-left">
                    Never worry about your inventory
                    <br /> Inventory management is about balance:
                    <br /> Too much ties up capital, too little stops progress.
                </h1>
            </div>
            <div>
                <StockAlert />
            </div>
        </div>
    </div>
</div>

    );
}

export default Home;
