import React from 'react'

const OAuth = () => {
    const handleGoogleClick = async()=>{
        try {
            
        } catch (error) {
            console.log('could not sign in with google', error);
            
        }
    }


  return (
     <button type='button' className='bg-red-700 text-white p-3 rounded-lg
      uppercase hover:opacity-95'>
    continue with google</button>
  )
}

export default OAuth