import { useEffect, useState } from 'react'
import {auth} from '../firebase/config'
import useAuthcontext from './useAuthcontext'

const useSignup = () => {
    const [error,setError] = useState(null)
    const [isPending,setIsPending] = useState(false)
    const [isCancelled, setIsCancelled] = useState(false)

    const {dispatch} = useAuthcontext()
    
    const signup = async (email,password,displayName) => {
        setError(null) //^ reset the error each time we signup
        setIsPending(true)
        
        try {
            const res = await auth.createUserWithEmailAndPassword(email,password) 
  
            dispatch({type:'LOGIN',payload:res.user})
            if(!res){
                throw new Error('Failed to create a user')
            }
            //! after creating the user we want to tap in that user and update his profile and add this name
            await res.user.updateProfile({ displayName })
                    
            if (!isCancelled)
                 setIsPending(false)
    
            
        } catch (err) {
            console.log(error)
            setError(err.message)
            setIsPending(false)

        }
        
    }
    
    useEffect(() => {    
        return () => setIsCancelled(false) //! if we navigate away this fire and we dont want to update the local state if this happens
    }, []);
    
    return {error,isPending,signup}
}

export default useSignup