import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Form } from '../../components/ui';
import { InputField } from '../../components/inputs/input-field';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios';
import { baseURL } from '../../utils/constant';
import { urls } from '../../utils/urls';

const FormSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required(),
})

const AdminLogin = () => {
  const navigate = useNavigate();
  const form = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
  });


async function login(data) {
  try {
    const response = await axios.post(`${baseURL}${urls.login}`,data);
    console.log(response.data);
    if(response.status === 200){
      navigate('/admin-panel')
    }
  } catch (error) {
    console.log("Status:", error.response?.status);
    console.log("Data:", error.response?.data);
    console.log("Message:", error.message);
    console.log("Full error:", error);

  }
}
  const cancel = () => {
    navigate('/')
  }
  return (
    <div className='max-w-4xl mx-auto p-6'>
      <section className="rounded-xl p-6 bg-white shadow max-w-md mx-auto">
        <h2 className="text-lg font-semibold text-crescent-dark">Admin Login</h2>
        <div className="mt-4">
          <Form {...form} >
            <form onSubmit={form.handleSubmit(login)}>
              <InputField
                type="text"
                label="Email"
                placeholder="Enter Your Email"
                name="email"
                required />
              <InputField
                type="password"
                label="Password"
                placeholder="Enter Your Password"
                name="password"
                required />
              <div className="mt-4 flex justify-between gap-3">
                <Button className="px-4 py-2 bg-[#064e47] text-white cursor-pointer hover:bg-[#064e47]" type="submit" >Login</Button>
                <Button variant='outline' className="px-4 py-2 cursor-pointer" type="button" onClick={cancel}>Cancel</Button>
              </div>
            </form>
          </Form>
        </div>
      </section>
    </div>

  )
}

export default AdminLogin