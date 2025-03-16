import React, { useEffect, useState } from 'react';
import Navbar from '../compoents/Navbar'

function Staff() {
    const [staffs, setStaffs] = useState([]);

    useEffect(() => {
        fetch('/api/users')  // Adjust the endpoint if necessary
            .then((response) => response.json())
            .then((data) => {
                // Filter out admins
                const filteredStaff = data.filter(user => user.userRole !== 'Admin');
                setStaffs(filteredStaff);
            })
            .catch((error) => console.error('Error fetching staff:', error));
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/deleteUser/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setStaffs(staffs.filter((staff) => staff._id !== id));
            } else {
                console.error('Failed to delete staff');
            }
        } catch (error) {
            console.error('Error deleting staff:', error);
        }
    };

    return (
    
        <>
    <Navbar />
    <h1 className="font-extrabold mt-5 text-xl text-center md:text-left md:ml-[600px]">STAFFS</h1>
    <br />
    <div className="overflow-x-auto mx-2 md:mx-5">
        <table className="border-collapse border border-black md:w-[1250px] w-full">
            <thead>
                <tr className="border-black border-2 bg-zinc-400 h-10">
                    <th className="px-2 border border-black md:text-lg text-xs">SINo</th>
                    <th className="px-2 border border-black md:text-lg text-xs">Staff Id</th>
                    <th className="px-2 border border-black md:text-lg text-xs">Staff Name</th>
                    <th className="px-2 border border-black md:text-lg text-xs">Department</th>
                    <th className="px-2 border border-black md:text-lg text-xs">Ph No</th>
                    <th className="px-2 border border-black md:text-lg text-xs">Action</th>
                </tr>
            </thead>
            <tbody>
                {staffs.map((staff, index) => (
                    <tr key={staff._id} className="border-black border-2 h-10">
                        <td className="px-2 border border-black md:text-lg text-xs">{index + 1}</td>
                        <td className="px-2 border border-black md:text-lg text-xs">{staff._id}</td>
                        <td className="px-2 border border-black md:text-lg text-xs">{staff.firstName} {staff.lastName}</td>
                        <td className="px-2 border border-black md:text-lg text-xs">{staff.dept}</td>
                        <td className="px-2 border border-black md:text-lg text-xs">{staff.Ph}</td>
                        <td className="px-2 border border-black md:text-lg text-xs">
                            <button className="bg-red-500 text-white w-[70px] rounded-xl mr-2" onClick={() => handleDelete(staff._id)}>Remove</button>
                           
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</>

    );
}

export default Staff;