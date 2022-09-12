import { useState } from 'react'
import {auth} from '../firebase/config'

const useSignup = () => {
    const [error,setError] = useState(null)
    const [isPending,setIsPending] = useState(false)
 
    const signup = async (email,password,displayName) => {
        setError(null) //^ reset the error each time we signup
        setIsPending(true)
        
        try {
            const res = await auth.createUserWithEmailAndPassword(email,password) 
            console.log(res)
            console.log(res.user)
            
            if(!res){
                throw new Error('Failed to create a user')
            }
            //! after creating the user we want to tap in that user and update his profile and add this name
            await res.user.updateProfile({ displayName })
            setIsPending(false)
            
        } catch (err) {
            console.log(error)
            setError(err.message)
            setIsPending(false)

        }
        
    }
 return {error,isPending,signup}
}

export default useSignup