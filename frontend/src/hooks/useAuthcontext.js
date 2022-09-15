import { AuthContext } from '../context/AuthContext'
import {useContext} from 'react'


const useAuthcontext = () => {
  const context = useContext(AuthContext);
    
    //! this means that we are using it outside the scope of the context
    if(!context)
        throw new Error('must be inside the provider ACCESS DENIED')
  
  return context
}

export default useAuthcontext