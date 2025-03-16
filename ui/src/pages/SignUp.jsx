import React, { useState } from 'react';
import cover from '../assets/images/cover.svg';
import { useNavigate,Link } from 'react-router-dom';

function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [department, setDepartment] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userRole, setUserRole] = useState('User');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                credentials:'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    FirstName: firstName,
                    LastName: lastName,
                    UserName: userName,
                    Department: department,
                    PhoneNumber: phoneNumber,
                    password: password,
                    confirmPassword:confirmPassword,
                    UserRole: userRole
                }),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.msg || 'Signup failed');
            }

            navigate('/login');
        } catch (err) {
            setError(err.message || 'Signup Failed. Please try again!');
        }
    };

    return (
        <div className="bg-indigo-950   w-full h-full">
            <div className="md:flex md:justify-between ">
                <div><h1 className="md:text-6xl text-3xl text-amber-200 md:pt-[50px] pt-10 ml-5">CareWare</h1>
                <h3 className="md:text-xl text-sm text-white md:ml-5 ml-2">Hospital Inventory Management</h3>
                <img src={cover} className="pr-[200px] md:w-[760px]"></img>
            </div>
            <div  className="mt-[50px] md:ml-[100px]">
            <h1 className=" mt-[10px] md:pl-[100px] pl-2 md:text-4xl text-2xl text-white font-extrabold">Sign Up</h1>
                {error && <p className='text-red-500 mb-4'>{error}</p>}
            <form className="pt-2 pr-[50px] pl-2" onSubmit={handleSignup}>
                <label className="text-white md:text-xl text-xs">FirstName :</label><br></br>
                <input type="text" 
                        className="md:w-[350px] w-[200px] bg-white hover:border-2 border-black"  
                        value={firstName} onChange={(e) => setFirstName(e.target.value)}  required>
                </input><br></br>

                <label className="text-white md:text-xl text-xs">LastName :</label><br></br>
                <input type="text" 
                        className="md:w-[350px] w-[200px] bg-white hover:border-2 border-black" 
                        value={lastName} onChange={(e) => setLastName(e.target.value)} required>
                </input><br></br>

                <label className="text-white md:text-xl text-xs">UserName :</label><br></br>
                <input type="text" 
                        className="md:w-[350px] w-[200px] bg-white hover:border-2 border-black" 
                        value={userName} onChange={(e) => setUserName(e.target.value)} required>
                </input><br></br>

                <label className="text-white md:text-xl text-xs">Phone Number:</label><br></br>
                <input type="Number"   
                        className="md:w-[350px] w-[200px] bg-white hover:border-2 border-black" 
                        value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required>
                </input><br></br>

                <label className="text-white md:text-xl text-xs">Department :</label><br></br>
                <input type="text" 
                        className="md:w-[350px] w-[200px] bg-white hover:border-2 border-black" 
                        value={department} onChange={(e) => setDepartment(e.target.value)} required>
                </input><br></br>

                <label className="text-white md:text-xl text-xs">Role:</label><br></br>
                <select className="md:w-[350px] w-[200px] bg-white hover:border-2 border-black"
                        id="role"
                        value={userRole} onChange={(e) => setUserRole(e.target.value)} required> 
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                </select><br></br>

                <label className="text-white md:text-xl text-xs">Password :</label><br></br>
                <input type="password" 
                        className="md:w-[350px] w-[200px] bg-white hover:border-2 border-black" 
                        value={password} onChange={(e) => setPassword(e.target.value)} required>
                </input><br></br>

                <label className="text-white md:text-xl text-xs">Confirm Password :</label><br></br>
                <input type="password" 
                        className="md:w-[350px] w-[200px] bg-white hover:border-2 border-black" 
                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required>
                </input><br></br><br></br>
                <button className="bg-slate-400 text-xl md:w-[350px] w-[200px] font-bold">SignUp</button><br></br>
                <p className="text-white md:ml-[80px] ml-2">Already have an account?
                <Link to="/login" className='text-blue-500'>Login</Link></p>
            </form>
        </div>
    </div>
</div>
    );
}

export default SignUp;
