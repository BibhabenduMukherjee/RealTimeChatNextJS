"use client"

import React from 'react'
import Button from './ui/Button'

function AddFriendButton() {


   async function handleSubmit(){
    
   }

  return (
    <div>
         <form  className='max-w-sm m-2'>
      <label
        htmlFor='email'
        className='block text-sm font-medium leading-6 text-gray-900'>
        Add friend by E-Mail
      </label>

      <div className='mt-2 flex gap-4'>
        <input
          
          type='text'
          className='p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          placeholder='you@example.com'
        />
        <Button>Add</Button>
      </div>
    
     
    </form>
    </div>
  )
}

export default AddFriendButton