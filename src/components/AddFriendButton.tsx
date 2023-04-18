"use client"

import React, { useState } from 'react'
import Button from './ui/Button'
import axios, { AxiosError } from "axios"
import {z} from "zod"
import { addFriendValidate } from '@/lib/validation/add-friend'
import { useForm } from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod"
type FormData = z.infer<typeof addFriendValidate>
function AddFriendButton() {
      const [showsuc,setShowSuc] = useState<boolean>(false)

      const {
        register , handleSubmit , setError,
        formState : {errors}
      } = useForm<FormData>({
        resolver: zodResolver(addFriendValidate)
      })

   async function addFriend(email:string){
    try{
      const validatedEmail = addFriendValidate.parse({email})
      await axios.post('/api/friends/add',{
        email : validatedEmail
      })
      setShowSuc(true)
    }catch(err){
       if(err instanceof z.ZodError){
        setError('email' , {message : err.message})
        return
       }
       if(err instanceof AxiosError){
        setError('email' , {message : err.response?.data})
        return 
       }
       setError('email' , {message : "something went wrong"})
    }
   
   }


const onSubmit = (data : FormData) =>{
  addFriend(data.email)
}

  return (
    <div>
         <form  className='max-w-sm m-2' onSubmit={handleSubmit(onSubmit)}>
      <label
        htmlFor='email'
        className='block text-sm font-medium leading-6 text-gray-900'>
        Add friend by E-Mail
      </label>

      <div className='mt-2 flex gap-4'>
        <input
        autoComplete= "off"
          {...register('email')}
          type='text'
          className='p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          placeholder='you@example.com'
        />
        <Button>Add</Button>
      </div>
    
     <p className='mt-1 text-sm text-red-700 '>{errors.email?.message}</p>
     {showsuc ? (
        <p className='mt-1 text-sm text-green-600'>Friend request sent!</p>
      ) : null}
    </form>
    </div>
  )
}

export default AddFriendButton