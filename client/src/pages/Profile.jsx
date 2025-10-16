import React from 'react'
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
  const fileRef = useRef(null)
  const { currentUser } = useSelector((state) => state.user)
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input type='file' ref={fileRef} hidden accept='image/*' />
        <img
          onClick={() => fileRef.current.click()}
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
          src={currentUser.avatar}
          alt='profile'
        />

        <input
          type='text'
          placeholder='username'
          id='username'
          value={formData.username}
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />

        <input
          type='text'
          placeholder='email'
          id='email'
          value={formData.email}
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />

        <input
          type='password'
          placeholder='password'
          id='password'
          value={formData.password}
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />

        <button
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
        >
          Update
        </button>
      </form>

      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}
