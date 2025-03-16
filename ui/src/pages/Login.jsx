import React,{useState} from 'react'
import image from '../assets/images/Group.svg'
import {useNavigate,Link} from 'react-router-dom'

function Login() {
  const [userName,setUserName]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError]=useState('')

  const navigate=useNavigate();
  

const handleLogin=async (e)=>{
  e.preventDefault();
  try
  {
    const response = await fetch('/api/login', {
      method: 'POST',
      credentials:'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        UserName:userName,
        password}),
    });
    if(!response.ok){
      const errData=await response.json();
      throw new Error(errData.msg || 'Login failed')
    }
    const data = await response.json();
    if (data.userRole==='Admin') {
        navigate('/home');
    } else {
        navigate('/userhome');
    }
  }  
  catch(err){
      setError(err.message || 'Invalid Credentials : Please try again!');
  }
}
  return (
  <div className="bg-indigo-950 w-full min-h-screen flex flex-col md:flex-row items-center justify-center p-5">
    <div className="flex flex-col items-center md:items-start md:w-1/2 text-center md:text-left">
      <h1 className="text-6xl text-amber-200">CareWare</h1>
      <h3 className="text-xl text-white">Hospital Inventory Management</h3>
      <img src={image} className="w-[80%] max-w-[650px] md:w-[450px] pt-[40px] md:pt-[80px] md:pl-[60px]" 
        alt="Hospital Inventory" />
    </div>
    <div className="mt-8 md:mt-0 md:w-1/2 flex flex-col items-center">
      <h1 className="text-4xl text-white font-extrabold">Login</h1>
      <form className="w-full max-w-sm mt-5" onSubmit={handleLogin}>
        {error && <p className='text-red-500 mb-4'>{error}</p>}
        <label className="text-white text-xl">UserName :</label>
        <input 
          type="text" 
          className="w-full bg-white hover:ring-2 p-2 rounded mt-2" 
          value={userName} 
          onChange={(e) => setUserName(e.target.value)}/>
        <label className="text-white text-xl mt-4">Password :</label>
        <input 
          type="password" 
          className="w-full bg-white hover:ring-2 p-2 rounded mt-2" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}/>
        <button 
          type="submit"  
          className="bg-slate-400 text-xl w-full hover:ring-2 mt-4 p-2 rounded">
          Login
        </button>
        <p className="text-white text-center mt-4">Don’t have an account?</p>
        <Link to="/" className="text-amber-300 text-center block">SignUp</Link>
      </form>
    </div>
  </div>
  )
}

export default Login