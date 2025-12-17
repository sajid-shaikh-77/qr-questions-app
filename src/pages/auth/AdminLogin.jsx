import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui';

const AdminLogin = () => {
  const [pw, setPw] = useState('');
  const navigate = useNavigate();
  function login() {
    if (pw === 'admin123') navigate('/admin-panel');
    else alert('Incorrect password. Default admin password: admin123');
  }
  const cancel = () =>{
    navigate('/')
  }
  return (
    <div className='max-w-4xl mx-auto p-6'>
      <section className="rounded-xl p-6 bg-white shadow max-w-md mx-auto">
        <h2 className="text-lg font-semibold text-crescent-dark">Admin Login</h2>
        <div className="mt-4">
          <input placeholder="Password" value={pw} onChange={(e) => setPw(e.target.value)} type="password" className="w-full rounded-md border p-3" />
          <div className="mt-4 flex justify-between gap-3">
            <Button className="px-4 py-2 bg-[#064e47] text-white cursor-pointer" onClick={login}>Login</Button>
            <Button variant='outline' className="px-4 py-2 cursor-pointer" onClick={cancel}>Cancel</Button>
          </div>
        </div>
      </section>
    </div>

  )
}

export default AdminLogin