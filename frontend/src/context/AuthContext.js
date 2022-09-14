import { createContext, useEffect, useReducer} from "react";
import {auth} from '../firebase/config'

const init ={ 
    user: null,
    authIsReady: false,
    name:''
}

export const authReducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN':
        return { ...state, user: action.payload }
      case 'LOGOUT':
        return { ...state, user: null }
      case 'AUTH_IS_READY':
        return { user: action.payload, authIsReady: true }
      default:
        return state
    }
  }

export const AuthContext = createContext(init);

export const AuthProvider = ({children})=>{
    const [state,dispatch] = useReducer(authReducer,init)
    
    useEffect(() => {
       //! this is a solution rather than using local storage to store the user
       //& this context runs every time the page reloads as the state will be cleared
       //^ so what happens here is each time this function will run to check if we have a user or no
       //? and we wont render anything till this evaluates
       const unsub = auth.onAuthStateChanged((user)=>{
        
          dispatch({ type: 'AUTH_IS_READY', payload: user })
          unsub()
        
       }) 
       
    }, []);
    
    
    // console.log('AuthContext state:', state)
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )

}