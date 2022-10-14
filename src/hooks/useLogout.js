import { useEffect, useState } from 'react'
import { auth } from '../firebase/config'
import useAuthcontext from './useAuthcontext'

const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const {dispatch} = useAuthcontext()

    
  const logout = async () => {
    setError(null)
    setIsPending(true)

    try {
        await auth.signOut()
        dispatch({type:'LOGOUT'})

        
        if (!isCancelled)
            setIsPending(false)
        
        
    }catch (err) {
        console.log(error)
        setError(err.message)
        setIsPending(false)
    }
    
  }

    useEffect(() => {    
        return () => setIsCancelled(false) //! if we navigate away this fire
    }, []);
 

  return { logout, error, isPending }

}

export default useLogout